import React from 'react';
import { ViewMode } from '../types';
import { 
  Target, 
  Eye,
  Award,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  BookOpen
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenConsultationModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenConsultationModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0d3842] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/20 shadow-2xl space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
          Pioneering Preschool Excellence
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
          Founded by Miss Nancy to connect preschools with exceptional, vetted early years educators, spatial design, and literacy programs.
        </p>
      </div>

      {/* Founder Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Executive Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-[#0d3842] rounded-2xl p-5 sm:p-6 text-white shadow-lg flex flex-col items-center text-center space-y-3 border border-[#2ac0db]/30">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2ac0db] text-slate-950 flex items-center justify-center font-heading font-extrabold text-xl sm:text-2xl shadow">
              MN
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white">Miss Nancy</h3>
              <p className="text-xs font-bold text-[#2ac0db] uppercase tracking-wider mt-0.5">Founder & Early Years Consultant</p>
            </div>
            <div className="w-full pt-3 border-t border-white/10 space-y-2 text-xs text-slate-200 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db] shrink-0" />
                <span>12+ Years Early Childhood Pedagogy</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#fa7b2d] shrink-0" />
                <span>Certified Montessori & EYFS Lead</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db] shrink-0" />
                <span>Consultant to 250+ Preschools</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">Miss Nancy (Education Consultant)</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              With over a decade of practical experience as a preschool director and Montessori trainer, Miss Nancy leads CEC's teacher placement, curriculum audits, and reading club development.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We ensure preschool proprietors find reliable, trained educators while giving teachers ongoing professional workshops and mentorship.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={() => onOpenConsultationModal()}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Book Advisory Session</span>
              </button>
              <button
                onClick={() => onNavigate('reading-club')}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explore Reading Club</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2.5 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Our Mission</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            To provide schools with verified, competent early years educators and literacy programs while elevating teacher compensation and professional standards.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2.5 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-[#fa7b2d]/15 text-[#fa7b2d] flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Our Vision</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            To be Africa's benchmark early childhood educational consultancy for teacher recruitment, classroom setup, and child literacy.
          </p>
        </div>
      </section>

    </div>
  );
};
