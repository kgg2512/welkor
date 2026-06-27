import type { LocalizedText } from "@/data/types";

/**
 * Legal content for the Privacy Policy (개인정보처리방침) and Terms of Service
 * (이용약관). WelKor is an information + connection platform — NOT a licensed
 * real-estate, tax, or administrative agent (CLO legal model). These are
 * first-party MVP drafts; a law firm review is required before commercial
 * launch (FOUNDATION §11).
 *
 * Data hosting region is Seoul (Supabase ap-northeast-2), so personal data is
 * stored inside Korea — no cross-border transfer for the MVP.
 */

export const LEGAL_UPDATED = "2026-06-28";
export const LEGAL_CONTACT = "kgg2512@gmail.com";
export const LEGAL_ENTITY = "G2 Company Ltd";

export interface LegalSection {
  heading: LocalizedText;
  /** Each entry is a paragraph or bullet line. */
  body: LocalizedText[];
}

export const PRIVACY: LegalSection[] = [
  {
    heading: {
      en: "1. What we collect",
      ko: "1. 수집하는 개인정보 항목",
    },
    body: [
      {
        en: "When you submit a connection or inquiry form, we collect: your name, email address, and (optionally) your nationality, visa category, and message.",
        ko: "연결·문의 양식을 제출하실 때 수집하는 항목: 이름, 이메일 주소, (선택) 국적·비자 종류·문의 내용.",
      },
      {
        en: "We do NOT collect government identifiers such as your Alien Registration Number (외국인등록번호) or passport number. Please never enter them in any form.",
        ko: "외국인등록번호·여권번호 등 고유식별정보는 수집하지 않습니다. 어떤 양식에도 입력하지 마십시오.",
      },
      {
        en: "Basic, anonymous usage analytics may be collected to improve the service, via Vercel Analytics, which collects no personal identifiers.",
        ko: "서비스 개선을 위해 익명의 기본 이용 통계가 수집될 수 있습니다(Vercel Analytics 사용, 개인 식별 정보 미수집).",
      },
    ],
  },
  {
    heading: {
      en: "2. Why we collect it",
      ko: "2. 개인정보의 수집·이용 목적",
    },
    body: [
      {
        en: "Solely to respond to your inquiry and, with your consent, to connect you with a verified licensed professional (real-estate agent, tax accountant, or administrative agent).",
        ko: "문의에 답변하고, 귀하의 동의 하에 검증된 면허 전문가(공인중개사·세무사·행정사)와 연결해 드리기 위한 목적으로만 이용합니다.",
      },
      {
        en: "We do not sell your personal data or use it for advertising profiling.",
        ko: "개인정보를 판매하거나 광고 프로파일링에 이용하지 않습니다.",
      },
    ],
  },
  {
    heading: {
      en: "3. How long we keep it",
      ko: "3. 개인정보의 보유·이용 기간",
    },
    body: [
      {
        en: "We retain inquiry data until the purpose is fulfilled and for up to 1 year thereafter, then delete it — unless a longer period is required by law or you ask us to delete it sooner.",
        ko: "문의 목적 달성 시점부터 최대 1년간 보유 후 파기합니다. 단, 관계 법령에서 더 긴 보존을 요구하거나 귀하가 조기 삭제를 요청하는 경우는 예외입니다.",
      },
    ],
  },
  {
    heading: {
      en: "4. Third parties & processing",
      ko: "4. 제3자 제공 및 처리위탁",
    },
    body: [
      {
        en: "We share your information with a professional only after you consent to that specific connection. WelKor is not a party to any contract you make with a professional.",
        ko: "특정 전문가와의 연결에 동의하신 경우에 한해 해당 전문가에게 정보를 제공합니다. WelKor는 귀하와 전문가 간 계약의 당사자가 아닙니다.",
      },
      {
        en: "Hosting and database are provided by Supabase, with servers located in Seoul, Republic of Korea. Your data is not transferred overseas for the MVP.",
        ko: "호스팅·데이터베이스는 Supabase(서울 리전)에서 처리되며, 데이터는 대한민국 내에 보관됩니다. MVP 단계에서 개인정보의 국외 이전은 없습니다.",
      },
    ],
  },
  {
    heading: {
      en: "5. Your rights",
      ko: "5. 정보주체의 권리",
    },
    body: [
      {
        en: `You may request access, correction, deletion, or withdrawal of consent at any time by emailing ${LEGAL_CONTACT}. We will act without undue delay.`,
        ko: `${LEGAL_CONTACT} 로 언제든지 개인정보 열람·정정·삭제·처리정지 및 동의 철회를 요청하실 수 있으며, 지체 없이 조치합니다.`,
      },
    ],
  },
  {
    heading: {
      en: "6. Security",
      ko: "6. 안전성 확보 조치",
    },
    body: [
      {
        en: "Access to submitted data is restricted to authorized operators. Data in transit is encrypted (HTTPS), and database access is governed by row-level security so that one visitor can never read another's submission.",
        ko: "제출된 데이터 접근은 권한 있는 운영자로 제한됩니다. 전송 구간은 HTTPS로 암호화되며, 행 수준 보안(RLS)으로 다른 이용자의 제출 내용을 열람할 수 없도록 통제합니다.",
      },
    ],
  },
  {
    heading: {
      en: "7. Contact (Privacy Officer)",
      ko: "7. 개인정보 보호책임자",
    },
    body: [
      {
        en: `Privacy Officer: Kang Kyung-gu (Representative), ${LEGAL_ENTITY} — ${LEGAL_CONTACT}. For unresolved concerns you may also contact Korea's Personal Information Protection Commission (privacy.go.kr / 118).`,
        ko: `개인정보 보호책임자: ${LEGAL_ENTITY} 대표 강경구 (${LEGAL_CONTACT}). 미해결 사안은 개인정보보호위원회(privacy.go.kr / 국번없이 118)에 문의하실 수 있습니다.`,
      },
    ],
  },
];

