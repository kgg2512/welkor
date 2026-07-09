/**
 * WelKor Assistant — Cloudflare Worker (Workers AI native binding).
 *
 * A privacy-first navigation helper for foreigners settling in Korea. It takes a
 * plain-language question and returns a short answer plus 1–3 recommended
 * internal WelKor routes, so users reach the page that actually has the
 * information they need instead of a generic contact form.
 *
 * Design guarantees (see docs/workorders/20260709_welkor_nav_assistant.md):
 *   - Self-hosted LLM: Workers AI (@cf/meta/llama-3.1-8b-instruct), $0, no API key.
 *   - ZERO conversation storage/logging. We never persist or console.log the
 *     message or the answer. The only state is an anonymous rate-limit counter
 *     keyed by a salted hash of the IP (raw IP is never stored).
 *   - Routes are GROUNDED: the model may only pick from a fixed slug list; the
 *     worker validates every returned slug and attaches the canonical path+label.
 *   - Not legal/immigration/tax advice; never brokers or guarantees employment
 *     (E-9 / EPS is government-only); refuses inputs containing personal data.
 */

// Current Workers AI models (the plain llama-3.1-8b-instruct was deprecated
// 2026-05-30). 70B first for better multilingual (Korean) answer quality; the
// smaller models are latency/availability fallbacks. Any that report
// deprecation or fail are skipped.
const MODELS = [
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/meta/llama-3.1-8b-instruct-fast",
  "@cf/meta/llama-3.2-3b-instruct",
];
const MAX_MESSAGE = 500;
const RATE_LIMIT = 20; // requests per IP per hour
const RATE_WINDOW_S = 3600;

// CORS allowlist: production site + local dev (any localhost port).
function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (origin === "https://welkor.vercel.app") return true;
  if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return true;
  if (/^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) return true;
  return false;
}

