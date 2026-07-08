// WelKor public submission endpoint — the SINGLE write path for leads
// (demand) and professional applications (supply). Protections: IP rate-limit
// (salted hash, no raw IP stored), optional Cloudflare Turnstile, strict input
// validation, consent enforcement. Inserts via service_role; anon has no direct
// write. WelKor = connector only.
import { createClient } from "jsr:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT = 8;   // max submissions
const WINDOW_MIN = 60;  // per IP per 60 minutes

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const str = (v: unknown, max: number): string | null =>
  v == null || v === "" ? null : String(v).slice(0, max);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method" }, 405);

  let body: any;
  try { body = await req.json(); } catch { return json({ error: "bad json" }, 400); }
  const { kind, payload, turnstileToken } = body ?? {};
  if (kind !== "lead" && kind !== "application") return json({ error: "bad kind" }, 400);
  if (!payload || typeof payload !== "object") return json({ error: "bad payload" }, 400);
  if (payload.consent !== true) return json({ error: "consent required" }, 400);

  const rawIp = (req.headers.get("x-forwarded-for")?.split(",")[0]?.trim())
    || req.headers.get("x-real-ip") || "unknown";

  // Optional Turnstile — active only when the secret is configured.
  const tsSecret = Deno.env.get("TURNSTILE_SECRET");
  if (tsSecret) {
    if (!turnstileToken) return json({ error: "captcha required" }, 400);
    const form = new FormData();
    form.append("secret", tsSecret);
    form.append("response", String(turnstileToken));
    if (rawIp && rawIp !== "unknown") form.append("remoteip", rawIp);
    const v = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
    const vr = await v.json();
    if (!vr.success) return json({ error: "captcha failed" }, 403);
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
    table = "leads";
    row = {
      topic: p.topic,
      name: str(p.name, 200),
      email: str(p.email, 200),
      nationality: str(p.nationality, 100),
      visa_type: str(p.visa_type, 40),
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

  const { error } = await supabase.from(table).insert(row);
  if (error) return json({ error: "insert_failed" }, 500);
  await supabase.from("submission_log").insert({ ip_hash: ipHash, kind });
  return json({ ok: true });
});
