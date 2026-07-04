import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCountries, getCountry, getVisaTrack, getVisaTracks } from "@/data";
import { t as localized, type StepCategory } from "@/data/types";
import { Link } from "@/i18n/navigation";

const CATEGORY_STYLE: Record<StepCategory, string> = {
  prearrival: "bg-orange-100 text-orange-700",
  visa: "bg-indigo-100 text-indigo-700",
  residence: "bg-emerald-100 text-emerald-700",
  banking: "bg-amber-100 text-amber-700",
  job: "bg-sky-100 text-sky-700",
  tax: "bg-rose-100 text-rose-700",
  education: "bg-violet-100 text-violet-700",
  life: "bg-slate-200 text-slate-700",
};

export const dynamicParams = false;

export function generateStaticParams() {
  const visaTracks = getVisaTracks();
  return getCountries().flatMap((c) =>
    visaTracks.map((v) => ({ country: c.slug, visa: v.slug })),
  );
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ locale: string; country: string; visa: string }>;
}) {
  const { locale, country, visa } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("journey");
  const cat = await getTranslations("journey.cat");
  const c = getCountry(country);
  const countryName = c ? localized(c.name, locale) : country;
  const track = getVisaTrack(visa);

  const fill = (s: string) => s.replaceAll("{country}", countryName);

  if (!track) {
    return (
      <div className="py-16 text-center">
        <p className="text-slate-600">{t("notFound")}</p>
        <Link href={`/journey/${country}`} className="mt-4 inline-block text-brand underline">
          {t("back")}
        </Link>
      </div>
    );
  }

  const steps = [...track.steps].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8">
      <header>
        <Link href={`/journey/${country}`} className="text-sm text-brand hover:underline">
          {t("back")}
        </Link>
        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand">
            {track.code}
          </span>
          <h1 className="text-2xl font-bold text-slate-900">
            {t("for")}: {localized(track.name, locale)}
          </h1>
          {c && (
            <span className="text-sm text-slate-500">
              {c.flag} {t("fromCountry", { country: countryName })}
            </span>
          )}
        </div>
        <p className="mt-2 text-slate-600">{fill(localized(track.summary, locale))}</p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">{t("stepsTitle")}</h2>
        <ol className="relative space-y-4 border-l-2 border-slate-200 pl-6">
          {steps.map((step) => (
            <li key={step.id} className="relative">
              <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {step.order}
              </span>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-[11px] font-semibold uppercase ${CATEGORY_STYLE[step.category]}`}
                  >
                    {cat(step.category)}
                  </span>
                  <h3 className="font-bold text-slate-900">
                    {fill(localized(step.title, locale))}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {fill(localized(step.description, locale))}
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  {step.official && (
                    <a
                      href={step.official.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-slate-700 underline decoration-dotted hover:text-brand"
                    >
                      {t("official")}: {localized(step.official.label, locale)} <span aria-hidden>↗</span>
                    </a>
                  )}
                  {step.connect && (
                    <Link
                      href={step.connect.href}
                      className="font-medium text-brand hover:underline"
                    >
                      {localized(step.connect.label, locale)} <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
