import type { LocalizedText } from "../types";

/**
 * Jobs — "직업정보제공형" (job-information curation), NOT job placement.
 *
 * ★LEGAL (welkor/docs/legal/JOBS_LEGAL_REVIEW.md — 직업안정법):
 * WelKor is a 직업정보제공형 service. It curates INFORMATION and deep-links users
 * OUT to established external sites. WelKor does NOT hold a job-posting DB, never
 * matches a specific person to a specific company, never collects applications or
 * resumes, never takes a fee, and never guarantees employment. The last step
 * (apply / contact / hire) is taken 100% by the user on the external site.
 *
 * This is "정보제공", not "알선(직업소개)". The legal trigger that turns curation
 * into 알선 (직업소개, 등록 대상) is "specific matching + intervention" — never
 * "personalisation". Personalised filtering of public information is legal.
 *
 * Forbidden vocabulary (JOBS_LEGAL_REVIEW §4-2) is NEVER used in code, UI or
 * comments: 취업상담 / 취업추천 / 취업지원 / 취업보장 / 일자리알선 / 매칭연결 /
 * 이력서대행 / 헤드헌팅 / 채용대행 (and their English equivalents: placement,
 * recommend candidate, application service, guaranteed job, brokering, headhunting,
 * recruiting agency). Allowed: 채용 정보 / 안내 / 가이드 / 큐레이션 / browse / info.
 *
 * E-9 (non-professional) is handled ONLY through the government EPS and is kept as
 * an information carve-out — never a clickable job board.
 */

/* ---------------------------------------------------------------------------
 * Official / public links
 * ------------------------------------------------------------------------- */

export const EPS = "https://www.eps.go.kr/"; // Employment Permit System (government-only, E-9) — verified 200, 2026-06-26
export const HIKOREA = "https://www.hikorea.go.kr/"; // immigration: precise work scope per visa — verified 200, 2026-06-26
export const WORK24 = "https://www.work24.go.kr/"; // official national employment portal — verified 200, 2026-06-26
export const KOTRA_GTC = "https://www.kotra.or.kr/gtc_kor"; // KOTRA Global Talent Center (replaces dead contactkorea.go.kr) — verified 200, 2026-06-26

/* ---------------------------------------------------------------------------
 * 1) WORK_ELIGIBILITY — what each visa legally allows
 *
 * Scope summaries below are derived from HiKorea / 법무부 비자 내비게이터
 * (immigration.go.kr) and verified via web search 2026-06-26. They are
 * deliberately a *summary* — the precise occupation list is delegated to the
 * official HiKorea link (we never claim to be the authoritative source).
 * Anything not directly verified is marked "미확인" in a comment.
 * ------------------------------------------------------------------------- */

export type WorkPermission = "full" | "sponsored" | "parttime" | "internship" | "none";

export interface WorkEligibility {
  /** Visa code, e.g. "E-7". */
  code: string;
  name: LocalizedText;
  /** High-level permission, drives the UI badge colour. */
  permission: WorkPermission;
  /** What kind of work this visa allows (range, not a binding occupation list). */
  allowed: LocalizedText;
  /** Working-time / form (full-time, weekly part-time cap, etc.). */
  conditions: LocalizedText;
  /** Whether an employer must sponsor the visa. */
  employerSponsor: boolean;
  /** Extra caveats. */
  note?: LocalizedText;
  /** Official source for the precise rules. */
  officialUrl: string;
  /** Job fields most relevant to this visa (JOB_FIELDS ids) — used to pre-rank channels. */
  relevantFields: string[];
}

