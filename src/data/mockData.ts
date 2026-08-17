import { 
  Teacher, 
  ConsultationService, 
  Workshop, 
  CECSpaceProject, 
  LearningProduct,
  PendingTeacherApproval,
  ConsultationBooking
} from '../types';

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: 'tch-001',
    name: 'Amina Bello',
    title: 'Lead EYFS & Montessori Educator',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'Preschool (EYFS)',
    location: 'Lagos, Nigeria (Island)',
    experienceYears: 7,
    salaryExpectation: '$1,200 - $1,500/mo',
    availability: 'Immediate',
    qualification: 'B.Ed Early Childhood',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 28,
    bio: 'Dedicated early childhood specialist trained in Montessori pedagogy & Jolly Phonics. Passionate about child-led inquiry learning and sensory development.',
    aboutDetailed: 'Amina is a certified early years practitioner with over 7 years of classroom leadership. She specializes in building nurturing, child-centered environments where young learners build confidence, literacy, and emotional resilience. Known for integrating creative storytelling with tactile math activities.',
    skills: ['EYFS Curriculum', 'Montessori Math', 'Jolly Phonics', 'Reggio Emilia Approach', 'Positive Discipline', 'Child Safeguarding'],
    subjects: ['Early Literacy & Phonics', 'Sensory Math', 'Creative Arts', 'Social-Emotional Learning'],
    employmentPreferences: {
      type: 'Full-time',
      preferredLocations: ['Lekki', 'Ikoyi', 'Victoria Island'],
      minSalary: '$1,200/mo'
    },
    timeline: [
      {
        id: 't-1',
        role: 'Senior Nursery Educator',
        institution: 'Meadow Hall School, Lagos',
        period: '2022 - Present',
        description: 'Led a class of 18 children, introduced multisensory phonics stations, increased literacy benchmarks by 35%.',
        type: 'experience'
      },
      {
        id: 't-2',
        role: 'Lead Preschool Teacher',
        institution: 'Grange School Early Years',
        period: '2019 - 2022',
        description: 'Managed early childhood learning plans, implemented positive reinforcement strategies.',
        type: 'experience'
      },
      {
        id: 't-3',
        role: 'B.Ed Early Childhood Education',
        institution: 'University of Lagos',
        period: '2015 - 2019',
        description: 'Graduated First Class Honors. Thesis on hands-on play in preschool cognitive retention.',
        type: 'education'
      },
      {
        id: 't-4',
        role: 'International Montessori Diploma',
        institution: 'London Montessori Centre',
        period: '2020',
        description: 'Certified in 3-6 age group Montessori apparatus and classroom setup.',
        type: 'education'
      }
    ],
    contactWhatsappNumber: '+2348012345678',
    email: 'amina.bello@cecteachers.org'
  },
  {
    id: 'tch-002',
    name: 'David Osei',
    title: 'Kindergarten & Early STEM Facilitator',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'Kindergarten',
    location: 'Accra, Ghana / Remote Hybrid',
    experienceYears: 5,
    salaryExpectation: '$1,000 - $1,300/mo',
    availability: '2 Weeks Notice',
    qualification: 'EYFS Certified',
    isVerified: true,
    rating: 4.8,
    reviewsCount: 19,
    bio: 'Innovative educator bridging early childhood play with foundational science, robotics blocks, and spatial reasoning for kids aged 3-6.',
    aboutDetailed: 'David believes children learn best through active exploration. He combines traditional nursery rhymes with tactile construction blocks, nature study, and emotional intelligence activities.',
    skills: ['Early STEM', 'Lego Education', 'Interactive Storytelling', 'Behavioral Guidance', 'Parent Communication'],
    subjects: ['Preschool Science', 'Spatial Math', 'Nature Discovery', 'Physical Development'],
    employmentPreferences: {
      type: 'Full-time',
      preferredLocations: ['Accra Central', 'East Legon', 'Airport Residential'],
      minSalary: '$1,000/mo'
    },
    timeline: [
      {
        id: 't-10',
        role: 'Kindergarten Lead Teacher',
        institution: 'Lincoln Community School',
        period: '2021 - Present',
        description: 'Spearheaded Kindergarten STEM week, designed interactive nature exploration labs.',
        type: 'experience'
      },
      {
        id: 't-11',
        role: 'Postgraduate Diploma in Primary Education',
        institution: 'University of Ghana',
        period: '2018 - 2020',
        description: 'Focused on early years inquiry-based pedagogy.',
        type: 'education'
      }
    ],
    contactWhatsappNumber: '+233241234567',
    email: 'david.osei@cecteachers.org'
  },
  {
    id: 'tch-003',
    name: 'Grace Nwosu',
    title: 'Pre-K Literacy & Phonics Specialist',
    photo: 'https://images.unsplash.com/photo-1580894732413-b88d44747683?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'Preschool (EYFS)',
    location: 'Abuja, Nigeria',
    experienceYears: 9,
    salaryExpectation: '$1,500 - $2,000/mo',
    availability: 'Immediate',
    qualification: 'Montessori Diploma',
    isVerified: true,
    rating: 5.0,
    reviewsCount: 42,
    bio: 'Award-winning master teacher specializing in Jolly Phonics, early reading fluency, and child psychology in international preschool settings.',
    aboutDetailed: 'With nearly a decade of classroom excellence, Grace has trained over 120 preschool teachers across West Africa. She transforms hesitant readers into confident storytellers using kinesthetic reading games.',
    skills: ['Jolly Phonics Master', 'Curriculum Mapping', 'Special Needs Inclusion', 'Preschool Drama', 'Montessori Language Arts'],
    subjects: ['Early Reading & Writing', 'Phonemic Awareness', 'Art & Expression'],
    employmentPreferences: {
      type: 'Full-time / Consultancy',
      preferredLocations: ['Maitama', 'Asokoro', 'Gwarinpa'],
      minSalary: '$1,500/mo'
    },
    timeline: [
      {
        id: 't-20',
        role: 'Head of Early Years',
        institution: 'Corona Schools, Abuja',
        period: '2020 - 2024',
        description: 'Supervised 12 preschool educators, audited curriculum standards.',
        type: 'experience'
      },
      {
        id: 't-21',
        role: 'Montessori Diploma in Early Learning',
        institution: 'St. Nicholas Montessori College',
        period: '2015 - 2017',
        description: 'Specialized in Language and Sensorial Materials.',
        type: 'education'
      }
    ],
    contactWhatsappNumber: '+2348098765432',
    email: 'grace.nwosu@cecteachers.org'
  },
  {
    id: 'tch-004',
    name: 'Kwame Mensah',
    title: 'Lower Primary & Early Numeracy Educator',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'Lower Primary',
    location: 'Lagos, Nigeria (Mainland)',
    experienceYears: 6,
    salaryExpectation: '$1,100 - $1,400/mo',
    availability: 'Next Academic Term',
    qualification: 'PGDE',
    isVerified: true,
    rating: 4.7,
    reviewsCount: 15,
    bio: 'Lower Primary specialist with expertise in Singapore Math methods, concrete-pictorial-abstract progression, and engaging class dynamics.',
    aboutDetailed: 'Kwame brings math to life for children transitioning from nursery to primary grades. His concrete learning aids eliminate math anxiety early.',
    skills: ['Singapore Math', 'Differentiated Instruction', 'Classroom Tech', 'Assessment Systems'],
    subjects: ['Primary Mathematics', 'General Science', 'Critical Thinking'],
    employmentPreferences: {
      type: 'Full-time',
      preferredLocations: ['Ikeja', 'Yaba', 'Surulere'],
      minSalary: '$1,100/mo'
    },
    timeline: [
      {
        id: 't-30',
        role: 'Grade 1 Lead Teacher',
        institution: 'Green Springs School',
        period: '2021 - Present',
        description: 'Maintained 98% student math proficiency rating.',
        type: 'experience'
      }
    ],
    contactWhatsappNumber: '+2348033334444',
    email: 'kwame.mensah@cecteachers.org'
  },
  {
    id: 'tch-005',
    name: 'Chidimma Adeleke',
    title: 'Nursery Specialist & Child Psychologist',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'Nursery',
    location: 'Lagos, Nigeria',
    experienceYears: 8,
    salaryExpectation: '$1,300 - $1,700/mo',
    availability: 'Immediate',
    qualification: 'Early Years Specialist',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 31,
    bio: 'Nursery lead with background in developmental psychology. Focuses on toddler emotional regulation, sensory motor skills, and smooth school transitions.',
    aboutDetailed: 'Chidimma creates safe, home-away-from-home nursery spaces. She works closely with parents to address separation anxiety and developmental milestones.',
    skills: ['Toddler Care', 'Sensory Play', 'Child Psychology', 'Potty Training Systems', 'Music & Movement'],
    subjects: ['Sensory Motor Skills', 'Speech & Rhythm', 'Self-Care Habits'],
    employmentPreferences: {
      type: 'Full-time',
      preferredLocations: ['Ikoyi', 'Lekki Phase 1', 'Banana Island'],
      minSalary: '$1,300/mo'
    },
    timeline: [
      {
        id: 't-40',
        role: 'Nursery Section Lead',
        institution: 'Children International School (CIS)',
        period: '2019 - Present',
        description: 'Supervised nursery room routines for 30 toddlers.',
        type: 'experience'
      }
    ],
    contactWhatsappNumber: '+2348123456789',
    email: 'chidimma.a@cecteachers.org'
  },
  {
    id: 'tch-006',
    name: 'Samuel Kalu',
    title: 'Inclusive Learning & SEN Early Years Specialist',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    teachingLevel: 'Special Needs (SEN)',
    location: 'Port Harcourt, Nigeria',
    experienceYears: 6,
    salaryExpectation: '$1,200 - $1,600/mo',
    availability: '2 Weeks Notice',
    qualification: 'B.Ed Early Childhood',
    isVerified: true,
    rating: 4.8,
    reviewsCount: 17,
    bio: 'Dedicated special educational needs practitioner focusing on speech therapy integration, neurodivergent preschool support, and IEP creation.',
    aboutDetailed: 'Samuel designs Individualized Education Plans (IEPs) for preschoolers with speech delays, ADHD, or autism, empowering them to thrive in mainstream classrooms.',
    skills: ['IEP Development', 'Behavioral Therapy Support', 'Sign Language Basics', 'Sensory De-escalation'],
    subjects: ['Adaptive Communication', 'Inclusive Play', 'Social Integration'],
    employmentPreferences: {
      type: 'Full-time / Part-time',
      preferredLocations: ['Port Harcourt GRA', 'Trans Amadi'],
      minSalary: '$1,200/mo'
    },
    timeline: [
      {
        id: 't-50',
        role: 'SEN Coordinator',
        institution: 'Bloombreed Schools',
        period: '2021 - Present',
        description: 'Coordinated inclusion programs for early childhood learners.',
        type: 'experience'
      }
    ],
    contactWhatsappNumber: '+2348077778888',
    email: 'samuel.kalu@cecteachers.org'
  }
];

