import { 
  Teacher, 
  ConsultationService, 
  Workshop, 
  CECSpaceProject, 
  LearningProduct,
  PendingTeacherApproval,
  ConsultationBooking,
  VideoTestimonial
} from '../types';

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: 'tch-001',
    name: 'Akosua Mensah',
    title: 'Lead EYFS & Early Childhood Educator',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'Early Childhood (EYFS)',
    location: 'Accra, Ghana & International Placement',
    experienceYears: 7,
    salaryExpectation: 'GH₵ 8,500 - 12,000/mo',
    availability: 'Immediate',
    qualification: 'B.Ed Early Childhood',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 28,
    bio: 'Dedicated early childhood specialist trained in child-friendly pedagogy and foundational phonics. Passionate about child-led inquiry learning and sensory development.',
    aboutDetailed: 'Akosua is a certified early years practitioner with over 7 years of classroom leadership. She specializes in building nurturing, child-centered environments where young learners build confidence, literacy and emotional resilience.',
    skills: ['EYFS Curriculum', 'Early Childhood Math', 'Synthetic Phonics', 'Reggio Emilia Approach', 'Positive Discipline', 'Child Safeguarding'],
    subjects: ['Early Literacy & Phonics', 'Sensory Math', 'Creative Arts', 'Social-Emotional Learning'],
    employmentPreferences: {
      type: 'Full-time',
      preferredLocations: ['East Legon', 'Cantonments', 'Airport Residential', 'International Relocation'],
      minSalary: 'GH₵ 8,500/mo'
    },
    timeline: [
      {
        id: 't-1',
        role: 'Senior Nursery Educator',
        institution: 'Morning Star Early Years, Accra',
        period: '2022 - Present',
        description: 'Led a class of 18 children, introduced multisensory phonics stations and increased literacy benchmarks by 35%.',
        type: 'experience'
      },
      {
        id: 't-2',
        role: 'Lead Early Childhood Teacher',
        institution: 'International School Early Years Wing',
        period: '2019 - 2022',
        description: 'Managed early childhood learning plans and implemented positive reinforcement strategies.',
        type: 'experience'
      },
      {
        id: 't-3',
        role: 'B.Ed Early Childhood Education',
        institution: 'University of Cape Coast',
        period: '2015 - 2019',
        description: 'Graduated First Class Honors. Thesis on hands-on play in early childhood cognitive retention.',
        type: 'education'
      },
      {
        id: 't-4',
        role: 'Early Childhood Specialist Diploma',
        institution: 'London Early Years Centre',
        period: '2020',
        description: 'Certified in 3-6 age group child-friendly apparatus and classroom setup.',
        type: 'education'
      }
    ],
    contactWhatsappNumber: '+233540390029',
    email: 'akosua.mensah@cecteachers.org'
  },
  {
    id: 'tch-002',
    name: 'David Osei',
    title: 'Kindergarten & Early STEM Educator',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'Kindergarten',
    location: 'Accra, Ghana & Regional Schools',
    experienceYears: 5,
    salaryExpectation: 'GH₵ 7,500 - 10,000/mo',
    availability: '2 Weeks Notice',
    qualification: 'EYFS Certified',
    isVerified: true,
    rating: 4.8,
    reviewsCount: 19,
    bio: 'Innovative educator bridging early childhood play with foundational science, robotics blocks and spatial reasoning for kids aged 3-6.',
    aboutDetailed: 'David believes children learn best through active exploration. He combines traditional songs with tactile construction blocks, nature study and emotional intelligence activities.',
    skills: ['Early STEM', 'Lego Education', 'Interactive Storytelling', 'Behavioral Guidance', 'Parent Communication'],
    subjects: ['Early Years Science', 'Spatial Math', 'Nature Discovery', 'Physical Development'],
    employmentPreferences: {
      type: 'Full-time',
      preferredLocations: ['Accra Central', 'East Legon', 'Airport Residential', 'International'],
      minSalary: 'GH₵ 7,500/mo'
    },
    timeline: [
      {
        id: 't-10',
        role: 'Kindergarten Lead Teacher',
        institution: 'Lincoln Community School, Accra',
        period: '2021 - Present',
        description: 'Spearheaded Kindergarten STEM week and designed interactive nature exploration labs.',
        type: 'experience'
      },
      {
        id: 't-11',
        role: 'Postgraduate Diploma in Primary Education',
        institution: 'University of Ghana, Legon',
        period: '2018 - 2020',
        description: 'Focused on early years inquiry-based pedagogy.',
        type: 'education'
      }
    ],
    contactWhatsappNumber: '+233206855347',
    email: 'david.osei@cecteachers.org'
  },
  {
    id: 'tch-003',
    name: 'Grace Serwaa',
    title: 'Pre-K Literacy & Phonics Specialist',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'Early Childhood (EYFS)',
    location: 'Kumasi, Ghana & International Online',
    experienceYears: 9,
    salaryExpectation: 'GH₵ 10,000 - 14,000/mo',
    availability: 'Immediate',
    qualification: 'Early Childhood Diploma',
    isVerified: true,
    rating: 5.0,
    reviewsCount: 42,
    bio: 'Award-winning master teacher specializing in Synthetic Phonics, early reading fluency and child psychology in international early childhood settings.',
    aboutDetailed: 'With nearly a decade of classroom excellence, Grace has trained over 120 early childhood teachers. She transforms hesitant readers into confident storytellers using kinesthetic reading games.',
    skills: ['Synthetic Phonics Mastery', 'Curriculum Mapping', 'Special Needs Inclusion', 'Early Years Drama', 'Child-Friendly Language Arts'],
    subjects: ['Early Reading & Writing', 'Phonemic Awareness', 'Art & Expression'],
    employmentPreferences: {
      type: 'Full-time / Consultancy',
      preferredLocations: ['Kumasi Central', 'Ahodwo', 'Ridge Kumasi', 'International Relocation'],
      minSalary: 'GH₵ 10,000/mo'
    },
    timeline: [
      {
        id: 't-20',
        role: 'Head of Early Years',
        institution: 'Ridge International School, Kumasi',
        period: '2020 - 2024',
        description: 'Supervised 12 early childhood educators and audited curriculum standards.',
        type: 'experience'
      },
      {
        id: 't-21',
        role: 'Early Childhood Diploma in Early Learning',
        institution: 'St. Nicholas Early Learning College',
        period: '2015 - 2017',
        description: 'Specialized in Language and Sensorial Child-Friendly Materials.',
        type: 'education'
      }
    ],
    contactWhatsappNumber: '+233249356337',
    email: 'grace.serwaa@cecteachers.org'
  },
  {
    id: 'tch-004',
    name: 'Kwame Mensah-Bonsu',
    title: 'Lower Primary & Early Numeracy Educator',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'Lower Primary',
    location: 'Accra, Ghana (Tema / Spintex)',
    experienceYears: 6,
    salaryExpectation: 'GH₵ 8,000 - 10,500/mo',
    availability: 'Next Academic Term',
    qualification: 'PGDE',
    isVerified: true,
    rating: 4.7,
    reviewsCount: 15,
    bio: 'Lower Primary specialist with expertise in Singapore Math methods, concrete-pictorial-abstract progression and engaging class dynamics.',
    aboutDetailed: 'Kwame brings math to life for children transitioning from nursery to primary grades in Ghana. His concrete learning aids eliminate math anxiety early.',
    skills: ['Singapore Math', 'Differentiated Instruction', 'Classroom Tech', 'Assessment Systems'],
    subjects: ['Primary Mathematics', 'General Science', 'Critical Thinking'],
    employmentPreferences: {
      type: 'Full-time',
      preferredLocations: ['Tema Community 6', 'Spintex', 'Airport City', 'Labone'],
      minSalary: 'GH₵ 8,000/mo'
    },
    timeline: [
      {
        id: 't-30',
        role: 'Grade 1 Lead Teacher',
        institution: 'SOS-Hermann Gmeiner International College Early Wing',
        period: '2021 - Present',
        description: 'Maintained 98% student math proficiency rating.',
        type: 'experience'
      }
    ],
    contactWhatsappNumber: '+233540390029',
    email: 'kwame.mb@cecteachers.org'
  },
  {
    id: 'tch-005',
    name: 'Abena Owusu-Ansah',
    title: 'Nursery Specialist & Child Psychologist',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'Nursery',
    location: 'Accra, Ghana (Cantonments)',
    experienceYears: 8,
    salaryExpectation: 'GH₵ 9,000 - 12,500/mo',
    availability: 'Immediate',
    qualification: 'Early Years Specialist',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 31,
    bio: 'Nursery lead with background in developmental psychology. Focuses on toddler emotional regulation, sensory motor skills and smooth school transitions.',
    aboutDetailed: 'Abena creates safe, home-away-from-home nursery spaces. She works closely with parents in Accra to address separation anxiety and developmental milestones.',
    skills: ['Toddler Care', 'Sensory Play', 'Child Psychology', 'Potty Training Systems', 'Music & Movement'],
    subjects: ['Sensory Motor Skills', 'Speech & Rhythm', 'Self-Care Habits'],
    employmentPreferences: {
      type: 'Full-time',
      preferredLocations: ['Cantonments', 'Osu', 'Roman Ridge', 'Labone'],
      minSalary: 'GH₵ 9,000/mo'
    },
    timeline: [
      {
        id: 't-40',
        role: 'Nursery Section Lead',
        institution: 'Al-Rayan International School Early Years',
        period: '2019 - Present',
        description: 'Supervised nursery room routines for 30 toddlers.',
        type: 'experience'
      }
    ],
    contactWhatsappNumber: '+233206855347',
    email: 'abena.owusu@cecteachers.org'
  },
  {
    id: 'tch-006',
    name: 'Samuel Koffi Addo',
    title: 'Inclusive Learning & SEN Early Years Specialist',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'Special Needs (SEN)',
    location: 'Accra / Takoradi, Ghana',
    experienceYears: 6,
    salaryExpectation: 'GH₵ 8,500 - 11,500/mo',
    availability: '2 Weeks Notice',
    qualification: 'B.Ed Early Childhood',
    isVerified: true,
    rating: 4.8,
    reviewsCount: 17,
    bio: 'Dedicated special educational needs practitioner focusing on speech therapy integration, neurodivergent preschool support and IEP creation.',
    aboutDetailed: 'Samuel designs Individualized Education Plans (IEPs) for preschoolers with speech delays, ADHD, or autism, empowering them to thrive in mainstream Ghanaian classrooms.',
    skills: ['IEP Development', 'Behavioral Therapy Support', 'Sign Language Basics', 'Sensory De-escalation'],
    subjects: ['Adaptive Communication', 'Inclusive Play', 'Social Integration'],
    employmentPreferences: {
      type: 'Full-time / Part-time',
      preferredLocations: ['Airport Residential', 'East Legon', 'Takoradi Beach Road'],
      minSalary: 'GH₵ 8,500/mo'
    },
    timeline: [
      {
        id: 't-50',
        role: 'SEN Coordinator',
        institution: 'Soul Clinic International School',
        period: '2021 - Present',
        description: 'Coordinated inclusion programs for early childhood learners.',
        type: 'experience'
      }
    ],
    contactWhatsappNumber: '+233249356337',
    email: 'samuel.addo@cecteachers.org'
  },
  {
    id: 'tch-007',
    name: 'Evelyn Boateng',
    title: 'JHS English & Language Arts Educator',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'JHS (English)',
    location: 'Accra, Ghana (East Legon & Cantonments)',
    experienceYears: 7,
    salaryExpectation: 'GH₵ 9,000 - 13,000/mo',
    availability: 'Immediate',
    qualification: 'B.Ed Early Childhood & Language Education',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 24,
    bio: 'Dynamic Junior High School English specialist dedicated to reading comprehension, creative essay writing, critical literature analysis and BECE excellence.',
    aboutDetailed: 'Evelyn bridges foundational literacy with higher-level grammar, essay synthesis and public oratory. She equips JHS learners with analytical reading habits and confident English expression.',
    skills: ['Grammar & Composition', 'Creative Writing', 'Literature in English', 'BECE & Cambridge Checkpoint Prep', 'Speech & Debate Coaching'],
    subjects: ['English Language', 'Literature', 'Essay Writing', 'Reading Comprehension'],
    employmentPreferences: {
      type: 'Full-time',
      preferredLocations: ['East Legon', 'Cantonments', 'Airport Residential', 'Tema'],
      minSalary: 'GH₵ 9,000/mo'
    },
    timeline: [
      {
        id: 't-60',
        role: 'Head of English Department',
        institution: 'Legacy Girls College & International Preparatory',
        period: '2021 - Present',
        description: 'Coordinated JHS English curriculum, literature circles and academic debating society.',
        type: 'experience'
      },
      {
        id: 't-61',
        role: 'B.Ed in English & Basic Education',
        institution: 'University of Education, Winneba',
        period: '2015 - 2019',
        description: 'Specialized in Language Pedagogy and Adolescent Literacy.',
        type: 'education'
      }
    ],
    contactWhatsappNumber: '+233540390029',
    email: 'evelyn.boateng@cecteachers.org'
  }
];

