import type { LocalizedText } from "./types";

/**
 * Job-search information board (5-3).
 *
 * ★LEGAL (FOUNDATION §4): A FREE, information-only job board is legal. WelKor is
 * NOT a recruiter or job-placement agency — it does not match candidates, take
 * fees, collect applications, or guarantee employment. Every entry is a link to
 * an established, third-party or government platform; users apply there directly.
 *
 * E-9 (non-professional) hiring runs ONLY through the government Employment
 * Permit System (EPS); private brokering is a criminal offense. WelKor shows EPS
 * as information only and never places workers — handled as a separate carve-out,
 * not as a clickable job board.
 */

export const EPS = "https://www.eps.go.kr/"; // Employment Permit System (government-only, E-9)
export const HIKOREA = "https://www.hikorea.go.kr/"; // check which work your visa allows

export interface JobChannel {
  id: string;
  name: string;
  url: string;
  blurb: LocalizedText;
  /** Government / public source (shown with an official badge). */
  official?: boolean;
}

export interface JobCategory {
  id: string;
  emoji: string;
  title: LocalizedText;
  intro: LocalizedText;
  channels: JobChannel[];
}

export const JOB_CATEGORIES: JobCategory[] = [
  {
    id: "official",
    emoji: "🏛️",
    title: { en: "Official & public portals", ko: "공식·공공 포털" },
    intro: {
      en: "Government-run services — free and the safest place to start.",
      ko: "정부가 운영하는 무료 서비스 — 가장 안전한 출발점.",
    },
    channels: [
      { id: "work24", name: "Work24", url: "https://www.work24.go.kr/", official: true, blurb: { en: "Korea's official national employment portal.", ko: "고용노동부 공식 통합 고용서비스." } },
      { id: "contactkorea", name: "Contact Korea (KOTRA)", url: "https://www.contactkorea.go.kr/", official: true, blurb: { en: "KOTRA service linking foreign professionals to Korean firms.", ko: "KOTRA 외국 전문인력–한국기업 연결 서비스." } },
    ],
  },
  {
    id: "boards",
    emoji: "🔎",
    title: { en: "General job boards", ko: "일반 채용 보드" },
    intro: {
      en: "Korea's main private job platforms; some have English or global sections.",
      ko: "한국 주요 민간 채용 플랫폼 — 일부는 영어·글로벌 섹션 제공.",
    },
    channels: [
      { id: "jobkorea", name: "JobKorea", url: "https://www.jobkorea.co.kr/", blurb: { en: "One of Korea's largest job boards.", ko: "한국 최대 규모 채용 보드 중 하나." } },
      { id: "saramin", name: "Saramin", url: "https://www.saramin.co.kr/", blurb: { en: "Major job board with a huge listing volume.", ko: "공고량이 많은 대형 채용 보드." } },
      { id: "wanted", name: "Wanted", url: "https://www.wanted.co.kr/", blurb: { en: "Popular for tech, startup and IT roles.", ko: "테크·스타트업·IT 직군에 인기." } },
      { id: "linkedin", name: "LinkedIn (Korea)", url: "https://www.linkedin.com/jobs/search/?location=South%20Korea", blurb: { en: "Global network — filter for jobs based in Korea.", ko: "글로벌 네트워크 — 한국 근무지로 필터링." } },
    ],
  },
  {
    id: "teaching",
    emoji: "🗣️",
    title: { en: "English & language teaching (E-2)", ko: "영어·언어 교사 (E-2)" },
    intro: {
      en: "Public programs and long-running teaching boards.",
      ko: "공공 프로그램과 오래된 교사 채용 보드.",
    },
    channels: [
      { id: "epik", name: "EPIK", url: "https://www.epik.go.kr/", official: true, blurb: { en: "Government public-school English program.", ko: "정부 공립학교 영어 프로그램." } },
      { id: "teachaway", name: "Teach Away", url: "https://www.teachaway.com/", blurb: { en: "International teacher recruitment platform.", ko: "국제 교사 채용 플랫폼." } },
      { id: "eslcafe", name: "Dave's ESL Cafe", url: "https://www.eslcafe.com/", blurb: { en: "Long-running ESL job board.", ko: "오래된 ESL 채용 보드." } },
    ],
  },
  {
    id: "parttime",
    emoji: "⏱️",
    title: { en: "Part-time work (students)", ko: "시간제 근무 (학생)" },
    intro: {
      en: "Students may work part-time ONLY after immigration permission, with weekly-hour caps.",
      ko: "학생은 출입국 허가를 받은 후에만, 주당 시간 상한 내에서 시간제 근무가 가능합니다.",
    },
    channels: [
      { id: "albamon", name: "Albamon", url: "https://www.albamon.com/", blurb: { en: "Korea's main part-time (알바) board.", ko: "한국 대표 알바 보드." } },
      { id: "alba", name: "Alba", url: "https://www.alba.co.kr/", blurb: { en: "Another large part-time job board.", ko: "또 다른 대형 알바 보드." } },
    ],
  },
];
