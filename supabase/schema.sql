-- ============================================================================
-- VEXALED — Supabase schema (products, specs, categories, leads, admin roles)
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query → paste → Run).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE where possible.
-- ============================================================================

-- Extensions ----------------------------------------------------------------
create extension if not exists "pgcrypto";   -- gen_random_uuid()

-- ---------------------------------------------------------------------------
-- Helper: auto-update updated_at on row change
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- ROLES / ADMIN  (profiles mirror auth.users and carry a role)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  role        text not null default 'viewer' check (role in ('admin','editor','viewer')),
  created_at  timestamptz not null default now()
);

-- Helper used by RLS policies to check the current user is an admin/editor.
create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin','editor')
  );
$$;

-- Auto-create a profile row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- CATEGORIES
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  description text,
  image_url   text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
drop trigger if exists trg_categories_updated on public.categories;
create trigger trg_categories_updated before update on public.categories
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- PRODUCTS  (filterable specs as first-class columns + extra_specs JSONB)
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  name            text not null,
  category_id     uuid references public.categories(id) on delete set null,
  status          text not null default 'draft' check (status in ('draft','published')),
  short_desc      text,
  long_desc       text,
  hero_image      text,
  gallery         jsonb not null default '[]'::jsonb,   -- array of image URLs
  spec_sheet_url  text,                                  -- PDF datasheet

  -- Filterable / comparable specs ---------------------------------------
  pixel_pitch_mm   numeric(5,2),
  brightness_nits  int,
  refresh_rate_hz  int,
  ip_rating        text,
  environment      text check (environment in ('indoor','outdoor','both')),
  cabinet_width_mm  int,
  cabinet_height_mm int,
  cabinet_depth_mm  int,
  weight_kg         numeric(6,2),
  power_avg_w       int,
  power_max_w       int,
  viewing_angle     text,
  extra_specs       jsonb not null default '{}'::jsonb,  -- any additional spec key/values

  -- Catalog / merchandising --------------------------------------------
  subgroup      text,                                     -- 'indoor' | 'outdoor' | 'poster'
  application   text,                                     -- 'corporate' | 'broadcast' | 'advertising' | 'events'
  pitch_class   text,                                     -- 'fine' | 'standard' | 'coarse' (for filtering)
  layout        text not null default 'standard-premium', -- which bespoke experience renders this product
  variant_tabs  jsonb not null default '[]'::jsonb,       -- multi-variant spec tables (see catalog.ts ProductVariantTab[])

  -- Per-page SEO --------------------------------------------------------
  seo_title       text,
  seo_description text,

  is_featured     boolean not null default false,
  sort_order      int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
drop trigger if exists trg_products_updated on public.products;
create trigger trg_products_updated before update on public.products
  for each row execute function public.set_updated_at();

create index if not exists idx_products_category   on public.products(category_id);
create index if not exists idx_products_status      on public.products(status);
create index if not exists idx_products_environment on public.products(environment);
create index if not exists idx_products_pitch       on public.products(pixel_pitch_mm);
create index if not exists idx_products_subgroup    on public.products(subgroup);
create index if not exists idx_products_application on public.products(application);
create index if not exists idx_products_pitch_class on public.products(pitch_class);

-- ---------------------------------------------------------------------------
-- LEADS  (public contact / quote requests)
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  email            text not null,
  company          text,
  country          text,
  job_title        text,
  product_interest text,
  message          text,
  source           text default 'website',   -- which page/CTA produced it
  status           text not null default 'new' check (status in ('new','contacted','qualified','closed')),
  created_at       timestamptz not null default now()
);
create index if not exists idx_leads_status  on public.leads(status);
create index if not exists idx_leads_created  on public.leads(created_at desc);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table public.profiles   enable row level security;
alter table public.categories enable row level security;
alter table public.products   enable row level security;
alter table public.leads      enable row level security;

-- PROFILES: a user sees their own row; staff see all; staff manage all.
drop policy if exists profiles_select_self on public.profiles;
create policy profiles_select_self on public.profiles
  for select using (id = auth.uid() or public.is_staff());

drop policy if exists profiles_staff_all on public.profiles;
create policy profiles_staff_all on public.profiles
  for all using (public.is_staff()) with check (public.is_staff());

-- CATEGORIES: public read; staff write.
drop policy if exists categories_public_read on public.categories;
create policy categories_public_read on public.categories
  for select using (true);

drop policy if exists categories_staff_write on public.categories;
create policy categories_staff_write on public.categories
  for all using (public.is_staff()) with check (public.is_staff());

-- PRODUCTS: public can read ONLY published; staff read/write everything.
drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products
  for select using (status = 'published' or public.is_staff());

drop policy if exists products_staff_write on public.products;
create policy products_staff_write on public.products
  for all using (public.is_staff()) with check (public.is_staff());

-- LEADS: anyone (anon) can INSERT a lead from the public form; only staff read/manage.
drop policy if exists leads_public_insert on public.leads;
create policy leads_public_insert on public.leads
  for insert with check (true);

drop policy if exists leads_staff_read on public.leads;
create policy leads_staff_read on public.leads
  for select using (public.is_staff());

drop policy if exists leads_staff_update on public.leads;
create policy leads_staff_update on public.leads
  for update using (public.is_staff()) with check (public.is_staff());

-- ============================================================================
-- STORAGE buckets (run once; or create in Dashboard → Storage)
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('product-media', 'product-media', true)
on conflict (id) do nothing;

-- Public read of product media; staff upload/update/delete.
drop policy if exists product_media_public_read on storage.objects;
create policy product_media_public_read on storage.objects
  for select using (bucket_id = 'product-media');

drop policy if exists product_media_staff_write on storage.objects;
create policy product_media_staff_write on storage.objects
  for all using (bucket_id = 'product-media' and public.is_staff())
  with check (bucket_id = 'product-media' and public.is_staff());

-- ============================================================================
-- DONE. Next: create your admin user (see SETUP.md), then promote to admin:
--   update public.profiles set role = 'admin' where email = 'you@vexaled.com';
-- ============================================================================
