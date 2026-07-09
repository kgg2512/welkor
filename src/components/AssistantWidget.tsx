"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { askAssistant, type AssistantRoute } from "@/lib/assistant";

interface Msg {
  role: "user" | "assistant";
  text: string;
  routes?: AssistantRoute[];
}

const MAX_LEN = 500;

export default function AssistantWidget() {
  const t = useTranslations("assistant");
  const locale = useLocale();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Greeting is seeded on first open (kept only in memory).
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", text: t("greeting") }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: message }]);
    setLoading(true);
    const reply = await askAssistant(message, locale);
    setMessages((m) => [
      ...m,
      { role: "assistant", text: reply.answer, routes: reply.routes },
    ]);
    setLoading(false);
  }

  const suggestions = [
    t("s_visa"),
    t("s_housing"),
    t("s_jobs"),
    t("s_tax"),
  ];

  return (
    <>
      {/* Floating toggle button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t("close") : t("openLabel")}
        aria-expanded={open}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform hover:scale-105 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 sm:bottom-6 sm:right-6"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 3c-4.97 0-9 3.36-9 7.5 0 2.3 1.25 4.36 3.2 5.73L5.5 20l3.6-1.9c.92.26 1.9.4 2.9.4 4.97 0 9-3.36 9-7.5S16.97 3 12 3z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("title")}
          className="fixed bottom-20 right-4 z-50 flex max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:bottom-24 sm:right-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 bg-brand px-4 py-3 text-white">
            <div>
              <p className="text-sm font-bold">{t("title")}</p>
              <p className="text-xs text-white/80">{t("subtitle")}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="rounded p-1 text-white/80 hover:bg-white/20 hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Persistent safety notice */}
          <p className="border-b border-amber-100 bg-amber-50 px-4 py-2 text-[11px] leading-snug text-amber-800">
            {t("notice")}
          </p>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-brand text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {m.text}
                </div>
                {m.routes && m.routes.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.routes.map((r, j) => (
                      <Link
                        key={`${i}-${j}`}
                        href={r.path}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1 rounded-full border border-brand/40 bg-brand-light/40 px-3 py-1.5 text-xs font-semibold text-brand-dark transition-colors hover:bg-brand-light"
                      >
                        {r.label} <span aria-hidden>→</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Starter suggestions (only before the user has asked anything) */}
            {messages.length <= 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-brand hover:text-brand"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="text-left">
                <div className="inline-flex items-center gap-1 rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-500">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-slate-100 p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={MAX_LEN}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              className="min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
            <button
              type="submit"
              disabled={loading || input.trim() === ""}
              aria-label={t("send")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 12l16-8-6 16-2.5-6.5L4 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
