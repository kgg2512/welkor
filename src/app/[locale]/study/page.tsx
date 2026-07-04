import { getTranslations, setRequestLocale } from "next-intl/server";
import { getStudyFields, getUniversities, getStudentDocs } from "@/data";
import { STUDY_IN_KOREA, GKS, TOPIK, HIKOREA, type FieldArea } from "@/data/demo/study";
import { t as localized } from "@/data/types";

const AREA_LABEL: Record<FieldArea, { en: string; ko: string }> = {
  engineering: { en: "Engineering", ko: "공학" },
  business: { en: "Business", ko: "경영" },
  science: { en: "Science", ko: "과학" },
  humanities: { en: "Humanities", ko: "인문" },
  arts: { en: "Arts", ko: "예술" },
  korean: { en: "Korean", ko: "한국어" },
};

const AREA_STYLE: Record<FieldArea, string> = {
  engineering: "bg-sky-100 text-sky-700",
  business: "bg-amber-100 text-amber-700",
  science: "bg-emerald-100 text-emerald-700",
  humanities: "bg-violet-100 text-violet-700",
  arts: "bg-rose-100 text-rose-700",
  korean: "bg-indigo-100 text-indigo-700",
};

const admissionsUrl = (q: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(q)}`;

export default async function StudyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("study");
  const STUDY_FIELDS = getStudyFields();
  const UNIVERSITIES = getUniversities();
  const STUDENT_DOCS = getStudentDocs();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t("title")}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{t("subtitle")}</p>
      </header>

      {/* Official start banner */}
      <section className="rounded-xl border border-brand/30 bg-brand-light/50 p-5">
        <h2 className="font-semibold text-brand-dark">{t("startTitle")}</h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-700">{t("startBody")}</p>
        <a
          href={STUDY_IN_KOREA}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-dark"
        >
          {t("startCta")} <span aria-hidden>↗</span>
        </a>
      </section>

      {/* Fields of study */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{t("fieldsTitle")}</h2>
          <p className="mt-1 text-sm text-slate-500">{t("fieldsNote")}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STUDY_FIELDS.map((field) => (
            <article
              key={field.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span
                className={`self-start rounded px-1.5 py-0.5 text-[11px] font-semibold ${AREA_STYLE[field.area]}`}
              >
                {localized(AREA_LABEL[field.area], locale)}
              </span>
              <h3 className="mt-2 font-bold text-slate-900">{localized(field.name, locale)}</h3>
              <p className="mt-1 text-sm text-slate-600">{localized(field.blurb, locale)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Universities */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{t("schoolsTitle")}</h2>
          <p className="mt-1 text-sm text-slate-500">{t("schoolsNote")}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {UNIVERSITIES.map((u) => (
            <article
              key={u.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-bold text-slate-900">{localized(u.name, locale)}</h3>
                <span className="shrink-0 text-xs font-medium text-slate-500">
                  📍 {localized(u.city, locale)}
                </span>
              </div>
              <p className="mt-1 flex-1 text-sm text-slate-600">{localized(u.known, locale)}</p>
              <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-3 text-sm">
                <a
                  href={u.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-700 underline decoration-dotted transition-colors duration-200 hover:text-brand"
                >
                  {t("site")} <span aria-hidden>↗</span>
                </a>
                <a
                  href={admissionsUrl(u.admissionsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand transition-colors duration-200 hover:text-brand-dark hover:underline"
                >
                  {t("admissions")} <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Scholarships */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">{t("gksTitle")}</h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">{t("gksBody")}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <a
            href={GKS}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand transition-colors duration-200 hover:text-brand-dark hover:underline"
          >
            {t("gksCta")} <span aria-hidden>↗</span>
          </a>
          <a
            href={TOPIK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-600 underline decoration-dotted transition-colors duration-200 hover:text-brand"
          >
            {t("topikCta")} <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      {/* Visa document checklist */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{t("docsTitle")}</h2>
          <p className="mt-1 text-sm text-slate-500">{t("docsNote")}</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {STUDENT_DOCS.map((doc) => (
            <li
              key={doc.id}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span className="mt-0.5 shrink-0 text-brand" aria-hidden>
                ✓
              </span>
              <div>
                <span className="font-semibold text-slate-900">{localized(doc.label, locale)}</span>
                <p className="mt-0.5 text-sm text-slate-600">{localized(doc.note, locale)}</p>
              </div>
            </li>
          ))}
        </ul>
        <a
          href={HIKOREA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-dark hover:underline"
        >
          {t("docsOfficial")} <span aria-hidden>↗</span>
        </a>
      </section>

      <p className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
        {t("disclaimer")}
      </p>
    </div>
  );
}
