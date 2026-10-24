-- Gives an existing login admin access to /admin-dashboard.
-- 1. Replace the email below with the admin's login email (keep the quotes).
-- 2. Run in Supabase SQL Editor. Re-run any time to add another admin.

update public.user_roles
set role = 'admin'
where user_id = (select id from auth.users where email = 'cecadmin@gmail.com');

-- Every new login gets a starter teacher profile automatically; an admin isn't
-- a teacher, so remove it so it doesn't show up in the Teacher Approvals queue.
delete from public.teacher_profiles
where user_id = (select id from auth.users where email = 'cecadmin@gmail.com');

-- Check: this should list the account with role = admin.
select u.email, r.role
from public.user_roles r
join auth.users u on u.id = r.user_id
where r.role = 'admin';
