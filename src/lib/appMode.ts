/**
 * App data-source mode.
 *
 * Controls where page content comes from:
 *   - "demo"  (default)  → bundled investor-demo mockups in `src/data/demo/`.
 *                          This is the current live behavior.
 *   - "store"            → real Supabase data (empty until each dataset is wired).
 *
 * Switch with the `NEXT_PUBLIC_APP_MODE` env var. Anything other than the exact
 * string "store" resolves to "demo" so the live site can never accidentally fall
 * into an unwired store mode.
 */
export const APP_MODE: "demo" | "store" =
  process.env.NEXT_PUBLIC_APP_MODE === "store" ? "store" : "demo";
