-- Run this in Supabase SQL Editor after 0007_teacher_onboarding.sql.
-- 1. Removes the four sample workshops that were seeded in 0002, so the admin
--    can publish CEC's real workshops from the Admin Centre. Only these exact
--    titles are removed; workshops added through the dashboard are untouched.
-- 2. Lets visitors send "Request a Workshop" forms (for a whole school or an
--    individual) into the admin Inquiries inbox.
-- Safe to re-run.

delete from public.workshops
where title in (
  'Mastering Positive Discipline in Early Childhood Classrooms',
  'Foundational Phonics & Early Literacy Masterclass',
  'Hands-on Concrete Math for Early Childhood Classrooms',
  'Early Childhood Leadership & Enrollment Growth'
);

alter table public.inquiries
  drop constraint if exists inquiries_kind_check;
alter table public.inquiries
  add constraint inquiries_kind_check
  check (kind in ('consultation', 'workshop', 'workshop_request', 'contact', 'teacher_request', 'product'));
