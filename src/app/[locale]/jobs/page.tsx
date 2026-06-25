import { getTranslations, setRequestLocale } from "next-intl/server";
import JobsExplorer from "./JobsExplorer";

export default async function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("jobs");

  // Collect all client-side labels here (server → client; keeps strings in messages).
  const labels = {
    visaQuestion: t("visaQuestion"),
    visaUnknown: t("visaUnknown"),
    fieldQuestion: t("fieldQuestion"),
    fieldAny: t("fieldAny"),
    block1Title: t("block1Title"),
    block1Empty: t("block1Empty"),
    block2Title: t("block2Title"),
    block2Hint: t("block2Hint"),
    block3Title: t("block3Title"),
    foreignerBadge: t("foreignerBadge"),
    officialBadge: t("officialBadge"),
    sponsorYes: t("sponsorYes"),
    sponsorNo: t("sponsorNo"),
    openExternal: t("openExternal"),
    permFull: t("permFull"),
    permSponsored: t("permSponsored"),
    permParttime: t("permParttime"),
    permInternship: t("permInternship"),
    permNone: t("permNone"),
    conditionsLabel: t("conditionsLabel"),
    allowedLabel: t("allowedLabel"),
    noteLabel: t("noteLabel"),
    eps: t("epsLink"),
    work24: t("work24Link"),
    kotra: t("kotraLink"),
    hikoreaScope: t("hikoreaScope"),
    leaveNotice: t("leaveNotice"),
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t("title")}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{t("subtitle")}</p>
      </header>

      {/* CLO mandatory notice: information-only service, not a recruiter/broker */}
      <section className="rounded-xl border border-amber-300 bg-amber-50 p-5">
        <h2 className="flex items-center gap-2 font-semibold text-amber-900">
          <span aria-hidden>⚠️</span>
          {t("noticeTitle")}
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-amber-900/90">{t("noticeBody")}</p>
      </section>

      {/* Interactive: visa × field → personalised, changing results */}
      <JobsExplorer locale={locale} labels={labels} />

      {/* CLO mandatory E-9 carve-out (always visible, separate box) */}
      <section className="rounded-xl border border-rose-200 bg-rose-50 p-5">
        <h2 className="font-semibold text-rose-900">{t("epsTitle")}</h2>
        <p className="mt-1 max-w-3xl text-sm text-rose-900/90">{t("epsBody")}</p>
      </section>

      {/* CLO mandatory disclaimer */}
      <p className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
        {t("disclaimer")}
      </p>
    </div>
  );
}
