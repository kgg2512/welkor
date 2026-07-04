import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTaxGuides, getVisaTrack } from "@/data";
import { t as localized } from "@/data/types";
import { Link } from "@/i18n/navigation";

export default async function TaxPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tax");
  const TAX_GUIDES = getTaxGuides();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">{t("subtitle")}</p>
      </header>

      <section className="space-y-4">
        {TAX_GUIDES.map((guide) => (
          <article key={guide.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-slate-900">{localized(guide.title, locale)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {localized(guide.body, locale)}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">{t("appliesTo")}:</span>
              {guide.appliesTo.map((slug) => {
                const track = getVisaTrack(slug);
                return (
                  <span
                    key={slug}
                    className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                  >
                    {track ? track.code : slug.toUpperCase()}
                  </span>
                );
              })}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-rose-200 bg-rose-50 p-5">
        <Link
          href="/connect?topic=tax"
          className="inline-block rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
        >
          {t("connectAccountant")}
        </Link>
        <p className="mt-3 text-xs text-rose-900">{t("disclaimer")}</p>
      </section>
    </div>
  );
}
