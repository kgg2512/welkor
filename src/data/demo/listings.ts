import type { Listing } from "../types";

/**
 * Mock real-estate listings. In production these come from Supabase and from
 * licensed agents (공인중개사) who list on the marketplace. WelKor only displays
 * information and connects users to the licensed agent — it never brokers.
 */
export const LISTINGS: Listing[] = [
  {
    id: "l1",
    title: { en: "Sunny one-room near Gangnam St.", ko: "강남역 인근 채광 좋은 원룸" },
    area: { en: "Gangnam-gu, Seoul", ko: "서울 강남구" },
    dealType: "wolse",
    depositManwon: 1000,
    monthlyManwon: 75,
    foreignerFriendly: true,
    englishContract: true,
    notes: { en: "Furnished, short-term OK, English lease available.", ko: "풀옵션, 단기 가능, 영문 계약서 제공." },
  },
  {
    id: "l2",
    title: { en: "Officetel near Hongik Univ.", ko: "홍대입구 오피스텔" },
    area: { en: "Mapo-gu, Seoul", ko: "서울 마포구" },
    dealType: "wolse",
    depositManwon: 2000,
    monthlyManwon: 90,
    foreignerFriendly: true,
    englishContract: true,
    notes: { en: "Great for teachers & students, 5 min to subway.", ko: "교사·학생에게 적합, 지하철 5분." },
  },
  {
    id: "l3",
    title: { en: "Jeonse apartment, family-size", ko: "가족형 전세 아파트" },
    area: { en: "Yeongtong-gu, Suwon", ko: "수원 영통구" },
    dealType: "jeonse",
    depositManwon: 22000,
    monthlyManwon: 0,
    foreignerFriendly: true,
    englishContract: false,
    notes: { en: "Deposit-protection (확정일자) guidance included.", ko: "확정일자 등 보증금 보호 안내 포함." },
  },
  {
    id: "l4",
    title: { en: "No-deposit furnished studio", ko: "무보증 풀옵션 스튜디오" },
    area: { en: "Dong-gu, Daejeon", ko: "대전 동구" },
    dealType: "monthly_furnished",
    depositManwon: 0,
    monthlyManwon: 65,
    foreignerFriendly: true,
    englishContract: true,
    notes: { en: "Move-in ready, ideal first home on arrival.", ko: "즉시 입주 가능, 입국 직후 첫 집으로 적합." },
  },
];
