/**
 * Client helper for the WelKor Assistant (Cloudflare Worker + Workers AI).
 *
 * The worker is authoritative: it answers and returns grounded internal routes.
 * This module only talks to it and, if it's unreachable, does a tiny local
 * keyword→route fallback so the widget still points users somewhere useful.
 *
 * No conversation is stored anywhere — the chat lives in React state for the
 * open session only.
 */

export interface AssistantRoute {
  path: string;
  label: string;
}

export interface AssistantReply {
  answer: string;
  routes: AssistantRoute[];
  refused?: boolean;
}

const ASSISTANT_URL =
  process.env.NEXT_PUBLIC_ASSISTANT_URL ||
  "https://welkor-assistant.kgg2512.workers.dev/chat";

// Minimal offline fallback, mirroring the worker's route registry. Used only
// when the worker can't be reached.
const FALLBACK_ROUTES: Record<
  string,
  { path: string; label: { en: string; ko: string }; keywords: string[] }
> = {
  home: {
    path: "/",
    label: { en: "Start: choose your country", ko: "시작: 국가 선택" },
    keywords: ["visa", "journey", "arrive", "move", "비자", "입국", "이주", "외국인등록", "정착"],
  },
  explore: {
    path: "/explore",
    label: { en: "Explore / tourism", ko: "관광·둘러보기" },
    keywords: ["tour", "tourist", "travel", "visit", "k-eta", "관광", "여행", "방문"],
  },
  housing: {
    path: "/housing",
    label: { en: "Housing", ko: "주거·집" },
    keywords: ["house", "home", "rent", "jeonse", "wolse", "집", "월세", "전세", "방", "부동산"],
  },
  study: {
    path: "/study",
    label: { en: "Study", ko: "유학·학업" },
    keywords: ["study", "student", "university", "degree", "유학", "대학", "학위", "장학금"],
  },
  jobs: {
    path: "/jobs",
    label: { en: "Jobs & work", ko: "취업·일자리" },
    keywords: ["job", "work", "employment", "취업", "일자리", "구직", "채용"],
  },
  finance: {
    path: "/finance",
    label: { en: "Banking", ko: "은행·금융" },
    keywords: ["bank", "account", "money", "remit", "은행", "계좌", "송금", "카드", "대출"],
  },
  tax: {
    path: "/tax",
    label: { en: "Tax", ko: "세금" },
    keywords: ["tax", "refund", "세금", "연말정산", "환급"],
  },
  community: {
    path: "/community",
    label: { en: "Community", ko: "커뮤니티" },
    keywords: ["community", "커뮤니티", "질문", "후기"],
  },
  connect: {
    path: "/connect",
    label: { en: "Get connected", ko: "전문가 연결" },
    keywords: ["connect", "professional", "전문가 연결", "상담"],
  },
  pros: {
    path: "/pros",
    label: { en: "For professionals", ko: "전문가용" },
    keywords: ["professional directory", "전문가 등록"],
  },
};

function fallbackRoutes(message: string, locale: string): AssistantRoute[] {
  const lower = message.toLowerCase();
  const lang = locale === "ko" ? "ko" : "en";
  const hits: AssistantRoute[] = [];
  for (const key of Object.keys(FALLBACK_ROUTES)) {
    const r = FALLBACK_ROUTES[key];
    if (r.keywords.some((k) => lower.includes(k.toLowerCase()))) {
      hits.push({ path: r.path, label: r.label[lang] });
    }
    if (hits.length >= 3) break;
  }
  if (hits.length === 0) {
    hits.push({ path: FALLBACK_ROUTES.home.path, label: FALLBACK_ROUTES.home.label[lang] });
  }
  return hits;
}

/** Ask the assistant. Never throws — returns a local fallback on any failure. */
export async function askAssistant(
  message: string,
  locale: string,
): Promise<AssistantReply> {
  const lang = locale === "ko" ? "ko" : "en";
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const res = await fetch(ASSISTANT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, locale: lang }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.status === 429) {
      return {
        answer:
          lang === "ko"
            ? "잠시 후 다시 시도해 주세요. 그동안 아래 페이지가 도움이 될 수 있어요."
            : "Please try again in a little while. Meanwhile, these pages may help.",
        routes: fallbackRoutes(message, locale),
      };
    }
    if (res.ok) {
      const data = (await res.json()) as AssistantReply;
      if (data && typeof data.answer === "string" && Array.isArray(data.routes)) {
        return data;
      }
    }
  } catch {
    // fall through to offline fallback
  }
  return {
    answer:
      lang === "ko"
        ? "지금은 도우미에 연결할 수 없어요. 질문과 가장 가까운 페이지를 아래에 안내해 드릴게요."
        : "I can't reach the assistant right now. Here are the pages closest to your question.",
    routes: fallbackRoutes(message, locale),
  };
}
