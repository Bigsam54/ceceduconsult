-- Run this in Supabase SQL Editor after 0003_teacher_identity_uploads.sql.
-- Publishes CEC-approved teachers to the public "Find a Teacher" directory.
--
-- teacher_profiles itself stays private (RLS: owner or admin only). This view
-- exposes ONLY approved teachers and ONLY public-safe columns - never email,
-- phone or Ghana Card images. It runs with the view owner's rights, which is
-- what lets visitors read it without opening up the underlying table.
-- Safe to re-run.

create or replace view public.public_teacher_directory as
select
  user_id,
  full_name,
  headline,
  teaching_level,
  location,
  qualification,
  salary_expectation,
  bio,
  skills,
  availability,
  avatar_url,
  experience_years,
  verified_at,
  created_at
from public.teacher_profiles
where verification_status = 'approved'
  and full_name <> '';

grant select on public.public_teacher_directory to anon, authenticated;
