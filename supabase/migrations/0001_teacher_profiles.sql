-- Run this whole file once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run: every statement uses "if not exists" / "or replace" / drop-then-create for policies.

-- 1. Roles table: one row per user, defaults everyone to 'teacher'.
--    Promote someone to admin later with:
--    update public.user_roles set role = 'admin' where user_id = '<their-auth-user-id>';
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'teacher' check (role in ('teacher', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;

drop policy if exists "Users can view own role" on public.user_roles;
create policy "Users can view own role"
  on public.user_roles for select
  using (auth.uid() = user_id);

-- 2. Helper function so RLS policies can check "is this user an admin?"
--    without ever recursively re-checking RLS on user_roles itself.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

-- 3. The actual teacher profile data, one row per teacher, linked to their login.
create table if not exists public.teacher_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  headline text not null default '',
  teaching_level text not null default '',
  location text not null default '',
  qualification text not null default '',
  salary_expectation text not null default '',
  bio text not null default '',
  skills text[] not null default '{}',
  availability text not null default 'Immediate',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.teacher_profiles enable row level security;

drop policy if exists "Teachers can view own profile" on public.teacher_profiles;
create policy "Teachers can view own profile"
  on public.teacher_profiles for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Teachers can insert own profile" on public.teacher_profiles;
create policy "Teachers can insert own profile"
  on public.teacher_profiles for insert
  with check (auth.uid() = user_id);

drop policy if exists "Teachers can update own profile" on public.teacher_profiles;
create policy "Teachers can update own profile"
  on public.teacher_profiles for update
  using (auth.uid() = user_id or public.is_admin());

-- Keep updated_at accurate on every edit.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_teacher_profiles_updated_at on public.teacher_profiles;
create trigger trg_teacher_profiles_updated_at
before update on public.teacher_profiles
for each row execute function public.set_updated_at();

-- 4. Every time someone signs up (email/password or Google), automatically
--    give them a 'teacher' role row and a starter teacher_profiles row, so
--    the dashboard has something to load the moment they first log in -
--    this runs as a trusted trigger, so it works even before email
--    confirmation completes (when the client has no session yet).
--    Registration form fields are passed in via signUp()'s "options.data"
--    and land here as new.raw_user_meta_data.
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
    qualification, salary_expectation, bio, availability
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
    coalesce(new.raw_user_meta_data ->> 'availability', 'Immediate')
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
