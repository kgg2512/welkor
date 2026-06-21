import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  TRAVEL_REGIONS,
  BOOKING_CHANNELS,
  VISIT_KOREA,
  K_ETA,
  type SpotCategory,
} from "@/data/tourism";
import { t as localized } from "@/data/types";

const CAT_LABEL: Record<SpotCategory, { en: string; ko: string }> = {
  landmark: { en: "Landmark", ko: "랜드마크" },
  nature: { en: "Nature", ko: "자연" },
  culture: { en: "Culture", ko: "문화" },
  food: { en: "Food", ko: "음식" },
  shopping: { en: "Shopping", ko: "쇼핑" },
};

const CAT_STYLE: Record<SpotCategory, string> = {
  landmark: "bg-indigo-100 text-indigo-700",
  nature: "bg-emerald-100 text-emerald-700",
  culture: "bg-violet-100 text-violet-700",
  food: "bg-rose-100 text-rose-700",
  shopping: "bg-amber-100 text-amber-700",
};

const youtube = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("explore");

  const stays = BOOKING_CHANNELS.filter((c) => c.kind === "stay");
  const activities = BOOKING_CHANNELS.filter((c) => c.kind !== "stay");

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t("title")}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{t("subtitle")}</p>
      </header>

      {/* No-visa / K-ETA info banner */}
      <section className="rounded-xl border border-brand/30 bg-brand-light/50 p-5">
        <h2 className="font-semibold text-brand-dark">{t("noVisaTitle")}</h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-700">{t("noVisaBody")}</p>
        <a
          href={K_ETA}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-dark"
        >
          {t("ketaCta")} <span aria-hidden>↗</span>
        </a>
      </section>

      {/* Regions */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-slate-800">{t("regionsTitle")}</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {TRAVEL_REGIONS.map((region) => (
            <article
              key={region.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden>
                  {region.emoji}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{localized(region.name, locale)}</h3>
                  <p className="text-sm text-slate-500">{localized(region.tagline, locale)}</p>
                </div>
              </div>

              <ul className="mt-4 flex-1 space-y-3">
                {region.spots.map((spot) => (
                  <li key={spot.id} className="flex items-start gap-2">
                    <span
                      className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[11px] font-semibold ${CAT_STYLE[spot.category]}`}
                    >
                      {localized(CAT_LABEL[spot.category], locale)}
                    </span>
                    <div>
                      <span className="font-semibold text-slate-900">
                        {localized(spot.name, locale)}
                      </span>
                      <p className="text-sm text-slate-600">{localized(spot.blurb, locale)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-3 text-sm">
                <a
                  href={youtube(region.creatorQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand transition-colors duration-200 hover:text-brand-dark hover:underline"
                >
                  ▶ {t("creatorPicks")}
                </a>
                <a
                  href={VISIT_KOREA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-600 underline decoration-dotted transition-colors duration-200 hover:text-brand"
                >
                  {t("officialInfo")} <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Booking channels */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{t("staysTitle")}</h2>
          <p className="mt-1 text-sm text-slate-500">{t("bookingNote")}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {stays.map((c) => (
            <a
              key={c.id}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md"
            >
              <span className="font-bold text-slate-900">{c.name}</span>
              <span className="mt-1 text-sm text-slate-600">{localized(c.blurb, locale)}</span>
              <span className="mt-2 text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
                {t("open")} <span aria-hidden>↗</span>
              </span>
            </a>
          ))}
        </div>

        <h2 className="pt-2 text-lg font-semibold text-slate-800">{t("activitiesTitle")}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {activities.map((c) => (
            <a
              key={c.id}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md"
            >
              <span>
                <span className="font-bold text-slate-900">{c.name}</span>
                <span className="ml-2 text-sm text-slate-600">{localized(c.blurb, locale)}</span>
              </span>
              <span className="text-sm font-medium text-brand" aria-hidden>↗</span>
            </a>
          ))}
        </div>
      </section>

      <p className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
        {t("disclaimer")}
      </p>
    </div>
  );
}