export const WORK_ELIGIBILITY: WorkEligibility[] = [
  {
    code: "E-7",
    name: { en: "E-7 Professional", ko: "E-7 특정활동(전문직)" },
    permission: "sponsored",
    allowed: {
      en: "Skilled / professional roles on the designated E-7 occupation list — IT, engineering, business, design, trade and more.",
      ko: "지정된 E-7 허용 직종의 전문·숙련 직무 — IT·엔지니어링·경영·디자인·무역 등.",
    },
    conditions: {
      en: "Full-time, for the sponsoring employer and approved occupation only. Changing employer needs a permit.",
      ko: "전일제, 후원 고용주의 승인 직무에 한함. 근무처 변경 시 별도 허가 필요.",
    },
    employerSponsor: true,
    officialUrl: HIKOREA,
    relevantFields: ["it", "engineering", "rnd", "design", "marketing", "trade", "manufacturing"],
  },
  {
    code: "E-1",
    name: { en: "E-1 Professor", ko: "E-1 교수" },
    permission: "sponsored",
    allowed: {
      en: "Teaching / lecturing at an accredited university or higher-education institution.",
      ko: "인가된 대학·고등교육기관에서의 교수·강의.",
    },
    conditions: {
      en: "Full-time, appointed by the sponsoring institution.",
      ko: "전일제, 후원 기관의 임용에 따름.",
    },
    employerSponsor: true,
    officialUrl: HIKOREA,
    relevantFields: ["education", "rnd"],
  },
  {
    code: "E-2",
    name: { en: "E-2 Conversation Instructor", ko: "E-2 회화지도" },
    permission: "sponsored",
    allowed: {
      en: "Foreign-language conversation instruction at schools, hagwons, universities and approved institutions.",
      ko: "학교·학원·대학 등 승인 기관에서의 외국어 회화지도.",
    },
    conditions: {
      en: "Full-time at the sponsoring institution. Native-speaker / degree criteria apply.",
      ko: "후원 기관에서 전일제. 원어민·학위 요건 적용.",
    },
    employerSponsor: true,
    officialUrl: HIKOREA,
    relevantFields: ["education"],
  },
  {
    code: "E-3",
    name: { en: "E-3 Researcher", ko: "E-3 연구" },
    permission: "sponsored",
    allowed: {
      en: "Research at an accredited institute or a company R&D centre.",
      ko: "인가 연구기관 또는 기업 부설연구소에서의 연구.",
    },
    conditions: {
      en: "Full-time, by invitation of the sponsoring institute.",
      ko: "전일제, 초청 기관의 후원에 따름.",
    },
    employerSponsor: true,
    officialUrl: HIKOREA,
    relevantFields: ["rnd", "it", "engineering"],
  },
  {
    code: "E-5",
    name: { en: "E-5 Licensed Professional", ko: "E-5 전문직업" },
    permission: "sponsored",
    allowed: {
      en: "Practising a profession that requires a Korean national licence (e.g. certain legal, medical, engineering fields).",
      ko: "한국 국가자격이 필요한 전문직 수행(법률·의료·기술 등 일부 분야).",
    },
    conditions: {
      en: "Full-time; a recognised Korean licence is required.",
      ko: "전일제, 한국 인정 자격증 필요.",
    },
    employerSponsor: true,
    officialUrl: HIKOREA,
    relevantFields: ["engineering", "rnd"],
  },
  {
    code: "D-8",
    name: { en: "D-8 Corporate Investor", ko: "D-8 기업투자" },
    permission: "sponsored",
    allowed: {
      en: "Management or essential specialist work at the Korean company you invested in / were dispatched to.",
      ko: "투자·파견된 한국 법인에서의 경영 또는 필수 전문 업무.",
    },
    conditions: {
      en: "Tied to the invested company; investment thresholds apply.",
      ko: "투자 법인에 한정, 투자 요건 적용.",
    },
    employerSponsor: true,
    officialUrl: HIKOREA,
    relevantFields: ["it", "engineering", "marketing", "trade"],
  },
  {
    code: "D-2",
    name: { en: "D-2 Degree Student", ko: "D-2 유학" },
    permission: "parttime",
    allowed: {
      en: "Part-time work only, after getting a part-time work permit from immigration.",
      ko: "출입국의 시간제취업 허가를 받은 후 시간제 근무만 가능.",
    },
    conditions: {
      en: "Undergraduate: about 25 hrs/week during the semester (caps vary by Korean-language level and university certification); often unlimited on weekends/holidays/vacation. Graduate caps differ. Confirm current limits at HiKorea.",
      ko: "학부: 학기 중 주당 약 25시간(한국어 능력·대학 인증에 따라 상이), 주말·공휴일·방학은 무제한인 경우가 많음. 대학원은 한도 상이. 최신 한도는 하이코리아에서 확인.",
    },
    employerSponsor: false,
    note: {
      en: "Working without a permit, or beyond the cap, can put your stay at risk.",
      ko: "허가 없이 또는 한도를 초과한 근무는 체류에 위험이 될 수 있습니다.",
    },
    officialUrl: HIKOREA,
    relevantFields: ["service", "education", "it"],
  },
  {
    code: "D-4",
    name: { en: "D-4 Language Trainee", ko: "D-4 어학연수" },
    permission: "parttime",
    allowed: {
      en: "Part-time work only, after a permit, and usually only after a minimum period of study.",
      ko: "허가를 받은 후, 보통 일정 기간 수학 후에만 시간제 근무 가능.",
    },
    conditions: {
      en: "Around 20 hrs/week during the term once eligible — tighter than D-2. Confirm current rules at HiKorea.",
      ko: "자격 충족 시 학기 중 주당 약 20시간으로 D-2보다 제한적. 최신 규정은 하이코리아에서 확인.",
    },
    employerSponsor: false,
    officialUrl: HIKOREA,
    relevantFields: ["service"],
  },
  {
    code: "D-10",
    name: { en: "D-10 Job Seeker", ko: "D-10 구직" },
    permission: "internship",
    allowed: {
      en: "Job-searching and internships — NOT regular employment. You must switch to a work visa before starting a real job.",
      ko: "구직 활동과 인턴(직장형 취업 아님) — 정식 취업 전 취업비자로 변경해야 합니다.",
    },
    conditions: {
      en: "Internships need a permit; typically up to ~6 months per company. Confirm current rules at HiKorea.",
      ko: "인턴은 허가 필요, 통상 한 회사당 약 6개월 이내. 최신 규정은 하이코리아에서 확인.",
    },
    employerSponsor: false,
    note: {
      en: "Use this stage to find an employer who will sponsor an E-7 or similar work visa.",
      ko: "이 단계는 E-7 등 취업비자를 후원할 고용주를 찾는 기간으로 활용하세요.",
    },
    officialUrl: HIKOREA,
    relevantFields: ["it", "engineering", "marketing", "design", "rnd"],
  },
  {
    code: "H-2",
    name: { en: "H-2 Working Visit", ko: "H-2 방문취업" },
    permission: "full",
    allowed: {
      en: "Work permitted in a wide range of designated industries (for eligible ethnic-Korean nationals of certain countries).",
      ko: "지정된 다수 업종에서 취업 가능(대상국 동포 등 자격자 한정).",
    },
    conditions: {
      en: "Must work within the permitted industry list; employment reporting applies.",
      ko: "허용 업종 범위 내 근무, 취업 개시 신고 등 적용.",
    },
    employerSponsor: false,
    officialUrl: HIKOREA,
    relevantFields: ["manufacturing", "service", "trade"],
  },
  {
    code: "F-2",
    name: { en: "F-2 Resident", ko: "F-2 거주" },
    permission: "full",
    allowed: {
      en: "Free to work in almost any field, like a local employee (some status sub-types have conditions).",
      ko: "거의 모든 분야에서 내국인처럼 자유롭게 취업 가능(일부 세부 자격은 조건 있음).",
    },
    conditions: {
      en: "No employer sponsorship needed for most roles.",
      ko: "대부분의 직무에서 고용주 후원 불필요.",
    },
    employerSponsor: false,
    officialUrl: HIKOREA,
    relevantFields: ["it", "engineering", "education", "rnd", "design", "marketing", "trade", "manufacturing", "service"],
  },
  {
    code: "F-5",
    name: { en: "F-5 Permanent Resident", ko: "F-5 영주" },
    permission: "full",
    allowed: {
      en: "Free to work in any field, like a permanent resident — no occupation restriction.",
      ko: "영주권자로서 모든 분야 자유 취업 — 직종 제한 없음.",
    },
    conditions: {
      en: "No employer sponsorship needed.",
      ko: "고용주 후원 불필요.",
    },
    employerSponsor: false,
    officialUrl: HIKOREA,
    relevantFields: ["it", "engineering", "education", "rnd", "design", "marketing", "trade", "manufacturing", "service"],
  },
  {
    code: "F-6",
    name: { en: "F-6 Marriage Migrant", ko: "F-6 결혼이민" },
    permission: "full",
    allowed: {
      en: "Free to work in almost any field, like a local employee.",
      ko: "거의 모든 분야에서 내국인처럼 자유롭게 취업 가능.",
    },
    conditions: {
      en: "No employer sponsorship needed for most roles.",
      ko: "대부분의 직무에서 고용주 후원 불필요.",
    },
    employerSponsor: false,
    officialUrl: HIKOREA,
    relevantFields: ["it", "engineering", "education", "rnd", "design", "marketing", "trade", "manufacturing", "service"],
  },
  {
    code: "E-9",
    name: { en: "E-9 Non-professional (EPS)", ko: "E-9 비전문취업(고용허가제)" },
    permission: "none",
    allowed: {
      en: "Handled only through the government Employment Permit System (EPS). Private brokering is prohibited by law — WelKor links to official EPS information only.",
      ko: "정부 고용허가제(EPS)를 통해서만 가능. 민간 알선은 법으로 금지 — WelKor는 EPS 공식 정보만 안내합니다.",
    },
    conditions: {
      en: "See the official EPS portal.",
      ko: "공식 EPS 포털을 확인하세요.",
    },
    employerSponsor: true,
    officialUrl: EPS,
    relevantFields: [],
  },
];

