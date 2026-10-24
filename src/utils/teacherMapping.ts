import type { AvailabilityStatus, Teacher } from '../types';

// CEC's WhatsApp line: schools always contact CEC, never the teacher directly
const CEC_WHATSAPP_NUMBER = '233540390029';

/** The fields shared by teacher_profiles and the public_teacher_directory view */
export interface DirectoryTeacherRow {
  user_id: string;
  full_name: string;
  headline: string;
  teaching_level: string;
  location: string;
  qualification: string;
  salary_expectation: string;
  bio: string;
  skills: string[] | null;
  availability: string;
  avatar_url: string;
  experience_years: number | null;
  verified_at?: string | null;
  created_at?: string;
  // Only present when an admin reads the full profile row
  email?: string;
  phone?: string;
}

const toAvailability = (value: string): AvailabilityStatus => {
  if (value === 'Not Available') return 'Placed / Employed';
  if (value === 'Next Academic Term' || value === '2 Weeks Notice' || value === 'Placed / Employed' || value === 'On Leave') {
    return value;
  }
  return 'Immediate';
};

/** Turns a registered (Supabase) teacher into the Teacher shape the directory and profile pages use */
export const rowToTeacher = (row: DirectoryTeacherRow): Teacher => {
  const salary = row.salary_expectation || 'Negotiable';
  const bio = row.bio || `${row.full_name} is a CEC-verified educator ready to support your school.`;

  return {
    id: row.user_id,
    name: row.full_name,
    title: row.headline || row.teaching_level || 'CEC Verified Educator',
    photo: row.avatar_url || '',
    teachingLevel: row.teaching_level || 'All Levels',
    location: row.location || 'Ghana',
    experienceYears: row.experience_years ?? 0,
    salaryExpectation: salary,
    availability: toAvailability(row.availability),
    qualification: row.qualification || 'Qualified Educator',
    isVerified: true,
    isRegistered: true,
    verificationStatus: 'Verified',
    // Registered teachers have no CEC audit reviews yet; the UI shows "New" for these
    rating: 0,
    reviewsCount: 0,
    bio,
    aboutDetailed: bio,
    skills: row.skills ?? [],
    subjects: [],
    employmentPreferences: {
      type: 'Full-time',
      preferredLocations: row.location ? [row.location] : [],
      minSalary: salary
    },
    timeline: [],
    contactWhatsappNumber: CEC_WHATSAPP_NUMBER,
    email: row.email ?? '',
    phoneNumber: row.phone || undefined
  };
};
