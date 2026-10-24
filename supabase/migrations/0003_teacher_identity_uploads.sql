-- Run this in Supabase SQL Editor after 0002_content_management.sql.
-- Adds the teacher's profile photo, Ghana Card (front & back) image URLs,
-- contact/experience details from registration, and the admin verification status.
-- The files themselves live in Cloudinary; only their URLs are stored here.
-- Safe to re-run.

alter table public.teacher_profiles
  add column if not exists avatar_url text not null default '',
  add column if not exists ghana_card_front_url text not null default '',
  add column if not exists ghana_card_back_url text not null default '',
  add column if not exists phone text not null default '',
  add column if not exists experience_years integer not null default 0,
  add column if not exists verification_status text not null default 'pending',
  add column if not exists verified_at timestamptz;

alter table public.teacher_profiles
  drop constraint if exists teacher_profiles_verification_status_check;
alter table public.teacher_profiles
  add constraint teacher_profiles_verification_status_check
  check (verification_status in ('pending', 'approved', 'rejected'));

-- Only admins may change a teacher's verification. Teachers can still edit the
-- rest of their own profile, but any attempt to approve themselves is ignored.
create or replace function public.protect_teacher_verification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_admin() then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.verification_status := 'pending';
    new.verified_at := null;
  else
    new.verification_status := old.verification_status;
    new.verified_at := old.verified_at;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_protect_teacher_verification on public.teacher_profiles;
create trigger trg_protect_teacher_verification
before insert or update on public.teacher_profiles
for each row execute function public.protect_teacher_verification();

-- Re-create the signup trigger so the new registration fields are saved too.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_roles (user_id, role)
  values (new.id, 'teacher')
  on conflict (user_id) do nothing;

  insert into public.teacher_profiles (
    user_id, email, full_name, headline, teaching_level, location,
    qualification, salary_expectation, bio, availability,
    avatar_url, ghana_card_front_url, ghana_card_back_url, phone, experience_years
  )
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.raw_user_meta_data ->> 'headline', ''),
    coalesce(new.raw_user_meta_data ->> 'teaching_level', ''),
    coalesce(new.raw_user_meta_data ->> 'location', ''),
    coalesce(new.raw_user_meta_data ->> 'qualification', ''),
    coalesce(new.raw_user_meta_data ->> 'salary_expectation', ''),
    coalesce(new.raw_user_meta_data ->> 'bio', ''),
    coalesce(new.raw_user_meta_data ->> 'availability', 'Immediate'),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture', ''),
    coalesce(new.raw_user_meta_data ->> 'ghana_card_front_url', ''),
    coalesce(new.raw_user_meta_data ->> 'ghana_card_back_url', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    case
      when coalesce(new.raw_user_meta_data ->> 'experience_years', '') ~ '^\d+$'
        then (new.raw_user_meta_data ->> 'experience_years')::integer
      else 0
    end
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;