export function getEligibility(code: string): WorkEligibility | undefined {
  return WORK_ELIGIBILITY.find((e) => e.code === code);
}

/* ---------------------------------------------------------------------------
 * 2) JOB_FIELDS — job categories the user can pick
 * ------------------------------------------------------------------------- */

export interface JobField {
  id: string;
  emoji: string;
  label: LocalizedText;
  /** Keyword fed into external search deep-links (per channel). */
  keywords: {
    /** Korean keyword for KR boards (JobKorea / Saramin). */
    ko: string;
    /** English keyword for global boards (LinkedIn / Wanted / JobKorea Global). */
    en: string;
  };
}

export const JOB_FIELDS: JobField[] = [
  { id: "it", emoji: "💻", label: { en: "IT / Software", ko: "IT / 소프트웨어" }, keywords: { ko: "개발자", en: "software developer" } },
  { id: "engineering", emoji: "🛠️", label: { en: "Engineering", ko: "엔지니어링" }, keywords: { ko: "엔지니어", en: "engineer" } },
  { id: "education", emoji: "📚", label: { en: "Education / Language", ko: "교육 / 언어" }, keywords: { ko: "강사", en: "teacher" } },
  { id: "rnd", emoji: "🔬", label: { en: "R&D / Science", ko: "R&D / 과학" }, keywords: { ko: "연구원", en: "research" } },
  { id: "design", emoji: "🎨", label: { en: "Design / Content", ko: "디자인 / 콘텐츠" }, keywords: { ko: "디자이너", en: "designer" } },
  { id: "marketing", emoji: "📈", label: { en: "Marketing / Business", ko: "마케팅 / 비즈니스" }, keywords: { ko: "마케팅", en: "marketing" } },
  { id: "trade", emoji: "🌐", label: { en: "Trade / Interpretation", ko: "무역 / 통역" }, keywords: { ko: "무역 통역", en: "trade interpreter" } },
  { id: "manufacturing", emoji: "🏭", label: { en: "Manufacturing", ko: "제조" }, keywords: { ko: "생산", en: "manufacturing" } },
  { id: "service", emoji: "🍽️", label: { en: "Service / F&B", ko: "서비스 / 요식" }, keywords: { ko: "서비스", en: "service staff" } },
];

