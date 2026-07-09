// ─────────────────────────────────────────────────────────────────────────────
// Data-source boundary.
//
// Pages read content through these getters instead of importing the demo
// mockups directly. This is the single switch point between the two data worlds:
//
//   APP_MODE = "demo"  → bundled investor-demo mockups in `src/data/demo/`
//                        (current live behavior — nothing changes for users).
//   APP_MODE = "store" → real Supabase data. Nothing is wired yet, so every
//                        getter returns an empty result (never throws) until the
//                        corresponding `// TODO: Supabase 실데이터 배선` is done.
//
// Note: types (`@/data/types`), Supabase pro config (`@/data/pros`), and legal
// text (`@/data/legal`) are NOT demo mockups and are imported directly, not
// through this boundary. See docs/DATA_SOURCES.md.
// ─────────────────────────────────────────────────────────────────────────────
import { APP_MODE } from "@/lib/appMode";
import type { Country, VisaTrack, Listing, TaxGuide, CommunityPost } from "./types";

import { COUNTRIES } from "./demo/countries";
import { VISA_TRACKS } from "./demo/visas";
import { PURPOSE_GROUPS, type PurposeGroup } from "./demo/purposes";
import { LISTINGS } from "./demo/listings";
import {
  HOUSING_PORTALS,
  REGION_PRICES,
  SHORT_STAY,
  type HousingPortal,
  type RegionPrice,
  type ShortStay,
} from "./demo/housing";
import { TAX_GUIDES } from "./demo/tax";
import { COMMUNITY_POSTS } from "./demo/community";
import { FINANCE_CATEGORIES, type FinanceCategory } from "./demo/finance";
import {
  TRAVEL_REGIONS,
  BOOKING_CHANNELS,
  type TravelRegion,
  type BookingChannel,
} from "./demo/tourism";
import {
  STUDY_FIELDS,
  UNIVERSITIES,
  STUDENT_DOCS,
  type StudyField,
  type University,
  type DocItem,
} from "./demo/study";
import {
  WORK_ELIGIBILITY,
  JOB_FIELDS,
  rankChannels as rankChannelsDemo,
  type WorkEligibility,
  type JobField,
  type JobChannel,
} from "./demo/jobs";

const isStore = APP_MODE === "store";

/* ── Journey: countries, visa tracks, purposes ─────────────────────────────── */
export function getCountries(): Country[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return COUNTRIES;
}
export function getCountry(slug: string): Country | undefined {
  return getCountries().find((c) => c.slug === slug);
}
export function getVisaTracks(): VisaTrack[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return VISA_TRACKS;
}
export function getVisaTrack(slug: string): VisaTrack | undefined {
  return getVisaTracks().find((v) => v.slug === slug);
}
export function getPurposeGroups(): PurposeGroup[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return PURPOSE_GROUPS;
}

/* ── Housing ───────────────────────────────────────────────────────────────── */
export function getListings(): Listing[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return LISTINGS;
}
export function getHousingPortals(): HousingPortal[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return HOUSING_PORTALS;
}
export function getRegionPrices(): RegionPrice[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return REGION_PRICES;
}
export function getShortStay(): ShortStay[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return SHORT_STAY;
}

/* ── Tax ───────────────────────────────────────────────────────────────────── */
export function getTaxGuides(): TaxGuide[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return TAX_GUIDES;
}

/* ── Community ─────────────────────────────────────────────────────────────── */
export function getCommunityPosts(): CommunityPost[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return COMMUNITY_POSTS;
}
export function getCommunityPost(id: string): CommunityPost | undefined {
  return getCommunityPosts().find((p) => p.id === id);
}

/* ── Finance ───────────────────────────────────────────────────────────────── */
export function getFinanceCategories(): FinanceCategory[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return FINANCE_CATEGORIES;
}

/* ── Explore / tourism ─────────────────────────────────────────────────────── */
export function getTravelRegions(): TravelRegion[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return TRAVEL_REGIONS;
}
export function getBookingChannels(): BookingChannel[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return BOOKING_CHANNELS;
}

/* ── Study ─────────────────────────────────────────────────────────────────── */
export function getStudyFields(): StudyField[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return STUDY_FIELDS;
}
export function getUniversities(): University[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return UNIVERSITIES;
}
export function getStudentDocs(): DocItem[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return STUDENT_DOCS;
}

/* ── Jobs ──────────────────────────────────────────────────────────────────── */
export function getWorkEligibility(): WorkEligibility[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return WORK_ELIGIBILITY;
}
export function getJobFields(): JobField[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return JOB_FIELDS;
}
export function getEligibility(code: string): WorkEligibility | undefined {
  return getWorkEligibility().find((e) => e.code === code);
}
export function getField(id: string): JobField | undefined {
  return getJobFields().find((f) => f.id === id);
}
export function rankChannels(
  eligibility: WorkEligibility | undefined,
  field: JobField | undefined,
): JobChannel[] {
  if (isStore) return []; // TODO: Supabase 실데이터 배선
  return rankChannelsDemo(eligibility, field);
}
