import { AvailabilityMovementLog } from '../types';

export const INITIAL_MOVEMENT_LOGS: AvailabilityMovementLog[] = [
  {
    id: 'mov-1',
    teacherId: 't-1',
    teacherName: 'Amina Bello',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    previousStatus: '2 Weeks Notice',
    newStatus: 'Immediate',
    changedBy: 'Teacher Self-Update',
    reason: 'Concluded handover at previous early learning center; ready for immediate classroom deployment.',
    schoolInvolved: 'Meadow Hall Preparatory',
    timestamp: '12 mins ago'
  },
  {
    id: 'mov-2',
    teacherId: 't-3',
    teacherName: 'Fatima Al-Hassan',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=600',
    previousStatus: 'Immediate',
    newStatus: 'Placed / Employed',
    changedBy: 'CEC Admin',
    reason: 'Successfully signed 1-year contract as Lead Early Years Specialist.',
    schoolInvolved: 'Grange Early Years Campus, Ikeja GRA',
    timestamp: '1 hour ago'
  },
  {
    id: 'mov-3',
    teacherId: 't-5',
    teacherName: 'David Osei',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    previousStatus: 'Next Academic Term',
    newStatus: '2 Weeks Notice',
    changedBy: 'Teacher Self-Update',
    reason: 'Relocating to Lekki Phase 1; advanced availability window.',
    schoolInvolved: 'British International Early Years',
    timestamp: '3 hours ago'
  },
  {
    id: 'mov-4',
    teacherId: 't-2',
    teacherName: 'Grace Nwosu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    previousStatus: 'Immediate',
    newStatus: 'Immediate',
    changedBy: 'CEC Admin',
    reason: 'Passed Foundational Phonics Micro-Teaching Audit with 98% score; Verified Badge issued.',
    schoolInvolved: 'CEC Quality Assurance Board',
    timestamp: '5 hours ago'
  },
  {
    id: 'mov-5',
    teacherId: 't-6',
    teacherName: 'Ngozi Okonjo',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    previousStatus: 'Placed / Employed',
    newStatus: 'Next Academic Term',
    changedBy: 'Placement Match System',
    reason: 'Completing 2-year maternity relief contract in December; open for September term matching.',
    schoolInvolved: 'Corona Nursery Ikoyi',
    timestamp: 'Yesterday at 4:15 PM'
  },
  {
    id: 'mov-6',
    teacherId: 't-4',
    teacherName: 'Kemi Adebayo',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    previousStatus: '2 Weeks Notice',
    newStatus: 'Placed / Employed',
    changedBy: 'CEC Admin',
    reason: 'Matched and dispatched to Early Childhood Toddler Room.',
    schoolInvolved: 'Children’s International School (CIS) Lekki',
    timestamp: '2 days ago'
  }
];
