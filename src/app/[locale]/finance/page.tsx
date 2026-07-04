import { getTranslations, setRequestLocale } from "next-intl/server";
import { getFinanceCategories } from "@/data";
import { FSS_ENG } from "@/data/demo/finance";
import { t as localized } from "@/data/types";

export default async function FinancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("finance");
  const FINANCE_CATEGORIES = getFinanceCategories();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">{t("subtitle")}</p>
      </header>

      <section className="space-y-6">
        {FINANCE_CATEGORIES.map((cat) => (
          <article key={cat.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden>
                {cat.emoji}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{localized(cat.title, locale)}</h2>
            </div>
            <p className="mt-1 text-sm text-slate-600">{localized(cat.intro, locale)}</p>

            <div className="mt-3 rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t("eligibility")}
              </p>
              <p className="mt-1 text-sm text-slate-700">{localized(cat.eligibility, locale)}</p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {cat.items.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-2 rounded-lg border border-slate-200 p-3 transition-all duration-200 hover:border-brand hover:shadow-sm"
                >
                  <span>
                    <span className="font-semibold text-slate-900">{item.name}</span>
                    <span className="mt-0.5 block text-sm text-slate-600">
                      {localized(item.blurb, locale)}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-medium text-brand" aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-700">{t("officialIntro")}</p>
        <a
          href={FSS_ENG}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-dark hover:underline"
        >
          {t("officialCta")} <span aria-hidden>↗</span>
        </a>
      </section>

      <p className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
        {t("disclaimer")}
      </p>
    </div>
  );
}
