# Data sources: demo vs. store

WelKor ships in one of two data modes, controlled by a single env var.

| Mode | `NEXT_PUBLIC_APP_MODE` | Content source | Status |
|------|------------------------|----------------|--------|
| **demo** (default) | unset / anything ≠ `store` | Bundled mockups in `src/data/demo/` | **Current live site.** Investor-demo content. |
| **store** | `store` | Real Supabase data | Not wired yet — every dataset returns empty until built. |

## How it works

- **`src/lib/appMode.ts`** — resolves `APP_MODE` from `NEXT_PUBLIC_APP_MODE`.
  Only the exact string `store` enables store mode; everything else falls back to
  `demo`, so the live site can never accidentally boot into an unwired store.
- **`src/data/index.ts`** — the single data-source boundary. Pages call getters
  (`getListings()`, `getJobs*()`, `getCommunityPosts()`, …) instead of importing
  mockups directly. In `demo` mode a getter returns its mockup; in `store` mode
  it returns an empty result and is marked `// TODO: Supabase 실데이터 배선`.
- **`src/data/demo/`** — the physically isolated demo dataset (mockups only).

## What is NOT demo data (stays in `src/data/`, imported directly)

- **`types.ts`** — shared types + the `t()` localization helper.
- **`pros.ts`** — Supabase-backed professional directory config (already real).
- **`legal.ts`** — Terms / Privacy / Pro-Terms + legal contact. These are
  mandatory legal documents that must render in **every** mode, so they are not
  routed through the demo/store switch (returning them empty in store mode would
  be a legal defect).

## Switching to store mode

1. Set `NEXT_PUBLIC_APP_MODE=store`.
2. Wire the real Supabase queries in `src/data/index.ts` where each getter is
   marked `// TODO: Supabase 실데이터 배선` (replace the empty return).
3. Set the Supabase env vars (`NEXT_PUBLIC_SUPABASE_URL`, `..._ANON_KEY`).

Until step 2 is done, store mode builds and runs without crashing — pages just
show their empty states.
