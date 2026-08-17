import React from 'react';
import { ViewMode } from '../types';
import { 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  DollarSign
} from 'lucide-react';

interface JoinNetworkViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const JoinNetworkView: React.FC<JoinNetworkViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0d3842] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/20 shadow-2xl space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
          Elevate Your Career in Preschool Education
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
          Join Africa's most prestigious preschool teacher network. Get discovered by top international schools, access Miss Nancy's mentorship, and earn competitive compensation.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => onNavigate('register')}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl shadow-lg transition-all text-xs sm:text-sm flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Apply to Join Network Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('workshops')}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all text-xs sm:text-sm cursor-pointer"
          >
            Explore Teacher Workshops
          </button>
        </div>
      </div>

      {/* WHY JOIN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
            Why Top Educators Choose CEC
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            We don't just place teachers — we nurture your professional dignity and long-term career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3 sm:space-y-4 hover:shadow-lg hover:border-[#2ac0db] transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
              Higher Salary Opportunities
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              CEC partners with leading international and private preschools that offer competitive compensation, health benefits, and respectful work environments.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3 sm:space-y-4 hover:shadow-lg hover:border-[#fa7b2d] transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#fa7b2d]/15 text-[#fa7b2d] flex items-center justify-center font-bold">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
              Miss Nancy's Mentorship
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Receive direct coaching on EYFS lesson planning, Montessori apparatus usage, Jolly Phonics mastery, and classroom management techniques.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3 sm:space-y-4 hover:shadow-lg hover:border-[#2ac0db] transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
              Verified Prestige Badge
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Stand out to school proprietors with CEC's verified educator seal, confirming your classroom competence and professional background.
            </p>
          </div>

        </div>
      </section>

      {/* STEP-BY-STEP SELECTION PROCESS */}
      <section className="bg-slate-100/80 py-10 sm:py-14 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
              How You Get Verified & Placed
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: '01', title: 'Submit Application', desc: 'Fill out our 5-minute teacher profile form with your qualifications and preferences.' },
              { step: '02', title: 'Credentials Audit', desc: 'Our team verifies your degrees, certifications, and previous school references.' },
              { step: '03', title: 'Classroom Demo', desc: 'Participate in a practical teaching simulation audited by Miss Nancy.' },
              { step: '04', title: 'Get Placed', desc: 'Your profile goes live on the CEC Network and school interview offers begin!' }
            ].map((s, i) => (
              <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-[#2ac0db]/40">{s.step}</span>
                <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">{s.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
          Ready to Take the Next Step in Your Teaching Journey?
        </h2>
        <button
          onClick={() => onNavigate('register')}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer"
        >
          Start Your Free Teacher Application Now
        </button>
      </section>

    </div>
  );
};

