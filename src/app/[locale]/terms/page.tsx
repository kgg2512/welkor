import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalArticle from "@/components/LegalArticle";
import { TERMS, LEGAL_UPDATED } from "@/data/legal";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <LegalArticle
      locale={locale}
      title={t("termsTitle")}
      intro={t("termsIntro")}
      updatedLabel={t("updated")}
      updated={LEGAL_UPDATED}
      sections={TERMS}
    />
  );
}
