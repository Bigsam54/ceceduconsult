import React, { useState } from 'react';
import { Workshop } from '../types';
import { useWorkshops } from '../hooks/useWorkshops';
import {
  Calendar,
  MapPin,
  Ticket,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Award,
  BookOpenCheck
} from 'lucide-react';

interface WorkshopsViewProps {
  onRegisterWorkshop: (workshop: Workshop) => void;
}

export const WorkshopsView: React.FC<WorkshopsViewProps> = ({ onRegisterWorkshop }) => {
  const { workshops, loading } = useWorkshops();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Classroom Management', 'Early Literacy & Phonics', 'Early STEM & Math', 'Early Childhood Leadership'];

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
        </div>
      </div>

      {/* Category Chips */}
      <p className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-wide">Workshops you can choose from</p>
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

      {loading && (
        <p className="text-center text-sm text-slate-500 font-semibold py-8">Loading workshops...</p>
      )}

      {!loading && filteredWorkshops.length === 0 && (
        <p className="text-center text-sm text-slate-500 font-semibold py-8">No workshops scheduled right now - check back soon.</p>
      )}

      {/* Workshop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredWorkshops.map((wk) => (
          <div
            key={wk.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#2ac0db] transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Workshop Graphic Header */}
              <div className="p-6 sm:p-7 bg-gradient-to-br from-slate-950 to-[#0d3842] text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
                  <GraduationCap className="w-36 h-36" />
                </div>
                
                <div className="flex items-center justify-between relative z-10">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-[#2ac0db] text-xs font-extrabold uppercase rounded-full border border-white/10">
                    {wk.category}
                  </span>
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#fa7b2d]" /> CPD Certified
                  </span>
                </div>

                <div className="mt-4 relative z-10">
                  <span className="text-xs font-medium text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    {wk.availableSeats} of {wk.totalSeats} seats remaining
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 space-y-4">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 group-hover:text-[#126373] transition-colors leading-snug">
                  {wk.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {wk.description}
                </p>

                {/* Details Pills */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#2ac0db] shrink-0" />
                    <span>{wk.date} ({wk.time})</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#fa7b2d] shrink-0" />
                    <span className="truncate">{wk.venue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Investment Fee</span>
                <span className="text-lg sm:text-xl font-extrabold text-slate-900">{wk.price}</span>
              </div>

              <button
                onClick={() => onRegisterWorkshop(wk)}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Reserve Seat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