export const MOCK_CONSULTATION_SERVICES: ConsultationService[] = [
  {
    id: 'srv-setup',
    title: 'School setup',
    shortDesc: 'Support individuals and organizations in planning, establishing and developing quality schools.',
    fullDesc: 'Comprehensive advisory and operational guidance for school owners starting or structuring world-class early learning centres and schools.',
    iconName: 'LayoutGrid',
    features: [
      'Early years feasibility and operational layout planning',
      'Regulatory compliance, policies and licensing guidance',
      'Leadership structuring and strategic staffing frameworks',
      'Classroom setup and learning zone zoning'
    ],
    recommendedFor: 'Entrepreneurs, proprietors and organizations founding new schools',
    pricingTag: 'Custom School Package'
  },
  {
    id: 'srv-recruitment',
    title: 'Teacher Recruitment & Staff Placement',
    shortDesc: 'End-to-end recruitment of vetted, qualified educators tailored to your school needs.',
    fullDesc: 'We handle candidate sourcing, credentials verification, practical classroom observation, background checks and matching with your school values across regional and international institutions.',
    iconName: 'UserCheck',
    features: [
      'Comprehensive candidate screening and professional licensing alignment',
      'Classroom simulation and teaching demonstration evaluation',
      'Customized salary and contract structure guidance'
    ],
    recommendedFor: 'New and established schools seeking top-tier educators',
    pricingTag: 'Tailored Placement'
  },
  {
    id: 'srv-hometutoring',
    title: 'Home tutoring',
    shortDesc: 'A structured topup academic programme to support a child\'s education.',
    fullDesc: 'Dedicated in-home or virtual personal educators who provide diagnostic assessments, structured academic top-up and foundational reinforcement.',
    iconName: 'GraduationCap',
    features: [
      'Personalized one-on-one academic reinforcement',
      'All subjects for all levels',
      'Flexible scheduling aligned with your child\'s learning needs'
    ],
    recommendedFor: 'Parents seeking structured academic reinforcement for their children',
    pricingTag: 'Flexible Monthly Packages'
  },
  {
    id: 'srv-homeschooling',
    title: 'Homeschooling',
    shortDesc: 'Structured curriculum with flexible child led approaches done from home across all levels.',
    fullDesc: 'End-to-end homeschooling guidance including curriculum design, daily schedules, learning materials and milestone assessments tailored to your child.',
    iconName: 'BookOpenCheck',
    features: [
      'Child led experiential pacing and comprehensive learning milestones',
      'Structured international and local curriculum frameworks across all levels',
      'Regular progress monitoring, assessments and parent mentorship'
    ],
    recommendedFor: 'Families committed to full or blended home-based education',
    pricingTag: 'Term & Annual Support'
  },
  {
    id: 'srv-curriculum',
    title: 'Early Childhood Curriculum Design & Migration',
    shortDesc: 'Customized Early childhood curriculum, blended curriculum and international curriculums designed for maximum child engagement for children ages 3months to 6 six.',
    fullDesc: 'Our curriculum experts review your existing scheme of work or design a bespoke child-centric curriculum aligned with global early childhood standards.',
    iconName: 'BookOpenCheck',
    features: [
      'CEC Customised Early childhood curriculum for ages 3 months to 6 years',
      'Hybrid and international curriculums available (Cambridge, Oxford and Pearson)',
      'Teacher lesson plan templates, schemes of work and assessment rubrics'
    ],
    recommendedFor: 'Schools upgrading their academic standards or migrating to international frameworks',
    pricingTag: 'Popular for School Owners'
  },
  {
    id: 'srv-spaces',
    title: 'CEC Spaces: School designs, Classroom Setup & Transformation',
    shortDesc: 'Themed school designs, signature classroom décor and equipment planning for modern, child-friendly learning environments.',
    fullDesc: 'We turn plain rooms into vibrant, ergonomically designed learning sanctuaries with safety-tested furniture, sensory learning zones and outdoor play areas.',
    iconName: 'LayoutGrid',
    features: [
      'Complete school and classroom makeover',
      'Age appropriate furniture sourcing and equipment',
      'Themed school design, signature classroom setups and child-friendly layout'
    ],
    recommendedFor: 'Proprietors starting new early learning branches or renovating existing rooms',
    pricingTag: 'Turnkey Project'
  },
  {
    id: 'srv-pd',
    title: 'Professional Development workshops for teacher and school leaders',
    shortDesc: 'Practical training modules delivered in person or online to boost educator competency and innovation.',
    fullDesc: 'Equip your teachers and leaders with modern classroom management, positive discipline, phonics mastery and parent communication methods.',
    iconName: 'GraduationCap',
    features: [
      'On-site workshops or international virtual interactive modules',
      'Classroom demonstrations with real-time feedback',
      'Certificates of completion for all participating educators and leaders'
    ],
    recommendedFor: 'Schools boosting educator competency, leadership and retention',
    pricingTag: 'Group & School Rates'
  },
  {
    id: 'srv-reading-club',
    title: 'CEC Reading Club & Phonics Circles (Online)',
    shortDesc: 'Weekly live virtual phonics, guided storytelling and online book clubs for children ages 4 to 12.',
    fullDesc: 'A joyful 100% online literacy program helping young learners build phonemic awareness, expressive reading fluency and an enduring love for books through structured virtual reading circles.',
    iconName: 'BookOpen',
    features: [
      'Weekly live virtual reading and phonics sessions for children ages 4 to 12',
      'Certificate for various reading challenges',
      'Curated Weekly online and audio books and digital reading logs'
    ],
    recommendedFor: 'Parents and families seeking engaging live online literacy coaching',
    pricingTag: 'Term & Monthly Subscriptions'
  },
  {
    id: 'srv-audit',
    title: 'Academic Audit Services',
    shortDesc: 'A comprehensive review of a school\'s teaching, learning, curriculum, assessment and academic practices.',
    fullDesc: 'In-depth institutional evaluations providing actionable diagnostic reports to optimize teaching standards, curriculum fidelity and student learning outcomes.',
    iconName: 'CheckCircle2',
    features: [
      'Holistic classroom teaching observations and diagnostic feedback',
      'Curriculum pacing, assessment methods and academic fidelity review',
      'Executive improvement roadmap presented to school leadership'
    ],
    recommendedFor: 'Schools seeking accreditation readiness and academic excellence',
    pricingTag: 'Comprehensive Audit'
  },
  {
    id: 'srv-branding',
    title: 'School Branding Services',
    shortDesc: 'Branding solutions designed to help schools to build a strong, distintive and memorable identity.',
    fullDesc: 'Comprehensive identity design and positioning for educational institutions seeking to stand out, attract discerning families and inspire trust.',
    iconName: 'Sparkles',
    features: [
      'Visual identity, emblem, prospectus and school collateral design',
      'School culture, values and parent communication messaging',
      'Campus signage, uniform design and spatial brand coherence'
    ],
    recommendedFor: 'New school founders and institutions repositioning their brand',
    pricingTag: 'Custom Branding Package'
  },
  {
    id: 'srv-library',
    title: 'Library setup',
    shortDesc: 'School and home and library setup with curated age-appropriate book selections.',
    fullDesc: 'Designing captivating reading sanctuaries in schools and homes with ergonomic display shelving, cozy reading nooks and catalogue literature collections.',
    iconName: 'BookOpen',
    features: [
      'Physical library architecture, display shelving and cozy reading nooks',
      'Curated cataloging of decodable books, fiction and reference materials',
      'Lending management systems and reading challenge logs'
    ],
    recommendedFor: 'Schools and families establishing modern reading environments',
    pricingTag: 'Custom Setup'
  },
  {
    id: 'srv-parents',
    title: 'Parents Workshop',
    shortDesc: 'A programme designed to equip parent with practical knowledge and strategies to better understand and support their children.',
    fullDesc: 'Interactive workshops helping parents navigate early childhood developmental phases, positive guidance, early literacy and learning at home.',
    iconName: 'UserCheck',
    features: [
      'Practical child development and positive discipline strategies',
      'Guidance on supporting early literacy, phonics and math at home',
      'Direct Q&A with experienced early childhood specialists'
    ],
    recommendedFor: 'Parent associations, churches, school communities and families',
    pricingTag: 'Community Workshop'
  },
  {
    id: 'srv-booksale',
    title: 'Book Recommendation and Sale',
    shortDesc: 'A curated book recommendation service that helps parents and educators select age appropriate books to support children\'s overall development and progress.',
    fullDesc: 'Carefully evaluated recommendations and direct supply of premium children\'s books that build strong vocabulary, moral character and reading stamina.',
    iconName: 'BookOpen',
    features: [
      'Curated age-appropriate book recommendations across genres and reading levels',
      'Direct sourcing and sales of high-quality books',
      'Reading guides and companion discussion prompts for parents'
    ],
    recommendedFor: 'Schools, parents and community literacy initiatives',
    pricingTag: 'Catalog Orders'
  },
  {
    id: 'srv-sms',
    title: 'School Management system',
    shortDesc: 'Modern digital platforms to streamline school administrative processes, records and communications.',
    fullDesc: 'Integrated school software solutions for attendance tracking, student progress reports, parent messaging and administrative efficiency.',
    iconName: 'LayoutGrid',
    features: [
      'Digital attendance, student recordkeeping and grade reporting',
      'Parent portal and real-time announcement messaging',
      'Tuition and administrative workflow coordination'
    ],
    recommendedFor: 'Schools seeking digital efficiency and enhanced parent communication',
    pricingTag: 'Software Setup & Support'
  },
  {
    id: 'srv-advisory',
    title: 'General Education Consultancy Advice',
    shortDesc: 'Professional education guidance and advisory services for parents, teachers, school owners and educational instituation.',
    fullDesc: 'Confidential strategic advisory on school governance, teacher retention, parent dispute resolution and educational investment decisions.',
    iconName: 'UserCheck',
    features: [
      'Direct consultation for school owners, directors and school boards',
      'Parent educational path guidance and school selection advice',
      'Policy design, code of conduct and staff handbook formulation'
    ],
    recommendedFor: 'Proprietors, institutional leaders and parents',
    pricingTag: 'Advisory Session'
  }
];

