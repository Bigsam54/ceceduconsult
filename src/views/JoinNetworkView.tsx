import React from 'react';
import { ViewMode } from '../types';
import { 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  DollarSign,
  CheckCircle2,
  GraduationCap,
  Users
} from 'lucide-react';

interface JoinNetworkViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const JoinNetworkView: React.FC<JoinNetworkViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Hero Banner with African Educator Photo */}
      <div className="relative bg-gradient-to-br from-slate-950 via-[#0a2f38] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/25 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2ac0db]/15 border border-[#2ac0db]/30 rounded-full text-xs font-bold text-[#2ac0db]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>For Early Childhood & Primary Educators • Ghana</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Elevate Your Career with <span className="text-[#2ac0db]">CEC Teacher Network</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
              Join Ghana's most reputable early years teacher community. Get discovered by top international and private preschools in Accra and Kumasi, access Miss Nancy's mentorship, and earn dignified compensation.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold rounded-xl shadow-lg transition-all text-xs sm:text-sm flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Apply to Join Network Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('workshops')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all text-xs sm:text-sm cursor-pointer"
              >
                Explore Teacher Workshops
              </button>
            </div>
          </div>

          {/* Right Column Photo */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden border-2 border-[#2ac0db]/40 shadow-2xl relative aspect-4/3 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                  alt="Confident Ghanaian early years teacher mentoring children in preschool"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-950/85 backdrop-blur-xs rounded-2xl border border-white/15 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#2ac0db] text-slate-950 flex items-center justify-center font-bold">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-white">Verified Career Placement</div>
                      <div className="text-[10px] text-slate-300">Top Preschools in Ghana</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold bg-[#fa7b2d] text-white px-2 py-0.5 rounded-full">
                    Free Application
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* WHY JOIN SECTION */}
      <section className="space-y-8 sm:space-y-10">
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
            Why Top Educators in Ghana Choose CEC
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
              CEC partners with leading international and private preschools in Accra and across Ghana that offer competitive compensation and respectful work environments.
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
      <section className="bg-slate-100/80 py-10 sm:py-14 rounded-3xl border border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
              How You Get Verified & Placed
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: '01', title: 'Submit Application', desc: 'Fill out our 5-minute teacher profile form with your qualifications and preferences.' },
              { step: '02', title: 'Credentials Audit', desc: 'Our team verifies your degrees, certifications, and previous school references in Ghana.' },
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
          type="button"
          onClick={() => onNavigate('register')}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer"
        >
          Start Your Free Teacher Application Now
        </button>
      </section>

    </div>
  );
};
