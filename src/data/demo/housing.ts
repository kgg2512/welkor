import type { LocalizedText } from "../types";

/**
 * Housing context (6).
 *
 * WelKor is NOT a licensed real-estate agent (공인중개사) — we never broker or take
 * commission. We only (a) show approximate market ranges so newcomers can plan,
 * and (b) link out to the major Korean listing portals so users can browse on a
 * map themselves. A live embedded map needs a Naver/Kakao Maps API key (chairman
 * action); until then we deep-link to the portals' own maps.
 */

export interface HousingPortal {
  id: string;
  name: LocalizedText;
  url: string;
  mapBased?: boolean;
  english?: boolean;
  blurb: LocalizedText;
}

export interface RegionPrice {
  id: string;
  region: LocalizedText;
  /** One-room (원룸) monthly-rent reference, in 만원 (approximate, 2025). */
  depositRange: string; // e.g. "500–1,000"
  monthlyRange: string; // e.g. "45–70"
}

export interface ShortStay {
  id: string;
  name: string;
  url: string;
  blurb: LocalizedText;
}

/** Major Korean listing portals (definitely exist) + one English-friendly option. */
export const HOUSING_PORTALS: HousingPortal[] = [
  {
    id: "naver",
    name: { en: "Naver Real Estate", ko: "네이버 부동산" },
    url: "https://land.naver.com/",
    mapBased: true,
    blurb: { en: "Map-based search, the most-used portal in Korea.", ko: "지도 기반 검색, 국내 최다 이용 포털." },
  },
  {
    id: "zigbang",
    name: { en: "Zigbang", ko: "직방" },
    url: "https://www.zigbang.com/",
    mapBased: true,
    blurb: { en: "App-first listings for one-rooms & officetels.", ko: "원룸·오피스텔 중심 앱 매물." },
  },
  {
    id: "dabang",
    name: { en: "Dabang", ko: "다방" },
    url: "https://www.dabangapp.com/",
    mapBased: true,
    blurb: { en: "Strong for studios and monthly rentals.", ko: "원룸·월세에 강한 매물 앱." },
  },
  {
    id: "ziptoss",
    name: { en: "Ziptoss (English)", ko: "집토스 (영문 지원)" },
    url: "https://www.ziptoss.com/",
    english: true,
    blurb: { en: "Foreigner-focused rentals with English support.", ko: "외국인 특화·영어 지원 임대." },
  },
];

/** Approximate one-room (원룸) monthly-rent ranges, 만원. Rough 2025 references. */
export const REGION_PRICES: RegionPrice[] = [
  { id: "seoul-gangnam", region: { en: "Seoul — Gangnam/Seocho", ko: "서울 강남·서초" }, depositRange: "1,000", monthlyRange: "60–90" },
  { id: "seoul-other", region: { en: "Seoul — other districts", ko: "서울 기타 지역" }, depositRange: "500–1,000", monthlyRange: "45–70" },
  { id: "gyeonggi", region: { en: "Gyeonggi / Incheon", ko: "경기 / 인천" }, depositRange: "300–1,000", monthlyRange: "35–55" },
  { id: "metro", region: { en: "Busan · Daegu · Gwangju · Daejeon", ko: "부산·대구·광주·대전" }, depositRange: "300–500", monthlyRange: "30–45" },
  { id: "smaller", region: { en: "Smaller cities & towns", ko: "지방 중소도시" }, depositRange: "200–500", monthlyRange: "25–40" },
];

/** Short-stay platforms for visitors (not settling yet). */
export const SHORT_STAY: ShortStay[] = [
  { id: "airbnb", name: "Airbnb", url: "https://www.airbnb.com/s/South-Korea/homes", blurb: { en: "Homes & longer stays.", ko: "주택·장기 체류." } },
  { id: "booking", name: "Booking.com", url: "https://www.booking.com/country/kr.html", blurb: { en: "Hotels & guesthouses.", ko: "호텔·게스트하우스." } },
  { id: "agoda", name: "Agoda", url: "https://www.agoda.com/country/south-korea.html", blurb: { en: "Budget to premium hotels.", ko: "가성비~프리미엄 호텔." } },
];
