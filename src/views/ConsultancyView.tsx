import React from 'react';
import { ConsultationService } from '../types';
import { MOCK_CONSULTATION_SERVICES } from '../data/mockData';
import { 
  BookOpenCheck, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  CalendarCheck,
  School,
  UserCheck,
  LayoutGrid,
  GraduationCap,
  BookOpen
} from 'lucide-react';

interface ConsultancyViewProps {
  onOpenConsultationModal: (service?: ConsultationService) => void;
}

export const ConsultancyView: React.FC<ConsultancyViewProps> = ({ onOpenConsultationModal }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'UserCheck': return <UserCheck className="w-6 h-6" />;
      case 'BookOpenCheck': return <BookOpenCheck className="w-6 h-6" />;
      case 'LayoutGrid': return <LayoutGrid className="w-6 h-6" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      default: return <BookOpenCheck className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0d3842] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/20 shadow-2xl space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
          Educational Consultancy with <span className="text-[#2ac0db]">Miss Nancie</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
          Guiding school owners and educators through curriculum development, staff placement, classroom spatial design, and literacy programs.
        </p>

        <div className="pt-2">
          <button
            onClick={() => onOpenConsultationModal()}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl shadow transition-all text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Schedule Consultation</span>
          </button>
        </div>
      </div>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
            Tailored Solutions for School Owners
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Whether establishing a new nursery branch or upgrading academic standards, CEC provides structured, hands-on guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {MOCK_CONSULTATION_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2ac0db] transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center font-bold">
                    {getIcon(srv.iconName)}
                  </div>
                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200">
                    {srv.pricingTag}
                  </span>
                </div>

                <h3 className="text-base font-heading font-bold text-slate-900">
                  {srv.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed">
                  {srv.shortDesc}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {srv.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => onOpenConsultationModal(srv)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-[#2ac0db] hover:text-slate-950 text-white font-bold rounded-xl transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book This Service</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Advisory Process */}
      <section className="bg-slate-100/80 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1 max-w-xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-slate-900">
              The Consultation Roadmap
            </h2>
            <p className="text-slate-600 text-xs">
              A structured four-phase engagement to elevate your preschool.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Initial Needs Audit', desc: 'Miss Nancie conducts a comprehensive review of your school goals, staffing, and floor plan.' },
              { step: '02', title: 'Custom Action Plan', desc: 'You receive a clear roadmap covering teacher placement, spatial zoning, and curriculum milestones.' },
              { step: '03', title: 'Hands-On Execution', desc: 'We deliver staff workshops, setup learning areas, and oversee classroom transitions.' },
              { step: '04', title: 'Review & Mentorship', desc: 'Ongoing quality assurance visits and mentor check-ins ensure sustained excellence.' }
            ].map((st, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="text-xl font-heading font-extrabold text-[#2ac0db]">
                  {st.step}
                </div>
                <h3 className="font-heading font-bold text-sm text-slate-900">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
