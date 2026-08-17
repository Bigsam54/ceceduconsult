export type ViewMode = 
  | 'home'
  | 'directory'
  | 'teacher-profile'
  | 'join-network'
  | 'consultancy'
  | 'reading-club'
  | 'workshops'
  | 'cec-spaces'
  | 'learning-essentials'
  | 'about'
  | 'contact'
  | 'login'
  | 'register'
  | 'teacher-dashboard'
  | 'admin-dashboard';

export type AvailabilityStatus = 
  | 'Immediate' 
  | '2 Weeks Notice' 
  | 'Next Academic Term' 
  | 'Placed / Employed'
  | 'On Leave';

export type VerificationStatus = 
  | 'Verified' 
  | 'Pending Review' 
  | 'Under Audit' 
  | 'Rejected' 
  | 'Incomplete';

export interface VideoTestimonial {
  id: string;
  author: string;
  role: string;
  school: string;
  location: string;
  duration: string;
  coverImage: string;
  headline: string;
  quote: string;
  videoTopic: string;
  verifiedSchool: boolean;
}

export interface TimelineItem {
  id: string;
  role: string;
  institution: string;
  period: string;
  description: string;
  type: 'experience' | 'education';
}

export interface TeacherReferenceCheck {
  refereeName: string;
  refereeRole: string;
  school: string;
  phone: string;
  relationship: string;
  verifiedByAdmin: boolean;
  notes: string;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  photo: string;
  teachingLevel: 'Preschool (EYFS)' | 'Nursery' | 'Kindergarten' | 'Lower Primary' | 'Special Needs (SEN)';
  location: string;
  experienceYears: number;
  salaryExpectation: string;
  availability: AvailabilityStatus;
  qualification: 'B.Ed Early Childhood' | 'EYFS Certified' | 'Montessori Diploma' | 'PGDE' | 'Early Years Specialist';
  isVerified: boolean;
  verificationStatus?: VerificationStatus;
  rating: number;
  reviewsCount: number;
  bio: string;
  aboutDetailed: string;
  skills: string[];
  subjects: string[];
  employmentPreferences: {
    type: string;
    preferredLocations: string[];
    minSalary: string;
  };
  timeline: TimelineItem[];
  contactWhatsappNumber: string;
  email: string;
  // Extended fields for Admin Deep-Dive & Backend entities
  phoneNumber?: string;
  videoDemoUrl?: string;
  cvUrl?: string;
  policeClearanceVerified?: boolean;
  credentialsAuditedBy?: string;
  currentPlacedSchool?: string;
  placementDate?: string;
  references?: TeacherReferenceCheck[];
  adminNotes?: string;
}

export interface ConsultationService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  recommendedFor: string;
  pricingTag: string;
}

export interface Workshop {
  id: string;
  title: string;
  category: 'Preschool Leadership' | 'Early Literacy & Phonics' | 'Classroom Management' | 'Montessori & STEM';
  date: string;
  time: string;
  venue: string;
  price: string;
  availableSeats: number;
  totalSeats: number;
  facilitator: string;
  description: string;
  image: string;
}

export interface CECSpaceProject {
  id: string;
  title: string;
  schoolName: string;
  location: string;
  type: 'Montessori Classroom' | 'Preschool Sensory Room' | 'Outdoor Early Play Lab' | 'Complete School Layout';
  beforeImage: string;
  afterImage: string;
  description: string;
  keyUpgrades: string[];
}

export interface LearningProduct {
  id: string;
  name: string;
  category: 'Montessori Tools' | 'Sensory & Play' | 'Phonics & Reading' | 'Early Math' | 'Classroom Decor';
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  inStock: boolean;
  ageGroup: string;
  isFeatured: boolean;
}

export interface PendingTeacherApproval {
  id: string;
  teacherName: string;
  appliedDate: string;
  qualification: string;
  level: string;
  status: 'Pending Review' | 'Interview Scheduled' | 'Approved' | 'Rejected';
  avatar: string;
  experienceYears?: number;
  location?: string;
  specialization?: string;
  idCardVerified?: boolean;
  certificateVerified?: boolean;
  microTeachingScore?: number;
}

export interface ConsultationBooking {
  id: string;
  clientName: string;
  schoolName: string;
  serviceName: string;
  requestedDate: string;
  status: 'New Inquiry' | 'Confirmed' | 'Completed';
  phone: string;
  email?: string;
  notes?: string;
  meetingFormat?: 'Google Meet' | 'In-Person' | 'School Site Visit';
}

export interface TeacherFilterState {
  searchQuery: string;
  teachingLevel: string;
  qualification: string;
  availability: string;
  maxSalary: number;
  experienceMinYears: number;
  onlyVerified: boolean;
  location: string;
}

export interface AvailabilityMovementLog {
  id: string;
  teacherId: string;
  teacherName: string;
  avatar?: string;
  previousStatus: AvailabilityStatus;
  newStatus: AvailabilityStatus;
  changedBy: 'Teacher Self-Update' | 'Miss Nancy (Admin)' | 'Placement Match System';
  reason: string;
  schoolInvolved?: string;
  timestamp: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