export const MOCK_VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'vid-1',
    author: 'Partner School Educator',
    role: 'Early Childhood Educator',
    school: 'Partner School',
    location: 'Ghana',
    duration: 'Video Review',
    coverImage: 'https://res.cloudinary.com/qg0w6ewi/image/upload/f_auto,q_auto/v1787294779/IMG_4128.jpg',
    headline: 'Teacher Placement & Early Childhood Experience',
    videoUrl: 'https://res.cloudinary.com/qg0w6ewi/video/upload/vc_h264,q_auto,w_720/v1787301607/455D148D-7D3E-4CF2-B954-03014580E217.mp4',
    embedFallbackUrl: 'https://drive.google.com/file/d/1B57veOzRgbcauhScWPiLPuy6werhqP6W/preview?autoplay=1',
    videoTopic: 'CEC Placement & Consultation Feedback',
    verifiedSchool: true
  },
  {
    id: 'vid-2',
    author: 'Akosua Mensah',
    role: 'Lead EYFS Teacher',
    school: 'Partner School',
    location: 'Ghana',
    duration: 'Video Review',
    coverImage: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788091210/WhatsApp_Image_2026-08-30_at_11.57.37_AM.jpg',
    headline: 'Teacher Mentorship & Career Growth Feedback',
    videoUrl: 'https://res.cloudinary.com/qg0w6ewi/video/upload/vc_h264,q_auto,w_720/v1788066406/review_2.mp4',
    embedFallbackUrl: 'https://player.cloudinary.com/embed/?cloud_name=qg0w6ewi&public_id=review_2&autoplay=true&controls=true',
    videoTopic: 'Teacher Mentorship & Career Placement',
    verifiedSchool: true
  },
  {
    id: 'vid-3',
    author: '',
    role: '',
    school: '',
    location: '',
    coverImage: 'https://res.cloudinary.com/qg0w6ewi/video/upload/so_0/v1789155756/revvvv.jpg',
    headline: 'Video Review',
    videoUrl: 'https://res.cloudinary.com/qg0w6ewi/video/upload/v1789155756/revvvv.mp4',
    embedFallbackUrl: 'https://player.cloudinary.com/embed/?cloud_name=qg0w6ewi&public_id=revvvv&autoplay=true&controls=true'
  }
];