// Canonical route registry. `path` is locale-agnostic; the frontend Link
// prepends the active locale. `label` is what the user sees on the button.
const ROUTES = {
  home: {
    path: "/",
    label: { en: "Start: choose your country", ko: "시작: 국가 선택" },
    desc: "Start the settlement journey: pick your home country to get a visa + step-by-step roadmap (works for E-7, D-2, F-6, arrival, ARC registration, etc.).",
    keywords: ["visa", "journey", "roadmap", "arrive", "arrival", "move", "immigrate", "immigration", "alien registration", "e-7", "e7", "d-2", "d2", "f-6", "f6", "spouse", "marriage", "비자", "입국", "이주", "외국인등록", "거주", "정착", "결혼", "배우자"],
  },
  explore: {
    path: "/explore",
    label: { en: "Explore / tourism", ko: "관광·둘러보기" },
    desc: "Tourism and short visits: K-ETA visa-free entry, where to go, where to stay.",
    keywords: ["tour", "tourist", "tourism", "travel", "visit", "k-eta", "keta", "sightsee", "vacation", "holiday", "trip", "short visit", "관광", "여행", "방문", "숙소", "가볼", "여행지"],
  },
  housing: {
    path: "/housing",
    label: { en: "Housing", ko: "주거·집" },
    desc: "Renting a home: jeonse vs wolse, deposits, listing portals, connecting a licensed real-estate agent.",
    keywords: ["house", "home", "rent", "apartment", "room", "jeonse", "wolse", "deposit", "lease", "officetel", "goshiwon", "landlord", "moving in", "집", "주거", "월세", "전세", "보증금", "원룸", "오피스텔", "임대", "방 구", "부동산"],
  },
  study: {
    path: "/study",
    label: { en: "Study", ko: "유학·학업" },
    desc: "Studying in Korea: universities, D-2 / D-4 student visa, GKS scholarships, TOPIK.",
    keywords: ["study", "student", "university", "college", "school", "degree", "scholarship", "gks", "topik", "d-2", "d-4", "tuition", "admission", "language course", "유학", "학생", "대학", "대학교", "학위", "장학금", "석사", "박사", "어학연수", "입학"],
  },
  jobs: {
    path: "/jobs",
    label: { en: "Jobs & work", ko: "취업·일자리" },
    desc: "Working: what your visa legally allows, job channels, official employment info. Information only — WelKor never places or brokers workers.",
    keywords: ["job", "work", "employment", "hire", "career", "salary", "resume", "cv", "e-9", "worker", "company", "part-time", "internship", "취업", "일자리", "직장", "구직", "채용", "이력서", "아르바이트", "알바", "근무"],
  },
  finance: {
    path: "/finance",
    label: { en: "Banking", ko: "은행·금융" },
    desc: "Banking: opening a bank account, cards, loans, sending money home (remittance).",
    keywords: ["bank", "account", "money", "card", "remit", "remittance", "transfer", "send money", "loan", "finance", "atm", "credit", "은행", "계좌", "통장", "송금", "카드", "환전", "대출", "금융"],
  },
  tax: {
    path: "/tax",
    label: { en: "Tax", ko: "세금" },
    desc: "Taxes: year-end settlement, refunds, connecting a licensed tax accountant (세무사).",
    keywords: ["tax", "refund", "year-end", "income tax", "deduction", "filing", "세금", "세무", "연말정산", "환급", "소득세", "세무사"],
  },
  community: {
    path: "/community",
    label: { en: "Community", ko: "커뮤니티" },
    desc: "Ask people who already settled in Korea and read their tips.",
    keywords: ["community", "forum", "advice", "tips", "커뮤니티", "질문", "후기", "정보 공유", "다른 사람"],
  },
  connect: {
    path: "/connect",
    label: { en: "Get connected", ko: "전문가 연결" },
    desc: "Get connected to a verified licensed professional (real-estate agent, tax accountant, or administrative agent). WelKor connects — it never brokers or charges you.",
    keywords: ["connect me", "contact", "professional", "공인중개사", "행정사", "전문가 연결", "상담", "연결해"],
  },
  pros: {
    path: "/pros",
    label: { en: "For professionals", ko: "전문가용" },
    desc: "Directory of verified licensed professionals, or join as a professional.",
    keywords: ["professional directory", "join as", "verify license", "list my", "전문가 등록", "전문가 목록"],
  },
};

const ROUTE_SLUGS = Object.keys(ROUTES);

// Patterns that indicate a user pasted personal data. Refuse rather than process.
// Separators are generalized to hyphen / dot / space so grouped numbers like
// "1234.5678.9012.3456" cannot slip past the filter.
const SEP = "[-.\\s]";
const PII_PATTERNS = [
  new RegExp(`\\d{6}${SEP}?\\d{7}`), // Korean resident registration number (RRN)
  /\b[A-Za-z]{1,2}\d{7,9}\b/, // passport-like (letters + 7–9 digits)
  /\d{7,}/, // any run of 7+ digits (ID / card with no separators)
  new RegExp(`\\d{2,4}${SEP}\\d{3,4}${SEP}\\d{4}`), // phone / card grouped by any separator
  new RegExp(`(?:\\d{4}${SEP}){3}\\d{4}`), // 16-digit card in 4 groups (any separator)
];

function containsPII(text) {
  return PII_PATTERNS.some((re) => re.test(text));
}

