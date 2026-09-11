import { ViewMode } from '../types';

export const SITE_URL = 'https://ceceduconsult.com';

interface SeoMeta {
  title: string;
  description: string;
}

// Per-page <title> and meta description. Kept short and specific per Google's
// guidance (title ~50-60 chars, description ~150-160 chars) rather than
// reusing one generic tag site-wide.
export const VIEW_SEO: Partial<Record<ViewMode, SeoMeta>> = {
  'home': {
    title: 'CEC Educational Consult | Early Childhood Education in Ghana',
    description: 'CEC Educational Consult connects Ghanaian schools and families with vetted early childhood educators, school setup consultancy, CEC Spaces classroom design and The Reading Lounge.',
  },
  'directory': {
    title: 'Find Certified Early Childhood Teachers in Ghana | CEC',
    description: 'Search 1,000+ screened, certified early childhood and EYFS teachers in Ghana, matched to your school\'s level, budget and start date.',
  },
  'schools': {
    title: 'Schools to Consider in Ghana | CEC Educational Consult',
    description: 'Browse CEC-audited early years academies and primary schools in Ghana with admissions currently in progress.',
  },
  'join-network': {
    title: 'Join the CEC Educator Network | Teaching Jobs in Ghana',
    description: 'Join CEC\'s network of certified early childhood educators in Ghana and get matched with vetted schools seeking top-tier teaching talent.',
  },
  'consultancy': {
    title: 'Educational Consultancy Services | CEC Educational Consult',
    description: 'School setup, early years curriculum development, international curriculum alignment, teacher recruitment and school operational guidance from CEC.',
  },
  'reading-club': {
    title: 'The Reading Lounge & Phonics Club | CEC Educational Consult',
    description: 'Live online phonics and reading circles for children ages 4 to 12, with weekly book boxes, Synthetic Phonics and certified literacy educators.',
  },
  'workshops': {
    title: 'Educators Workshops | CEC Professional Development, Ghana',
    description: 'CPD-certified workshops and masterclasses for early childhood educators and school leaders in classroom management, phonics, STEM and leadership.',
  },
  'cec-spaces': {
    title: 'CEC Spaces: Classroom Design & School Setup | CEC',
    description: 'Themed classroom transformations, sensory play zones and school layout design by CEC, built for safe, engaging early years learning environments.',
  },
  'learning-essentials': {
    title: 'Learning Essentials: Classroom Furniture & Toys | CEC',
    description: 'Shop age-appropriate learning resources, child-friendly furniture, outdoor play equipment and sensory materials for Ghanaian classrooms and homes.',
  },
  'about': {
    title: 'About CEC Educational Consult | Our Story & Founder',
    description: 'Meet Miss Nancie and the CEC Educational Consult team pioneering early childhood excellence in Ghana through educators, spaces and programmes.',
  },
  'contact': {
    title: 'Contact CEC Educational Consult | Ghana',
    description: 'Get in touch with CEC Educational Consult for teacher recruitment, school setup, reading clubs or consultancy enquiries.',
  },
  'login': {
    title: 'Teacher Login | CEC Educational Consult',
    description: 'Sign in to your CEC Educational Consult teacher dashboard.',
  },
  'register': {
    title: 'Register as a Teacher | CEC Educational Consult',
    description: 'Create your CEC Educational Consult teacher profile and get matched with vetted schools in Ghana.',
  },
};

let canonicalEl: HTMLLinkElement | null = null;
let descriptionEl: HTMLMetaElement | null = null;

// Updates <title>, the meta description and the canonical link tag whenever
// the active view changes, so each real URL (see routes.ts) carries its own
// distinct, indexable metadata instead of one static tag for the whole app.
export const applyViewSeo = (view: ViewMode, path: string): void => {
  const meta = VIEW_SEO[view];
  if (meta) {
    document.title = meta.title;

    if (!descriptionEl) {
      descriptionEl = document.querySelector('meta[name="description"]');
    }
    if (descriptionEl) {
      descriptionEl.setAttribute('content', meta.description);
    }
  }

  if (!canonicalEl) {
    canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
  }
  canonicalEl.setAttribute('href', `${SITE_URL}${path}`);
};
