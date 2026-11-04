# CEC Educational Consult: Launch Video Brief

Use this brief to produce a launch video (motion graphics or live-action with screen recordings) for the CEC Educational Consult website, which launches on **Sunday, 1 November 2026** at **https://ceceducationalconsult.org**.

---

## 1. Who CEC is

**CEC Educational Consult** is an education consultancy based in **Accra, Ghana**, founded and led by **Miss Nancie** (Founder & Lead Educational Consultant). CEC helps schools, families and teachers raise the quality of education, starting from the early years.

- **Tagline:** *Create • Educate • Cultivate*
- **Homepage headline:** *Inspiring Early Learning*
- **One-line description:** CEC connects schools and families with vetted educators, educational consultancy services, and signature school and classroom setups.
- **Belief:** when the foundation of education is built right, every level above it stands firm.

## 2. Who the website is for

| Audience | What they come to do |
|---|---|
| **School owners & leaders** | Find vetted teachers, book consultancy (school setup, curriculum, audits), design classrooms, train staff |
| **Parents & families** | Find a good school, home tutoring, homeschooling, the online Reading Lounge, books and learning resources |
| **Teachers** | Join the CEC Teacher Network, get verified, get discovered by schools, attend workshops |

## 3. What the website does (feature by feature)

### For schools and families
- **Find a Teacher:** a searchable directory of CEC-verified teachers. Filter by level (Pre-school, Primary, JHS, Special Needs), qualification (Masters, Bachelors, PGDE, Diploma, Certificate), availability (Immediate, Next Academic Term) and location. Each teacher has a profile page with their experience, qualification, skills and availability. Schools tap **"Request This Teacher"** and CEC handles the introduction. **Teachers' phone numbers are never public.**
- **Schools to Consider:** helps parents discover reputable schools in Ghana partnered with CEC for excellence in teaching, safety and learning environments.
- **Educational Consultancy:** school setup, teacher recruitment and placement, early childhood curriculum design, academic audits, school branding, library setup, school management systems, home tutoring, homeschooling, parents' workshops and general education advice. Visitors book a consultation straight from the site.
- **CEC Inspire Spaces:** themed school designs and signature classroom setups that turn ordinary spaces into inspiring, child-friendly learning environments. The process is: consult & assess, then design & plan, then source & build.
- **The Reading Lounge:** a joyful, 100% online literacy programme for ages 4 to 12, with phonics, guided storytelling and virtual reading circles.
- **Workshops:** professional development workshops and masterclasses for teachers and school leaders. Visitors register online, and seats update automatically.
- **Learning Essentials (store):** two sections:
  - **Books:** storybooks, phonics and early readers, activity books, educational books, and parenting & teacher guides.
  - **School Resources:** child-friendly furniture, outdoor play equipment (trampolines, slides, seesaws), educational toys and sensory play materials.
  Customers enquire and order through WhatsApp.

### For teachers (the CEC Teacher Network)
A mobile-app style sign-up, with each step on its own screen:
1. **Join:** "Continue with Google" or sign up with email.
2. **About you:** photo, name, phone, location.
3. **Your teaching:** level, years of experience, qualification.
4. **Verify your identity:** photograph the **front and back of their Ghana Card** inside an on-screen card-shaped camera frame.
5. **Availability & bio.**
6. **Review & submit**, followed by a celebration screen ("You're all set!").

After submitting, the CEC team reviews the profile and Ghana Card. Once **CEC Verified**, the teacher appears on Find a Teacher. Teachers get a **personal dashboard** that greets them by name ("Good morning, Akosua"). It shows profile strength, real profile views, how many schools asked about them, their verification status, and **Updates from CEC** announcements.

### Behind the scenes: the CEC Admin Centre
CEC runs everything from one private dashboard:
- **Approvals:** review each new teacher's details and Ghana Card, then approve or reject.
- **Teachers:** every registered teacher and their availability.
- **Live Movements:** an automatic timeline of registrations, availability changes and verifications.
- **Inquiries inbox:** every consultation booking, teacher request, workshop sign-up, contact message and store enquiry from the website, in one place. Teacher requests move through a placement pipeline: New request, then Shortlisting, then Interview set, then Placed.
- **Calendar:** consultations, interviews, audits and school visits.
- **Workshops, Learning Essentials and Broadcasts:** publish workshops, upload books and products with photos, and send announcements to every teacher.

## 4. How it works (architecture, explained simply)

Show this as a clean diagram or animated flow:

```
Visitors (schools, parents, teachers)
        │
        ▼
ceceducationalconsult.org  ── fast, mobile-friendly website (hosted on Vercel)
        │
        ├── Secure accounts & database ──── Supabase
        │      (teacher profiles, verification, inquiries, workshops, store, calendar)
        │
        ├── Photo & Ghana Card storage ──── Cloudinary
        │
        ├── Sign in with Google ─────────── Google
        │
        └── Instant conversations ───────── WhatsApp (CEC: +233 54 039 0029)
                                │
                                ▼
                     CEC Admin Centre (Miss Nancie & team)
                     reviews, verifies, matches and follows up
```

