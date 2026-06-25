"use client";

import { useMemo, useState } from "react";
import {
  WORK_ELIGIBILITY,
  JOB_FIELDS,
  rankChannels,
  getEligibility,
  getField,
  EPS,
  WORK24,
  KOTRA_GTC,
  HIKOREA,
  type WorkPermission,
} from "@/data/jobs";
import { t as localized, type LocalizedText } from "@/data/types";

interface Labels {
  visaQuestion: string;
  visaUnknown: string;
  fieldQuestion: string;
  fieldAny: string;
  block1Title: string;
  block1Empty: string;
  block2Title: string;
  block2Hint: string;
  block3Title: string;
  foreignerBadge: string;
  officialBadge: string;
  sponsorYes: string;
  sponsorNo: string;
  openExternal: string;
  permFull: string;
  permSponsored: string;
  permParttime: string;
  permInternship: string;
  permNone: string;
  conditionsLabel: string;
  allowedLabel: string;
  noteLabel: string;
  eps: string;
  work24: string;
  kotra: string;
  hikoreaScope: string;
  leaveNotice: string;
}

const PERMISSION_STYLE: Record<WorkPermission, string> = {
  full: "bg-emerald-100 text-emerald-800",
  sponsored: "bg-blue-100 text-blue-800",
  parttime: "bg-amber-100 text-amber-800",
  internship: "bg-amber-100 text-amber-800",
  none: "bg-rose-100 text-rose-800",
};