export const MOCK_CONSULTATION_SERVICES: ConsultationService[] = [
  {
    id: 'srv-1',
    title: 'Teacher Recruitment & Staff Placement',
    shortDesc: 'End-to-end recruitment of vetted, qualified preschool and primary educators tailored to your school culture.',
    fullDesc: 'We handle candidate sourcing, credentials verification, practical classroom observation, background checks, and matching with your school values.',
    iconName: 'UserCheck',
    features: [
      'Comprehensive candidate screening & background checks',
      'Classroom simulation & teaching demonstration evaluation',
      'Customized salary and contract structure guidance',
      '90-day replacement guarantee for school peace of mind'
    ],
    recommendedFor: 'New & established schools seeking top-tier preschool educators',
    pricingTag: 'Custom School Package'
  },
  {
    id: 'srv-2',
    title: 'Preschool Curriculum Design & Audit',
    shortDesc: 'Custom EYFS, Montessori, and blended curriculum frameworks designed for maximum child engagement.',
    fullDesc: 'Miss Nancy and our curriculum experts review your existing scheme of work or design a bespoke child-centric curriculum aligned with global early childhood standards.',
    iconName: 'BookOpenCheck',
    features: [
      'Scope & sequence development for ages 1 - 6',
      'Integration of Jolly Phonics & Singapore Math',
      'Teacher lesson plan templates & assessment rubrics',
      'Hands-on learning material recommendations'
    ],
    recommendedFor: 'Schools upgrading their academic standards or transitioning to EYFS',
    pricingTag: 'Popular for School Owners'
  },
  {
    id: 'srv-3',
    title: 'CEC Spaces: Classroom Setup & Transformation',
    shortDesc: 'Complete spatial design and equipment planning for modern, child-friendly preschool environments.',
    fullDesc: 'We turn plain rooms into vibrant, ergonomically designed learning sanctuaries with safety-tested furniture, sensory learning zones, and outdoor play areas.',
    iconName: 'LayoutGrid',
    features: [
      '3D spatial floorplan & zoning layout design',
      'Ergonomic wooden furniture sourcing & placement',
      'Sensory learning corner & reading nook creation',
      'Safety and sanitation audit'
    ],
    recommendedFor: 'Proprietors starting new preschool branches or renovating existing rooms',
    pricingTag: 'Turnkey Project'
  },
  {
    id: 'srv-4',
    title: 'Teacher Development & In-House Workshops',
    shortDesc: 'Practical early years training modules for your teaching faculty.',
    fullDesc: 'Equip your teachers with modern classroom management, positive discipline, Jolly Phonics mastery, and parent communication methods.',
    iconName: 'GraduationCap',
    features: [
      'On-site or virtual training modules',
      'Classroom demonstrations with real-time feedback',
      'Certificates of completion for all attendees',
      'Post-training mentor follow-ups'
    ],
    recommendedFor: 'Schools boosting teacher productivity & retention',
    pricingTag: 'Flexible Group Rate'
  },
  {
    id: 'srv-5',
    title: 'CEC Reading Club & Phonics Circles',
    shortDesc: 'Weekly phonics, guided storytelling, and book clubs for children ages 2 to 8.',
    fullDesc: 'A joyful literacy program helping young learners build phonemic awareness, expressive reading fluency, and an enduring love for books through structured reading circles.',
    iconName: 'BookOpen',
    features: [
      'Weekly age-graded reading & phonics sessions (Ages 2–8)',
      'Curated monthly book boxes & physical reading logs',
      'Jolly Phonics blending games and vocabulary building',
      'In-school reading club setup for partner institutions'
    ],
    recommendedFor: 'Parents & preschools nurturing confident early readers',
    pricingTag: 'Term & Monthly Subscriptions'
  }
];

