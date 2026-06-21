import type { LocalizedText } from "./types";

/**
 * Study-abroad deep dive (5-2).
 *
 * WelKor = information + connection only. For students we list REAL Korean
 * universities with their official English sites, and route "admissions" through
 * a live search so the link never points at a stale hard-coded path (the same
 * accuracy pattern used for tourism creator picks). The master verify source is
 * the government "Study in Korea" portal. We never act as an education agency or
 * file applications on anyone's behalf — visa document prep is self-guided with
 * the official HiKorea / mission as the source.
 */

export const STUDY_IN_KOREA = "https://www.studyinkorea.go.kr/en/main.do";
export const GKS = "https://www.studyinkorea.go.kr/en/sub/gks/allnew_invite.do"; // Global Korea Scholarship
export const TOPIK = "https://www.topik.go.kr/"; // official Korean proficiency test
export const HIKOREA = "https://www.hikorea.go.kr/";

export type FieldArea =
  | "engineering"
  | "business"
  | "science"
  | "humanities"
  | "arts"
  | "korean";

export interface StudyField {
  id: string;
  area: FieldArea;
  name: LocalizedText;
  blurb: LocalizedText;
}

export interface University {
  id: string;
  name: LocalizedText;
  city: LocalizedText;
  /** What the school is widely known for. */
  known: LocalizedText;
  /** Official English-language site (stable entry point). */
  site: string;
  /** Live admissions search — always reaches the current admissions page. */
  admissionsQuery: string;
}

export interface DocItem {
  id: string;
  label: LocalizedText;
  note: LocalizedText;
}

export const STUDY_FIELDS: StudyField[] = [
  {
    id: "engineering",
    area: "engineering",
    name: { en: "Engineering & IT", ko: "공학·IT" },
    blurb: {
      en: "Software, electronics, mechanical, AI and semiconductors — Korea's strongest research areas.",
      ko: "소프트웨어·전자·기계·AI·반도체 — 한국이 가장 강한 연구 분야.",
    },
  },
  {
    id: "business",
    area: "business",
    name: { en: "Business & Economics", ko: "경영·경제" },
    blurb: {
      en: "MBA, management, trade and finance, with many English-taught tracks.",
      ko: "경영·무역·재무, 영어강의 트랙도 다수.",
    },
  },
  {
    id: "science",
    area: "science",
    name: { en: "Natural & Life Sciences", ko: "자연·생명과학" },
    blurb: {
      en: "Physics, chemistry, biotech and life-science research at well-funded labs.",
      ko: "물리·화학·바이오·생명과학, 지원이 탄탄한 연구실.",
    },
  },
  {
    id: "humanities",
    area: "humanities",
    name: { en: "Humanities & Social Sciences", ko: "인문·사회" },
    blurb: {
      en: "Korean studies, international relations, media and law.",
      ko: "한국학·국제관계·미디어·법학.",
    },
  },
  {
    id: "arts",
    area: "arts",
    name: { en: "Arts, Design & K-culture", ko: "예술·디자인·K컬처" },
    blurb: {
      en: "Design, film, music and game art — riding the global Hallyu wave.",
      ko: "디자인·영화·음악·게임아트 — 한류 흐름 위에서.",
    },
  },
  {
    id: "korean",
    area: "korean",
    name: { en: "Korean language (어학연수)", ko: "한국어 어학연수" },
    blurb: {
      en: "University language institutes on a D-4 visa — a common first step.",
      ko: "대학 부설 어학당(D-4) — 흔한 첫 단계.",
    },
  },
];

