import React, { useState, useEffect } from 'react';
import { ConsultationService } from '../types';
import { MOCK_CONSULTATION_SERVICES } from '../data/mockData';
import { 
  BookOpenCheck, 
  CheckCircle2, 
  CalendarCheck,
  School,
  Users,
  LayoutGrid,
  GraduationCap,
  BookOpen,
  Home,
  Award,
  ClipboardCheck,
  Sparkles,
  Library,
  HeartHandshake,
  BookMarked,
  Laptop,
  Compass,
  ArrowRight,
  X
} from 'lucide-react';

interface ConsultancyViewProps {
  onOpenConsultationModal: (service?: ConsultationService) => void;
}

export const ConsultancyView: React.FC<ConsultancyViewProps> = ({ onOpenConsultationModal }) => {
  const [selectedService, setSelectedService] = useState<ConsultationService | null>(null);

  // Lock body scrolling when service detail modal is open and handle ESC key
  useEffect(() => {
    if (!selectedService) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedService]);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'srv-setup': return <School className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-recruitment': return <Users className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-hometutoring': return <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-homeschooling': return <Home className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-curriculum': return <BookOpenCheck className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-spaces': return <LayoutGrid className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-pd': return <Award className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-reading-club': return <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-audit': return <ClipboardCheck className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-branding': return <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-library': return <Library className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-parents': return <HeartHandshake className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-booksale': return <BookMarked className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-sms': return <Laptop className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'srv-advisory': return <Compass className="w-6 h-6 sm:w-8 sm:h-8" />;
      default: return <BookOpenCheck className="w-6 h-6 sm:w-8 sm:h-8" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0d3842] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/20 shadow-2xl space-y-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
          Educational Consultancy by <span className="text-[#2ac0db]">CEC</span>
        </h1>

        <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed font-medium">
          School Setup, early years curriculum development, international early years alignment, teacher recruitment and school operational guidance.
        </p>

        <div className="pt-2">
          <button
            onClick={() => onOpenConsultationModal()}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold rounded-xl shadow-lg transition-all text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Schedule Consultation</span>
          </button>
        </div>
      </div>

      {/* SERVICES SECTION - ICONS AND NAMES ONLY (SIDE BY SIDE ON MOBILE) */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900">
            Tailored Solutions for Early Childhood Education and More
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Select any service below to explore full details, key inclusions, and booking options.
          </p>
        </div>

        {/* 2 columns on mobile side by side, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {MOCK_CONSULTATION_SERVICES.map((srv) => (
            <button
              key={srv.id}
              onClick={() => setSelectedService(srv)}
              className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#2ac0db] transition-all flex flex-col items-center text-center justify-between gap-3 group cursor-pointer w-full text-left min-h-[140px] sm:min-h-[160px] active:scale-[0.98]"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#2ac0db]/15 text-[#126373] group-hover:bg-[#2ac0db] group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 shrink-0">
                {getServiceIcon(srv.id)}
              </div>

              {/* Service Name - strictly just name, no subtitles */}
              <div className="w-full flex-1 flex flex-col items-center justify-center">
                <h3 className="text-xs sm:text-sm md:text-base font-heading font-bold text-slate-900 group-hover:text-[#126373] transition-colors leading-snug line-clamp-2">
                  {srv.title}
                </h3>
              </div>

              {/* Tap to read hint */}
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#126373] group-hover:text-[#2ac0db] transition-colors">
                View Details <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* SERVICE DETAIL MODAL */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overscroll-contain animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-xl w-full flex flex-col shadow-2xl relative max-h-[82dvh] sm:max-h-[85vh] overflow-hidden text-left border border-slate-200/80 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Sheet Pull Indicator */}
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

            {/* Pinned Header: Icon, Title & Close button */}
            <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center shrink-0">
                  {getServiceIcon(selectedService.id)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-xl font-heading font-bold text-slate-900 leading-tight truncate">
                    {selectedService.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#126373] font-semibold">
                    CEC Educational Consultancy Service
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer shrink-0"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Smooth Scrollable Body */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4 overscroll-contain">
              {/* Overview / Descriptions */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  {selectedService.shortDesc}
                </p>
                {selectedService.fullDesc && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedService.fullDesc}
                  </p>
                )}
              </div>

              {/* Key Deliverables / Features Checklist */}
              {selectedService.features && selectedService.features.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    What CEC Delivers
                  </p>
                  <div className="space-y-2">
                    {selectedService.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended For */}
              {selectedService.recommendedFor && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <strong className="text-slate-800">Recommended for: </strong>
                  {selectedService.recommendedFor}
                </div>
              )}
            </div>

            {/* Pinned Action Buttons Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/90 sm:bg-white flex flex-col sm:flex-row gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const srv = selectedService;
                  setSelectedService(null);
                  onOpenConsultationModal(srv);
                }}
                className="flex-1 py-3 px-5 bg-slate-900 hover:bg-[#2ac0db] hover:text-slate-950 text-white font-bold rounded-xl transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book This Service</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="py-3 px-5 bg-slate-200/80 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-xs sm:text-sm cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Advisory Process */}
      <section className="bg-slate-100/80 py-10 sm:py-12 rounded-3xl border border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1 max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
              The Consultation Roadmap
            </h2>
            <p className="text-slate-600 text-xs">
              A structured four-phase engagement to elevate your early childhood center.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { step: '01', title: 'Initial Needs Audit', desc: 'CEC senior consultants conduct a comprehensive review of your school goals, staffing and floor plan.' },
              { step: '02', title: 'Custom Action Plan', desc: 'You receive a clear roadmap covering teacher placement, spatial zoning and curriculum milestones.' },
              { step: '03', title: 'Hands-On Execution', desc: 'We deliver staff workshops, setup learning areas and oversee classroom transitions.' },
              { step: '04', title: 'Review & Mentorship', desc: 'Ongoing quality assurance visits and mentor check-ins ensure sustained excellence.' }
            ].map((st, i) => (
              <div key={i} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1.5 text-left">
                <div className="text-lg sm:text-xl font-heading font-extrabold text-[#2ac0db]">
                  {st.step}
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900">{st.title}</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
