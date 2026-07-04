import type { Country } from "../types";

/**
 * Origin countries — the journey now starts BEFORE the visa, from "where are
 * you coming from?". Ordered roughly by foreign-resident population in Korea
 * (법무부 2024) plus common English-teacher origins, then "Other".
 */
export const COUNTRIES: Country[] = [
  { code: "CN", slug: "cn", flag: "🇨🇳", name: { en: "China", ko: "중국" } },
  { code: "VN", slug: "vn", flag: "🇻🇳", name: { en: "Vietnam", ko: "베트남" } },
  { code: "US", slug: "us", flag: "🇺🇸", name: { en: "United States", ko: "미국" } },
  { code: "TH", slug: "th", flag: "🇹🇭", name: { en: "Thailand", ko: "태국" } },
  { code: "UZ", slug: "uz", flag: "🇺🇿", name: { en: "Uzbekistan", ko: "우즈베키스탄" } },
  { code: "PH", slug: "ph", flag: "🇵🇭", name: { en: "Philippines", ko: "필리핀" } },
  { code: "NP", slug: "np", flag: "🇳🇵", name: { en: "Nepal", ko: "네팔" } },
  { code: "ID", slug: "id", flag: "🇮🇩", name: { en: "Indonesia", ko: "인도네시아" } },
  { code: "MN", slug: "mn", flag: "🇲🇳", name: { en: "Mongolia", ko: "몽골" } },
  { code: "IN", slug: "in", flag: "🇮🇳", name: { en: "India", ko: "인도" } },
  { code: "CA", slug: "ca", flag: "🇨🇦", name: { en: "Canada", ko: "캐나다" } },
  { code: "GB", slug: "gb", flag: "🇬🇧", name: { en: "United Kingdom", ko: "영국" } },
  { code: "RU", slug: "ru", flag: "🇷🇺", name: { en: "Russia", ko: "러시아" } },
  { code: "JP", slug: "jp", flag: "🇯🇵", name: { en: "Japan", ko: "일본" } },
  { code: "OTHER", slug: "other", flag: "🌏", name: { en: "Other country", ko: "기타 국가" } },
];

export function getCountry(slug: string): Country | undefined {
  return COUNTRIES.find((c) => c.slug === slug);
}
