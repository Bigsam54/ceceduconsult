import React, { useState } from 'react';
import { Workshop } from '../types';
import { useWorkshops } from '../hooks/useWorkshops';
import { WorkshopRequestModal } from '../components/WorkshopRequestModal';
import { workshopPriceLabel, workshopWhen, hasSeatLimit, isSoldOut, isFreeWorkshop } from '../utils/workshopDisplay';
import { WORKSHOP_TOPIC_GROUPS, WORKSHOP_CONTACT_NUMBERS } from '../data/workshopTopics';
import {
  Calendar,
  MapPin,
  Ticket,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Award,
  BookOpenCheck,
  School,
  UserRound,
  Plus,
  Phone,
  CalendarClock
} from 'lucide-react';

interface WorkshopsViewProps {
  onRegisterWorkshop: (workshop: Workshop) => void;
}

export const WorkshopsView: React.FC<WorkshopsViewProps> = ({ onRegisterWorkshop }) => {
  const { workshops, loading } = useWorkshops();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestTopic, setRequestTopic] = useState<string | null>(null);

  // Filters come from the workshops the admin has actually published
  const categories = ['All', ...Array.from(new Set(workshops.map((w) => w.category).filter(Boolean)))];

  const openRequest = (topic: string | null = null) => {
    setRequestTopic(topic);
    setRequestOpen(true);
  };

  const filteredWorkshops = selectedCategory === 'All'
    ? workshops
    : workshops.filter(w => w.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">

      {/* Banner */}
      <div className="relative bg-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/20 shadow-2xl space-y-3 sm:space-y-4 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1573164574397-dd250bc8a598?auto=format&fit=crop&w=2000&q=80"
            alt="Educators collaborating at a CEC professional development workshop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
            Educators Workshops
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Interactive workshops and masterclasses for educators and school leaders. Earn CEC Professional Development certificates and master modern early childhood methods.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => openRequest()}
              className="px-5 py-3 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#fa7b2d]/25 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Request a Workshop
            </button>
            <a href="#workshop-topics" className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 flex items-center gap-2">
              View all topics
            </a>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-wide">Upcoming workshops</p>
        <button
          onClick={() => openRequest()}
          className="self-start sm:self-auto px-4 py-2.5 bg-white hover:bg-[#126373]/5 text-[#126373] font-bold text-xs sm:text-sm rounded-xl border-2 border-[#126373]/30 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Request a Workshop for your school or yourself
        </button>
      </div>
      {categories.length > 2 && (
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#2ac0db] text-slate-950 shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      )}

      {loading && (
        <p className="text-center text-sm text-slate-500 font-semibold py-8">Loading workshops...</p>
      )}

      {!loading && filteredWorkshops.length === 0 && (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-10 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#126373]/10 text-[#126373] flex items-center justify-center mx-auto">
            <CalendarClock className="w-7 h-7" />
          </div>
          <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900">New workshops are being scheduled</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Check back soon, or request a workshop for your school or for yourself on any of the topics below.
          </p>
          <button
            onClick={() => openRequest()}
            className="px-5 py-3 bg-[#126373] hover:bg-[#0e4f5c] text-white font-bold text-sm rounded-xl inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Request a Workshop
          </button>
        </div>
      )}

      {/* Workshop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredWorkshops.map((wk) => (
          <div
            key={wk.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#2ac0db] transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Workshop flyer, or a branded header when there is no image */}
              {wk.image ? (
                <a
                  href={wk.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative bg-slate-900 overflow-hidden"
                  title="Open the full flyer"
                >
                  <img src={wk.image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60" />
                  <img
                    src={wk.image}
                    alt={`${wk.title} flyer`}
                    referrerPolicy="no-referrer"
                    className="relative mx-auto h-72 sm:h-96 w-auto max-w-full object-contain"
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    {wk.category && (
                      <span className="px-3 py-1 bg-slate-950/70 backdrop-blur-md text-[#2ac0db] text-[11px] font-extrabold uppercase rounded-full">
                        {wk.category}
                      </span>
                    )}
                    {isFreeWorkshop(wk) && (
                      <span className="ml-auto px-3 py-1 bg-emerald-500 text-white text-[11px] font-extrabold uppercase rounded-full shadow">Free</span>
                    )}
                  </div>
                </a>
              ) : (
                <div className="p-6 sm:p-7 bg-gradient-to-br from-slate-950 to-[#0d3842] text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
                    <GraduationCap className="w-36 h-36" />
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    {wk.category && (
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-[#2ac0db] text-xs font-extrabold uppercase rounded-full border border-white/10">
                        {wk.category}
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 ml-auto">
                      <Award className="w-4 h-4 text-[#fa7b2d]" /> CEC Workshop
                    </span>
                  </div>
                </div>
              )}

              {/* Body */}
              <div className="p-6 sm:p-7 space-y-4">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 group-hover:text-[#126373] transition-colors leading-snug">
                  {wk.title}
                </h3>

                {wk.description && (
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {wk.description}
                  </p>
                )}

                {/* Details Pills */}
                {(workshopWhen(wk) || wk.venue || hasSeatLimit(wk)) && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                    {workshopWhen(wk) && (
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#2ac0db] shrink-0" />
                        <span>{workshopWhen(wk)}</span>
                      </div>
                    )}
                    {wk.venue && (
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-[#fa7b2d] shrink-0" />
                        <span>{wk.venue}</span>
                      </div>
                    )}
                    {hasSeatLimit(wk) && (
                      <div className="flex items-center gap-2.5">
                        <Ticket className="w-4 h-4 text-[#126373] shrink-0" />
                        <span>{isSoldOut(wk) ? 'Fully booked' : `${wk.availableSeats} of ${wk.totalSeats} seats remaining`}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Fee</span>
                <span className={`text-lg sm:text-xl font-extrabold ${isFreeWorkshop(wk) ? 'text-emerald-600' : 'text-slate-900'}`}>{workshopPriceLabel(wk)}</span>
              </div>

              <button
                onClick={() => onRegisterWorkshop(wk)}
                disabled={isSoldOut(wk)}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#2ac0db] hover:bg-[#22a8c0] disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isSoldOut(wk) ? 'Fully Booked' : 'Register Now'}</span>
                {!isSoldOut(wk) && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Request a workshop: every CEC topic */}
      <section id="workshop-topics" className="scroll-mt-32 space-y-6">
        <div className="bg-gradient-to-br from-[#0b2228] via-[#114c5a] to-[#126373] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-[#2ac0db]/25 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#2ac0db]">Request a workshop</p>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold">Bring a CEC workshop to your school, or join one yourself</h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Choose the topics you need and we'll plan a workshop around your team or your own growth, in person or online.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-[#2ac0db]" /> For a whole school
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold flex items-center gap-1.5">
                  <UserRound className="w-3.5 h-3.5 text-[#2ac0db]" /> For individuals
                </span>
              </div>
            </div>
            <div className="space-y-2 shrink-0">
              <button
                onClick={() => openRequest()}
                className="w-full lg:w-auto px-6 py-3.5 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Request a Workshop
              </button>
              <p className="text-xs text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> {WORKSHOP_CONTACT_NUMBERS.join(' / ')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {WORKSHOP_TOPIC_GROUPS.map((group) => (
            <div key={group.key} className={`bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4 ${group.key === 'general' ? 'lg:col-span-2' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${group.key === 'general' ? 'bg-[#2ac0db]/15 text-[#126373]' : 'bg-[#fa7b2d]/15 text-[#fa7b2d]'}`}>
                  {group.key === 'general' ? <BookOpenCheck className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900">{group.label}</h3>
                  <p className="text-xs text-slate-500">{group.audience}</p>
                </div>
              </div>
              <div className={`grid grid-cols-1 ${group.key === 'general' ? 'sm:grid-cols-2' : ''} gap-2`}>
                {group.topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => openRequest(topic)}
                    className="group/topic text-left px-3.5 py-3 rounded-xl border border-slate-200 hover:border-[#126373]/40 hover:bg-[#126373]/5 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-slate-700 group-hover/topic:text-[#126373]">{topic}</span>
                    <Plus className="w-4 h-4 text-slate-300 group-hover/topic:text-[#126373] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <WorkshopRequestModal isOpen={requestOpen} onClose={() => setRequestOpen(false)} initialTopic={requestTopic} />

    </div>
  );
};

