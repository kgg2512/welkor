-- WelKor — initial data model (Supabase / Postgres)
-- MVP runs on local mock data; this schema is the target for Phase 1 wiring.
-- Design reflects the legal model: WelKor stores info + connects to licensed
-- professionals; it is NOT the broker/tax agent of record.

-- =====================================================================
-- profiles : extends auth.users with foreigner-specific, locale & visa data
-- NOTE: 외국인등록번호/여권번호 = 고유식별정보 → store ONLY if separately
-- consented; prefer NOT storing in MVP. (개인정보보호법 §24)
-- =====================================================================
create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  nationality  text,                       -- ISO country code
  visa_type    text,                        -- 'e7' | 'e2' | 'd2' | ...
  locale       text not null default 'en',  -- 'en' | 'ko'
  created_at   timestamptz not null default now()
);

-- =====================================================================
-- professionals : licensed agents (공인중개사 / 세무사 / 행정사) on the marketplace
-- license_verified gates whether they can be connected to users.
-- =====================================================================
create table if not exists public.professionals (
  id               uuid primary key default gen_random_uuid(),
  kind             text not null check (kind in ('realtor','tax_accountant','admin_agent')),
  name             text not null,
  org              text,
  region           text,
  languages        text[] not null default '{}',
  license_no       text,
  license_verified boolean not null default false,
  contact          text,
  created_at       timestamptz not null default now()
);

-- =====================================================================
-- listings : real-estate adverts (information). Brokerage is done by the
-- linked professional, never by the platform.
-- =====================================================================
create table if not exists public.listings (
  id                uuid primary key default gen_random_uuid(),
  professional_id   uuid references public.professionals (id) on delete set null,
  title             text not null,
  area              text,
  deal_type         text not null check (deal_type in ('jeonse','wolse','monthly_furnished')),
  deposit_manwon    integer not null default 0,
  monthly_manwon    integer not null default 0,
  foreigner_friendly boolean not null default true,
  english_contract  boolean not null default false,
  notes             text,
  created_at        timestamptz not null default now()
);

-- =====================================================================
-- connection_requests : a user asks to be connected to a professional.
-- This is the lead/marketplace event (no fee splitting — CLO).
-- =====================================================================
create table if not exists public.connection_requests (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users (id) on delete cascade,
  professional_id  uuid references public.professionals (id) on delete cascade,
  listing_id       uuid references public.listings (id) on delete set null,
  topic            text not null check (topic in ('housing','tax','admin')),
  message          text,
  status           text not null default 'open' check (status in ('open','contacted','closed')),
  created_at       timestamptz not null default now()
);

-- =====================================================================
-- community_posts : Q&A / tips
-- =====================================================================
create table if not exists public.community_posts (
  id          uuid primary key default gen_random_uuid(),
  author_id   uuid references auth.users (id) on delete set null,
  category    text not null,
  title       text not null,
  body        text not null,
  reply_count integer not null default 0,
  created_at  timestamptz not null default now()
);

-- =====================================================================
-- Row Level Security (enable; policies to be refined in Phase 1)
-- =====================================================================
alter table public.profiles            enable row level security;
alter table public.connection_requests enable row level security;
alter table public.community_posts     enable row level security;

-- listings & professionals are publicly readable (advertisements)
alter table public.listings      enable row level security;
alter table public.professionals enable row level security;

create policy "listings are public"      on public.listings      for select using (true);
create policy "verified pros are public"  on public.professionals for select using (license_verified = true);

create policy "own profile"  on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "own requests" on public.connection_requests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "posts readable" on public.community_posts for select using (true);
create policy "own posts write" on public.community_posts
  for insert with check (auth.uid() = author_id);
