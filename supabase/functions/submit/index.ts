// WelKor public submission endpoint — the SINGLE write path for leads
// (demand) and professional applications (supply). Protections: IP rate-limit
// (salted hash, no raw IP stored), optional Cloudflare Turnstile, strict input
// validation, consent enforcement. Inserts via service_role; anon has no direct
// write. WelKor = connector only.
import { createClient } from "jsr:@supabase/supabase-js@2";

// CORS allowlist — wildcard(*) 폐기. env ALLOWED_ORIGINS(콤마 구분) 우선, 없으면 기본 상수.
// allowlist에 없는(또는 부재한) Origin에는 CORS 헤더를 아예 부여하지 않는다.
const envOrigins = Deno.env.get("ALLOWED_ORIGINS")?.split(",").map((s) => s.trim()).filter(Boolean);
const ALLOWED_ORIGINS: string[] = envOrigins?.length
  ? envOrigins
  : ["https://welkor.vercel.app", "http://localhost:3000"];

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin",
  };
}

const RATE_LIMIT = 8;   // max submissions
const WINDOW_MIN = 60;  // per IP per 60 minutes

async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const str = (v: unknown, max: number): string | null =>
  v == null || v === "" ? null : String(v).slice(0, max);

// PIPA §24 — 고유식별정보(주민·외국인등록번호·여권번호) 미수집 방침의 서버측 강제.
// 과탐지로 정상 제출을 막지 않도록 "명백한 식별번호 형태"만 보수적으로 매칭한다.
const UID_PATTERNS: RegExp[] = [
  /(?<!\d)\d{6}-?\d{7}(?!\d)/, // 주민·외국인등록번호: 13자리(하이픈 선택), 더 긴 숫자열 내부는 제외
  /(?<![A-Za-z0-9])(?:[A-Z]\d{8}|[A-Z]{2}\d{7})(?![A-Za-z0-9])/, // 여권번호: 영문1+숫자8(신형)·영문2+숫자7(구형)
];
const hasUniqueId = (v: unknown): boolean =>
  typeof v === "string" && UID_PATTERNS.some((re) => re.test(v));

Deno.serve(async (req) => {
  // 요청별 CORS: allowlist에 있는 Origin에만 헤더 부여 (불일치 시 빈 객체 = 미부여).
  const cors = corsHeaders(req.headers.get("origin"));
  const json = (body: unknown, status = 200): Response =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...cors, "Content-Type": "application/json" },
    });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method" }, 405);

  let body: any;
  try { body = await req.json(); } catch { return json({ error: "bad json" }, 400); }
  const { kind, payload, turnstileToken } = body ?? {};
  if (kind !== "lead" && kind !== "application") return json({ error: "bad kind" }, 400);
  if (!payload || typeof payload !== "object") return json({ error: "bad payload" }, 400);
  if (payload.consent !== true) return json({ error: "consent required" }, 400);

  // 신뢰 가능한 클라이언트 IP: XFF "최좌측"은 클라이언트가 위조 가능(rate-limit 우회 벡터).
  // x-real-ip(Supabase 엣지 프록시가 설정) 우선, 폴백은 XFF "최우측" — 가장 최근 신뢰 프록시 홉이 추가한 값.
  const xff = req.headers.get("x-forwarded-for");
  const rawIp = req.headers.get("x-real-ip")?.trim()
    || xff?.split(",").pop()?.trim()
    || "unknown";

  // Turnstile — secret이 설정돼 있으면 fail-closed: 토큰 누락·검증 실패·검증기 오류 전부 거부.
  const tsSecret = Deno.env.get("TURNSTILE_SECRET");
  if (tsSecret) {
    if (!turnstileToken) return json({ error: "captcha required" }, 400);
    try {
      const form = new FormData();
      form.append("secret", tsSecret);
      form.append("response", String(turnstileToken));
      if (rawIp && rawIp !== "unknown") form.append("remoteip", rawIp);
      const v = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
      const vr = await v.json();
      if (!vr.success) return json({ error: "captcha failed" }, 403);
    } catch {
      // 검증기 통신 오류도 통과시키지 않는다 (fail-closed).
      return json({ error: "captcha failed" }, 403);
    }
  } else {
    // secret 미설정 = 미배포 개발 상태 가정 — 현행(fail-open) 유지, 경고만 남긴다.
    console.warn("TURNSTILE_SECRET not set — captcha verification skipped (fail-open)");
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // IP rate limit (salted hash).
  const salt = Deno.env.get("IP_SALT") ?? "welkor-default-salt";
  const ipHash = await sha256(salt + rawIp);
  const since = new Date(Date.now() - WINDOW_MIN * 60 * 1000).toISOString();
  const { count } = await supabase.from("submission_log")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash).gte("created_at", since);
  if ((count ?? 0) >= RATE_LIMIT) return json({ error: "rate_limited" }, 429);

  let table: string;
  let row: Record<string, unknown>;

  if (kind === "lead") {
    const p = payload;
    const TOPICS = ["housing", "tax", "admin", "community", "general"];
    if (!TOPICS.includes(p.topic)) return json({ error: "bad topic" }, 400);
    if (!p.name || !p.email) return json({ error: "missing fields" }, 400);
    // 민감정보(국적·체류자격)는 별도 동의(sensitive_consent)가 있을 때만 저장한다.
    // 서버측 강제(PIPA §23) — 클라이언트가 조작돼도 미동의 시 저장되지 않도록 심층방어.
    const sensitiveOk = payload.sensitive_consent === true;
    table = "leads";
    row = {
      topic: p.topic,
      name: str(p.name, 200),
      email: str(p.email, 200),
      nationality: sensitiveOk ? str(p.nationality, 100) : null,
      visa_type: sensitiveOk ? str(p.visa_type, 40) : null,
      message: str(p.message, 4000),
      locale: p.locale === "ko" ? "ko" : "en",
      consent: true,
      source_path: str(p.source_path, 200),
    };
  } else {
    const p = payload;
    const KINDS = ["realtor", "tax_accountant", "admin_agent"];
    if (!KINDS.includes(p.kind)) return json({ error: "bad pro kind" }, 400);
    if (!p.name || !p.license_no || !p.contact_email) return json({ error: "missing fields" }, 400);
    table = "professional_applications";
    row = {
      kind: p.kind,
      name: str(p.name, 200),
      org: str(p.org, 200),
      region: str(p.region, 100),
      languages: Array.isArray(p.languages) ? p.languages.slice(0, 10).map((x: unknown) => String(x).slice(0, 40)) : [],
      license_no: str(p.license_no, 100),
      contact_email: str(p.contact_email, 200),
      contact_phone: str(p.contact_phone, 40),
      intro: str(p.intro, 4000),
      locale: p.locale === "ko" ? "ko" : "en",
      consent: true,
    };
  }

  // 자유텍스트 필드(message/intro)에 고유식별정보가 감지되면 저장 없이 거부 (PIPA §24 미수집 방침).
  if (hasUniqueId(row.message) || hasUniqueId(row.intro)) {
    return json({
      error: "unique_identifier_not_allowed",
      message:
        "여권번호·외국인등록번호 등 고유식별정보는 수집하지 않습니다. 해당 번호를 지우고 다시 제출해 주세요. / We do not collect passport or resident registration numbers. Please remove them and resubmit.",
    }, 400);
  }

  const { error } = await supabase.from(table).insert(row);
  if (error) return json({ error: "insert_failed" }, 500);
  await supabase.from("submission_log").insert({ ip_hash: ipHash, kind });
  return json({ ok: true });
});
