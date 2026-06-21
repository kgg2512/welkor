# WelKor — Welcome to Korea (웰코)

One-stop, multilingual (EN/KO) settlement platform for foreigners in Korea.
From **visa → housing → job → tax → community**, a step-by-step journey tailored
to each visa type, connecting users to **verified licensed professionals**
(공인중개사 · 세무사 · 행정사).

> **Legal model (non-negotiable):** WelKor is an **information + connection**
> platform. It is **not** a real-estate broker, tax agent or administrative
> agent. Licensed professionals perform regulated services. See
> [docs/FOUNDATION.md](docs/FOUNDATION.md).

G2 Company Ltd — Project #5. C2B + C2G.

## Stack

- **Next.js 15** (App Router) + **next-intl** (EN/KO, SEO-friendly SSG/SSR)
- **Tailwind CSS** (function-first, minimal design for now)
- **Supabase** (optional — the app runs fully on local mock data without it)
- Deploy target: **Vercel**

## Run

```bash
cd welkor
npm install
npm run dev        # http://localhost:3000 → redirects to /en
npm run build      # production build (static where possible)
```

Supabase is optional. To wire real data later, copy `.env.example` to
`.env.local` and fill in the keys; until then the app uses `src/data/*`.

## Structure

```
welkor/
├─ messages/            en.json, ko.json   (UI strings)
├─ supabase/schema.sql  target data model
├─ docs/FOUNDATION.md   strategy, legal model, roadmap
└─ src/
   ├─ i18n/             routing, request, navigation (next-intl)
   ├─ middleware.ts     locale routing
   ├─ data/             visas (journey engine), listings, tax, community
   ├─ lib/supabase.ts   optional client
   ├─ components/       SiteHeader, SiteFooter
   └─ app/[locale]/     home, journey/[visa], housing, tax, community
```

## The Settlement Journey Engine

The core differentiator. `src/data/visas.ts` defines an ordered, visa-specific
path (E-7 professional, E-2 teacher, D-2/D-4 student). Each step carries an
**official source link** (so users can verify) and/or an **in-platform
connection** (housing, tax, community). Add a new visa by appending a
`VisaTrack` — the home selector and `/journey/[visa]` pick it up automatically.

## Target segments (Phase 1)

E-7 professionals + E-2 English teachers (primary), D-2/D-4 students (funnel).
E-9 is **excluded** (EPS state monopoly — private brokering is illegal).