export function getField(id: string): JobField | undefined {
  return JOB_FIELDS.find((f) => f.id === id);
}

/* ---------------------------------------------------------------------------
 * 3) JOB_CHANNELS — external sites, with a FILTERED-SEARCH deep-link builder
 *
 * Each channel returns a URL that lands on a filtered search result (by field +
 * language), not the bare homepage. Foreigner-friendly channels are ranked first.
 * URL patterns verified to return HTTP 200, 2026-06-26 (see work-order log).
 * ------------------------------------------------------------------------- */

export type ChannelKind = "foreigner" | "general" | "teaching" | "parttime";

export interface JobChannel {
  id: string;
  name: string;
  kind: ChannelKind;
  /** Foreigner-friendly (English UI / explicit foreigner listings). */
  foreignerFriendly: boolean;
  blurb: LocalizedText;
  /**
   * Build a deep-link to a filtered search result.
   * @param field  selected job field (may be undefined = "any")
   * @param locale "ko" | "en" — picks the keyword language
   */
  buildUrl: (field: JobField | undefined, locale: string) => string;
}

const enc = encodeURIComponent;

export const JOB_CHANNELS: JobChannel[] = [
  // --- Foreigner-friendly first ---
  {
    id: "kowork",
    name: "KOWORK",
    kind: "foreigner",
    foreignerFriendly: true,
    blurb: {
      en: "Built for foreigners — listings filterable by visa type, with English support.",
      ko: "외국인 전용 — 비자별 필터와 영어 지원을 제공하는 플랫폼.",
    },
    // KOWORK is an SPA; listings live on the localized home. Deep-link to the
    // locale home (the site itself is the foreigner filter). Verified 200.
    buildUrl: (_field, locale) => (locale === "ko" ? "https://kowork.kr/" : "https://kowork.kr/en"),
  },
  {
    id: "jobkoreaglobal",
    name: "JobKorea Global",
    kind: "foreigner",
    foreignerFriendly: true,
    blurb: {
      en: "English-language job board for foreigners, run by JobKorea.",
      ko: "잡코리아가 운영하는 외국인 대상 영어 채용 보드.",
    },
    // Filtered search path is unstable; the whole site is English-foreigner scoped. Verified 200.
    buildUrl: () => "https://www.jobkoreaglobal.com/",
  },
  {
    id: "linkedin",
    name: "LinkedIn Jobs",
    kind: "general",
    foreignerFriendly: true,
    blurb: {
      en: "Global network — search jobs based in Korea, many in English.",
      ko: "글로벌 네트워크 — 한국 근무지 채용을 검색, 영어 공고 다수.",
    },
    buildUrl: (field, locale) => {
      const kw = field ? (locale === "ko" ? field.keywords.ko : field.keywords.en) : "";
      const base = "https://www.linkedin.com/jobs/search/?location=South%20Korea";
      return kw ? `${base}&keywords=${enc(kw)}` : base;
    },
  },
  // --- General KR boards (filtered search) ---
  {
    id: "wanted",
    name: "Wanted",
    kind: "general",
    foreignerFriendly: false,
    blurb: {
      en: "Popular for tech, startup and IT roles; some English listings.",
      ko: "테크·스타트업·IT 직군에 인기, 일부 영어 공고.",
    },
    buildUrl: (field, locale) => {
      const kw = field ? (locale === "ko" ? field.keywords.ko : field.keywords.en) : "korea";
      return `https://www.wanted.co.kr/search?query=${enc(kw)}&tab=position`;
    },
  },
  {
    id: "jobkorea",
    name: "JobKorea",
    kind: "general",
    foreignerFriendly: false,
    blurb: {
      en: "One of Korea's largest job boards (Korean UI).",
      ko: "한국 최대 규모 채용 보드 중 하나(한국어 UI).",
    },
    buildUrl: (field) => {
      // KR board → always Korean keyword + "외국어" hint for foreigner-relevant roles.
      const kw = field ? `${field.keywords.ko} 외국어` : "외국어";
      return `https://www.jobkorea.co.kr/Search/?stext=${enc(kw)}`;
    },
  },
  {
    id: "saramin",
    name: "Saramin",
    kind: "general",
    foreignerFriendly: false,
    blurb: {
      en: "Major job board with a huge listing volume (Korean UI).",
      ko: "공고량이 많은 대형 채용 보드(한국어 UI).",
    },
    buildUrl: (field) => {
      const kw = field ? `${field.keywords.ko} 외국어가능` : "외국어가능";
      return `https://www.saramin.co.kr/zf_user/search?searchword=${enc(kw)}`;
    },
  },
  // --- Teaching (E-2) ---
  {
    id: "epik",
    name: "EPIK",
    kind: "teaching",
    foreignerFriendly: true,
    blurb: {
      en: "Government public-school English program (official).",
      ko: "정부 공립학교 영어 프로그램(공식).",
    },
    buildUrl: () => "https://www.epik.go.kr/",
  },
  {
    id: "teachaway",
    name: "Teach Away",
    kind: "teaching",
    foreignerFriendly: true,
    blurb: {
      en: "International teacher job board — filter for Korea.",
      ko: "국제 교사 채용 보드 — 한국으로 필터.",
    },
    buildUrl: () => "https://www.teachaway.com/teaching-jobs-abroad?country=south-korea",
  },
  {
    id: "eslcafe",
    name: "Dave's ESL Cafe",
    kind: "teaching",
    foreignerFriendly: true,
    blurb: {
      en: "Long-running ESL job board for Korea.",
      ko: "오래된 한국 ESL 채용 보드.",
    },
    buildUrl: () => "https://www.eslcafe.com/jobs/korea",
  },
  // --- Part-time (students) ---
  {
    id: "albamon",
    name: "Albamon",
    kind: "parttime",
    foreignerFriendly: false,
    blurb: {
      en: "Korea's main part-time (알바) board — browse part-time listings.",
      ko: "한국 대표 알바 보드 — 시간제 공고 모아보기.",
    },
    // Albamon search is SPA-based; deep-link to the part-time listings page. Verified 200.
    buildUrl: () => "https://www.albamon.com/jobs/part",
  },
];

/**
 * Rank channels for a given visa + field selection.
 * Foreigner-friendly first; teaching channels surface for education field /
 * teaching visas; part-time channels surface for student visas.
 */
export function rankChannels(
  eligibility: WorkEligibility | undefined,
  field: JobField | undefined,
): JobChannel[] {
  const isStudent = eligibility?.permission === "parttime";
  const isTeaching =
    eligibility?.code === "E-2" || eligibility?.code === "E-1" || field?.id === "education";

  const score = (c: JobChannel): number => {
    let s = 0;
    if (c.foreignerFriendly) s += 4;
    if (isTeaching && c.kind === "teaching") s += 6;
    if (!isTeaching && c.kind === "teaching") s -= 5; // de-prioritise teaching if irrelevant
    if (isStudent && c.kind === "parttime") s += 6;
    if (!isStudent && c.kind === "parttime") s -= 4;
    if (c.kind === "general") s += 1;
    return s;
  };

  return [...JOB_CHANNELS].sort((a, b) => score(b) - score(a));
}
