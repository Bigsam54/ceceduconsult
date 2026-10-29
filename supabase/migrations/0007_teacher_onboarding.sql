-- Run this in Supabase SQL Editor after 0006_admin_operations.sql.
-- New teachers must finish the onboarding steps (details, teaching info, Ghana Card)
-- before reaching their dashboard. Teachers who registered before this change are
-- marked as already onboarded so they keep going straight to their dashboard.
-- Safe to re-run: the backfill only happens the first time the column is added.

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'teacher_profiles' and column_name = 'onboarding_completed'
  ) then
    alter table public.teacher_profiles
      add column onboarding_completed boolean not null default false;

    update public.teacher_profiles set onboarding_completed = true;
  end if;
end $$;