function buildSystemPrompt(locale) {
  const lang = locale === "ko" ? "Korean" : "English";
  const routeLines = ROUTE_SLUGS.map((slug) => `- "${slug}": ${ROUTES[slug].desc}`).join("\n");
  return [
    "You are WelKor Assistant, a calm, practical navigation helper for foreigners moving to, working in, studying in, or visiting South Korea.",
    "Your ONLY job: understand the user's situation and point them to the right page of the WelKor website.",
    "",
    "Available WelKor pages (use these exact slugs):",
    routeLines,
    "",
    "Rules:",
    `- Reply in ${lang}.`,
    "- Keep the answer to 2–4 short sentences. Be warm and concrete.",
    "- Recommend 1 to 3 pages (by slug) that best match the question. Prefer the specific information page over 'connect'. Only use 'connect' when the user explicitly wants to be put in touch with a professional.",
    "- Answer only what the page can actually help with. Do NOT invent specific procedures, fees, dates, or eligibility rules — point the user to the page and to official sources instead.",
    "- You provide INFORMATION and NAVIGATION only. You are NOT a lawyer, immigration officer, or tax agent. For anything binding, tell the user to verify on official government sources or with a licensed professional.",
    "- Never promise, guarantee, or arrange a job. E-9 / non-professional employment is handled only by the government EPS system; WelKor never brokers workers.",
    "- Do not ask for or repeat any personal data (passport, ID, card, phone).",
    "- If the question is unrelated to living in / moving to / visiting Korea, gently say that's outside what WelKor covers and suggest the closest page.",
    "",
    'Respond with ONLY a compact JSON object, no markdown, in this exact shape:',
    '{"answer": "<your short answer>", "routes": ["slug1", "slug2"]}',
    "The routes array must contain only slugs from the list above.",
    "",
    "Examples:",
    'User: "How do I open a bank account as a foreigner?" -> {"answer": "You can open a Korean bank account once you have your Alien Registration Card. The Banking page explains accounts, cards, and sending money home.", "routes": ["finance"]}',
    'User: "I got an E-7 offer, where do I rent and how does year-end tax work?" -> {"answer": "Congrats! The Housing page covers deposits, jeonse/wolse and finding a foreigner-friendly agent, and the Tax page explains year-end settlement.", "routes": ["housing", "tax"]}',
  ].join("\n");
}

// Deterministic, bilingual keyword routing. This is the AUTHORITATIVE router:
// it grounds the recommendation on the user's own words so the topic is always
// right, even when the small LLM drifts. The LLM only augments it.
function keywordMatches(message) {
  const lower = message.toLowerCase();
  const hits = [];
  for (const slug of ROUTE_SLUGS) {
    if (ROUTES[slug].keywords.some((k) => lower.includes(k.toLowerCase()))) hits.push(slug);
  }
  return hits;
}

// Merge keyword hits (first, authoritative) with the LLM's valid picks, dedupe,
// cap at 3. Falls back to "home" only when nothing matched at all.
function mergeRoutes(keywordHits, llmSlugs) {
  const merged = [];
  for (const slug of [...keywordHits, ...llmSlugs]) {
    if (ROUTES[slug] && !merged.includes(slug)) merged.push(slug);
    if (merged.length >= 3) break;
  }
  if (merged.length === 0) merged.push("home");
  return merged;
}

function mapRoutes(slugs, locale) {
  const seen = new Set();
  const out = [];
  for (const slug of slugs) {
    if (!ROUTES[slug] || seen.has(slug)) continue;
    seen.add(slug);
    out.push({ path: ROUTES[slug].path, label: ROUTES[slug].label[locale === "ko" ? "ko" : "en"] });
    if (out.length >= 3) break;
  }
  return out;
}

// Extract the completion text across Workers AI response shapes:
// legacy { response: "..." } and OpenAI-style { choices: [{ message: { content } }] }.
function extractText(result) {
  if (!result) return "";
  if (typeof result.response === "string") return result.response;
  const choice = Array.isArray(result.choices) ? result.choices[0] : null;
  if (choice) {
    if (typeof choice.message?.content === "string") return choice.message.content;
    if (typeof choice.text === "string") return choice.text;
  }
  if (result.response && typeof result.response === "object") {
    if (typeof result.response.content === "string") return result.response.content;
    if (typeof result.response.text === "string") return result.response.text;
  }
  return "";
}