export default function JobsExplorer({
  locale,
  labels,
}: {
  locale: string;
  labels: Labels;
}) {
  const [visaCode, setVisaCode] = useState<string>(""); // "" = not chosen / unknown
  const [fieldId, setFieldId] = useState<string>(""); // "" = any

  const eligibility = useMemo(() => getEligibility(visaCode), [visaCode]);
  const field = useMemo(() => getField(fieldId), [fieldId]);

  // E-9 is an information carve-out — never a clickable board.
  const isE9 = visaCode === "E-9";

  const channels = useMemo(
    () => (isE9 ? [] : rankChannels(eligibility, field)),
    [eligibility, field, isE9],
  );

  const lt = (text: LocalizedText) => localized(text, locale);

  const permissionLabel = (p: WorkPermission): string =>
    ({
      full: labels.permFull,
      sponsored: labels.permSponsored,
      parttime: labels.permParttime,
      internship: labels.permInternship,
      none: labels.permNone,
    })[p];

  return (
    <div className="space-y-8">
      {/* ---- Filter controls ---- */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Visa */}
          <div>
            <label htmlFor="visa-select" className="block text-sm font-semibold text-slate-900">
              {labels.visaQuestion}
            </label>
            <select
              id="visa-select"
              value={visaCode}
              onChange={(e) => setVisaCode(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="">{labels.visaUnknown}</option>
              {WORK_ELIGIBILITY.map((e) => (
                <option key={e.code} value={e.code}>
                  {lt(e.name)}
                </option>
              ))}
            </select>
          </div>

          {/* Field */}
          <div>
            <label htmlFor="field-select" className="block text-sm font-semibold text-slate-900">
              {labels.fieldQuestion}
            </label>
            <select
              id="field-select"
              value={fieldId}
              onChange={(e) => setFieldId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="">{labels.fieldAny}</option>
              {JOB_FIELDS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.emoji} {lt(f.label)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick field chips — make the "result changes with selection" obvious */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFieldId("")}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              fieldId === ""
                ? "border-brand bg-brand text-white"
                : "border-slate-300 bg-white text-slate-600 hover:border-brand"
            }`}
          >
            {labels.fieldAny}
          </button>
          {JOB_FIELDS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFieldId(f.id)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                fieldId === f.id
                  ? "border-brand bg-brand text-white"
                  : "border-slate-300 bg-white text-slate-600 hover:border-brand"
              }`}
            >
              {f.emoji} {lt(f.label)}
            </button>
          ))}
        </div>
      </section>

      {/* ---- Block 1: What your visa legally allows ---- */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span aria-hidden>①</span>
          {labels.block1Title}
        </h2>

        {!eligibility ? (
          <p className="mt-3 text-sm text-slate-500">{labels.block1Empty}</p>
        ) : (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-900">{lt(eligibility.name)}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${PERMISSION_STYLE[eligibility.permission]}`}
              >
                {permissionLabel(eligibility.permission)}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  eligibility.employerSponsor
                    ? "bg-slate-200 text-slate-700"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {eligibility.employerSponsor ? labels.sponsorYes : labels.sponsorNo}
              </span>
            </div>

            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="font-medium text-slate-700">{labels.allowedLabel}</dt>
                <dd className="text-slate-600">{lt(eligibility.allowed)}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-700">{labels.conditionsLabel}</dt>
                <dd className="text-slate-600">{lt(eligibility.conditions)}</dd>
              </div>
              {eligibility.note && (
                <div>
                  <dt className="font-medium text-amber-700">{labels.noteLabel}</dt>
                  <dd className="text-amber-700/90">{lt(eligibility.note)}</dd>
                </div>
              )}
            </dl>

            <a
              href={eligibility.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-brand transition-colors hover:text-brand-dark hover:underline"
            >
              {labels.hikoreaScope} <span aria-hidden>↗</span>
            </a>
          </div>
        )}
      </section>

      {/* ---- Block 2: Matched channels (deep-links) ---- */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span aria-hidden>②</span>
          {labels.block2Title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{labels.block2Hint}</p>

        {isE9 ? (
          // E-9: no clickable board — EPS info only (legal carve-out)
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-sm text-rose-800">{lt({
              en: "E-9 employment is handled only through the government EPS. WelKor links to official EPS information only.",
              ko: "E-9 취업은 정부 고용허가제(EPS)를 통해서만 가능합니다. WelKor는 EPS 공식 정보만 안내합니다.",
            })}</p>
            <a
              href={EPS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-rose-700 hover:underline"
            >
              {labels.eps} <span aria-hidden>↗</span>
            </a>
          </div>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {channels.map((ch) => (
              <a
                key={ch.id}
                href={ch.buildUrl(field, locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-2 rounded-xl border border-slate-200 p-4 transition-all hover:border-brand hover:shadow-sm"
              >
                <span>
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-slate-900">{ch.name}</span>
                    {ch.foreignerFriendly && (
                      <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-indigo-700">
                        {labels.foreignerBadge}
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-600">{lt(ch.blurb)}</span>
                </span>
                <span className="shrink-0 text-sm font-medium text-brand" aria-hidden>↗</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ---- Block 3: Official & public ---- */}
      <section className="rounded-2xl border border-slate-300 bg-slate-50 p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span aria-hidden>③</span>
          {labels.block3Title}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <a
            href={WORK24}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-brand hover:shadow-sm"
          >
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900">Work24</span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-700">
                {labels.officialBadge}
              </span>
            </span>
            <span className="mt-0.5 block text-sm text-slate-600">{labels.work24}</span>
          </a>
          <a
            href={KOTRA_GTC}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-brand hover:shadow-sm"
          >
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900">KOTRA GTC</span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-700">
                {labels.officialBadge}
              </span>
            </span>
            <span className="mt-0.5 block text-sm text-slate-600">{labels.kotra}</span>
          </a>
          <a
            href={EPS}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-brand hover:shadow-sm"
          >
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900">EPS</span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-700">
                {labels.officialBadge}
              </span>
            </span>
            <span className="mt-0.5 block text-sm text-slate-600">{labels.eps}</span>
          </a>
        </div>
        <a
          href={HIKOREA}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium text-brand transition-colors hover:text-brand-dark hover:underline"
        >
          {labels.hikoreaScope} <span aria-hidden>↗</span>
        </a>
      </section>

      <p className="text-center text-xs text-slate-400">{labels.leaveNotice}</p>
    </div>
  );
}