export const MOCK_VIDEO_TESTIMONIALS = [
  {
    id: 'vid-1',
    author: 'Mrs. Folashade Adeleke',
    role: 'Proprietress & Founder',
    school: 'Meadowland International Preschool',
    location: 'Ikoyi, Lagos',
    duration: '1:45',
    coverImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop',
    headline: '“Hiring vetted EYFS teachers took days instead of months.”',
    quote: 'Before partnering with CEC, finding teachers who genuinely understand early childhood pedagogy was exhausting. With Miss Nancy’s team, we placed two outstanding educators who transformed our classrooms immediately.',
    videoTopic: 'Preschool Teacher Recruitment & 90-Day Guarantee',
    verifiedSchool: true
  },
  {
    id: 'vid-2',
    author: 'Amina Bello',
    role: 'Lead EYFS Teacher',
    school: 'Meadow Hall Early Years',
    location: 'Lekki Phase 1',
    duration: '2:12',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    headline: '“CEC mentorship gave me the confidence and career growth I needed.”',
    quote: 'Joining the CEC Teacher Network elevated my career. Miss Nancy’s Jolly Phonics and Montessori workshops gave me practical strategies that I use with my learners every single day.',
    videoTopic: 'Teacher Mentorship & Career Placement',
    verifiedSchool: true
  },
  {
    id: 'vid-3',
    author: 'Mr. Patrick Egwu',
    role: 'Head of School',
    school: 'Crown Heritage Academy',
    location: 'Abuja',
    duration: '1:30',
    coverImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    headline: '“The CEC Spaces transformation impressed all our parents on Open Day.”',
    quote: 'CEC redesigned our toddler learning spaces with wooden Montessori shelving and a dedicated sensory reading nook. Enrollment in our preschool wing jumped by 40% this academic session.',
    videoTopic: 'CEC Spaces Classroom Renovation & Setup',
    verifiedSchool: true
  },
  {
    id: 'vid-4',
    author: 'Dr. Elizabeth Taylor',
    role: 'Early Years Director',
    school: 'Oakwood International',
    location: 'Victoria Island',
    duration: '1:58',
    coverImage: 'https://images.unsplash.com/photo-1580894732413-b88d44747683?q=80&w=800&auto=format&fit=crop',
    headline: '“The CEC Reading Club made our 4-year-olds enthusiastic readers.”',
    quote: 'Integrating the CEC Reading Club into our curriculum turned hesitant readers into confident storytellers. The children look forward to every reading circle and book box.',
    videoTopic: 'CEC Reading Club & Phonics Integration',
    verifiedSchool: true
  }
];

