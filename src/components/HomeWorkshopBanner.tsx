import React from 'react';
import { ArrowRight, CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { ViewMode } from '../types';
import { useWorkshops } from '../hooks/useWorkshops';
import { isFreeWorkshop, upcomingWorkshops, workshopWhen } from '../utils/workshopDisplay';

interface HomeWorkshopBannerProps {
  onNavigate: (view: ViewMode) => void;
}

/**
 * Slim home page call-to-action for the next workshop. It appears on its own
 * whenever the admin uploads a workshop that hasn't happened yet, and hides
 * itself when there's nothing upcoming.
 */
export const HomeWorkshopBanner: React.FC<HomeWorkshopBannerProps> = ({ onNavigate }) => {
  const { workshops, loading } = useWorkshops();
  const upcoming = upcomingWorkshops(workshops);
  const next = upcoming[0];

  if (loading || !next) return null;

  const when = workshopWhen(next);
  const more = upcoming.length - 1;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => onNavigate('workshops')}
        className="group w-full text-left relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b3b45] via-[#126373] to-[#0b3b45] text-white border border-[#2ac0db]/30 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      >
        <div className="absolute -top-16 -right-10 w-56 h-56 bg-[#fa7b2d]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-56 h-56 bg-[#2ac0db]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 sm:p-5">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            {next.image ? (
              <img
                src={next.image}
                alt={next.title}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md shrink-0"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-7 h-7 text-[#fa7b2d]" />
              </div>
            )}

            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#2ac0db]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fa7b2d] animate-pulse" /> Upcoming workshop
                </span>
                {isFreeWorkshop(next) && (
                  <span className="px-2 py-0.5 rounded-full bg-[#fa7b2d] text-white text-[10px] font-extrabold uppercase tracking-wide">
                    Free
                  </span>
                )}
              </div>
              <p className="font-heading font-extrabold text-base sm:text-xl leading-snug line-clamp-2">{next.title}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-200">
                {when && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-[#2ac0db]" /> {when}
                  </span>
                )}
                {next.venue && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2ac0db]" /> {next.venue}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch sm:items-end gap-1.5 shrink-0">
            <span className="px-5 py-3 bg-[#fa7b2d] group-hover:bg-[#e96a1c] text-white font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors">
              Register Now <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
            {more > 0 && (
              <span className="text-[11px] text-slate-300 text-center sm:text-right">
                + {more} more upcoming workshop{more === 1 ? '' : 's'}
              </span>
            )}
          </div>
        </div>
      </button>
    </section>
  );
};
