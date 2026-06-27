import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalArticle from "@/components/LegalArticle";
import { PRIVACY, LEGAL_UPDATED } from "@/data/legal";

export default async function PrivacyPage({
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
      title={t("privacyTitle")}
      intro={t("privacyIntro")}
      updatedLabel={t("updated")}
      updated={LEGAL_UPDATED}
      sections={PRIVACY}
    />
  );
}
