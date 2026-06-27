"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { submitForm } from "@/lib/submit";
import { t as localized } from "@/data/types";
import { PRO_KINDS, PRO_LANGUAGES, type ProKind } from "@/data/pros";

type Status = "idle" | "submitting" | "success" | "error";

export default function ApplyForm({ locale }: { locale: string }) {
  const t = useTranslations("pros");

  const [kind, setKind] = useState<ProKind>("realtor");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [region, setRegion] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [intro, setIntro] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [rateLimited, setRateLimited] = useState(false);

  const canSubmit =
    status !== "submitting" &&
    consent &&
    name.trim() !== "" &&
    licenseNo.trim() !== "" &&
    email.trim() !== "";

  function toggleLang(code: string) {
    setLanguages((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    if (company.trim() !== "") {
      setStatus("success");
      return;
    }
    setStatus("submitting");
    setRateLimited(false);

    const result = await submitForm("application", {
      kind,
      name: name.trim(),
      org: org.trim() || null,
      region: region.trim() || null,
      languages,
      license_no: licenseNo.trim(),
      contact_email: email.trim(),
      contact_phone: phone.trim() || null,
      intro: intro.trim() || null,
      locale,
      consent,
    });

    if (result.ok) {
      setStatus("success");
      return;
    }
    setRateLimited(Boolean(result.rateLimited));
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-900">{t("applySuccessTitle")}</p>
        <p className="mt-2 text-sm text-emerald-800">{t("applySuccessBody")}</p>
        <Link href="/pros" className="mt-4 inline-block text-sm font-medium text-brand hover:underline">
          {t("backToDirectory")} <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="kind" className="block text-sm font-semibold text-slate-900">
          {t("kindLabel")} <span className="text-rose-500">*</span>
        </label>
        <select
          id="kind"
          value={kind}
          onChange={(e) => setKind(e.target.value as ProKind)}
          className={inputClass}
        >
          {PRO_KINDS.map((k) => (
            <option key={k} value={k}>
              {t(`kind_${k}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-900">
            {t("proNameLabel")} <span className="text-rose-500">*</span>
          </label>
          <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="org" className="block text-sm font-semibold text-slate-900">
            {t("orgLabel")}
          </label>
          <input id="org" type="text" value={org} onChange={(e) => setOrg(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="license" className="block text-sm font-semibold text-slate-900">
            {t("licenseLabel")} <span className="text-rose-500">*</span>
          </label>
          <input id="license" type="text" required value={licenseNo} onChange={(e) => setLicenseNo(e.target.value)} className={inputClass} />
          <p className="mt-1 text-xs text-slate-400">{t("licenseHint")}</p>
        </div>
        <div>
          <label htmlFor="region" className="block text-sm font-semibold text-slate-900">
            {t("regionLabel")}
          </label>
          <input id="region" type="text" value={region} onChange={(e) => setRegion(e.target.value)} className={inputClass} placeholder={t("regionPlaceholder")} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
            {t("proEmailLabel")} <span className="text-rose-500">*</span>
          </label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-900">
            {t("phoneLabel")}
          </label>
          <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} autoComplete="tel" />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-slate-900">{t("langLabel")}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRO_LANGUAGES.map((l) => (
            <button
              type="button"
              key={l.code}
              onClick={() => toggleLang(l.code)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                languages.includes(l.code)
                  ? "border-brand bg-brand text-white"
                  : "border-slate-300 bg-white text-slate-600 hover:border-brand"
              }`}
            >
              {localized(l.label, locale)}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="intro" className="block text-sm font-semibold text-slate-900">
          {t("introLabel")}
        </label>
        <textarea id="intro" rows={4} value={intro} onChange={(e) => setIntro(e.target.value)} className={inputClass} placeholder={t("introPlaceholder")} />
      </div>

      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>

      <label className="flex items-start gap-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand focus:ring-brand"
        />
        <span>
          {t("proConsentPre")}{" "}
          <Link href="/pros/terms" className="text-brand underline">
            {t("proConsentTerms")}
          </Link>{" "}
          {t("consentAnd")}{" "}
          <Link href="/privacy" className="text-brand underline">
            {t("proConsentPrivacy")}
          </Link>
          {t("proConsentPost")}
        </span>
      </label>

      {status === "error" && (
        <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          {rateLimited ? t("rateLimited") : t("errorBody")}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? t("submitting") : t("applySubmit")}
      </button>

      <p className="text-center text-xs text-slate-400">{t("applyDisclaimer")}</p>
    </form>
  );
}
