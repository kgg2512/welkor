import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCommunityPosts, getCommunityPost } from "@/data";
import { t as localized } from "@/data/types";
import { Link } from "@/i18n/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCommunityPosts().map((p) => ({ id: p.id }));
}

export default async function CommunityPostPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("community");
  const post = getCommunityPost(id);

  if (!post) {
    return (
      <div className="py-16 text-center">
        <p className="text-slate-600">{t("notFound")}</p>
        <Link href="/community" className="mt-4 inline-block text-brand underline">
          {t("backToList")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <Link href="/community" className="text-sm text-brand hover:underline">
        {t("backToList")}
      </Link>

      <article>
        <div className="flex items-center gap-2">
          <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {localized(post.category, locale)}
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">{localized(post.title, locale)}</h1>
        <p className="mt-1 text-sm text-slate-400">
          <span aria-hidden>{post.flag}</span> {post.author} · {post.replies} {t("replies")}
        </p>
        <p className="mt-4 whitespace-pre-wrap leading-relaxed text-slate-700">
          {localized(post.body, locale)}
        </p>
      </article>

      {post.answers && post.answers.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-800">{t("answers")}</h2>
          {post.answers.map((a, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-medium text-slate-900">
                <span aria-hidden>{a.flag}</span> {a.author}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {localized(a.body, locale)}
              </p>
            </div>
          ))}
        </section>
      )}

      <section className="flex flex-col items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">{t("detailCtaNote")}</p>
        <Link
          href="/connect?topic=community"
          className="shrink-0 rounded-lg border border-brand px-4 py-2 text-sm font-medium text-brand hover:bg-brand-light/40"
        >
          {t("ask")}
        </Link>
      </section>

      <p className="text-xs leading-relaxed text-slate-400">{t("demoNote")}</p>
    </div>
  );
}
