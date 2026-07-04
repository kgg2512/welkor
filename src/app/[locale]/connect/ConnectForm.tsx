"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { submitForm } from "@/lib/submit";
import { LEGAL_CONTACT } from "@/data/legal";
import { getVisaTracks } from "@/data";
import { t as localized } from "@/data/types";

type Topic = "housing" | "tax" | "admin" | "community" | "general";
const TOPICS: Topic[] = ["housing", "tax", "admin", "community", "general"];

type Status = "idle" | "submitting" | "success" | "error";

export default function ConnectForm({
  locale,
  initialTopic,
}: {
  locale: string;
  initialTopic: Topic;
}) {
  const t = useTranslations("connect");
  const VISA_TRACKS = getVisaTracks();

  const [topic, setTopic] = useState<Topic>(initialTopic);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [visa, setVisa] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [rateLimited, setRateLimited] = useState(false);

  const canSubmit =
    status !== "submitting" && consent && name.trim() !== "" && email.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    // Honeypot: a bot filled the hidden field — pretend success, store nothing.
    if (company.trim() !== "") {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setRateLimited(false);

    const payload = {
      topic,
      name: name.trim(),
      email: email.trim(),
      nationality: nationality.trim() || null,
      visa_type: visa || null,
      message: message.trim() || null,
      locale,
      consent,
      source_path: typeof window !== "undefined" ? window.location.pathname : null,
    };

    const result = await submitForm("lead", payload);

    if (result.ok) {
      setStatus("success");
      return;
    }
    if (result.rateLimited) {
      setRateLimited(true);
      setStatus("error");
      return;
    }

    // Backend unreachable / not configured → fall back to the user's mail client.
    const subject = `[WelKor] ${topic} — ${name.trim()}`;
    const lines = [
      `Topic: ${topic}`,
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      nationality.trim() ? `Nationality: ${nationality.trim()}` : null,
      visa ? `Visa: ${visa}` : null,
      "",
      message.trim(),
    ].filter(Boolean);
    const href = `mailto:${LEGAL_CONTACT}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    if (typeof window !== "undefined") window.location.href = href;
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-900">{t("successTitle")}</p>
        <p className="mt-2 text-sm text-emerald-800">{t("successBody")}</p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
        >
          {t("backHome")} <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="topic" className="block text-sm font-semibold text-slate-900">
          {t("topicLabel")}
        </label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value as Topic)}
          className={inputClass}
        >
          {TOPICS.map((tp) => (
            <option key={tp} value={tp}>
              {t(`topic_${tp}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-900">
            {t("nameLabel")} <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
            {t("emailLabel")} <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nationality" className="block text-sm font-semibold text-slate-900">
            {t("nationalityLabel")}
          </label>
          <input
            id="nationality"
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className={inputClass}
            placeholder={t("optional")}
          />
        </div>
        <div>
          <label htmlFor="visa" className="block text-sm font-semibold text-slate-900">
            {t("visaLabel")}
          </label>
          <select
            id="visa"
            value={visa}
            onChange={(e) => setVisa(e.target.value)}
            className={inputClass}
          >
            <option value="">{t("visaUnknown")}</option>
            {VISA_TRACKS.map((track) => (
              <option key={track.slug} value={track.code}>
                {track.code} — {localized(track.name, locale)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
          placeholder={t("messagePlaceholder")}
        />
      </div>

      {/* Honeypot — hidden from humans, catches bots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <label className="flex items-start gap-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand focus:ring-brand"
        />
        <span>
          {t("consentPre")}{" "}
          <Link href="/privacy" className="text-brand underline">
            {t("consentPrivacy")}
          </Link>{" "}
          {t("consentAnd")}{" "}
          <Link href="/terms" className="text-brand underline">
            {t("consentTerms")}
          </Link>
          {t("consentPost")}
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
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>

      <p className="text-center text-xs text-slate-400">{t("disclaimer")}</p>
    </form>
  );
}
