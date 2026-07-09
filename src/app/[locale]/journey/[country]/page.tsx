import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCountries, getCountry, getPurposeGroups } from "@/data";
import { getCountryFacts, OFFICIAL } from "@/data/countryFacts";
import { t as localized } from "@/data/types";
import { Link } from "@/i18n/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCountries().map((c) => ({ country: c.slug }));
}

export default async function PurposePage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("select");
  const c = getCountry(country);
  const countryName = c ? localized(c.name, locale) : country;
  const PURPOSE_GROUPS = getPurposeGroups();
  const facts = getCountryFacts(country);

  const cardClass =
    "group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:border-brand hover:shadow-md";
  const factCard =
    "group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-3.5 text-left shadow-sm transition-all hover:border-brand hover:shadow-md";
  const factCta = "mt-2 text-sm font-medium text-brand group-hover:underline";

  return (
    <div className="space-y-10">
      <header>
        <Link href="/" className="text-sm text-brand hover:underline">
          {t("back")}
        </Link>
        <div className="mt-3 flex items-center gap-2">
          {c && (
            <span className="text-2xl" aria-hidden>
              {c.flag}
            </span>
          )}
          <span className="text-sm font-medium text-slate-500">
            {t("from", { country: countryName })}
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{t("title")}</h1>
        <p className="mt-2 max-w-2xl text-slate-600">{t("hint")}</p>
      </header>

      {facts && (
        <section className="rounded-xl border border-brand/20 bg-brand-light/20 p-5">
          <h2 className="text-lg font-bold text-slate-900">
            {t("cfTitle", { country: countryName })}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">{t("cfIntro")}</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {facts.embassyInKorea && (
              <a
                href={facts.embassyInKorea}
                target="_blank"
                rel="noopener noreferrer"
                className={factCard}
              >
                <span className="font-semibold text-slate-900">
                  {t("cfEmbassy", { country: countryName })}
                </span>
                <span className="mt-1 text-sm text-slate-600">{t("cfEmbassyDesc")}</span>
                <span className={factCta}>
                  {t("cfOfficial")} <span aria-hidden>↗</span>
                </span>
              </a>
            )}

            <a href={OFFICIAL.keta} target="_blank" rel="noopener noreferrer" className={factCard}>
              <span className="font-semibold text-slate-900">{t("cfKeta")}</span>
              <span className="mt-1 text-sm text-slate-600">{t("cfKetaDesc")}</span>
              <span className={factCta}>
                {t("cfKetaLink")} <span aria-hidden>↗</span>
              </span>
            </a>

            <a href={OFFICIAL.missions} target="_blank" rel="noopener noreferrer" className={factCard}>
              <span className="font-semibold text-slate-900">
                {t("cfMission", { country: countryName })}
              </span>
              <span className="mt-1 text-sm text-slate-600">{t("cfMissionDesc")}</span>
              <span className={factCta}>
                {t("cfMissionLink")} <span aria-hidden>↗</span>
              </span>
            </a>
          </div>

          {facts.eps && (
            <p className="mt-4 rounded-lg bg-white/70 p-3 text-xs leading-relaxed text-slate-600">
              {t("cfEps", { country: countryName })}{" "}
              <a
                href={OFFICIAL.eps}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand hover:underline"
              >
                {t("cfEpsLink")} <span aria-hidden>↗</span>
              </a>
            </p>
          )}
        </section>
      )}

      {PURPOSE_GROUPS.map((group) => (
        <section key={group.id}>
          <div className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-xl" aria-hidden>
              {group.emoji}
            </span>
            <h2 className="text-lg font-bold text-slate-900">{localized(group.title, locale)}</h2>
            <span className="text-sm text-slate-500">— {localized(group.question, locale)}</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {group.situations.map((s) => {
              const content = (
                <>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden>
                      {s.emoji}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {localized(s.title, locale)}
                        </span>
                        <span className="rounded bg-brand-light/70 px-1.5 py-0.5 text-[11px] font-semibold text-brand-dark">
                          {t("visaLabel", { code: s.visaCode })}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{localized(s.detail, locale)}</p>
                    </div>
                  </div>
                  <span className="mt-3 text-sm font-medium text-brand group-hover:underline">
                    {s.visaSlug
                      ? t("roadmap")
                      : s.guide
                        ? s.guideLabel
                          ? localized(s.guideLabel, locale)
                          : t("guideCta")
                        : t("officialInfo")}{" "}
                    <span aria-hidden>{s.visaSlug || s.guide ? "→" : "↗"}</span>
                  </span>
                </>
              );

              return s.visaSlug ? (
                <Link key={s.id} href={`/journey/${country}/${s.visaSlug}`} className={cardClass}>
                  {content}
                </Link>
              ) : s.guide ? (
                <Link key={s.id} href={s.guide} className={cardClass}>
                  {content}
                </Link>
              ) : (
                <a
                  key={s.id}
                  href={s.official}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {content}
                </a>
              );
            })}
          </div>
        </section>
      ))}

      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-center">
        <p className="font-semibold text-slate-900">{t("notSureTitle")}</p>
        <p className="mt-1 text-sm text-slate-600">{t("notSureBody")}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm font-medium">
          <a
            href="https://www.hikorea.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            {t("notSureOfficial")} <span aria-hidden>↗</span>
          </a>
          <Link href="/community" className="text-brand hover:underline">
            {t("notSureCommunity")} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
