-- Run this in Supabase SQL Editor after 0005_store_sections_books.sql.
-- Replaces every piece of sample data in the Admin Dashboard with real records:
--   1. inquiries            - one inbox for consultation bookings, workshop sign-ups,
--                             contact messages, teacher requests and store enquiries
--   2. teacher_activity_log - automatic "live movement" history (registrations,
--                             availability changes, verification decisions)
--   3. admin_appointments   - the admin calendar
--   4. broadcasts           - announcements from CEC, shown on teacher dashboards
--   5. teacher_profile_views- real profile view counts for teachers and admins
-- Safe to re-run.

-- 1. Inquiries -----------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('consultation', 'workshop', 'contact', 'teacher_request', 'product')),
  status text not null default 'new' check (status in ('new', 'in_progress', 'scheduled', 'completed', 'closed')),
  name text not null default '',
  email text not null default '',
  phone text not null default '',
  organization text not null default '',
  subject text not null default '',
  message text not null default '',
  preferred_date text not null default '',
  meeting_format text not null default '',
  reference_id text not null default '',
  quantity integer not null default 1 check (quantity between 1 and 100),
  admin_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_reference_idx on public.inquiries (kind, reference_id);

alter table public.inquiries enable row level security;

-- Visitors can submit, but only fresh inquiries without admin fields
drop policy if exists "Anyone can submit inquiries" on public.inquiries;
create policy "Anyone can submit inquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (status = 'new' and admin_notes = '');

drop policy if exists "Admins can view inquiries" on public.inquiries;
create policy "Admins can view inquiries"
  on public.inquiries for select
  using (public.is_admin());

drop policy if exists "Admins can update inquiries" on public.inquiries;
create policy "Admins can update inquiries"
  on public.inquiries for update
  using (public.is_admin());

drop policy if exists "Admins can delete inquiries" on public.inquiries;
create policy "Admins can delete inquiries"
  on public.inquiries for delete
  using (public.is_admin());

drop trigger if exists trg_inquiries_updated_at on public.inquiries;
create trigger trg_inquiries_updated_at
before update on public.inquiries
for each row execute function public.set_updated_at();

-- Workshop sign-ups take seats automatically
create or replace function public.reserve_workshop_seats()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.kind = 'workshop' and new.reference_id <> '' then
    update public.workshops
    set available_seats = greatest(available_seats - new.quantity, 0)
    where id::text = new.reference_id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_inquiries_reserve_seats on public.inquiries;
create trigger trg_inquiries_reserve_seats
after insert on public.inquiries
for each row execute function public.reserve_workshop_seats();

-- Teachers can see how many schools asked for them (the count only, never who)
create or replace function public.my_school_request_count()
returns integer
language sql
security definer
set search_path = public
stable
as $$
  select count(*)::integer from public.inquiries
  where kind = 'teacher_request' and reference_id = auth.uid()::text;
$$;

grant execute on function public.my_school_request_count() to authenticated;

-- 2. Teacher activity log --------------------------------------------------------
create table if not exists public.teacher_activity_log (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references auth.users(id) on delete cascade,
  teacher_name text not null default '',
  event text not null check (event in ('registered', 'availability_changed', 'verification_changed', 'note')),
  previous_value text not null default '',
  new_value text not null default '',
  changed_by text not null default 'system',
  note text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists teacher_activity_log_created_at_idx on public.teacher_activity_log (created_at desc);

alter table public.teacher_activity_log enable row level security;

drop policy if exists "Admins can view activity" on public.teacher_activity_log;
create policy "Admins can view activity"
  on public.teacher_activity_log for select
  using (public.is_admin());

drop policy if exists "Admins can add activity notes" on public.teacher_activity_log;
create policy "Admins can add activity notes"
  on public.teacher_activity_log for insert
  with check (public.is_admin());

create or replace function public.log_teacher_activity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor text := case when public.is_admin() then 'admin' when auth.uid() = new.user_id then 'teacher' else 'system' end;
begin
  if tg_op = 'INSERT' then
    insert into public.teacher_activity_log (teacher_id, teacher_name, event, new_value, changed_by)
    values (new.user_id, new.full_name, 'registered', new.availability, 'teacher');
    return new;
  end if;

  if new.availability is distinct from old.availability then
    insert into public.teacher_activity_log (teacher_id, teacher_name, event, previous_value, new_value, changed_by)
    values (new.user_id, new.full_name, 'availability_changed', old.availability, new.availability, actor);
  end if;

  if new.verification_status is distinct from old.verification_status then
    insert into public.teacher_activity_log (teacher_id, teacher_name, event, previous_value, new_value, changed_by)
    values (new.user_id, new.full_name, 'verification_changed', old.verification_status, new.verification_status, actor);
  end if;

  return new;
end;
$$;

drop trigger if exists trg_teacher_activity on public.teacher_profiles;
create trigger trg_teacher_activity
after insert or update on public.teacher_profiles
for each row execute function public.log_teacher_activity();

-- 3. Admin calendar --------------------------------------------------------------
create table if not exists public.admin_appointments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client_name text not null default '',
  organization text not null default '',
  phone text not null default '',
  appointment_date date not null,
  start_time text not null default '',
  kind text not null default 'Consultation',
  format text not null default 'In-Person',
  meeting_link text not null default '',
  notes text not null default '',
  status text not null default 'confirmed' check (status in ('confirmed', 'completed', 'cancelled')),
  inquiry_id uuid references public.inquiries(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.admin_appointments enable row level security;

drop policy if exists "Admins manage appointments" on public.admin_appointments;
create policy "Admins manage appointments"
  on public.admin_appointments for all
  using (public.is_admin())
  with check (public.is_admin());

-- 4. Broadcasts --------------------------------------------------------------------
create table if not exists public.broadcasts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  audience text not null default 'teachers' check (audience in ('teachers')),
  created_at timestamptz not null default now()
);

alter table public.broadcasts enable row level security;

drop policy if exists "Signed-in users can read broadcasts" on public.broadcasts;
create policy "Signed-in users can read broadcasts"
  on public.broadcasts for select
  to authenticated
  using (true);

drop policy if exists "Admins manage broadcasts" on public.broadcasts;
create policy "Admins manage broadcasts"
  on public.broadcasts for all
  using (public.is_admin())
  with check (public.is_admin());

-- 5. Profile views -----------------------------------------------------------------
create table if not exists public.teacher_profile_views (
  id bigint generated always as identity primary key,
  teacher_id uuid not null references auth.users(id) on delete cascade,
  viewed_at timestamptz not null default now()
);

create index if not exists teacher_profile_views_teacher_idx on public.teacher_profile_views (teacher_id, viewed_at desc);

alter table public.teacher_profile_views enable row level security;

drop policy if exists "Anyone can record a profile view" on public.teacher_profile_views;
create policy "Anyone can record a profile view"
  on public.teacher_profile_views for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Teachers see own views" on public.teacher_profile_views;
create policy "Teachers see own views"
  on public.teacher_profile_views for select
  using (auth.uid() = teacher_id or public.is_admin());
