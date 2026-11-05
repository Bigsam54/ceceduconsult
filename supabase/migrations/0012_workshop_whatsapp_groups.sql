-- Run this in Supabase SQL Editor after 0011_workshop_confirmation_emails.sql.
-- Each workshop can have a WhatsApp group link. Like the meeting link it is private:
-- people only receive it from register_for_workshop(), right after registering.
-- Also fills in the WhatsApp groups for the first two workshops.
-- Safe to re-run.

alter table public.workshop_meeting_links
  add column if not exists whatsapp_group_link text not null default '';

-- Same signature and return type as 0011, now also returning the WhatsApp group link
create or replace function public.register_for_workshop(
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
  v_links public.workshop_meeting_links%rowtype;
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

  select * into v_links from public.workshop_meeting_links where workshop_id = p_workshop_id;

  return jsonb_build_object(
    'registration_id', v_registration_id,
    'meeting_link', coalesce(v_links.meeting_link, ''),
    'whatsapp_group_link', coalesce(v_links.whatsapp_group_link, '')
  );
end;
$$;

grant execute on function public.register_for_workshop(uuid, text, text, text, text, integer) to anon, authenticated;

-- WhatsApp groups for the first two workshops (keeps any meeting link already saved)
insert into public.workshop_meeting_links (workshop_id, whatsapp_group_link)
select id, 'https://chat.whatsapp.com/J3fxeeuVfA89KUdwGPu7fC?s=cl&p=a&iam=2'
from public.workshops
where title = 'Introduction to Early Childhood Education'
on conflict (workshop_id) do update
  set whatsapp_group_link = excluded.whatsapp_group_link, updated_at = now();

insert into public.workshop_meeting_links (workshop_id, whatsapp_group_link)
select id, 'https://chat.whatsapp.com/KsK1jYJ6hjDDh9jdsetNLd?s=cl&p=a&iam=2'
from public.workshops
where title = 'Purposeful Play: A Powerful Strategy for Meaningful Learning in Early Childhood Education'
on conflict (workshop_id) do update
  set whatsapp_group_link = excluded.whatsapp_group_link, updated_at = now();
