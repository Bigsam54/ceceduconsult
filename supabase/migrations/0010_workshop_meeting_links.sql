-- Run this in Supabase SQL Editor after 0009_first_workshops.sql.
-- Online workshops get a private meeting link (Zoom / Google Meet). The link is
-- NOT readable from the public workshops table: a visitor only receives it from
-- register_for_workshop(), which records their registration first.
-- Safe to re-run.

create table if not exists public.workshop_meeting_links (
  workshop_id uuid primary key references public.workshops(id) on delete cascade,
  meeting_link text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.workshop_meeting_links enable row level security;

drop policy if exists "Admins manage workshop meeting links" on public.workshop_meeting_links;
create policy "Admins manage workshop meeting links"
  on public.workshop_meeting_links for all
  using (public.is_admin())
  with check (public.is_admin());

-- Registers someone for a workshop (saved to the admin inbox, seats reserved by the
-- existing trigger) and returns the meeting link, if the workshop has one.
create or replace function public.register_for_workshop(
  p_workshop_id uuid,
  p_name text,
  p_email text,
  p_phone text,
  p_organization text,
  p_quantity integer
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_workshop public.workshops%rowtype;
  v_link text;
begin
  select * into v_workshop from public.workshops where id = p_workshop_id;
  if not found then
    raise exception 'Workshop not found';
  end if;

  if coalesce(trim(p_name), '') = '' or coalesce(trim(p_phone), '') = '' then
    raise exception 'Name and phone number are required';
  end if;

  insert into public.inquiries (kind, name, email, phone, organization, subject, preferred_date, reference_id, quantity)
  values (
    'workshop',
    left(trim(p_name), 200),
    left(trim(coalesce(p_email, '')), 200),
    left(trim(p_phone), 50),
    left(trim(coalesce(p_organization, '')), 200),
    v_workshop.title,
    trim(concat_ws(' · ', nullif(v_workshop.date, ''), nullif(v_workshop.time, ''))),
    v_workshop.id::text,
    greatest(1, least(coalesce(p_quantity, 1), 100))
  );

  select meeting_link into v_link from public.workshop_meeting_links where workshop_id = p_workshop_id;
  return coalesce(v_link, '');
end;
$$;

grant execute on function public.register_for_workshop(uuid, text, text, text, text, integer) to anon, authenticated;
