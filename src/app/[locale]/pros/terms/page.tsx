import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalArticle from "@/components/LegalArticle";
import { PRO_TERMS, LEGAL_UPDATED } from "@/data/legal";

export default async function ProTermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pros");

  return (
    <LegalArticle
      locale={locale}
      title={t("termsTitle")}
      intro={t("termsIntro")}
      updatedLabel={t("updated")}
      updated={LEGAL_UPDATED}
      sections={PRO_TERMS}
    />
  );
}
