// CEC's workshop topics (from the "Workshop Topics" flyer). Schools and individuals
// pick from these when requesting a workshop; admins can also use the group names
// as the category of a scheduled workshop.

export interface WorkshopTopicGroup {
  key: 'general' | 'school-leaders';
  label: string;
  audience: string;
  topics: string[];
}

export const WORKSHOP_TOPIC_GROUPS: WorkshopTopicGroup[] = [
  {
    key: 'general',
    label: 'General',
    audience: 'For teachers and educators',
    topics: [
      'Introduction to Early Childhood Education',
      'Teaching Reading and Spelling the Right Way',
      'Building Handwriting Skills',
      'Building Number Sense (Numeracy)',
      'Teaching Reading Comprehension Effectively',
      'Writing Report Card Comments',
      'Teacher Wellbeing',
      'Assessment and Feedback in Education',
      'Planning an Engaging Lesson in Early Years',
      'Classroom Management Techniques',
      'Helping Children Listen and Focus',
      'The Read Aloud Strategy',
      'Having Hard Conversations with Parents',
      'Using AI and Technology in Education',
      'How to Teach Online',
      'The Power of Play in Early Years',
      'Using Child-Centred Approaches',
      "Understanding Children's Emotional Needs",
      'Planning an Effective Circle Time'
    ]
  },
  {
    key: 'school-leaders',
    label: 'School Leaders',
    audience: 'For proprietors, heads and school leaders',
    topics: [
      'Building a Strong School Brand in the Community',
      'Coaching and Mentoring Teachers for Growth',
      'Financial Management and Budgeting for Schools',
      'How to Set up a Preschool',
      'Staff Supervision and Observation'
    ]
  }
];

/** Categories an admin can give a scheduled workshop */
export const WORKSHOP_CATEGORIES = ['General', 'School Leaders', 'Parents'];

export const WORKSHOP_CONTACT_NUMBERS = ['+233 54 039 0029', '+233 20 685 5347'];
