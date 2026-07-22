-- Kafela Tours & Travels - Supabase schema
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

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
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists packages_category_idx on public.packages (category, display_order);

-- 2. Row Level Security: anyone can read (so the public website can show the
--    lists), but only a logged-in admin can add/edit/delete.
alter table public.packages enable row level security;

drop policy if exists "Public can read packages" on public.packages;
create policy "Public can read packages"
  on public.packages for select
  using (true);

drop policy if exists "Authenticated can insert packages" on public.packages;
create policy "Authenticated can insert packages"
  on public.packages for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update packages" on public.packages;
create policy "Authenticated can update packages"
  on public.packages for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete packages" on public.packages;
create policy "Authenticated can delete packages"
  on public.packages for delete
  to authenticated
  using (true);

-- 3. Storage bucket for the photos used on the 5 packages that show images
--    (every package except "ভর্তি পরীক্ষা প্যাকেজ", which is text-only).
insert into storage.buckets (id, name, public)
values ('package-images', 'package-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view package images" on storage.objects;
create policy "Public can view package images"
  on storage.objects for select
  using (bucket_id = 'package-images');

drop policy if exists "Authenticated can upload package images" on storage.objects;
create policy "Authenticated can upload package images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'package-images');

drop policy if exists "Authenticated can update package images" on storage.objects;
create policy "Authenticated can update package images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'package-images');

drop policy if exists "Authenticated can delete package images" on storage.objects;
create policy "Authenticated can delete package images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'package-images');

-- 4. (Optional) seed the admission-search list with the original 26 universities.
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