**The core loop to dramatise:**
1. A **teacher** signs up on their phone, verifies with their Ghana Card, and submits.
2. **CEC** reviews and verifies them in the Admin Centre.
3. The teacher appears on **Find a Teacher**.
4. A **school** finds them and taps "Request This Teacher".
5. The request lands in CEC's inbox, and CEC schedules the interview.
6. **Placement.** The right teacher is in the right classroom.

**Trust points to highlight:** identity-verified teachers (Ghana Card), private contact details, CEC as a trusted middle-person, and a Privacy Policy aligned with Ghana's Data Protection Act, 2012 (Act 843).

## 5. Brand guidelines

| Element | Value |
|---|---|
| Primary (deep teal) | `#126373` |
| Accent (bright cyan) | `#2ac0db` |
| Highlight / call-to-action (orange) | `#fa7b2d` |
| Dark background | `#0b2228` → `#114c5a` gradient, or slate `#0f172a` |
| Neutrals | White `#ffffff`, soft grey `#f8fafc`, text slate `#0f172a` |
| Font | **Exo 2** (Google Fonts), extra-bold for headlines |
| Logo | https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png |
| Style | Warm, hopeful, professional; children learning, teachers smiling, bright classrooms; a teal-to-orange accent stripe (signature brand detail) |
| Tone of voice | Confident, caring and clear; British/Ghanaian English spelling (e.g. "programme") |

**Avoid:** unverified statistics (do not claim numbers of teachers, schools or placements), and showing real Ghana Card numbers or any real personal data. Use blurred or obviously fictional sample cards.

## 6. Suggested video (60–75 seconds, 16:9, with a 9:16 cut for Reels/TikTok/WhatsApp Status)

| # | Time | Visual | On-screen text | Voiceover |
|---|---|---|---|---|
| 1 | 0–5s | Logo builds from the teal/orange stripe; tagline fades in | *Create • Educate • Cultivate* | "Every great education starts with a strong foundation." |
| 2 | 5–14s | Montage: school owner searching, parent reading with a child, teacher in a classroom | *For schools. For families. For teachers.* | "CEC Educational Consult brings schools, families and great teachers together." |
| 3 | 14–26s | Phone mockup: Find a Teacher filters, then a teacher profile, then a tap on "Request This Teacher" | *Find CEC-verified teachers* | "Schools can find CEC-verified teachers by level, qualification and availability, and request them in one tap." |
| 4 | 26–38s | Phone mockup: teacher sign-up screens, Ghana Card camera frame, "You're all set!" with confetti | *Teachers: join, verify, get discovered* | "Teachers join in minutes, verify with their Ghana Card, and get discovered by top schools." |
| 5 | 38–50s | Quick cards: Consultancy, Inspire Spaces (classroom before/after), Reading Lounge, Workshops | *Consultancy • Inspire Spaces • Reading Lounge • Workshops* | "From school setup and curriculum to inspiring classrooms, online reading circles and teacher training." |
| 6 | 50–58s | Learning Essentials: book covers, then a trampoline and furniture | *Books & School Resources* | "And everything learners need, from books to school resources." |
| 7 | 58–66s | Animated architecture flow (section 4), ending in the Admin Centre | *Verified. Private. Supported.* | "Behind it all, the CEC team verifies, matches and supports every step." |
| 8 | 66–75s | Logo + URL + WhatsApp + "Launching Sunday" | **ceceducationalconsult.org** · WhatsApp +233 54 039 0029 · *Now live* | "CEC Educational Consult. Inspiring early learning. Visit ceceducationalconsult.org today." |

**Music:** uplifting acoustic or light afrobeat, mid-tempo, warm.

## 7. Calls to action (pick per audience)

- Schools: **"Find a verified teacher"** → ceceducationalconsult.org/teachers
- Teachers: **"Join the CEC Teacher Network"** → ceceducationalconsult.org/register
- Parents: **"Explore the Reading Lounge and Learning Essentials"**
- Everyone: **"Book a consultation"** · WhatsApp **+233 54 039 0029** · contact@ceceducationalconsult.org

## 8. Key pages to screen-record

| Page | URL |
|---|---|
| Home | https://ceceducationalconsult.org |
| Find a Teacher | https://ceceducationalconsult.org/teachers |
| Consultancy | https://ceceducationalconsult.org/consultancy |
| CEC Inspire Spaces | https://ceceducationalconsult.org/cec-spaces |
| Reading Lounge | https://ceceducationalconsult.org/reading-club |
| Workshops | https://ceceducationalconsult.org/workshops |
| Learning Essentials (Books) | https://ceceducationalconsult.org/learning-essentials?section=books |
| Join the Network (teacher sign-up) | https://ceceducationalconsult.org/register |
| About | https://ceceducationalconsult.org/about |
| Contact | https://ceceducationalconsult.org/contact |
