"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const NAV = [
  { href: "/", key: "home" },
  { href: "/explore", key: "explore" },
  { href: "/housing", key: "housing" },
  { href: "/study", key: "study" },
  { href: "/jobs", key: "jobs" },
  { href: "/finance", key: "finance" },
  { href: "/tax", key: "tax" },
  { href: "/community", key: "community" },
] as const;

export default function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const other = locale === "ko" ? "en" : "ko";

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-brand">{t("brand")}</span>
          <span className="hidden text-xs text-slate-500 sm:inline">{t("tagline")}</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm sm:gap-x-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 transition-colors hover:text-brand"
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            href="/pros"
            className="rounded border border-brand/40 px-2 py-1 text-xs font-medium text-brand hover:bg-brand-light/40"
          >
            {t("pros")}
          </Link>
          <Link
            href={pathname}
            locale={other}
            className="rounded border px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            {t("language")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
