import type { Workshop } from '../types';

// Admins can leave most workshop details empty, so every view formats them through these.

export const isFreeWorkshop = (w: Pick<Workshop, 'price'>) => !w.price.trim() || /^free$/i.test(w.price.trim());

export const workshopPriceLabel = (w: Pick<Workshop, 'price'>) => (isFreeWorkshop(w) ? 'Free' : w.price);

/** "Saturday, 19 December 2026 · 9:30 AM", or whichever part is known */
export const workshopWhen = (w: Pick<Workshop, 'date' | 'time'>) => [w.date.trim(), w.time.trim()].filter(Boolean).join(' · ');

/** totalSeats of 0 means unlimited registration */
export const hasSeatLimit = (w: Pick<Workshop, 'totalSeats'>) => w.totalSeats > 0;

export const isSoldOut = (w: Pick<Workshop, 'totalSeats' | 'availableSeats'>) => hasSeatLimit(w) && w.availableSeats <= 0;

/**
 * The workshop date as a Date, if the admin typed a readable one
 * ("Saturday, 19 December 2026", "19 Dec 2026", "2026-12-19"); otherwise null.
 */
export const parseWorkshopDate = (w: Pick<Workshop, 'date'>): Date | null => {
  const text = w.date.trim().replace(/^[a-z]+day,?\s+/i, '').replace(/(\d+)(st|nd|rd|th)\b/gi, '$1');
  if (!text) return null;

  // "19 December 2026" / "December 19, 2026": parsed by hand because Safari is strict
  const monthIndex = (name: string) =>
    ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(name.slice(0, 3).toLowerCase());
  const dayFirst = text.match(/^(\d{1,2})\s+([a-z]+)\.?,?\s+(\d{4})/i);
  const monthFirst = text.match(/^([a-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})/i);
  const parts = dayFirst
    ? { day: +dayFirst[1], month: monthIndex(dayFirst[2]), year: +dayFirst[3] }
    : monthFirst
      ? { day: +monthFirst[2], month: monthIndex(monthFirst[1]), year: +monthFirst[3] }
      : null;
  if (parts && parts.month >= 0) return new Date(parts.year, parts.month, parts.day);

  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return new Date(+iso[1], +iso[2] - 1, +iso[3]);
  return null;
};

/**
 * Workshops that haven't happened yet, soonest first. Workshops without a readable
 * date are kept (after the dated ones) so a newly uploaded workshop still shows.
 */
export const upcomingWorkshops = <T extends Pick<Workshop, 'date'>>(workshops: T[], now = new Date()): T[] => {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return workshops
    .map((w, index) => ({ w, index, time: parseWorkshopDate(w)?.getTime() ?? null }))
    .filter(({ time }) => time === null || time >= startOfToday)
    .sort((a, b) => (a.time ?? Infinity) - (b.time ?? Infinity) || b.index - a.index)
    .map(({ w }) => w);
};
