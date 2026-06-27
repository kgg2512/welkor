import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSupabase } from "@/lib/supabase";
import { t as localized } from "@/data/types";
import {
  PRO_KIND_LABEL,
  KIND_TO_TOPIC,
  type Professional,
  type ProKind,
} from "@/data/pros";

// Directory reflects verified pros as they are approved; revalidate periodically.
export const revalidate = 300;

async function getVerifiedPros(): Promise<Professional[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("professionals")
    .select("id, kind, name, org, region, languages, license_verified, created_at")
    .eq("license_verified", true)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as Professional[];
}

export default async function ProsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pros");
  const pros = await getVerifiedPros();

  return (
    <div className="space-y-10">
      <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t("dirTitle")}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">{t("dirSubtitle")}</p>
        </div>
        <Link
          href="/pros/apply"
          className="shrink-0 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          {t("applyCta")}
        </Link>
      </header>

      {pros.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-lg font-semibold text-slate-800">{t("emptyTitle")}</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">{t("emptyBody")}</p>
          <Link
            href="/pros/apply"
            className="mt-5 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            {t("emptyCta")}
          </Link>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2">
          {pros.map((pro) => (
            <article
              key={pro.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-bold text-slate-900">{pro.name}</h2>
                <span className="shrink-0 rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  ✓ {t("verified")}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-brand-dark">
                {localized(PRO_KIND_LABEL[pro.kind as ProKind], locale)}
              </p>
              {pro.org && <p className="mt-1 text-sm text-slate-600">{pro.org}</p>}
              <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600">
                {pro.region && (
                  <div className="flex gap-1">
                    <dt className="text-slate-400">{t("region")}:</dt>
                    <dd>{pro.region}</dd>
                  </div>
                )}
                {pro.languages?.length > 0 && (
                  <div className="flex gap-1">
                    <dt className="text-slate-400">{t("languages")}:</dt>
                    <dd>{pro.languages.join(", ")}</dd>
                  </div>
                )}
              </dl>
              <Link
                href={`/connect?topic=${KIND_TO_TOPIC[pro.kind as ProKind]}`}
                className="mt-4 inline-block rounded-lg bg-brand px-4 py-2 text-center text-sm font-medium text-white hover:bg-brand-dark"
              >
                {t("requestConnect")}
              </Link>
            </article>
          ))}
        </section>
      )}

      <p className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
        {t("dirDisclaimer")}
      </p>
    </div>
  );
}
