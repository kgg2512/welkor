import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ApplyForm from "../ApplyForm";

export default async function ProApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pros");

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <Link href="/pros" className="text-sm text-brand hover:underline">
          ← {t("backToDirectory")}
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">{t("applyTitle")}</h1>
        <p className="mt-2 text-sm text-slate-600">{t("applySubtitle")}</p>
      </header>

      <ul className="space-y-2 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <li>✓ {t("benefit1")}</li>
        <li>✓ {t("benefit2")}</li>
        <li>✓ {t("benefit3")}</li>
      </ul>

      <ApplyForm locale={locale} />
    </div>
  );
}