export const TERMS: LegalSection[] = [
  {
    heading: {
      en: "1. What WelKor is",
      ko: "1. 서비스의 성격",
    },
    body: [
      {
        en: "WelKor is an information and connection platform for foreigners settling in Korea. We provide multilingual guides and connect you to verified licensed professionals.",
        ko: "WelKor는 한국에 정착하는 외국인을 위한 정보·연결 플랫폼입니다. 다국어 가이드를 제공하고 검증된 면허 전문가와 연결해 드립니다.",
      },
      {
        en: "WelKor is NOT a licensed real-estate agent (공인중개사), tax accountant (세무사), administrative agent (행정사), employment agency, or financial institution, and never acts as one.",
        ko: "WelKor는 공인중개사·세무사·행정사·직업소개소·금융기관이 아니며, 그 역할을 직접 수행하지 않습니다.",
      },
    ],
  },
  {
    heading: {
      en: "2. We connect, we do not broker",
      ko: "2. 연결자이며 중개·알선자가 아님",
    },
    body: [
      {
        en: "Any service (brokerage, tax filing, document filing) is performed directly by the licensed professional under a contract between you and them. WelKor is not a party to that contract and receives no brokerage commission or per-case referral fee.",
        ko: "모든 서비스(중개·세무신고·서류제출)는 면허 전문가가 귀하와의 직접 계약에 따라 수행합니다. WelKor는 해당 계약의 당사자가 아니며 중개보수나 건당 소개 수수료를 받지 않습니다.",
      },
      {
        en: "WelKor provides job information only. We do not place, broker, match, or represent candidates, charge job-seekers, or handle E-9 (non-professional) employment, which is handled solely by the government EPS. We do not guarantee any job or outcome.",
        ko: "WelKor는 채용 '정보'만 제공합니다. 구직자 알선·중개·매칭·대리를 하지 않고, 구직자에게 비용을 받지 않으며, 정부 고용허가제(EPS)가 전담하는 E-9(비전문취업)는 취급하지 않습니다. 취업이나 결과를 보장하지 않습니다.",
      },
    ],
  },
  {
    heading: {
      en: "3. Information is not professional advice",
      ko: "3. 정보의 한계 (전문 자문 아님)",
    },
    body: [
      {
        en: "Guides, checklists, and price references are general information, not legal, tax, immigration, or financial advice. Rules change; always verify with official sources and a licensed professional before acting or paying.",
        ko: "가이드·체크리스트·시세 참고치는 일반 정보이며 법률·세무·출입국·금융 자문이 아닙니다. 규정은 변경될 수 있으니, 결정·지불 전에 반드시 공식 출처와 면허 전문가에게 확인하십시오.",
      },
    ],
  },
  {
    heading: {
      en: "4. Third-party links",
      ko: "4. 외부 링크",
    },
    body: [
      {
        en: "We link to third-party and official sites (listing portals, job boards, government services). WelKor is not responsible for their content, availability, or any transaction you make there.",
        ko: "매물 포털·채용 사이트·정부 서비스 등 외부 및 공식 사이트로 연결됩니다. 해당 사이트의 콘텐츠·가용성 및 그곳에서의 거래에 대해 WelKor는 책임지지 않습니다.",
      },
    ],
  },
  {
    heading: {
      en: "5. Liability",
      ko: "5. 책임의 한계",
    },
    body: [
      {
        en: "The service is provided “as is.” To the extent permitted by law, WelKor is not liable for losses arising from your reliance on the information or from services provided by third-party professionals.",
        ko: "서비스는 '있는 그대로' 제공됩니다. 관련 법이 허용하는 범위에서, 정보에 대한 신뢰 또는 제3자 전문가가 제공한 서비스로 인한 손해에 대해 WelKor는 책임지지 않습니다.",
      },
    ],
  },
  {
    heading: {
      en: "6. Governing law & contact",
      ko: "6. 준거법 및 문의",
    },
    body: [
      {
        en: `These terms are governed by the laws of the Republic of Korea. Questions: ${LEGAL_CONTACT} (${LEGAL_ENTITY}).`,
        ko: `본 약관은 대한민국 법을 준거법으로 합니다. 문의: ${LEGAL_CONTACT} (${LEGAL_ENTITY}).`,
      },
    ],
  },
];
