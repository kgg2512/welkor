/**
 * Single client-side entry point for all public submissions (leads + pro
 * applications). Posts to the Supabase Edge Function `submit`, which is the only
 * write path: it rate-limits by IP, optionally verifies Turnstile, validates,
 * and inserts via service_role. Anon has no direct table write.
 *
 * Returns ok=false (without rateLimited) when the backend is unreachable/not
 * configured, so the caller can fall back to mailto.
 */
const BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const FN_URL = BASE ? `${BASE}/functions/v1/submit` : null;

export type SubmitKind = "lead" | "application";

export interface SubmitResult {
  ok: boolean;
  rateLimited?: boolean;
}

export async function submitForm(
  kind: SubmitKind,
  payload: Record<string, unknown>,
  turnstileToken?: string,
): Promise<SubmitResult> {
  if (!FN_URL) return { ok: false };
  try {
    const res = await fetch(FN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ANON ? { apikey: ANON } : {}),
      },
      body: JSON.stringify({ kind, payload, turnstileToken }),
    });
    if (res.status === 429) return { ok: false, rateLimited: true };
    if (!res.ok) return { ok: false };
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
