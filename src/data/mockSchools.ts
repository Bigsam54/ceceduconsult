import { AdvertisedSchool } from '../types';

export const MOCK_ADVERTISED_SCHOOLS: AdvertisedSchool[] = [
  {
    id: 'school-morning-star',
    name: 'Morning Star Early Years Academy',
    tagline: 'Nurturing confident, curious, and creative lifelong learners',
    location: '14 Patrice Lumumba Road, Airport Residential Area',
    area: 'Airport Residential',
    city: 'Accra',
    levels: 'Creche, Nursery & Kindergarten',
    curriculum: 'British EYFS & Play-Based Learning',
    studentAges: '6 months - 5 years',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['CEC Setup Partner', 'British EYFS Standard', 'Top Considered'],
    highlights: [
      'CEC Designed Early Years Sensory & Literacy Room',
      '1:6 Teacher-to-Child ratio in Toddler classrooms',
      'Safe, enclosed natural outdoor play lab & splash deck',
      'Daily hot organic meals prepared by on-site pediatric nutritionist'
    ],
    description: 'Morning Star Early Years Academy is a premier early childhood institution situated in Airport Residential, Accra. Featuring custom CEC-designed sensory reading nooks, natural wooden learning furniture, and a certified British EYFS curriculum taught by vetted early years specialists.',
    admissionStatus: 'Admissions Ongoing',
    studentTeacherRatio: '1:6',
    contactPhone: '+233 54 039 0029',
    contactWhatsapp: '+233540390029',
    contactEmail: 'admissions@morningstarearly.edu.gh',
    tuitionTier: 'Premium',
    isFeatured: true
  },
  {
    id: 'school-heritage-bloom',
    name: 'Heritage Bloom International Prep',
    tagline: 'Excellence in foundational literacy, character, and discovery',
    location: 'Bawaleshie Road, East Legon',
    area: 'East Legon',
    city: 'Accra',
    levels: 'Preschool to Primary Grade 6',
    curriculum: 'Cambridge Primary & Synthetic Phonics',
    studentAges: '1.5 years - 11 years',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['CEC Audited Standard', 'Cambridge Primary', 'Top Considered'],
    highlights: [
      'Structured Synthetic Phonics reading program (CEC certified)',
      'Robotics, STEM discovery corners and French immersion',
      'CCTV-monitored classrooms and air-conditioned school bus fleet',
      'Music, swimming, and creative arts studio'
    ],
    description: 'Heritage Bloom International combines British Cambridge standards with rich African cultural values in East Legon. All early years classrooms were designed in collaboration with CEC to foster independence, curiosity, and accelerated phonics fluency.',
    admissionStatus: 'Limited Seats',
    studentTeacherRatio: '1:8',
    contactPhone: '+233 24 935 6337',
    contactWhatsapp: '+233540390029',
    contactEmail: 'info@heritagebloom.edu.gh',
    tuitionTier: 'Premium',
    isFeatured: true
  },
  {
    id: 'school-little-pearls',
    name: 'Little Pearls Montessori School',
    tagline: 'Inspiring independence, practical life mastery, and child-led joy',
    location: 'Circular Road, Cantonments',
    area: 'Cantonments',
    city: 'Accra',
    levels: 'Toddler Community, Children\'s House & Lower Primary',
    curriculum: 'Authentic Montessori & Reggio Emilia Inspired',
    studentAges: '12 months - 8 years',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['Montessori Certified', 'CEC Setup Partner', 'Eco-Friendly Campus'],
    highlights: [
      'Original imported wooden sensorial apparatus & tactile math materials',
      'Natural botanical garden, composting, and practical life centers',
      'Small collaborative cohorts with individualized learning pace',
      'Full-day and flexible half-day enrollment options'
    ],
    description: 'Set in a serene Cantonments green sanctuary, Little Pearls Montessori provides authentic multi-age environments where children develop deep concentration, fine motor dexterity, and social empathy under certified Montessori guides.',
    admissionStatus: 'Admissions Ongoing',
    studentTeacherRatio: '1:7',
    contactPhone: '+233 20 685 5347',
    contactWhatsapp: '+233540390029',
    contactEmail: 'admissions@littlepearlsmontessori.org',
    tuitionTier: 'Mid-Range',
    isFeatured: true
  },
  {
    id: 'school-crown-heights',
    name: 'Crown Heights British Academy',
    tagline: 'World-class British education developing academic leaders of tomorrow',
    location: 'Community 25, Tema',
    area: 'Tema Community 25',
    city: 'Tema',
    levels: 'Early Years, Primary & Junior High',
    curriculum: 'British National Curriculum & GES Hybrid',
    studentAges: '2 years - 14 years',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['British Curriculum', 'CEC Audited Standard', 'Modern Campus'],
    highlights: [
      'State-of-the-art synthetic turf playground and sports pavilion',
      'Interactive smart boards in every primary classroom',
      'CEC verified teachers with 100% university education degrees',
      'Structured after-school homework club and tutoring support'
    ],
    description: 'Crown Heights British Academy provides families in Tema and Greater Accra with an expansive, purpose-built campus. Combining rigorous British curriculum assessments with compassionate pastoral guidance.',
    admissionStatus: 'Open for Enquiries',
    studentTeacherRatio: '1:10',
    contactPhone: '+233 54 039 0029',
    contactWhatsapp: '+233540390029',
    contactEmail: 'info@crownheightsacademy.com',
    tuitionTier: 'Mid-Range',
    isFeatured: true
  },
  {
    id: 'school-oasis-springs',
    name: 'Oasis Springs Early Learning & Creche',
    tagline: 'Safe, warm, and joyful developmental sanctuary for infants and toddlers',
    location: 'Haatso-Atomic Road, West Legon',
    area: 'West Legon',
    city: 'Accra',
    levels: 'Infant Creche & Nursery Care',
    curriculum: 'Sensory-Motor & Early Speech Development',
    studentAges: '3 months - 4 years',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['CEC Setup Partner', 'Infant Care Specialist', 'Open for Admissions'],
    highlights: [
      'Sanitized cushioned floorings and anti-bacterial air filtration',
      'Full-time registered pediatric nurse on duty',
      'Live parent photo updates and milestones tracking app',
      'Potty training systems and speech enrichment games'
    ],
    description: 'Designed for working parents seeking the highest safety and developmental standards, Oasis Springs offers personalized infant and toddler care equipped with CEC safety-certified cribs and tactile play corners.',
    admissionStatus: 'Admissions Ongoing',
    studentTeacherRatio: '1:4',
    contactPhone: '+233 24 935 6337',
    contactWhatsapp: '+233540390029',
    contactEmail: 'admissions@oasissprings.com',
    tuitionTier: 'Standard',
    isFeatured: true
  }
];
