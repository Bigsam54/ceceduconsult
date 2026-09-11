-- Run this in Supabase SQL Editor after 0001_teacher_profiles.sql.
-- Creates real, admin-editable tables for Workshops and the Learning
-- Essentials Store, so content can be added/edited from the Admin
-- Dashboard instead of hardcoded in the app's source code.

-- 1. Workshops (public events page)
create table if not exists public.workshops (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  date text not null,
  time text not null,
  venue text not null,
  price text not null default '',
  available_seats integer not null default 0,
  total_seats integer not null default 0,
  description text not null default '',
  image text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.workshops enable row level security;

drop policy if exists "Anyone can view workshops" on public.workshops;
create policy "Anyone can view workshops"
  on public.workshops for select
  using (true);

drop policy if exists "Admins can insert workshops" on public.workshops;
create policy "Admins can insert workshops"
  on public.workshops for insert
  with check (public.is_admin());

drop policy if exists "Admins can update workshops" on public.workshops;
create policy "Admins can update workshops"
  on public.workshops for update
  using (public.is_admin());

drop policy if exists "Admins can delete workshops" on public.workshops;
create policy "Admins can delete workshops"
  on public.workshops for delete
  using (public.is_admin());

drop trigger if exists trg_workshops_updated_at on public.workshops;
create trigger trg_workshops_updated_at
before update on public.workshops
for each row execute function public.set_updated_at();

-- 2. Store products (Learning Essentials shop)
create table if not exists public.store_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price numeric not null default 0,
  price_display text,
  rating numeric not null default 0,
  reviews integer not null default 0,
  image text not null default '',
  images text[] not null default '{}',
  description text not null default '',
  in_stock boolean not null default true,
  age_group text not null default '',
  is_featured boolean not null default false,
  specs text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.store_products enable row level security;

drop policy if exists "Anyone can view products" on public.store_products;
create policy "Anyone can view products"
  on public.store_products for select
  using (true);

drop policy if exists "Admins can insert products" on public.store_products;
create policy "Admins can insert products"
  on public.store_products for insert
  with check (public.is_admin());

drop policy if exists "Admins can update products" on public.store_products;
create policy "Admins can update products"
  on public.store_products for update
  using (public.is_admin());

drop policy if exists "Admins can delete products" on public.store_products;
create policy "Admins can delete products"
  on public.store_products for delete
  using (public.is_admin());

drop trigger if exists trg_store_products_updated_at on public.store_products;
create trigger trg_store_products_updated_at
before update on public.store_products
for each row execute function public.set_updated_at();

-- 3. Seed both tables with the content that used to be hardcoded, so the
--    public pages look identical on day one. Skipped automatically if you
--    re-run this file (won't duplicate rows).
do $$
begin
  if (select count(*) from public.workshops) = 0 then
    insert into public.workshops (title, category, date, time, venue, price, available_seats, total_seats, description, image) values
      ('Mastering Positive Discipline in Early Childhood Classrooms', 'Classroom Management', 'Saturday, August 15, 2026', '10:00 AM - 2:00 PM GMT', 'CEC Training Center & Global Zoom Live', 'GH₵ 600', 8, 40, 'Learn proven non-punitive strategies to manage toddler tantrums, promote self-regulation and create a calm, cooperative early learning environment.', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop'),
      ('Foundational Phonics & Early Literacy Masterclass', 'Early Literacy & Phonics', 'Saturday, August 22, 2026', '09:00 AM - 1:00 PM GMT', 'CEC Learning Hub & Virtual Masterclass', 'GH₵ 680', 5, 35, 'Master letter-sound correspondence, blending strategies, tricky words and kinesthetic games that get 3-year-olds reading fluently within months.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop'),
      ('Hands-on Concrete Math for Early Childhood Classrooms', 'Early STEM & Math', 'Saturday, September 5, 2026', '10:00 AM - 3:00 PM GMT', 'Virtual Interactive Masterclass via Zoom (International)', 'GH₵ 480', 14, 50, 'Transform abstract numbers into tangible experiences using tactile number rods, bead counters and sensorial concrete aids.', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'),
      ('Early Childhood Leadership & Enrollment Growth', 'Early Childhood Leadership', 'Saturday, September 19, 2026', '11:00 AM - 3:00 PM GMT', 'CEC Executive Suite & International Hybrid Stream', 'GH₵ 1,300', 6, 25, 'Strategic roadmap for early childhood center directors: fee pricing, parent satisfaction, teacher retention and brand positioning.', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop');
  end if;

  if (select count(*) from public.store_products) = 0 then
    insert into public.store_products (name, category, price, price_display, rating, reviews, image, images, description, in_stock, age_group, is_featured, specs) values
      ('Moon Arc Adjustment Table with a Chair', 'Child-Friendly Furniture', 950, 'GH₵ 950', 4.9, 32, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701034/WhatsApp_Image_2026-09-03_at_3.48.29_PM_2.jpg', ARRAY[]::text[], 'Ergonomic crescent moon adjustable-height activity table with a matching child posture support chair. Ideal for collaborative early years learning and individual focus.', true, 'Preschool & Kindergarten', true, null),
      ('Mini Shop', 'Sensory & Play', 946, 'GH₵ 946', 5, 44, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701034/WhatsApp_Image_2026-09-03_at_3.48.33_PM_1.jpg', ARRAY['https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701034/WhatsApp_Image_2026-09-03_at_3.48.33_PM_1.jpg', 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701034/WhatsApp_Image_2026-09-03_at_3.48.33_PM_2.jpg', 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701031/WhatsApp_Image_2026-09-03_at_3.48.33_PM_3.jpg']::text[], 'Interactive child-sized storefront kiosk for imaginative dramatic play, early social commerce, counting practice, and language development.', true, 'Ages 3 - 8', true, null),
      ('Preschool Adjustable Table Set with Chairs', 'Child-Friendly Furniture', 2268, 'GH₵ 2,268', 4.9, 27, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701034/WhatsApp_Image_2026-09-03_at_3.48.31_PM_3.jpg', ARRAY[]::text[], 'Heavy-duty adjustable classroom table complete with sturdy ergonomic preschool chairs designed for active group activities, crafts, and meal times.', true, 'Preschool & Early Primary', true, null),
      ('Preschool Chairs', 'Child-Friendly Furniture', 180, 'Contact for Quote / Bulk', 4.8, 35, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701033/WhatsApp_Image_2026-09-03_at_3.48.31_PM_1.jpg', ARRAY[]::text[], 'Stackable, child-safe ergonomic preschool chairs with non-slip footpads. Durable, easy to clean, and contoured for healthy posture.', true, 'Preschool (Ages 2 - 6)', false, null),
      ('Trampoline with Safety Net', 'Outdoor & Play Equipment', 7000, '14ft: GH₵ 7,000 | 16ft: GH₵ 8,700', 5, 19, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701031/WhatsApp_Image_2026-09-03_at_3.48.31_PM.jpg', ARRAY[]::text[], 'Commercial-grade outdoor trampoline equipped with heavy-duty galvanized steel springs, UV-resistant jumping mat, and complete 360-degree protective enclosure net.', true, 'Ages 3 - 12+', true, 'Available sizes: 14ft (GH₵ 7,000) and 16ft (GH₵ 8,700)'),
      ('Large Strong Magnet Versatile Educational Magnetic Rods - Children''s Toy, 2nd Generation Upgraded Magnetic Safety Design for Early Education Development', 'Educational Toys', 200, 'GH₵ 200 - 700+ (Based on pcs)', 4.9, 62, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701031/WhatsApp_Image_2026-09-03_at_3.48.29_PM_1.jpg', ARRAY[]::text[], '2nd generation upgraded safety magnetic rods and balls. Empowers children to build 3D geometric shapes, architectural structures, and explore magnetism safely.', true, 'Ages 3 - 8', true, 'Range from GH₵ 200 to GH₵ 700+ depending on piece count'),
      ('Children''s Desk, Study Table for Elementary School Students - Adjustable Height Writing Desk with Chair Set for Kids', 'Child-Friendly Furniture', 2900, 'GH₵ 2,900', 4.9, 21, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701031/WhatsApp_Image_2026-09-03_at_3.48.29_PM.jpg', ARRAY[]::text[], 'Adjustable-height study desk and chair set with tiltable desktop for writing, reading, and drawing. Includes book rack, pen holder groove, and bag hook.', true, 'Elementary / Primary Students', true, null),
      ('Children''s Learning Desk, Adjustable Height Writing Desk and Chair Set for Elementary School Students, Complete Furniture Set', 'Child-Friendly Furniture', 2900, 'GH₵ 2,900', 4.8, 18, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701030/WhatsApp_Image_2026-09-03_at_3.45.57_PM.jpg', ARRAY[]::text[], 'Complete elementary writing and learning workstation engineered for spine support and comfortable study sessions as learners grow.', true, 'Elementary School Students', false, null),
      ('Children Shelve Toy Holders', 'Child-Friendly Furniture', 600, 'GH₵ 600 - 1,200', 4.7, 29, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701031/WhatsApp_Image_2026-09-03_at_3.48.32_PM_2.jpg', ARRAY[]::text[], 'Accessible, child-height multi-bin storage organizer shelf. Promotes classroom independence, self-cleaning routines, and neat categorization of toys and learning aids.', true, 'All Early Years', true, 'Available in multiple tier configurations: GH₵ 600 - GH₵ 1,200'),
      ('Nursery Children Play Mat', 'Sensory & Play', 350, 'Contact for Sizing & Price', 4.9, 38, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701030/WhatsApp_Image_2026-09-03_at_3.48.30_PM_4.jpg', ARRAY['https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701030/WhatsApp_Image_2026-09-03_at_3.48.30_PM_4.jpg', 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701028/WhatsApp_Image_2026-09-03_at_3.48.30_PM_3.jpg']::text[], 'Cushioned, non-toxic waterproof play mat designed for safe crawling, sensory activities, and floor play in infant and toddler rooms.', true, 'Infant, Toddler & Nursery', false, null),
      ('Outdoor Slide for Children', 'Outdoor & Play Equipment', 12023, 'GH₵ 12,023', 5, 15, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701025/WhatsApp_Image_2026-09-03_at_3.48.30_PM_5.jpg', ARRAY[]::text[], 'Durable, weather-resistant outdoor playground slide unit with wide safety steps, sturdy handrails, and smooth landing zone for gross motor fun.', true, 'Ages 2 - 8', true, null),
      ('Children Plastic Assembly Educational Toy', 'Educational Toys', 135, 'GH₵ 135', 4.8, 41, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701026/WhatsApp_Image_2026-09-03_at_3.48.32_PM_5.jpg', ARRAY[]::text[], 'Colorful interlocking plastic parts encouraging mechanical creativity, spatial planning, and fine-motor dexterity in young builders.', true, 'Ages 3 - 7', false, null),
      ('Tetris Building Block Puzzle Toy', 'Educational Toys', 200, 'GH₵ 200', 4.9, 53, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701025/WhatsApp_Image_2026-09-03_at_3.48.32_PM_1.jpg', ARRAY[]::text[], 'Classic brain-teaser puzzle board with colorful geometric blocks. Enhances logical reasoning, pattern recognition, and problem-solving skills.', true, 'Ages 3 - 8', true, null),
      ('Shape Foam Building Set for Preschool, Baby Cognitive Development with Matching and Anti-Collision Design', 'Sensory & Play', 105, 'GH₵ 105', 4.8, 26, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701025/WhatsApp_Image_2026-09-03_at_3.48.33_PM.jpg', ARRAY[]::text[], 'Soft, anti-collision foam geometric matching blocks for safe infant and preschool stacking, shape identification, and tactile development.', true, 'Baby & Preschool', false, null),
      ('Customized Parking Lot Children''s Crawling Game Track with Road Traffic Theme - Cartoon Early Education Carpet for Kindergarten', 'Sensory & Play', 480, 'Contact for Sizing & Price', 4.9, 31, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701025/WhatsApp_Image_2026-09-03_at_3.48.30_PM_1.jpg', ARRAY[]::text[], 'Illustrated road map traffic carpet for kindergarten floors. Inspires imaginative role play with toy vehicles and teaches traffic safety awareness.', true, 'Ages 2 - 7', false, null),
      ('Large Plastic Building Blocks for Kids', 'Educational Toys', 450, 'GH₵ 450 - 850 (Based on pcs)', 4.9, 48, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.32_PM_4.jpg', ARRAY[]::text[], 'Oversized, easy-to-grip colorful construction blocks perfect for preschool hands to engineer towers, bridges, and imaginative structures.', true, 'Ages 2 - 8', true, 'Range: GH₵ 450 - GH₵ 850 based on number of pieces'),
      ('Wooden 3D Puzzle for Early Education', 'Educational Toys', 50, 'GH₵ 50', 4.7, 59, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.31_PM_5.jpg', ARRAY['https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.31_PM_5.jpg', 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.31_PM_4.jpg']::text[], 'Natural wood 3D puzzle with smooth rounded edges. Fosters hand-eye coordination, spatial awareness, and animal/object recognition.', true, 'Ages 2 - 6', false, null),
      ('Seesaw', 'Outdoor & Play Equipment', 2701.26, 'GH₵ 2,701.26', 4.9, 12, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.32_PM.jpg', ARRAY[]::text[], 'Child-safe ergonomic seesaw with padded shock absorbers and comfort-grip handles for cooperative vestibular and balance play.', true, 'Ages 3 - 10', true, null),
      ('Artificial Carpet Grass', 'Outdoor & Play Equipment', 1020, 'GH₵ 1,020', 5, 37, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.32_PM_3.jpg', ARRAY[]::text[], 'Premium realistic artificial turf for playground surfacing, sensory corners, and outdoor activity zones. Clean, non-allergenic, and weatherproof.', true, 'School & Playground Setup', true, 'Thickness: 2.5 cm | Width: 2m | Length: 10m'),
      ('Assembled Toy - Children''s Screw-Tightening Electric Drill Educational Repair Toolbox Set, 3-in-1 for Boys & Girls, Age 6+', 'Educational Toys', 260, 'Contact for Quote', 4.9, 43, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.30_PM_2.jpg', ARRAY[]::text[], 'Realistic kid-safe battery-powered electric drill and tool set with bolts, nuts, and activity plates for hands-on STEM engineering play.', true, 'Age 6+', true, null),
      ('Rectangular Preschool Adjustable Table', 'Child-Friendly Furniture', 650, 'GH₵ 650', 4.8, 34, 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701023/WhatsApp_Image_2026-09-03_at_3.48.31_PM_2.jpg', ARRAY[]::text[], 'High-durability rectangular preschool activity table with height-adjustable steel legs and stain-resistant easy-wipe surface.', true, 'Preschool & Kindergarten', true, null);
  end if;
end $$;