export const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: 'wk-101',
    title: 'Mastering Positive Discipline in Early Childhood Classrooms',
    category: 'Classroom Management',
    date: 'Saturday, August 15, 2026',
    time: '10:00 AM - 2:00 PM GMT',
    venue: 'CEC Training Center & Global Zoom Live',
    price: 'GH₵ 600',
    availableSeats: 8,
    totalSeats: 40,
    description: 'Learn proven non-punitive strategies to manage toddler tantrums, promote self-regulation and create a calm, cooperative early learning environment.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'wk-102',
    title: 'Foundational Phonics & Early Literacy Masterclass',
    category: 'Early Literacy & Phonics',
    date: 'Saturday, August 22, 2026',
    time: '09:00 AM - 1:00 PM GMT',
    venue: 'CEC Learning Hub & Virtual Masterclass',
    price: 'GH₵ 680',
    availableSeats: 5,
    totalSeats: 35,
    description: 'Master letter-sound correspondence, blending strategies, tricky words and kinesthetic games that get 3-year-olds reading fluently within months.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'wk-103',
    title: 'Hands-on Concrete Math for Early Childhood Classrooms',
    category: 'Early STEM & Math',
    date: 'Saturday, September 5, 2026',
    time: '10:00 AM - 3:00 PM GMT',
    venue: 'Virtual Interactive Masterclass via Zoom (International)',
    price: 'GH₵ 480',
    availableSeats: 14,
    totalSeats: 50,
    description: 'Transform abstract numbers into tangible experiences using tactile number rods, bead counters and sensorial concrete aids.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'wk-104',
    title: 'Early Childhood Leadership & Enrollment Growth',
    category: 'Early Childhood Leadership',
    date: 'Saturday, September 19, 2026',
    time: '11:00 AM - 3:00 PM GMT',
    venue: 'CEC Executive Suite & International Hybrid Stream',
    price: 'GH₵ 1,300',
    availableSeats: 6,
    totalSeats: 25,
    description: 'Strategic roadmap for early childhood center directors: fee pricing, parent satisfaction, teacher retention and brand positioning.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop'
  }
];

