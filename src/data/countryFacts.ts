/**
 * Country-specific official facts for the journey overlay.
 *
 * This is STATIC OFFICIAL REFERENCE DATA (like `@/data/legal`), not demo content,
 * so it is imported directly — not through the APP_MODE store boundary.
 *
 * Rule (CLO): only confirmed, stable facts. If something is uncertain, it is
 * simply omitted rather than guessed — inaccurate visa/immigration info is a
 * legal risk. No brokering or "you will get a job/visa" language anywhere.
 *
 *  - `eps`: the country is one of Korea's Employment Permit System (EPS) partner
 *    countries for E-9 non-professional work. Shown as neutral information only;
 *    E-9 hiring happens exclusively through the government EPS.
 *  - `embassyInKorea`: the country's own embassy in Korea. Every URL below was
 *    checked live and returned HTTP 200 (2026-07-09). Countries whose official
 *    site could not be confirmed have no link (the item is dropped for them).
 */

export interface CountryFacts {
  eps: boolean;
  embassyInKorea?: string;
}

// Shared official Korean government sources (all verified HTTP 200, 2026-07-09).
export const OFFICIAL = {
  keta: "https://www.k-eta.go.kr",
  missions: "https://www.0404.go.kr/dev/main.do",
  eps: "https://www.eps.go.kr/eo/langMain.eo?langType=en",
} as const;

export const COUNTRY_FACTS: Record<string, CountryFacts> = {
  cn: { eps: true, embassyInKorea: "http://kr.china-embassy.gov.cn" },
  vn: { eps: true, embassyInKorea: "https://vnembassy-seoul.mofa.gov.vn" },
  us: { eps: false, embassyInKorea: "https://kr.usembassy.gov" },
  th: { eps: true, embassyInKorea: "https://seoul.thaiembassy.org" },
  uz: { eps: true },
  ph: { eps: true },
  np: { eps: true },
  id: { eps: true, embassyInKorea: "https://kemlu.go.id/seoul" },
  mn: { eps: true },
  in: { eps: false, embassyInKorea: "https://www.indembassyseoul.gov.in" },
  ca: { eps: false },
  gb: { eps: false, embassyInKorea: "https://www.gov.uk/world/organisations/british-embassy-seoul" },
  ru: { eps: false },
  jp: { eps: false },
  other: { eps: false },
};

export function getCountryFacts(slug: string): CountryFacts | undefined {
  return COUNTRY_FACTS[slug];
}