// Best-effort JSON extraction from a model completion.
function parseModelJSON(text) {
  if (typeof text !== "string") return null;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function hashIp(ip, salt) {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Approximate hourly rate limiter using KV. Non-atomic (abuse control, not billing).
// Stores only the salted hash of the IP; the raw IP is never persisted.
async function checkRateLimit(env, request) {
  if (!env.RL) return { ok: true }; // KV not bound → skip (fail open)
  // Fail CLOSED if the IP-hashing salt is missing: without it we cannot store an
  // anonymized counter, so we deny rather than fall back to a weak known salt
  // (which would both weaken anonymization and let the limit be bypassed).
  const salt = env.RL_SALT;
  if (!salt) return { ok: false };
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const bucket = Math.floor(Date.now() / (RATE_WINDOW_S * 1000));
  const key = `rl:${bucket}:${await hashIp(ip, salt)}`;
  const current = parseInt((await env.RL.get(key)) || "0", 10);
  if (current >= RATE_LIMIT) return { ok: false };
  await env.RL.put(key, String(current + 1), { expirationTtl: RATE_WINDOW_S });
  return { ok: true };
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...(origin ? corsHeaders(origin) : {}),
    },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const allowed = isAllowedOrigin(origin);

    if (request.method === "OPTIONS") {
      // Preflight — only answer for allowed origins.
      if (!allowed) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/chat") {
      return json({ error: "not_found" }, 404, allowed ? origin : null);
    }

    // Enforce CORS allowlist for actual requests too.
    if (!allowed) return json({ error: "forbidden_origin" }, 403, null);

    // Rate limit.
    const rl = await checkRateLimit(env, request);
    if (!rl.ok) return json({ error: "rate_limited" }, 429, origin);

    // Parse and validate input.
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "bad_request" }, 400, origin);
    }
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const locale = body?.locale === "ko" ? "ko" : "en";
    if (!message) return json({ error: "empty_message" }, 400, origin);
    if (message.length > MAX_MESSAGE) return json({ error: "too_long" }, 413, origin);

    // Refuse inputs that contain personal data — do not send them to the model.
    if (containsPII(message)) {
      const answer =
        locale === "ko"
          ? "안전을 위해 여권번호·주민등록번호·카드번호·전화번호 같은 개인정보는 입력하지 마세요. 해당 내용은 처리하지 않아요 — 지우고 다시 질문해 주세요. WelKor는 이 대화를 저장하지 않습니다."
          : "For your safety, please don't type personal details like passport, ID, card, or phone numbers. I can't process that — please remove them and ask again. WelKor never stores this chat.";
      return json({ answer, routes: [], refused: true }, 200, origin);
    }

    // Ask the model. On any failure, fall back to keyword routing.
    let answer = "";
    let slugs = [];
    const messages = [
      { role: "system", content: buildSystemPrompt(locale) },
      { role: "user", content: message },
    ];
    for (const model of MODELS) {
      try {
        const result = await env.AI.run(model, { messages, max_tokens: 400, temperature: 0.3 });
        const text = extractText(result);
        const parsed = parseModelJSON(text);
        if (parsed && typeof parsed.answer === "string") {
          answer = parsed.answer.trim();
          if (Array.isArray(parsed.routes)) {
            slugs = parsed.routes.filter((s) => ROUTE_SLUGS.includes(s));
          }
        } else if (text) {
          answer = text.trim().slice(0, 800);
        }
        if (answer) break; // got a usable answer — stop
      } catch (e) {
        console.log("AI_ERR", model, String(e && e.message ? e.message : e));
        // Try the next model on any failure; keyword fallback is the final net.
      }
    }

    if (!answer) {
      answer =
        locale === "ko"
          ? "질문에 가장 가까운 페이지를 아래에 추천해 드렸어요. 원하는 항목을 눌러보세요."
          : "Here are the WelKor pages that best match your question. Tap one to open it.";
    }

    // Keyword routing is authoritative; the LLM's valid picks augment it.
    const routeSlugs = mergeRoutes(keywordMatches(message), slugs);

    return json({ answer, routes: mapRoutes(routeSlugs, locale), refused: false }, 200, origin);
  },
};