export const MOCK_CEC_SPACES: CECSpaceProject[] = [
  {
    id: 'sp-1',
    title: 'Mastering Education Excellence: Signature Learning Sanctuary',
    schoolName: 'CEC Flagship Early Learning Center',
    location: 'Accra & Global Consultations',
    type: 'Themed School & Classroom Setup',
    beforeImage: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=85&w=1400&auto=format&fit=crop',
    description: 'Mastering education excellence: Complete school and classroom makeover featuring ergonomic child-friendly furniture, interactive educational toys, and outdoor playing equipment.',
    keyUpgrades: [
      'Child-friendly ergonomic furniture & low shelving',
      'Outdoor playing equipment & gross motor adventure areas',
      'Educational toys replacing traditional rigid tools',
      'Themed sensory zones & reading nooks'
    ]
  },
  {
    id: 'sp-2',
    title: 'Outdoor Playing Equipment & Adventure Play Zone',
    schoolName: 'CEC Partner Campus Play Park',
    location: 'International Campus',
    type: 'Outdoor & Sensory Play Park',
    beforeImage: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop',
    description: 'Designed an expansive early childhood active play environment with safety impact surfaces, climbing structures and collaborative exploration stations.',
    keyUpgrades: [
      'Safety certified outdoor playing equipment & climbing frames',
      'Shock-absorbing rubber play surfacing',
      'Sensory water & sandbox interactive play tables',
      'Ergonomic outdoor rest benches and shaded gathering pavilions'
    ]
  }
];

