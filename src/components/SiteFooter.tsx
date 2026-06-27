"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 text-xs leading-relaxed text-slate-500">
        <nav className="mb-3 flex flex-wrap gap-x-4 gap-y-1 font-medium text-slate-600">
          <Link href="/connect" className="hover:text-brand">
            {t("contact")}
          </Link>
          <Link href="/pros" className="hover:text-brand">
            {t("pros")}
          </Link>
          <Link href="/privacy" className="hover:text-brand">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="hover:text-brand">
            {t("terms")}
          </Link>
        </nav>
        <p className="mb-2 max-w-3xl">{t("disclaimer")}</p>
        <p>© {t("rights")}</p>
      </div>
    </footer>
  );
}
