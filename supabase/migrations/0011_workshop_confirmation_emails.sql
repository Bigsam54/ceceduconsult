-- Run this in Supabase SQL Editor after 0010_workshop_meeting_links.sql.
-- Workshop registrants get a confirmation email (with the join link for online
-- workshops). register_for_workshop() now also returns the registration id, which
-- the website's /api/workshop-confirmation function uses to send that email once.
-- Safe to re-run.

alter table public.inquiries
  add column if not exists confirmation_sent_at timestamptz;

-- The return type changes (text -> jsonb), so the old version is dropped first
drop function if exists public.register_for_workshop(uuid, text, text, text, text, integer);

create function public.register_for_workshop(
  p_workshop_id uuid,
  p_name text,
  p_email text,
  p_phone text,
  p_organization text,
  p_quantity integer
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_workshop public.workshops%rowtype;
  v_link text;
  v_registration_id uuid;
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
  )
  returning id into v_registration_id;

  select meeting_link into v_link from public.workshop_meeting_links where workshop_id = p_workshop_id;

  return jsonb_build_object(
    'registration_id', v_registration_id,
    'meeting_link', coalesce(v_link, '')
  );
end;
$$;

grant execute on function public.register_for_workshop(uuid, text, text, text, text, integer) to anon, authenticated;
