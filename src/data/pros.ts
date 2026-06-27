import type { LocalizedText } from "@/data/types";

/** Licensed professional kinds on the marketplace. */
export const PRO_KINDS = ["realtor", "tax_accountant", "admin_agent"] as const;
export type ProKind = (typeof PRO_KINDS)[number];

export const PRO_KIND_LABEL: Record<ProKind, LocalizedText> = {
  realtor: { en: "Licensed real-estate agent (공인중개사)", ko: "공인중개사" },
  tax_accountant: { en: "Licensed tax accountant (세무사)", ko: "세무사" },
  admin_agent: { en: "Administrative agent (행정사)", ko: "행정사" },
};

/** A verified professional shown in the public directory. */
export interface Professional {
  id: string;
  kind: ProKind;
  name: string;
  org: string | null;
  region: string | null;
  languages: string[];
  license_verified: boolean;
  created_at: string;
}

/** Which connect topic a "request connection" CTA should pre-select per kind. */
export const KIND_TO_TOPIC: Record<ProKind, string> = {
  realtor: "housing",
  tax_accountant: "tax",
  admin_agent: "admin",
};

/** Languages a pro can serve, for the application form. */
export const PRO_LANGUAGES: { code: string; label: LocalizedText }[] = [
  { code: "en", label: { en: "English", ko: "영어" } },
  { code: "ko", label: { en: "Korean", ko: "한국어" } },
  { code: "zh", label: { en: "Chinese", ko: "중국어" } },
  { code: "vi", label: { en: "Vietnamese", ko: "베트남어" } },
  { code: "ja", label: { en: "Japanese", ko: "일본어" } },
];
