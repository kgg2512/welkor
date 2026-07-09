import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCommunityPosts } from "@/data";
import { t as localized } from "@/data/types";
import { Link } from "@/i18n/navigation";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("community");
  const COMMUNITY_POSTS = getCommunityPosts();

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t("title")}</h1>
          <p className="mt-2 text-sm text-slate-600">{t("subtitle")}</p>
        </div>
        <Link
          href="/connect?topic=community"
          className="rounded-lg border border-brand bg-white px-4 py-2 text-sm font-medium text-brand hover:bg-brand-light/40"
        >
          {t("ask")}
        </Link>
      </header>

      <section className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {COMMUNITY_POSTS.map((post) => (
          <Link
            key={post.id}
            href={`/community/${post.id}`}
            className="group flex gap-4 p-5 transition-colors hover:bg-slate-50"
          >
            <span className="text-2xl" aria-hidden>
              {post.flag}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {localized(post.category, locale)}
                </span>
                <h2 className="font-semibold text-slate-900 group-hover:text-brand">
                  {localized(post.title, locale)}
                </h2>
              </div>
              <p className="mt-1 truncate text-sm text-slate-600">
                {localized(post.excerpt, locale)}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {post.author} · {post.replies} {t("replies")}
              </p>
            </div>
            <span className="self-center text-slate-300 transition-colors group-hover:text-brand" aria-hidden>
              →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