export const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: 'wk-101',
    title: 'Mastering Positive Discipline in Preschool Classrooms',
    category: 'Classroom Management',
    date: 'Saturday, August 15, 2026',
    time: '10:00 AM - 2:00 PM WAT',
    venue: 'CEC Training Center, Lekki Phase 1, Lagos & Zoom Live',
    price: '₦25,000 ($35)',
    availableSeats: 8,
    totalSeats: 40,
    facilitator: 'Miss Nancy (Founder, CEC Consults)',
    description: 'Learn proven non-punitive strategies to manage toddler tantrums, promote self-regulation, and create a calm, cooperative preschool environment.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'wk-102',
    title: 'Phonics & Early Literacy Masterclass (Jolly Phonics Focus)',
    category: 'Early Literacy & Phonics',
    date: 'Saturday, August 22, 2026',
    time: '09:00 AM - 1:00 PM WAT',
    venue: 'CEC Innovation Hub, Ikeja, Lagos',
    price: '₦30,000 ($40)',
    availableSeats: 5,
    totalSeats: 35,
    facilitator: 'Grace Nwosu (Phonics Lead Specialist)',
    description: 'Master the 42 letter sounds, blending strategies, tricky words, and kinesthetic games that get 3-year-olds reading fluently within months.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'wk-103',
    title: 'Montessori Concrete Math for Preschool & Kindergarten',
    category: 'Montessori & STEM',
    date: 'Saturday, September 5, 2026',
    time: '10:00 AM - 3:00 PM WAT',
    venue: 'Virtual Interactive Masterclass via Zoom',
    price: '₦20,000 ($28)',
    availableSeats: 14,
    totalSeats: 50,
    facilitator: 'Amina Bello (Lead EYFS Educator)',
    description: 'Transform abstract numbers into tangible experiences using number rods, bead chains, and sensorial counters.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'wk-104',
    title: 'Preschool School Proprietors Leadership & Enrollment Growth',
    category: 'Preschool Leadership',
    date: 'Saturday, September 19, 2026',
    time: '11:00 AM - 3:00 PM WAT',
    venue: 'Radisson Blu Hotel, Victoria Island, Lagos',
    price: '₦60,000 ($80)',
    availableSeats: 6,
    totalSeats: 25,
    facilitator: 'Miss Nancy & Guest School Directors',
    description: 'Strategic roadmap for preschool owners: fee pricing, parent satisfaction, teacher retention, and brand positioning in competitive areas.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop'
  }
];

