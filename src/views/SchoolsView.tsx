import React, { useState } from 'react';
import { AdvertisedSchool } from '../types';
import { SchoolsToConsiderSection } from '../components/SchoolsToConsiderSection';
import { SchoolDetailModal } from '../components/SchoolDetailModal';
import { Building2, Search, Sparkles, Award, ShieldCheck, MapPin } from 'lucide-react';

interface SchoolsViewProps {
  onOpenConsultationModal: () => void;
}

export const SchoolsView: React.FC<SchoolsViewProps> = ({ onOpenConsultationModal }) => {
  const [selectedSchool, setSelectedSchool] = useState<AdvertisedSchool | null>(null);

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      
      {/* Top Header Banner */}
      <section className="relative pt-10 sm:pt-14 pb-12 sm:pb-16 bg-slate-950 text-white border-b border-slate-800 overflow-hidden text-left">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=80"
            alt="School building"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2ac0db]/20 border border-[#2ac0db]/40 rounded-full text-xs font-bold text-[#2ac0db]">
            <Building2 className="w-3.5 h-3.5" />
            <span>CEC Partner Schools & Admissions Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            Schools to Consider in Ghana
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-medium">
            Helping parents make informed educational decisions. Explore accredited early childhood academies, Montessori preschools, and international primary schools audited and supported by CEC Educational Consult.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <ShieldCheck className="w-4 h-4 text-[#2ac0db]" />
              <span>CEC Audited Quality Standards</span>
            </div>
            <div className="flex items-center gap-1.5 text-white font-medium">
              <Award className="w-4 h-4 text-[#fa7b2d]" />
              <span>Vetted Early Years Specialists</span>
            </div>
            <div className="flex items-center gap-1.5 text-white font-medium">
              <MapPin className="w-4 h-4 text-[#2ac0db]" />
              <span>Accra, Tema, Kumasi & Nationwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SchoolsToConsiderSection 
          onSelectSchool={(school) => setSelectedSchool(school)}
          onOpenConsultationModal={onOpenConsultationModal}
        />
      </div>

      {/* School Detail Modal */}
      <SchoolDetailModal 
        school={selectedSchool}
        isOpen={!!selectedSchool}
        onClose={() => setSelectedSchool(null)}
      />

    </div>
  );
};