export const MOCK_LEARNING_PRODUCTS: LearningProduct[] = [
  {
    id: 'prod-moon-arc-table',
    name: 'Moon Arc Adjustment Table with a Chair',
    category: 'Child-Friendly Furniture',
    price: 950,
    priceDisplay: 'GH₵ 950',
    rating: 4.9,
    reviews: 32,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701034/WhatsApp_Image_2026-09-03_at_3.48.29_PM_2.jpg',
    description: 'Ergonomic crescent moon adjustable-height activity table with a matching child posture support chair. Ideal for collaborative early years learning and individual focus.',
    inStock: true,
    ageGroup: 'Preschool & Kindergarten',
    isFeatured: true
  },
  {
    id: 'prod-mini-shop',
    name: 'Mini Shop',
    category: 'Sensory & Play',
    price: 946,
    priceDisplay: 'GH₵ 946',
    rating: 5.0,
    reviews: 44,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701034/WhatsApp_Image_2026-09-03_at_3.48.33_PM_1.jpg',
    images: [
      'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701034/WhatsApp_Image_2026-09-03_at_3.48.33_PM_1.jpg',
      'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701034/WhatsApp_Image_2026-09-03_at_3.48.33_PM_2.jpg',
      'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701031/WhatsApp_Image_2026-09-03_at_3.48.33_PM_3.jpg'
    ],
    description: 'Interactive child-sized storefront kiosk for imaginative dramatic play, early social commerce, counting practice, and language development.',
    inStock: true,
    ageGroup: 'Ages 3 - 8',
    isFeatured: true
  },
  {
    id: 'prod-preschool-adj-table-set',
    name: 'Preschool Adjustable Table Set with Chairs',
    category: 'Child-Friendly Furniture',
    price: 2268,
    priceDisplay: 'GH₵ 2,268',
    rating: 4.9,
    reviews: 27,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701034/WhatsApp_Image_2026-09-03_at_3.48.31_PM_3.jpg',
    description: 'Heavy-duty adjustable classroom table complete with sturdy ergonomic preschool chairs designed for active group activities, crafts, and meal times.',
    inStock: true,
    ageGroup: 'Preschool & Early Primary',
    isFeatured: true
  },
  {
    id: 'prod-preschool-chairs',
    name: 'Preschool Chairs',
    category: 'Child-Friendly Furniture',
    price: 180,
    priceDisplay: 'Contact for Quote / Bulk',
    rating: 4.8,
    reviews: 35,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701033/WhatsApp_Image_2026-09-03_at_3.48.31_PM_1.jpg',
    description: 'Stackable, child-safe ergonomic preschool chairs with non-slip footpads. Durable, easy to clean, and contoured for healthy posture.',
    inStock: true,
    ageGroup: 'Preschool (Ages 2 - 6)',
    isFeatured: false
  },
  {
    id: 'prod-trampoline-safety-net',
    name: 'Trampoline with Safety Net',
    category: 'Outdoor & Play Equipment',
    price: 7000,
    priceDisplay: '14ft: GH₵ 7,000 | 16ft: GH₵ 8,700',
    rating: 5.0,
    reviews: 19,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701031/WhatsApp_Image_2026-09-03_at_3.48.31_PM.jpg',
    description: 'Commercial-grade outdoor trampoline equipped with heavy-duty galvanized steel springs, UV-resistant jumping mat, and complete 360-degree protective enclosure net.',
    inStock: true,
    ageGroup: 'Ages 3 - 12+',
    isFeatured: true,
    specs: 'Available sizes: 14ft (GH₵ 7,000) and 16ft (GH₵ 8,700)'
  },
  {
    id: 'prod-magnetic-rods',
    name: "Large Strong Magnet Versatile Educational Magnetic Rods - Children's Toy, 2nd Generation Upgraded Magnetic Safety Design for Early Education Development",
    category: 'Educational Toys',
    price: 200,
    priceDisplay: 'GH₵ 200 - 700+ (Based on pcs)',
    rating: 4.9,
    reviews: 62,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701031/WhatsApp_Image_2026-09-03_at_3.48.29_PM_1.jpg',
    description: '2nd generation upgraded safety magnetic rods and balls. Empowers children to build 3D geometric shapes, architectural structures, and explore magnetism safely.',
    inStock: true,
    ageGroup: 'Ages 3 - 8',
    isFeatured: true,
    specs: 'Range from GH₵ 200 to GH₵ 700+ depending on piece count'
  },
  {
    id: 'prod-elem-study-desk',
    name: "Children's Desk, Study Table for Elementary School Students - Adjustable Height Writing Desk with Chair Set for Kids",
    category: 'Child-Friendly Furniture',
    price: 2900,
    priceDisplay: 'GH₵ 2,900',
    rating: 4.9,
    reviews: 21,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701031/WhatsApp_Image_2026-09-03_at_3.48.29_PM.jpg',
    description: 'Adjustable-height study desk and chair set with tiltable desktop for writing, reading, and drawing. Includes book rack, pen holder groove, and bag hook.',
    inStock: true,
    ageGroup: 'Elementary / Primary Students',
    isFeatured: true
  },
  {
    id: 'prod-elem-learning-desk-complete',
    name: "Children's Learning Desk, Adjustable Height Writing Desk and Chair Set for Elementary School Students, Complete Furniture Set",
    category: 'Child-Friendly Furniture',
    price: 2900,
    priceDisplay: 'GH₵ 2,900',
    rating: 4.8,
    reviews: 18,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701030/WhatsApp_Image_2026-09-03_at_3.45.57_PM.jpg',
    description: 'Complete elementary writing and learning workstation engineered for spine support and comfortable study sessions as learners grow.',
    inStock: true,
    ageGroup: 'Elementary School Students',
    isFeatured: false
  },
  {
    id: 'prod-toy-shelves',
    name: 'Children Shelve Toy Holders',
    category: 'Child-Friendly Furniture',
    price: 600,
    priceDisplay: 'GH₵ 600 - 1,200',
    rating: 4.7,
    reviews: 29,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701031/WhatsApp_Image_2026-09-03_at_3.48.32_PM_2.jpg',
    description: 'Accessible, child-height multi-bin storage organizer shelf. Promotes classroom independence, self-cleaning routines, and neat categorization of toys and learning aids.',
    inStock: true,
    ageGroup: 'All Early Years',
    isFeatured: true,
    specs: 'Available in multiple tier configurations: GH₵ 600 - GH₵ 1,200'
  },
  {
    id: 'prod-nursery-play-mat',
    name: 'Nursery Children Play Mat',
    category: 'Sensory & Play',
    price: 350,
    priceDisplay: 'Contact for Sizing & Price',
    rating: 4.9,
    reviews: 38,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701030/WhatsApp_Image_2026-09-03_at_3.48.30_PM_4.jpg',
    images: [
      'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701030/WhatsApp_Image_2026-09-03_at_3.48.30_PM_4.jpg',
      'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701028/WhatsApp_Image_2026-09-03_at_3.48.30_PM_3.jpg'
    ],
    description: 'Cushioned, non-toxic waterproof play mat designed for safe crawling, sensory activities, and floor play in infant and toddler rooms.',
    inStock: true,
    ageGroup: 'Infant, Toddler & Nursery',
    isFeatured: false
  },
  {
    id: 'prod-outdoor-slide',
    name: 'Outdoor Slide for Children',
    category: 'Outdoor & Play Equipment',
    price: 12023,
    priceDisplay: 'GH₵ 12,023',
    rating: 5.0,
    reviews: 15,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701025/WhatsApp_Image_2026-09-03_at_3.48.30_PM_5.jpg',
    description: 'Durable, weather-resistant outdoor playground slide unit with wide safety steps, sturdy handrails, and smooth landing zone for gross motor fun.',
    inStock: true,
    ageGroup: 'Ages 2 - 8',
    isFeatured: true
  },
  {
    id: 'prod-plastic-assembly-toy',
    name: 'Children Plastic Assembly Educational Toy',
    category: 'Educational Toys',
    price: 135,
    priceDisplay: 'GH₵ 135',
    rating: 4.8,
    reviews: 41,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701026/WhatsApp_Image_2026-09-03_at_3.48.32_PM_5.jpg',
    description: 'Colorful interlocking plastic parts encouraging mechanical creativity, spatial planning, and fine-motor dexterity in young builders.',
    inStock: true,
    ageGroup: 'Ages 3 - 7',
    isFeatured: false
  },
  {
    id: 'prod-tetris-puzzle',
    name: 'Tetris Building Block Puzzle Toy',
    category: 'Educational Toys',
    price: 200,
    priceDisplay: 'GH₵ 200',
    rating: 4.9,
    reviews: 53,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701025/WhatsApp_Image_2026-09-03_at_3.48.32_PM_1.jpg',
    description: 'Classic brain-teaser puzzle board with colorful geometric blocks. Enhances logical reasoning, pattern recognition, and problem-solving skills.',
    inStock: true,
    ageGroup: 'Ages 3 - 8',
    isFeatured: true
  },
  {
    id: 'prod-shape-foam-set',
    name: 'Shape Foam Building Set for Preschool, Baby Cognitive Development with Matching and Anti-Collision Design',
    category: 'Sensory & Play',
    price: 105,
    priceDisplay: 'GH₵ 105',
    rating: 4.8,
    reviews: 26,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701025/WhatsApp_Image_2026-09-03_at_3.48.33_PM.jpg',
    description: 'Soft, anti-collision foam geometric matching blocks for safe infant and preschool stacking, shape identification, and tactile development.',
    inStock: true,
    ageGroup: 'Baby & Preschool',
    isFeatured: false
  },
  {
    id: 'prod-traffic-carpet',
    name: "Customized Parking Lot Children's Crawling Game Track with Road Traffic Theme - Cartoon Early Education Carpet for Kindergarten",
    category: 'Sensory & Play',
    price: 480,
    priceDisplay: 'Contact for Sizing & Price',
    rating: 4.9,
    reviews: 31,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701025/WhatsApp_Image_2026-09-03_at_3.48.30_PM_1.jpg',
    description: 'Illustrated road map traffic carpet for kindergarten floors. Inspires imaginative role play with toy vehicles and teaches traffic safety awareness.',
    inStock: true,
    ageGroup: 'Ages 2 - 7',
    isFeatured: false
  },
  {
    id: 'prod-large-plastic-blocks',
    name: 'Large Plastic Building Blocks for Kids',
    category: 'Educational Toys',
    price: 450,
    priceDisplay: 'GH₵ 450 - 850 (Based on pcs)',
    rating: 4.9,
    reviews: 48,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.32_PM_4.jpg',
    description: 'Oversized, easy-to-grip colorful construction blocks perfect for preschool hands to engineer towers, bridges, and imaginative structures.',
    inStock: true,
    ageGroup: 'Ages 2 - 8',
    isFeatured: true,
    specs: 'Range: GH₵ 450 - GH₵ 850 based on number of pieces'
  },
  {
    id: 'prod-wooden-3d-puzzle',
    name: 'Wooden 3D Puzzle for Early Education',
    category: 'Educational Toys',
    price: 50,
    priceDisplay: 'GH₵ 50',
    rating: 4.7,
    reviews: 59,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.31_PM_5.jpg',
    images: [
      'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.31_PM_5.jpg',
      'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.31_PM_4.jpg'
    ],
    description: 'Natural wood 3D puzzle with smooth rounded edges. Fosters hand-eye coordination, spatial awareness, and animal/object recognition.',
    inStock: true,
    ageGroup: 'Ages 2 - 6',
    isFeatured: false
  },
  {
    id: 'prod-seesaw',
    name: 'Seesaw',
    category: 'Outdoor & Play Equipment',
    price: 2701.26,
    priceDisplay: 'GH₵ 2,701.26',
    rating: 4.9,
    reviews: 12,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.32_PM.jpg',
    description: 'Child-safe ergonomic seesaw with padded shock absorbers and comfort-grip handles for cooperative vestibular and balance play.',
    inStock: true,
    ageGroup: 'Ages 3 - 10',
    isFeatured: true
  },
  {
    id: 'prod-artificial-grass',
    name: 'Artificial Carpet Grass',
    category: 'Outdoor & Play Equipment',
    price: 1020,
    priceDisplay: 'GH₵ 1,020',
    rating: 5.0,
    reviews: 37,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.32_PM_3.jpg',
    description: 'Premium realistic artificial turf for playground surfacing, sensory corners, and outdoor activity zones. Clean, non-allergenic, and weatherproof.',
    inStock: true,
    ageGroup: 'School & Playground Setup',
    isFeatured: true,
    specs: 'Thickness: 2.5 cm | Width: 2m | Length: 10m'
  },
  {
    id: 'prod-drill-toolbox',
    name: "Assembled Toy - Children's Screw-Tightening Electric Drill Educational Repair Toolbox Set, 3-in-1 for Boys & Girls, Age 6+",
    category: 'Educational Toys',
    price: 260,
    priceDisplay: 'Contact for Quote',
    rating: 4.9,
    reviews: 43,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701024/WhatsApp_Image_2026-09-03_at_3.48.30_PM_2.jpg',
    description: 'Realistic kid-safe battery-powered electric drill and tool set with bolts, nuts, and activity plates for hands-on STEM engineering play.',
    inStock: true,
    ageGroup: 'Age 6+',
    isFeatured: true
  },
  {
    id: 'prod-rect-adj-table',
    name: 'Rectangular Preschool Adjustable Table',
    category: 'Child-Friendly Furniture',
    price: 650,
    priceDisplay: 'GH₵ 650',
    rating: 4.8,
    reviews: 34,
    image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701023/WhatsApp_Image_2026-09-03_at_3.48.31_PM_2.jpg',
    description: 'High-durability rectangular preschool activity table with height-adjustable steel legs and stain-resistant easy-wipe surface.',
    inStock: true,
    ageGroup: 'Preschool & Kindergarten',
    isFeatured: true
  }
];

