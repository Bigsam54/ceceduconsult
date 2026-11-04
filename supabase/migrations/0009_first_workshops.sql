-- Run this in Supabase SQL Editor after 0008_workshop_requests.sql.
-- Publishes CEC's first two free workshops with their flyers from Cloudinary:
--   1. Introduction to Early Childhood Education (online, 28 November 2026)
--   2. Purposeful Play (Takoradi, 19 December 2026)
-- Safe to re-run: each workshop is only added once.
-- After this, add or edit workshops from Admin Centre -> Workshops.

insert into public.workshops (title, category, date, time, venue, price, available_seats, total_seats, description, image)
select
  'Introduction to Early Childhood Education',
  'General',
  'Saturday, 28 November 2026',
  '3:00 PM',
  'Online',
  'Free',
  0,
  0,
  E'Join us for an intensive free workshop designed to boost your knowledge in early childhood education.\n\nCertificate available on request. To register by phone, call +233 54 363 3161.',
  'https://res.cloudinary.com/qg0w6ewi/image/upload/v1793822205/cec/workshops/pqt90jpw7ewkqazppgxx.png'
where not exists (
  select 1 from public.workshops where title = 'Introduction to Early Childhood Education'
);

insert into public.workshops (title, category, date, time, venue, price, available_seats, total_seats, description, image)
select
  'Purposeful Play: A Powerful Strategy for Meaningful Learning in Early Childhood Education',
  'General',
  'Saturday, 19 December 2026',
  '9:30 AM',
  'Hotel Messiah, Airport-Ridge, Takoradi',
  'Free',
  0,
  0,
  E'A free workshop for early childhood educators, hosted by Miss Nancie. For teachers, school owners, school leaders and parents.\n\nEnhance your teaching skills with practical strategies, modern classroom methods and fresh ideas for more effective learning.\n\nCertificate available on request. To register by phone, call +233 54 363 3161.',
  'https://res.cloudinary.com/qg0w6ewi/image/upload/v1793822130/cec/workshops/ftqub1yovobecnfu7i5w.png'
where not exists (
  select 1 from public.workshops
  where title = 'Purposeful Play: A Powerful Strategy for Meaningful Learning in Early Childhood Education'
);
