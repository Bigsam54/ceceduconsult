-- Run this in Supabase SQL Editor after 0004_public_teacher_directory.sql.
-- Splits Learning Essentials into two sections: "School Resources" (the existing
-- furniture, play equipment and toys) and "Books". Existing products become
-- School Resources automatically. Safe to re-run.

alter table public.store_products
  add column if not exists section text not null default 'school-resources',
  add column if not exists author text not null default '';

alter table public.store_products
  drop constraint if exists store_products_section_check;
alter table public.store_products
  add constraint store_products_section_check
  check (section in ('school-resources', 'books'));