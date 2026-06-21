import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { COUNTRIES } from "@/data/countries";
import { VISA_TRACKS } from "@/data/visas";

const BASE = "https://welco-liard.vercel.app";

/**
 * Full sitemap with hreflang alternates for both locales. SEO is WelKor's main
 * growth channel (organic searches like "how to get a D-2 visa korea"), so we
 * expose every static page plus the country/visa journey pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/explore",
    "/housing",
    "/study",
    "/jobs",
    "/finance",
    "/tax",
    "/community",
  ];
  const countryPaths = COUNTRIES.map((c) => `/journey/${c.slug}`);
  const visaPaths = COUNTRIES.flatMap((c) =>
    VISA_TRACKS.map((v) => `/journey/${c.slug}/${v.slug}`),
  );
  const paths = [...staticPaths, ...countryPaths, ...visaPaths];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path.startsWith("/journey") ? 0.6 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE}/${l}${path}`]),
        ),
      },
    })),
  );
}
