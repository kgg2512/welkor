import { t as localized, type LocalizedText } from "@/data/types";
import type { LegalSection } from "@/data/legal";

export default function LegalArticle({
  locale,
  title,
  intro,
  updatedLabel,
  updated,
  sections,
}: {
  locale: string;
  title: string;
  intro: string;
  updatedLabel: string;
  updated: string;
  sections: LegalSection[];
}) {
  const lt = (text: LocalizedText) => localized(text, locale);

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{intro}</p>
        <p className="mt-1 text-xs text-slate-400">
          {updatedLabel}: {updated}
        </p>
      </header>

      <div className="space-y-6">
        {sections.map((section) => (
          <section key={lt(section.heading)}>
            <h2 className="font-semibold text-slate-900">{lt(section.heading)}</h2>
            <div className="mt-2 space-y-2">
              {section.body.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-slate-600">
                  {lt(para)}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
