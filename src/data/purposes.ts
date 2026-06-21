import type { LocalizedText } from "./types";

/**
 * Purpose-first intake.
 *
 * Newcomers usually do NOT know Korean visa codes (E-7, D-2…). So the journey
 * starts from a plain-language question — "Why are you coming to Korea?" — and
 * we map each real-life situation to the correct visa automatically.
 *
 * - `visaSlug` present  → we have a full step-by-step roadmap (internal link).
 * - `official` present  → information-only situation; we link the official
 *   source instead of fabricating a roadmap (WelKor = information + connection,
 *   never the licensed agent; and never E-9 brokering).
 *
 * Visa mappings verified against HiKorea / Korea Immigration Service (2025):
 * E-1 professor, E-2 language instructor, E-3 research, E-7 professional,
 * E-9 non-professional (EPS), D-2 degree student, D-4 language, D-10 job-seeker,
 * C-3 short-term visit, F-6/F-series family, H-1 working holiday.
 */

const HIKOREA = "https://www.hikorea.go.kr/";
const KETA = "https://www.k-eta.go.kr";

export interface PurposeSituation {
  id: string;
  emoji: string;
  /** Plain-language situation — no visa jargon required to understand it. */
  title: LocalizedText;
  /** One line: who this fits. */
  detail: LocalizedText;
  /** Visa code shown as a small badge so users gradually learn it. */
  visaCode: string;
  /** Internal roadmap slug, when a full settlement journey exists. */
  visaSlug?: string;
  /** Internal guide path (e.g. "/explore") for non-visa journeys like tourism. */
  guide?: string;
  /** Optional CTA label override for a `guide` link (defaults to "Explore Korea"). */
  guideLabel?: LocalizedText;
  /** Official source URL, for information-only situations (no roadmap). */
  official?: string;
}

export interface PurposeGroup {
  id: string;
  emoji: string;
  title: LocalizedText;
  /** Sub-question that narrows the group to a specific situation. */
  question: LocalizedText;
  situations: PurposeSituation[];
}

