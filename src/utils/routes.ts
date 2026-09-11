import { ViewMode } from '../types';

// Single source of truth mapping app views to real, crawlable URL paths.
// Keep in sync with public/sitemap.xml and public/robots.txt.
export const VIEW_PATHS: Record<ViewMode, string> = {
  'home': '/',
  'directory': '/teachers',
  'schools': '/schools',
  'teacher-profile': '/teachers',
  'join-network': '/join-network',
  'consultancy': '/consultancy',
  'reading-club': '/reading-club',
  'workshops': '/workshops',
  'cec-spaces': '/cec-spaces',
  'learning-essentials': '/learning-essentials',
  'about': '/about',
  'contact': '/contact',
  'login': '/login',
  'register': '/register',
  'teacher-dashboard': '/teacher-dashboard',
  'admin-login': '/admin-login',
  'admin-dashboard': '/admin-dashboard',
};

const PATH_TO_VIEW: Record<string, ViewMode> = {};
for (const [view, path] of Object.entries(VIEW_PATHS) as [ViewMode, string][]) {
  // 'teacher-profile' shares '/teachers' with 'directory'; a direct/refreshed
  // load of that path should always resolve to the directory listing, since
  // a specific teacher isn't addressable by URL.
  if (view === 'teacher-profile') continue;
  if (!(path in PATH_TO_VIEW)) PATH_TO_VIEW[path] = view;
}

export const getPathFromView = (view: ViewMode): string => VIEW_PATHS[view] ?? '/';

export const getViewFromPath = (pathname: string): ViewMode => {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return PATH_TO_VIEW[normalized] ?? 'home';
};