export const MOCK_PENDING_APPROVALS: PendingTeacherApproval[] = [
  {
    id: 'pa-1',
    teacherName: 'Blessing Mansa Okon',
    appliedDate: 'Yesterday, 4:20 PM',
    qualification: 'B.Ed Early Childhood',
    level: 'Early Childhood (EYFS)',
    status: 'Pending Review',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'pa-2',
    teacherName: 'Ekow Arthur',
    appliedDate: 'Jul 30, 2026',
    qualification: 'Early Childhood Diploma',
    level: 'Kindergarten',
    status: 'Interview Scheduled',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'pa-3',
    teacherName: 'Adwoa Danquah',
    appliedDate: 'Jul 28, 2026',
    qualification: 'EYFS Certified',
    level: 'Nursery',
    status: 'Approved',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  }
];

export const MOCK_CONSULTATION_BOOKINGS: ConsultationBooking[] = [
  {
    id: 'cb-101',
    clientName: 'Dr. Elizabeth Asare',
    schoolName: 'Oakwood Ridge International',
    serviceName: 'Teacher Recruitment & Staff Placement',
    requestedDate: 'Aug 04, 2026',
    status: 'New Inquiry',
    phone: '+233 54 039 0029'
  },
  {
    id: 'cb-102',
    clientName: 'Nana Kwame Acheampong',
    schoolName: 'Royal Tots Academy',
    serviceName: 'CEC Spaces Classroom Setup',
    requestedDate: 'Aug 06, 2026',
    status: 'Confirmed',
    phone: '+233 20 685 5347'
  }
];

