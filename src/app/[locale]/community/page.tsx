import { getTranslations, setRequestLocale } from "next-intl/server";
import { COMMUNITY_POSTS } from "@/data/community";
import { t as localized } from "@/data/types";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("community");

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
          <p className="mt-2 text-sm text-slate-600">{t("subtitle")}</p>
        </div>
        <button
          type="button"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
        >
          {t("ask")}
        </button>
      </header>

      <section className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {COMMUNITY_POSTS.map((post) => (
          <article key={post.id} className="flex gap-4 p-5 hover:bg-slate-50">
            <span className="text-2xl" aria-hidden>
              {post.flag}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {localized(post.category, locale)}
                </span>
                <h2 className="font-semibold text-slate-900">{localized(post.title, locale)}</h2>
              </div>
              <p className="mt-1 truncate text-sm text-slate-600">
                {localized(post.excerpt, locale)}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {post.author} · {post.replies} {t("replies")}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