export const MOCK_CEC_SPACES: CECSpaceProject[] = [
  {
    id: 'sp-1',
    title: 'The Haven Early Learning Montessori Wing',
    schoolName: 'The Haven International Academy',
    location: 'Lekki Phase 1, Lagos',
    type: 'Montessori Classroom',
    beforeImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    description: 'Converted a dark, overcrowded classroom into an open, warm, natural-wood Montessori learning laboratory with accessible low shelves and reading corners.',
    keyUpgrades: [
      'Child-height solid oak wooden shelving',
      'Soft washable neutral carpet & cushion reading nook',
      'Tactile sensory math & practical life stations',
      'Natural light optimization & LED warm fixtures'
    ]
  },
  {
    id: 'sp-2',
    title: 'Little Wonders Toddler Sensory Play Studio',
    schoolName: 'Little Wonders Nursery School',
    location: 'Ikoyi, Lagos',
    type: 'Preschool Sensory Room',
    beforeImage: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop',
    description: 'Designed a dedicated sensory motor exploration room with indoor soft climb blocks, water play tables, and calming visual walls.',
    keyUpgrades: [
      'Padded impact safety flooring',
      'Interactive tactile texture wall panels',
      'Modular soft play foam blocks',
      'Aromatherapy & soothing acoustic panels'
    ]
  }
];

