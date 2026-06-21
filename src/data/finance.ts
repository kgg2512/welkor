import type { LocalizedText } from "./types";

/**
 * Finance information (7).
 *
 * WelKor is NOT a bank, lender, card issuer or financial adviser, and earns
 * nothing from these links. We curate publicly available information about
 * services foreigners can typically use, with each provider's official site as
 * the source. Eligibility wording is kept general and accurate — users must
 * confirm with each provider.
 */

export const FSS_ENG = "https://www.fss.or.kr/fss/eng/main/main.do"; // Financial Supervisory Service (official)

export interface FinanceItem {
  id: string;
  name: string;
  url: string;
  blurb: LocalizedText;
}

export interface FinanceCategory {
  id: string;
  emoji: string;
  title: LocalizedText;
  intro: LocalizedText;
  /** Plain, accurate eligibility note. */
  eligibility: LocalizedText;
  items: FinanceItem[];
}

export const FINANCE_CATEGORIES: FinanceCategory[] = [
  {
    id: "accounts",
    emoji: "🏦",
    title: { en: "Bank accounts", ko: "은행 계좌" },
    intro: {
      en: "A Korean account is the base for salary, rent and almost everything else.",
      ko: "급여·월세 등 거의 모든 것의 기반이 되는 계좌입니다.",
    },
    eligibility: {
      en: "With an Alien Registration Card (ARC) you can open a full account at any major bank. Before your ARC, some banks allow a limited account with your passport. Bring your ARC/passport and a Korean phone number.",
      ko: "외국인등록증(ARC)이 있으면 주요 은행에서 정식 계좌 개설이 가능합니다. ARC 발급 전에는 일부 은행이 여권으로 제한 계좌를 허용합니다. ARC/여권과 한국 휴대폰 번호를 지참하세요.",
    },
    items: [
      { id: "kb", name: "KB Kookmin Bank", url: "https://www.kbstar.com", blurb: { en: "Large branch network, English app.", ko: "넓은 지점망, 영문 앱." } },
      { id: "shinhan", name: "Shinhan Bank", url: "https://www.shinhan.com", blurb: { en: "Foreigner-friendly, English support.", ko: "외국인 친화, 영어 지원." } },
      { id: "hana", name: "Hana Bank (KEB)", url: "https://www.kebhana.com", blurb: { en: "Strong for foreign exchange.", ko: "외환에 강점." } },
      { id: "woori", name: "Woori Bank", url: "https://www.wooribank.com", blurb: { en: "Global desk for foreigners.", ko: "외국인 글로벌 데스크." } },
      { id: "toss", name: "Toss Bank", url: "https://www.tossbank.com", blurb: { en: "App-only; foreigner support varies.", ko: "앱 전용; 외국인 지원 상이." } },
    ],
  },
  {
    id: "cards",
    emoji: "💳",
    title: { en: "Debit & credit cards", ko: "체크·신용카드" },
    intro: {
      en: "A check (debit) card is easy; a credit card is harder for newcomers.",
      ko: "체크(직불)카드는 쉽고, 신용카드는 입국 초기엔 까다롭습니다.",
    },
    eligibility: {
      en: "A check card comes with your bank account and spends what you have. Credit cards usually require proof of income and some time in Korea; some banks offer deposit-secured cards as a first step.",
      ko: "체크카드는 계좌와 함께 발급되며 잔액 내에서 사용합니다. 신용카드는 보통 소득 증빙과 일정 체류 기간이 필요하며, 일부 은행은 보증금 기반 카드를 첫 단계로 제공합니다.",
    },
    items: [
      { id: "card-bank", name: "Your bank's check card", url: "https://www.shinhan.com", blurb: { en: "Issued with your account, no credit check.", ko: "계좌와 함께 발급, 신용심사 없음." } },
      { id: "card-toss", name: "Toss / KakaoBank card", url: "https://www.kakaobank.com", blurb: { en: "Simple app-based check cards.", ko: "간편한 앱 기반 체크카드." } },
    ],
  },
  {
    id: "loans",
    emoji: "📄",
    title: { en: "Loans", ko: "대출" },
    intro: {
      en: "Possible for some foreigners, but with stricter terms — compare carefully.",
      ko: "일부 외국인에게 가능하지만 조건이 더 엄격합니다 — 신중히 비교하세요.",
    },
    eligibility: {
      en: "Banks may lend to foreigners with a stable income and an ARC, but limits and rates are stricter. Only use licensed institutions — never unlicensed private lenders. Read the contract and total cost first.",
      ko: "은행은 안정적 소득과 ARC가 있는 외국인에게 대출할 수 있으나 한도·금리가 더 엄격합니다. 반드시 허가된 금융기관만 이용하고 무허가 사금융은 절대 피하세요. 계약과 총비용을 먼저 확인하세요.",
    },
    items: [
      { id: "loan-bank", name: "Major banks", url: "https://www.kbstar.com", blurb: { en: "Ask your account bank's foreigner desk.", ko: "거래 은행 외국인 데스크에 문의." } },
      { id: "loan-fss", name: "FSS (official guide)", url: FSS_ENG, blurb: { en: "Check rules & avoid illegal lending.", ko: "규정 확인·불법 사금융 예방." } },
    ],
  },
  {
    id: "remittance",
    emoji: "💸",
    title: { en: "Sending money home", ko: "해외 송금" },
    intro: {
      en: "Licensed remittance apps are usually cheaper and faster than bank wires.",
      ko: "허가된 송금 앱이 은행 전신환보다 대체로 저렴하고 빠릅니다.",
    },
    eligibility: {
      en: "Registered foreigners can use licensed money-transfer services. Compare the fee and exchange rate — they differ a lot.",
      ko: "등록 외국인은 허가된 송금 서비스를 이용할 수 있습니다. 수수료와 환율을 꼭 비교하세요 — 차이가 큽니다.",
    },
    items: [
      { id: "wise", name: "Wise", url: "https://wise.com", blurb: { en: "Transparent fees, real exchange rate.", ko: "투명한 수수료·실시간 환율." } },
      { id: "sentbe", name: "Sentbe", url: "https://www.sentbe.com", blurb: { en: "Korea-based, many corridors.", ko: "국내 기반, 다양한 국가." } },
      { id: "gme", name: "GME Remit", url: "https://www.gmeremit.com", blurb: { en: "Popular with workers in Korea.", ko: "국내 근로자에게 인기." } },
      { id: "hanpass", name: "Hanpass", url: "https://www.hanpass.com", blurb: { en: "App remittance for foreigners.", ko: "외국인 앱 송금." } },
    ],
  },
];
