import { getTranslations, setRequestLocale } from "next-intl/server";
import { JOB_CATEGORIES, EPS, HIKOREA } from "@/data/jobs";
import { t as localized } from "@/data/types";

export default async function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("jobs");

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t("title")}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{t("subtitle")}</p>
      </header>

      {/* Legal notice: information board, not a recruiter */}
      <section className="rounded-xl border border-amber-300 bg-amber-50 p-5">
        <h2 className="flex items-center gap-2 font-semibold text-amber-900">
          <span aria-hidden>⚠️</span>
          {t("noticeTitle")}
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-amber-900/90">{t("noticeBody")}</p>
      </section>

      {/* Job channels by category */}
      <section className="space-y-6">
        {JOB_CATEGORIES.map((cat) => (
          <article key={cat.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden>
                {cat.emoji}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{localized(cat.title, locale)}</h2>
            </div>
            <p className="mt-1 text-sm text-slate-600">{localized(cat.intro, locale)}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {cat.channels.map((ch) => (
                <a
                  key={ch.id}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-2 rounded-lg border border-slate-200 p-3 transition-all duration-200 hover:border-brand hover:shadow-sm"
                >
                  <span>
                    <span className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-900">{ch.name}</span>
                      {ch.official && (
                        <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-700">
                          {t("officialBadge")}
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-sm text-slate-600">
                      {localized(ch.blurb, locale)}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-medium text-brand" aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* E-9 / EPS carve-out — information only, never brokered */}
      <section className="rounded-xl border border-slate-300 bg-slate-50 p-5">
        <h2 className="font-semibold text-slate-900">{t("epsTitle")}</h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-700">{t("epsBody")}</p>
        <a
          href={EPS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-dark hover:underline"
        >
          {t("epsCta")} <span aria-hidden>↗</span>
        </a>
      </section>

      {/* Visa-work match caution */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">{t("visaTitle")}</h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">{t("visaBody")}</p>
        <a
          href={HIKOREA}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-dark hover:underline"
        >
          {t("visaCta")} <span aria-hidden>↗</span>
        </a>
      </section>

      <p className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
        {t("disclaimer")}
      </p>
    </div>
  );
}
