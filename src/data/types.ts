import type { Locale } from "@/i18n/routing";

export interface LocalizedText {
  en: string;
  ko: string;
}

export function t(text: LocalizedText, locale: string): string {
  return locale === "ko" ? text.ko : text.en;
}

export type StepCategory =
  | "prearrival"
  | "visa"
  | "residence"
  | "banking"
  | "job"
  | "tax"
  | "education"
  | "life";

export interface Country {
  code: string; // ISO-ish
  slug: string; // url slug
  name: LocalizedText;
  flag: string;
}

export interface StepLink {
  href: string; // internal path (without locale prefix) or external URL
  label: LocalizedText;
  external?: boolean;
}

export interface JourneyStep {
  id: string;
  order: number;
  category: StepCategory;
  title: LocalizedText;
  description: LocalizedText;
  /** Official source — always provided so users can verify (CLO: information, not agency work). */
  official?: StepLink;
  /** In-platform connection (housing, tax, community). */
  connect?: StepLink;
}

export interface VisaTrack {
  code: string; // "E-7"
  slug: string; // "e7"
  name: LocalizedText;
  audience: LocalizedText;
  summary: LocalizedText;
  steps: JourneyStep[];
}

export interface Listing {
  id: string;
  title: LocalizedText;
  area: LocalizedText;
  dealType: "jeonse" | "wolse" | "monthly_furnished";
  depositManwon: number; // in 만원
  monthlyManwon: number; // 0 for jeonse
  foreignerFriendly: boolean;
  englishContract: boolean;
  notes: LocalizedText;
}

export interface TaxGuide {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  appliesTo: string[]; // visa slugs
}

export interface CommunityReply {
  author: string;
  flag: string;
  body: LocalizedText;
}

export interface CommunityPost {
  id: string;
  author: string;
  flag: string;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  /** Full post body shown on the detail page. */
  body: LocalizedText;
  replies: number;
  /** Sample replies shown on the detail page (demo data). */
  answers?: CommunityReply[];
}
