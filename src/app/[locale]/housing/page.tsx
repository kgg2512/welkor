import { getTranslations, setRequestLocale } from "next-intl/server";
import { getListings, getHousingPortals, getRegionPrices, getShortStay } from "@/data";
import { t as localized, type Listing } from "@/data/types";
import { Link } from "@/i18n/navigation";

const DEAL_LABEL: Record<Listing["dealType"], { en: string; ko: string }> = {
  jeonse: { en: "Jeonse", ko: "전세" },
  wolse: { en: "Monthly rent", ko: "월세" },
  monthly_furnished: { en: "Furnished monthly", ko: "풀옵션 월세" },
};

export default async function HousingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("housing");
  const LISTINGS = getListings();
  const HOUSING_PORTALS = getHousingPortals();
  const REGION_PRICES = getRegionPrices();
  const SHORT_STAY = getShortStay();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">{t("subtitle")}</p>
      </header>

      {/* Region price reference */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800">{t("priceTitle")}</h2>
        <p className="mb-3 text-sm text-slate-500">{t("priceNote")}</p>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                <th className="px-4 py-2 font-semibold">{t("regionCol")}</th>
                <th className="px-4 py-2 font-semibold">{t("depositCol")}</th>
                <th className="px-4 py-2 font-semibold">{t("monthlyCol")}</th>
              </tr>
            </thead>
            <tbody>
              {REGION_PRICES.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-slate-900">
                    {localized(r.region, locale)}
                  </td>
                  <td className="px-4 py-2 text-slate-700">
                    {r.depositRange} {t("manwon")}
                  </td>
                  <td className="px-4 py-2 text-slate-700">
                    {r.monthlyRange} {t("manwon")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Listing portals (map-based) */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800">{t("portalsTitle")}</h2>
        <p className="mb-3 text-sm text-slate-500">{t("portalsNote")}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {HOUSING_PORTALS.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md"
            >
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-900">{localized(p.name, locale)}</span>
                {p.mapBased && (
                  <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                    {t("mapBadge")}
                  </span>
                )}
                {p.english && (
                  <span className="rounded bg-brand-light px-1.5 py-0.5 text-[11px] font-semibold text-brand-dark">
                    {t("englishBadge")}
                  </span>
                )}
              </span>
              <span className="mt-1 text-sm text-slate-600">{localized(p.blurb, locale)}</span>
              <span className="mt-2 text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
                {t("browse")} <span aria-hidden>↗</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Sample foreigner-friendly listings */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800">{t("sampleTitle")}</h2>
        <p className="mb-3 text-sm text-slate-500">{t("sampleNote")}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {LISTINGS.map((listing) => (
            <article
              key={listing.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-slate-900">{localized(listing.title, locale)}</h3>
                <span className="shrink-0 rounded bg-brand-light px-2 py-0.5 text-xs font-semibold text-brand-dark">
                  {localized(DEAL_LABEL[listing.dealType], locale)}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{localized(listing.area, locale)}</p>

              <dl className="mt-3 flex gap-6 text-sm">
                <div>
                  <dt className="text-slate-500">{t("deposit")}</dt>
                  <dd className="font-semibold text-slate-900">
                    {listing.depositManwon.toLocaleString()} {t("manwon")}
                  </dd>
                </div>
                {listing.monthlyManwon > 0 && (
                  <div>
                    <dt className="text-slate-500">{t("monthly")}</dt>
                    <dd className="font-semibold text-slate-900">
                      {listing.monthlyManwon.toLocaleString()} {t("manwon")}
                    </dd>
                  </div>
                )}
              </dl>

              <p className="mt-3 flex-1 text-sm text-slate-600">{localized(listing.notes, locale)}</p>

              {listing.englishContract && (
                <span className="mt-4 text-xs font-medium text-emerald-600">
                  ✓ {t("englishContract")}
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Connect with a licensed agent */}
      <section className="flex flex-col items-start gap-3 rounded-xl border border-brand/30 bg-brand-light/40 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700">{t("connectNote")}</p>
        <Link
          href="/connect?topic=housing"
          className="shrink-0 rounded-lg border border-brand bg-white px-4 py-2 text-sm font-medium text-brand hover:bg-brand-light/40"
        >
          {t("connectAgent")}
        </Link>
      </section>

      {/* Short-stay for visitors */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800">{t("shortStayTitle")}</h2>
        <p className="mb-3 text-sm text-slate-500">{t("shortStayNote")}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {SHORT_STAY.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-brand hover:shadow-md"
            >
              <span className="font-bold text-slate-900">{s.name}</span>
              <span className="mt-1 text-sm text-slate-600">{localized(s.blurb, locale)}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Before you sign */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="font-semibold text-amber-900">{t("guideTitle")}</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-900">
          <li>{t("guide1")}</li>
          <li>{t("guide2")}</li>
          <li>{t("guide3")}</li>
        </ul>
      </section>

      <p className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
        {t("disclaimer")}
      </p>
    </div>
  );
}