export const MOCK_ADMIN_ANALYTICS = {
  monthlyPlacements: [
    { month: 'Jan', teachers: 14, schools: 9 },
    { month: 'Feb', teachers: 22, schools: 15 },
    { month: 'Mar', teachers: 28, schools: 18 },
    { month: 'Apr', teachers: 35, schools: 22 },
    { month: 'May', teachers: 42, schools: 29 },
    { month: 'Jun', teachers: 58, schools: 38 },
    { month: 'Jul', teachers: 65, schools: 44 }
  ],
  levelDistribution: [
    { name: 'EYFS / Early Childhood', value: 45, color: '#047857' },
    { name: 'Nursery', value: 25, color: '#ea580c' },
    { name: 'Kindergarten', value: 18, color: '#0284c7' },
    { name: 'Lower Primary', value: 12, color: '#8b5cf6' }
  ]
};

export const MOCK_TESTIMONIALS = [
  {
    quote: "CEC Educational Consult transformed our early childhood recruitment process. Before CEC, finding EYFS-certified teachers who understood child-friendly learning principles took months. With CEC's Teacher Network, we hired two stellar educators within 10 days!",
    author: "Mrs. Nana Yaa Appiah",
    role: "Proprietress",
    school: "Morning Star Early Years Academy",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop"
  },
  {
    quote: "Joining the CEC Teacher Network was the best career move I ever made. CEC's mentorship, training workshops and career network elevated my teaching skills and matched me with a school that genuinely values early years educators.",
    author: "Akosua Mensah",
    role: "Lead EYFS Teacher",
    school: "Lincoln Early Years Community",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
  },
  {
    quote: "The CEC Spaces team redesigned our nursery floor plan from scratch. The kids love the sensory reading nook and tactile math walls. Parents were blown away during our open day!",
    author: "Mr. Kofi Boateng",
    role: "Head of School",
    school: "Crown Heritage International School",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
  }
];
