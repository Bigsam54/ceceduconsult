import React, { useState } from 'react';
import { AdvertisedSchool } from '../types';
import { MOCK_ADVERTISED_SCHOOLS } from '../data/mockSchools';
import { safeOpenUrl } from '../utils/safeWindow';
import { toast } from '../utils/toast';
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  Megaphone,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

interface SchoolsToConsiderSectionProps {
  onSelectSchool: (school: AdvertisedSchool) => void;
  onOpenConsultationModal?: () => void;
  title?: string;
  subtitle?: string;
  showAdvertiseBanner?: boolean;
}

export const SchoolsToConsiderSection: React.FC<SchoolsToConsiderSectionProps> = ({
  onSelectSchool,
  onOpenConsultationModal,
  title = "Schools to Consider",
  subtitle = "Looking for the right school for your child? Discover reputable early years and primary institutions in Ghana partnered with CEC for excellence in pedagogy, safety, and classroom environment.",
  showAdvertiseBanner = true
}) => {
  const [selectedArea, setSelectedArea] = useState<string>('All');

  const areas = ['All', 'Airport Residential', 'East Legon', 'Cantonments', 'Tema', 'West Legon'];

  const filteredSchools = selectedArea === 'All'
    ? MOCK_ADVERTISED_SCHOOLS
    : MOCK_ADVERTISED_SCHOOLS.filter(s => s.area.toLowerCase().includes(selectedArea.toLowerCase()) || s.location.toLowerCase().includes(selectedArea.toLowerCase()));

  const handleQuickWhatsApp = (e: React.MouseEvent, school: AdvertisedSchool) => {
    e.stopPropagation();
    toast.info(`Opening WhatsApp inquiry for ${school.name}...`, 'Admission Enquiry');
    const msg = `Hello CEC School Placement Team!\n\nI saw *${school.name}* on the CEC platform (${school.location}) and would like to enquire about admission openings and enrollment procedures for my child. Thank you!`;
    safeOpenUrl(`https://wa.me/233540390029?text=${encodeURIComponent(msg)}`);
  };

  const handleAdvertiseSchool = () => {
    toast.info('Connecting to CEC School Advertising Desk...', 'School Partnership');
    const msg = `Hello CEC Educational Consult!\n\nI am a school director/administrator and would like to advertise our institution on the CEC platform. Please share the partner school listing criteria, audit process, and advertising package options.`;
    safeOpenUrl(`https://wa.me/233540390029?text=${encodeURIComponent(msg)}`);
  };

  return (
    <section className="space-y-8 text-left">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#2ac0db]/15 text-[#126373] text-[11px] font-extrabold uppercase rounded-full border border-[#2ac0db]/30 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Partner Institutions</span>
            </span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
              Admissions Open
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>

        {/* Advertise School Action Button for school owners */}
        <button
          type="button"
          onClick={handleAdvertiseSchool}
          className="self-start md:self-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer shrink-0 border border-slate-700"
        >
          <Megaphone className="w-4 h-4 text-[#fa7b2d]" />
          <span>Advertise Your School</span>
        </button>
      </div>

      {/* Location Area Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1.5 shrink-0 hidden sm:inline">
          Location:
        </span>
        {areas.map((area) => (
          <button
            key={area}
            onClick={() => setSelectedArea(area)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              selectedArea === area
                ? 'bg-[#2ac0db] text-slate-950 shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Schools Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            onClick={() => onSelectSchool(school)}
            className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#2ac0db]/50 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
          >
            {/* School Campus Photo */}
            <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
              <img
                src={school.image}
                alt={school.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
              
              {/* Badges on Image */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[85%]">
                <span className="px-2.5 py-0.5 bg-white/95 text-[#126373] text-[10px] font-extrabold uppercase rounded-full shadow-xs backdrop-blur-xs">
                  {school.area}
                </span>
                {school.isFeatured && (
                  <span className="px-2 py-0.5 bg-[#fa7b2d] text-white text-[10px] font-extrabold uppercase rounded-full shadow-xs">
                    Featured
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="flex items-center gap-1.5 text-[11px] text-[#2ac0db] font-semibold">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span className="truncate">{school.curriculum}</span>
                </div>
                <h3 className="text-base sm:text-lg font-heading font-extrabold leading-tight text-white drop-shadow-xs truncate">
                  {school.name}
                </h3>
              </div>
            </div>

            {/* School Details Card Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
              <div className="space-y-3">
                <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                  {school.description}
                </p>

                {/* Key Specs Pill Grid */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 uppercase text-[9px] font-bold block">Levels</span>
                    <span className="font-semibold text-slate-800 truncate block">{school.levels}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[9px] font-bold block">Staff Ratio</span>
                    <span className="font-semibold text-[#126373] block">{school.studentTeacherRatio || '1:8'}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5">
                  {school.highlights.slice(0, 2).map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db] shrink-0 mt-0.5" />
                      <span className="line-clamp-1 font-medium">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleQuickWhatsApp(e, school)}
                  className="flex-1 py-2.5 px-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Enquire</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectSchool(school)}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADVERTISE YOUR SCHOOL ON CEC BANNER */}
      {showAdvertiseBanner && (
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#0d3842] p-6 sm:p-8 rounded-3xl border border-[#2ac0db]/30 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-[#fa7b2d] font-bold text-xs uppercase tracking-wider">
              <Megaphone className="w-4 h-4" />
              <span>School Placement & Advertising Network</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
              Do You Run a School or Early Years Centre in Ghana?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Advertise your institution directly to 15,000+ parents actively seeking trusted preschools, kindergartens, and primary schools. Partner with CEC for curriculum audits, teacher recruitment, and verified visibility.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={handleAdvertiseSchool}
              className="px-5 py-3.5 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-extrabold rounded-xl shadow transition-all text-xs flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Advertise Your School</span>
            </button>
            
            {onOpenConsultationModal && (
              <button
                type="button"
                onClick={onOpenConsultationModal}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Book School Audit</span>
              </button>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