export const MOCK_LEARNING_PRODUCTS: LearningProduct[] = [
  {
    id: 'prod-1',
    name: 'Tactile Wooden Alphabet Tracing Trays',
    category: 'Montessori Tools',
    price: 32,
    rating: 4.9,
    reviews: 47,
    image: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?q=80&w=600&auto=format&fit=crop',
    description: 'Premium natural beechwood carved letter trays with wooden stylus for fine motor writing preparation.',
    inStock: true,
    ageGroup: 'Ages 2.5 - 5',
    isFeatured: true
  },
  {
    id: 'prod-2',
    name: 'Jolly Phonics Multisensory Flashcard Box Set',
    category: 'Phonics & Reading',
    price: 28,
    rating: 5.0,
    reviews: 83,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
    description: 'Complete 42 sound group card deck with textured letters, action illustrations, and word blending prompts.',
    inStock: true,
    ageGroup: 'Ages 3 - 6',
    isFeatured: true
  },
  {
    id: 'prod-3',
    name: 'Sensory Counting Peg Board & Color Sorting Set',
    category: 'Early Math',
    price: 45,
    rating: 4.8,
    reviews: 29,
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=600&auto=format&fit=crop',
    description: 'Smooth wooden number board with colorful silicone stacking pegs for 1-10 quantity matching.',
    inStock: true,
    ageGroup: 'Ages 2 - 5',
    isFeatured: true
  },
  {
    id: 'prod-4',
    name: 'Modular Foam Sensory Play Cushion Set (6 Pcs)',
    category: 'Sensory & Play',
    price: 110,
    rating: 4.9,
    reviews: 14,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop',
    description: 'Heavy duty, easy-to-clean vegan leather soft climbing and seating blocks for nursery play corners.',
    inStock: true,
    ageGroup: 'Ages 1 - 4',
    isFeatured: false
  },
  {
    id: 'prod-5',
    name: 'EYFS Classroom Emotion & Feeling Weather Charts',
    category: 'Classroom Decor',
    price: 18,
    rating: 4.7,
    reviews: 38,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop',
    description: 'Laminated interactive daily weather and emotion check-in board with velcro student tokens.',
    inStock: true,
    ageGroup: 'Ages 2 - 6',
    isFeatured: false
  }
];

export const MOCK_PENDING_APPROVALS: PendingTeacherApproval[] = [
  {
    id: 'pa-1',
    teacherName: 'Blessing Okon',
    appliedDate: 'Yesterday, 4:20 PM',
    qualification: 'B.Ed Early Childhood',
    level: 'Preschool (EYFS)',
    status: 'Pending Review',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'pa-2',
    teacherName: 'Tunde Bakare',
    appliedDate: 'Jul 30, 2026',
    qualification: 'Montessori Diploma',
    level: 'Kindergarten',
    status: 'Interview Scheduled',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'pa-3',
    teacherName: 'Florence Danjuma',
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
    clientName: 'Dr. Elizabeth Taylor',
    schoolName: 'Oakwood International Academy',
    serviceName: 'Teacher Recruitment & Staff Placement',
    requestedDate: 'Aug 04, 2026',
    status: 'New Inquiry',
    phone: '+234 802 555 0192'
  },
  {
    id: 'cb-102',
    clientName: 'Chief Rotimi Adeyemi',
    schoolName: 'Royal Tots Nursery School',
    serviceName: 'CEC Spaces Classroom Setup',
    requestedDate: 'Aug 06, 2026',
    status: 'Confirmed',
    phone: '+234 803 111 2233'
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
    { name: 'EYFS / Preschool', value: 45, color: '#047857' },
    { name: 'Nursery', value: 25, color: '#ea580c' },
    { name: 'Kindergarten', value: 18, color: '#0284c7' },
    { name: 'Lower Primary', value: 12, color: '#8b5cf6' }
  ]
};

export const MOCK_TESTIMONIALS = [
  {
    quote: "CEC Educational Consults transformed our preschool recruitment process. Before CEC, finding EYFS-certified teachers who understood Montessori principles took months. With CEC's Teacher Network, we hired two stellar educators within 10 days!",
    author: "Mrs. Folashade Adeleke",
    role: "Proprietress",
    school: "Meadowland International Preschool, Ikoyi",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop"
  },
  {
    quote: "Joining the CEC Teacher Network was the best career move I ever made. Miss Nancy's mentorship and training elevated my teaching skills, and CEC matched me with a school that genuinely values early years educators.",
    author: "Amina Bello",
    role: "Lead EYFS Teacher",
    school: "Meadow Hall School",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
  },
  {
    quote: "The CEC Spaces team redesigned our nursery floor plan from scratch. The kids love the sensory reading nook and tactile math walls. Parents were blown away during our open day!",
    author: "Mr. Patrick Egwu",
    role: "Head of School",
    school: "Crown Heritage Academy, Abuja",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
  }
];
