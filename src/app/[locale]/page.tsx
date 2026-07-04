import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCountries } from "@/data";
import { t as localized } from "@/data/types";
import { Link } from "@/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const COUNTRIES = getCountries();

  const why = [
    { title: t("why1Title"), body: t("why1Body") },
    { title: t("why2Title"), body: t("why2Body") },
    { title: t("why3Title"), body: t("why3Body") },
  ];

  return (
    <div className="space-y-14">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("heroTitle")}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">{t("heroSubtitle")}</p>
      </section>

      <section>
        <h2 className="text-center text-lg font-semibold text-slate-800">
          {t("countryPrompt")}
        </h2>
        <p className="mb-6 text-center text-sm text-slate-500">{t("countryHint")}</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {COUNTRIES.map((country) => (
            <Link
              key={country.slug}
              href={`/journey/${country.slug}`}
              className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all hover:border-brand hover:shadow-md"
            >
              <span className="text-3xl" aria-hidden>
                {country.flag}
              </span>
              <span className="text-sm font-semibold text-slate-900">
                {localized(country.name, locale)}
              </span>
              <span className="text-xs font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
                {t("startJourney")} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-center text-xl font-bold text-slate-900">
          {t("whyTitle")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {why.map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="rounded-lg bg-brand-light/60 p-4 text-center text-sm text-brand-dark">
        {t("freeNote")}
      </p>
    </div>
  );
}
