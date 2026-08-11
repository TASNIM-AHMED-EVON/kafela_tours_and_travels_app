-- Kafela Tours & Travels - Supabase schema
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

-- ============================================================================
-- ALREADY SET UP YOUR DATABASE BEFORE? Run ONLY the block(s) below that apply
-- to you (SQL Editor -> New query -> paste -> Run), then skip to the bottom.
-- These are safe to run on top of an existing database — they don't touch
-- your existing rows.
-- ============================================================================

-- Adds pickup date/time columns (skip if you already ran this before):
-- alter table public.packages add column if not exists pickup_date date;
-- alter table public.packages add column if not exists pickup_time time;

-- Adds the homepage banner carousel (admin-managed slideshow between the
-- header and hero text). Run this if you already set up your database
-- before this feature existed — requires is_admin() to already exist
-- (see the SECURITY UPGRADE block below if you haven't run that yet):
/*
create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  link_url text,
  title text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.banners enable row level security;

drop policy if exists "Public can read banners" on public.banners;
create policy "Public can read banners" on public.banners for select using (true);

drop policy if exists "Admins can insert banners" on public.banners;
create policy "Admins can insert banners" on public.banners for insert to authenticated with check (public.is_admin());

drop policy if exists "Admins can update banners" on public.banners;
create policy "Admins can update banners" on public.banners for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins can delete banners" on public.banners;
create policy "Admins can delete banners" on public.banners for delete to authenticated using (public.is_admin());

insert into storage.buckets (id, name, public) values ('banner-images', 'banner-images', true) on conflict (id) do nothing;

drop policy if exists "Public can view banner images" on storage.objects;
create policy "Public can view banner images" on storage.objects for select using (bucket_id = 'banner-images');

drop policy if exists "Admins can upload banner images" on storage.objects;
create policy "Admins can upload banner images" on storage.objects for insert to authenticated with check (bucket_id = 'banner-images' and public.is_admin());

drop policy if exists "Admins can update banner images" on storage.objects;
create policy "Admins can update banner images" on storage.objects for update to authenticated using (bucket_id = 'banner-images' and public.is_admin());

drop policy if exists "Admins can delete banner images" on storage.objects;
create policy "Admins can delete banner images" on storage.objects for delete to authenticated using (bucket_id = 'banner-images' and public.is_admin());
*/

-- SECURITY UPGRADE - run this if your site was set up before this fix.
-- It locks down write access to only accounts you explicitly approve, instead
-- of trusting any logged-in Supabase user. See "IMPORTANT SECURITY STEP" near
-- the bottom of this file for the required follow-up after running this.
/*
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;

-- A SECURITY DEFINER function lets policies check admin status internally
-- (with elevated privileges) without granting direct table access to
-- `authenticated` — direct access would let any logged-in user list who
-- the admins are, which is what `revoke all` above is meant to prevent.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Authenticated can insert packages" on public.packages;
drop policy if exists "Admins can insert packages" on public.packages;
create policy "Admins can insert packages"
  on public.packages for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Authenticated can update packages" on public.packages;
drop policy if exists "Admins can update packages" on public.packages;
create policy "Admins can update packages"
  on public.packages for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Authenticated can delete packages" on public.packages;
drop policy if exists "Admins can delete packages" on public.packages;
create policy "Admins can delete packages"
  on public.packages for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "Authenticated can upload package images" on storage.objects;
drop policy if exists "Admins can upload package images" on storage.objects;
create policy "Admins can upload package images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'package-images' and public.is_admin());

drop policy if exists "Authenticated can update package images" on storage.objects;
drop policy if exists "Admins can update package images" on storage.objects;
create policy "Admins can update package images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'package-images' and public.is_admin());

drop policy if exists "Authenticated can delete package images" on storage.objects;
drop policy if exists "Admins can delete package images" on storage.objects;
create policy "Admins can delete package images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'package-images' and public.is_admin());
*/

-- ALREADY RAN THE OLDER VERSION OF THE SECURITY UPGRADE ABOVE (the one
-- without is_admin())? You'll see "permission denied for table admins"
-- when saving. Run ONLY this small block to fix it — it's the same fix
-- as above, just isolated so you don't have to redo everything:
/*
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Admins can insert packages" on public.packages;
create policy "Admins can insert packages" on public.packages for insert to authenticated with check (public.is_admin());
drop policy if exists "Admins can update packages" on public.packages;
create policy "Admins can update packages" on public.packages for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admins can delete packages" on public.packages;
create policy "Admins can delete packages" on public.packages for delete to authenticated using (public.is_admin());
drop policy if exists "Admins can upload package images" on storage.objects;
create policy "Admins can upload package images" on storage.objects for insert to authenticated with check (bucket_id = 'package-images' and public.is_admin());
drop policy if exists "Admins can update package images" on storage.objects;
create policy "Admins can update package images" on storage.objects for update to authenticated using (bucket_id = 'package-images' and public.is_admin());
drop policy if exists "Admins can delete package images" on storage.objects;
create policy "Admins can delete package images" on storage.objects for delete to authenticated using (bucket_id = 'package-images' and public.is_admin());
*/
-- ============================================================================

-- 1. Table that holds every editable item for all 6 packages.
--    "category" tells the app + admin panel which package the row belongs to:
--    admission-search, group-tour, study-tour, family-tour, corporate-tour, custom-tour
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  category text not null check (
    category in (
      'admission-search',
      'group-tour',
      'study-tour',
      'family-tour',
      'corporate-tour',
      'custom-tour'
    )
  ),
  title text not null,
  location text,
  description text,
  cost numeric,
  image_url text,
  pickup_date date,
  pickup_time time,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists packages_category_idx on public.packages (category, display_order);

-- 2. A small allowlist table: only user IDs listed here can write to
--    `packages`. This means even if a stranger somehow creates a Supabase
--    Auth account (e.g. if public sign-ups get left on), they still can't
--    add/edit/delete anything unless their user ID is in this table.
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.admins enable row level security;
-- Nobody needs to query this table directly from the browser.
revoke all on public.admins from anon, authenticated;

-- A SECURITY DEFINER function lets the policies below check admin status
-- internally (with elevated privileges) without granting `authenticated`
-- direct SELECT on `admins` — direct access would let any logged-in user
-- list who the admins are, which the revoke above is meant to prevent.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- 3. Row Level Security: anyone can read (so the public website can show the
--    lists), but only accounts listed in `admins` can add/edit/delete.
alter table public.packages enable row level security;

drop policy if exists "Public can read packages" on public.packages;
create policy "Public can read packages"
  on public.packages for select
  using (true);

drop policy if exists "Admins can insert packages" on public.packages;
create policy "Admins can insert packages"
  on public.packages for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can update packages" on public.packages;
create policy "Admins can update packages"
  on public.packages for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete packages" on public.packages;
create policy "Admins can delete packages"
  on public.packages for delete
  to authenticated
  using (public.is_admin());

-- 4. Storage bucket for package photos (every package now supports an image).
insert into storage.buckets (id, name, public)
values ('package-images', 'package-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view package images" on storage.objects;
create policy "Public can view package images"
  on storage.objects for select
  using (bucket_id = 'package-images');

drop policy if exists "Admins can upload package images" on storage.objects;
create policy "Admins can upload package images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'package-images' and public.is_admin());

drop policy if exists "Admins can update package images" on storage.objects;
create policy "Admins can update package images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'package-images' and public.is_admin());

drop policy if exists "Admins can delete package images" on storage.objects;
create policy "Admins can delete package images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'package-images' and public.is_admin());

-- 5. Homepage banner carousel — an admin-managed slideshow shown between
--    the header and the hero text (like a "top up center" promo banner).
create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  link_url text,
  title text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.banners enable row level security;

drop policy if exists "Public can read banners" on public.banners;
create policy "Public can read banners"
  on public.banners for select
  using (true);

drop policy if exists "Admins can insert banners" on public.banners;
create policy "Admins can insert banners"
  on public.banners for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can update banners" on public.banners;
create policy "Admins can update banners"
  on public.banners for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete banners" on public.banners;
create policy "Admins can delete banners"
  on public.banners for delete
  to authenticated
  using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('banner-images', 'banner-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view banner images" on storage.objects;
create policy "Public can view banner images"
  on storage.objects for select
  using (bucket_id = 'banner-images');

drop policy if exists "Admins can upload banner images" on storage.objects;
create policy "Admins can upload banner images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'banner-images' and public.is_admin());

drop policy if exists "Admins can update banner images" on storage.objects;
create policy "Admins can update banner images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'banner-images' and public.is_admin());

drop policy if exists "Admins can delete banner images" on storage.objects;
create policy "Admins can delete banner images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'banner-images' and public.is_admin());

-- ============================================================================
-- IMPORTANT SECURITY STEP - do this after running the schema above, and
-- after creating your admin login under Authentication -> Users:
--
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'your-admin-email@example.com';
--
-- Replace the email with the exact one you log into /admin/login with. Do
-- this for every admin account. Without this step, NOBODY (not even your
-- own admin login) will be able to add/edit/delete packages, since the
-- policies above now require explicit allowlisting.
-- ============================================================================

-- 6. (Optional) seed the admission-search list with the original 26 universities.
-- Uncomment and run if you want to start with the old static list instead of
-- entering everything by hand in the admin panel.
/*
insert into public.packages (category, title, location, cost, display_order) values
('admission-search', 'ঢাকা বিশ্ববিদ্যালয় (DU)', 'ঢাকা', 750, 1),
('admission-search', 'রাজশাহী বিশ্ববিদ্যালয় (RU)', 'রাজশাহী', 1400, 2),
('admission-search', 'চট্টগ্রাম বিশ্ববিদ্যালয় (CU)', 'চট্টগ্রাম', 1700, 3),
('admission-search', 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় (JU)', 'সাভার, ঢাকা', 750, 4),
('admission-search', 'বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয় (BUET)', 'ঢাকা', 750, 5),
('admission-search', 'জগন্নাথ বিশ্ববিদ্যালয় (JnU)', 'ঢাকা (GST গুচ্ছ)', 750, 6),
('admission-search', 'শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (SUST)', 'সিলেট (GST গুচ্ছ)', 1500, 7),
('admission-search', 'খুলনা বিশ্ববিদ্যালয় (KU)', 'খুলনা (GST গুচ্ছ)', 1800, 8),
('admission-search', 'কুমিল্লা বিশ্ববিদ্যালয় (CoU)', 'কুমিল্লা (GST গুচ্ছ)', 1300, 9),
('admission-search', 'বাংলাদেশ কৃষি বিশ্ববিদ্যালয় (BAU)', 'ময়মনসিংহ (কৃষি গুচ্ছ)', null, 10);
*/
