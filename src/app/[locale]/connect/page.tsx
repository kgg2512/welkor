import { getTranslations, setRequestLocale } from "next-intl/server";
import ConnectForm from "./ConnectForm";

type Topic = "housing" | "tax" | "admin" | "community" | "general";
const TOPICS: Topic[] = ["housing", "tax", "admin", "community", "general"];

function normalizeTopic(value: string | string[] | undefined): Topic {
  const v = Array.isArray(value) ? value[0] : value;
  return TOPICS.includes(v as Topic) ? (v as Topic) : "general";
}

export default async function ConnectPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ topic?: string | string[] }>;
}) {
  const { locale } = await params;
  const { topic } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("connect");

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
        <p className="mt-2 text-sm text-slate-600">{t("subtitle")}</p>
      </header>
      <ConnectForm locale={locale} initialTopic={normalizeTopic(topic)} />
    </div>
  );
}
