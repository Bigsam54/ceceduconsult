import type { StoreSection } from '../types';

export interface StoreSectionConfig {
  key: StoreSection;
  label: string;
  tagline: string;
  categories: string[];
  coverImage: string;
}

export const STORE_SECTIONS: Record<StoreSection, StoreSectionConfig> = {
  books: {
    key: 'books',
    label: 'Books',
    tagline: 'Storybooks, phonics readers and activity books carefully selected for every age and reading level.',
    categories: [
      'Storybooks',
      'Phonics & Early Readers',
      'Activity & Workbooks',
      'Educational & Reference',
      'Parenting & Teacher Guides'
    ],
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80'
  },
  'school-resources': {
    key: 'school-resources',
    label: 'School Resources',
    tagline: 'Child-friendly furniture, outdoor play equipment, educational toys and sensory play materials.',
    categories: [
      'Child-Friendly Furniture',
      'Outdoor & Play Equipment',
      'Educational Toys',
      'Sensory & Play'
    ],
    coverImage: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788701031/WhatsApp_Image_2026-09-03_at_3.48.31_PM.jpg'
  }
};

export const STORE_SECTION_ORDER: StoreSection[] = ['books', 'school-resources'];