export const UNIVERSITIES: University[] = [
  {
    id: "snu",
    name: { en: "Seoul National University", ko: "서울대학교" },
    city: { en: "Seoul", ko: "서울" },
    known: { en: "The national flagship; research across every field.", ko: "국가 대표 종합대학, 전 분야 연구." },
    site: "https://en.snu.ac.kr/",
    admissionsQuery: "Seoul National University international admissions",
  },
  {
    id: "yonsei",
    name: { en: "Yonsei University", ko: "연세대학교" },
    city: { en: "Seoul", ko: "서울" },
    known: { en: "Private 'SKY'; Underwood International College is fully English-taught.", ko: "사립 'SKY', 언더우드국제대학은 전면 영어강의." },
    site: "https://www.yonsei.ac.kr/en_sc/",
    admissionsQuery: "Yonsei University international admissions",
  },
  {
    id: "korea",
    name: { en: "Korea University", ko: "고려대학교" },
    city: { en: "Seoul", ko: "서울" },
    known: { en: "Private 'SKY'; strong in business, law and international studies.", ko: "사립 'SKY', 경영·법·국제학 강세." },
    site: "https://oia.korea.ac.kr/",
    admissionsQuery: "Korea University international undergraduate admissions",
  },
  {
    id: "kaist",
    name: { en: "KAIST", ko: "KAIST(한국과학기술원)" },
    city: { en: "Daejeon", ko: "대전" },
    known: { en: "Science & engineering; much of it taught in English.", ko: "과학·공학 특화, 상당수 영어강의." },
    site: "https://www.kaist.ac.kr/en/",
    admissionsQuery: "KAIST international students admission",
  },
  {
    id: "postech",
    name: { en: "POSTECH", ko: "포스텍(포항공대)" },
    city: { en: "Pohang", ko: "포항" },
    known: { en: "Small, elite science & technology research university.", ko: "소수정예 과학기술 연구중심 대학." },
    site: "https://www.postech.ac.kr/eng/",
    admissionsQuery: "POSTECH international admission",
  },
  {
    id: "skku",
    name: { en: "Sungkyunkwan University (SKKU)", ko: "성균관대학교" },
    city: { en: "Seoul · Suwon", ko: "서울·수원" },
    known: { en: "Samsung-affiliated; strong in business and engineering.", ko: "삼성 재단, 경영·공학 강세." },
    site: "https://www.skku.edu/eng/",
    admissionsQuery: "Sungkyunkwan University international admissions",
  },
  {
    id: "hanyang",
    name: { en: "Hanyang University", ko: "한양대학교" },
    city: { en: "Seoul · Ansan", ko: "서울·안산" },
    known: { en: "Engineering and a leading start-up / entrepreneurship culture.", ko: "공학·창업 문화가 강한 대학." },
    site: "https://www.hanyang.ac.kr/web/eng",
    admissionsQuery: "Hanyang University international admissions",
  },
  {
    id: "ewha",
    name: { en: "Ewha Womans University", ko: "이화여자대학교" },
    city: { en: "Seoul", ko: "서울" },
    known: { en: "A leading women's university with strong international scholarships.", ko: "대표 여자대학, 국제 장학 프로그램 강점." },
    site: "https://www.ewha.ac.kr/ewhaen/index.do",
    admissionsQuery: "Ewha Womans University international admissions",
  },
];

/**
 * General D-2 / D-4 visa document checklist. Kept deliberately general and
 * accurate — the exact list depends on nationality and the specific Korean
 * mission, so users must confirm with Study in Korea / the embassy.
 */
export const STUDENT_DOCS: DocItem[] = [
  {
    id: "passport",
    label: { en: "Passport (+ copy)", ko: "여권(+사본)" },
    note: { en: "Valid for the whole period of stay.", ko: "체류 기간 전체에 유효해야 합니다." },
  },
  {
    id: "application",
    label: { en: "Visa application form + photo", ko: "비자 신청서 + 사진" },
    note: { en: "Completed form with a recent passport-style photo.", ko: "작성한 신청서와 최근 여권용 사진." },
  },
  {
    id: "admission",
    label: { en: "Certificate of admission", ko: "표준입학허가서" },
    note: { en: "Issued by your Korean school (표준입학허가서).", ko: "한국 학교가 발급하는 표준입학허가서." },
  },
  {
    id: "transcript",
    label: { en: "Diploma & transcripts", ko: "졸업증명·성적증명" },
    note: { en: "Often must be apostilled or consular-legalized.", ko: "아포스티유 또는 영사확인이 필요할 수 있습니다." },
  },
  {
    id: "funds",
    label: { en: "Proof of financial means", ko: "재정 증빙" },
    note: { en: "Bank balance or scholarship letter for tuition + living costs.", ko: "등록금·생활비에 대한 잔고 증명 또는 장학 증서." },
  },
  {
    id: "tuition",
    label: { en: "Tuition payment receipt", ko: "등록금 납입 영수증" },
    note: { en: "If tuition is already paid to the school.", ko: "학교에 등록금을 이미 납부한 경우." },
  },
  {
    id: "fee",
    label: { en: "Visa fee", ko: "비자 수수료" },
    note: { en: "Amount varies by country and mission.", ko: "국가·공관별로 금액이 다릅니다." },
  },
];