export const PURPOSE_GROUPS: PurposeGroup[] = [
  {
    id: "work",
    emoji: "💼",
    title: { en: "I'm coming to work", ko: "일하러 와요" },
    question: { en: "What kind of work will you do?", ko: "어떤 일을 하러 오시나요?" },
    situations: [
      {
        id: "professional",
        emoji: "🏢",
        title: { en: "A professional or office job", ko: "전문직·사무직" },
        detail: {
          en: "A Korean company hires you for a skilled or office role — IT, engineering, business, design and more.",
          ko: "한국 회사가 전문·사무 직무(IT·엔지니어링·경영·디자인 등)로 채용합니다.",
        },
        visaCode: "E-7",
        visaSlug: "e7",
      },
      {
        id: "teaching",
        emoji: "🗣️",
        title: { en: "Teaching English or another language", ko: "영어 등 외국어를 가르쳐요" },
        detail: {
          en: "Teaching a language at a school, hagwon or university as a native or qualified instructor.",
          ko: "학교·학원·대학에서 원어민 또는 자격을 갖춘 강사로 외국어를 가르칩니다.",
        },
        visaCode: "E-2",
        visaSlug: "e2",
      },
      {
        id: "professor",
        emoji: "🎓",
        title: { en: "Teaching or lecturing at a university", ko: "대학에서 교수·강의를 해요" },
        detail: {
          en: "Appointed as a professor, assistant professor or lecturer by a Korean university.",
          ko: "한국 대학에 교수·조교수·강사로 임용됩니다.",
        },
        visaCode: "E-1",
        visaSlug: "e1",
      },
      {
        id: "research",
        emoji: "🔬",
        title: { en: "Research at an institute or R&D center", ko: "연구기관·연구소에서 연구해요" },
        detail: {
          en: "Invited to do research at an accredited institute or a company's R&D center.",
          ko: "인가된 연구기관 또는 기업 부설연구소의 초청으로 연구를 수행합니다.",
        },
        visaCode: "E-3",
        visaSlug: "e3",
      },
      {
        id: "jobseeking",
        emoji: "🔎",
        title: { en: "Looking for a job (no offer yet)", ko: "아직 직장 없이 구직 중이에요" },
        detail: {
          en: "You want to job-hunt inside Korea before you have a signed contract.",
          ko: "취업이 확정되기 전에 한국에 들어와 직접 일자리를 찾고 싶을 때예요.",
        },
        visaCode: "D-10",
        guide: "/jobs",
        guideLabel: { en: "See job boards", ko: "채용 정보 보기" },
      },
      {
        id: "nonprofessional",
        emoji: "🏭",
        title: { en: "Manufacturing, farming or other non-professional work", ko: "제조·농업 등 비전문 취업이에요" },
        detail: {
          en: "These jobs go through the government's Employment Permit System (EPS). WelKor shows information only and never places workers.",
          ko: "이 직종은 정부 고용허가제(EPS)를 통합니다. WelKor는 정보만 제공하며 인력을 알선하지 않습니다.",
        },
        visaCode: "E-9",
        official: HIKOREA,
      },
    ],
  },
  {
    id: "study",
    emoji: "🎓",
    title: { en: "I'm coming to study", ko: "공부하러 와요" },
    question: { en: "What will you study?", ko: "무엇을 공부하러 오시나요?" },
    situations: [
      {
        id: "degree",
        emoji: "🎓",
        title: { en: "A university degree", ko: "대학 학위과정이에요" },
        detail: {
          en: "A bachelor's, master's or PhD program at a Korean university.",
          ko: "한국 대학의 학사·석사·박사 과정입니다.",
        },
        visaCode: "D-2",
        visaSlug: "d2",
      },
      {
        id: "language",
        emoji: "📚",
        title: { en: "A Korean language course", ko: "한국어 어학연수예요" },
        detail: {
          en: "A language program at a university-affiliated institute.",
          ko: "대학 부설 어학당 등의 한국어 과정입니다.",
        },
        visaCode: "D-4",
        visaSlug: "d2",
      },
    ],
  },
  {
    id: "visit",
    emoji: "🧳",
    title: { en: "I'm just visiting", ko: "잠깐 방문해요" },
    question: { en: "What kind of visit?", ko: "어떤 방문인가요?" },
    situations: [
      {
        id: "tourism",
        emoji: "🧳",
        title: { en: "Tourism or a short visit", ko: "관광·단기 방문이에요" },
        detail: {
          en: "Up to 90 days. Many nationalities enter visa-free with K-ETA; others use a C-3 short-term visa.",
          ko: "최대 90일. 많은 국적은 K-ETA로 무비자 입국하며, 그 외에는 C-3 단기방문 비자를 사용합니다.",
        },
        visaCode: "K-ETA / C-3",
        guide: "/explore",
      },
      {
        id: "business",
        emoji: "🤝",
        title: { en: "A short business trip", ko: "단기 출장·비즈니스예요" },
        detail: {
          en: "Short meetings, consulting or market research — usually a C-3 short-term visit.",
          ko: "단기 미팅·상담·시장조사 — 보통 C-3 단기방문입니다.",
        },
        visaCode: "C-3",
        official: HIKOREA,
      },
    ],
  },
  {
    id: "family",
    emoji: "💞",
    title: { en: "I'm joining family", ko: "가족과 함께 와요" },
    question: { en: "Who are you joining?", ko: "누구와 함께인가요?" },
    situations: [
      {
        id: "spouse",
        emoji: "💞",
        title: { en: "A Korean spouse or family", ko: "한국인 배우자·가족이에요" },
        detail: {
          en: "Marriage and family reunification (the F-visa family). Requirements depend on your relationship.",
          ko: "결혼이민·가족결합(F 계열 비자)입니다. 관계에 따라 요건이 다릅니다.",
        },
        visaCode: "F-6 / F-series",
        official: HIKOREA,
      },
    ],
  },
];
