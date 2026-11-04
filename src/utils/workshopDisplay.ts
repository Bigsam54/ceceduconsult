import type { Workshop } from '../types';

// Admins can leave most workshop details empty, so every view formats them through these.

export const isFreeWorkshop = (w: Pick<Workshop, 'price'>) => !w.price.trim() || /^free$/i.test(w.price.trim());

export const workshopPriceLabel = (w: Pick<Workshop, 'price'>) => (isFreeWorkshop(w) ? 'Free' : w.price);

/** "Saturday, 19 December 2026 · 9:30 AM", or whichever part is known */
export const workshopWhen = (w: Pick<Workshop, 'date' | 'time'>) => [w.date.trim(), w.time.trim()].filter(Boolean).join(' · ');

/** totalSeats of 0 means unlimited registration */
export const hasSeatLimit = (w: Pick<Workshop, 'totalSeats'>) => w.totalSeats > 0;

export const isSoldOut = (w: Pick<Workshop, 'totalSeats' | 'availableSeats'>) => hasSeatLimit(w) && w.availableSeats <= 0;
