import React from 'react';
import { ViewMode } from '../types';
import { 
  Target, 
  Eye,
  CalendarCheck,
  BookOpen
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenConsultationModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenConsultationModal }) => {
  const teamMembers = [
    {
      id: 'team-ops',
      name: 'Mr. Emmanuel Agbavor',
      position: 'Chief Operations Lead',
      imageUrl: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788700036/4.png'
    },
    {
      id: 'team-marketing',
      name: 'Christopher Sam',
      position: 'Digital and Marketing Lead',
      imageUrl: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788700037/5.png'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-14">
      
      {/* HERO BANNER */}
      <div className="relative bg-gradient-to-r from-slate-950 via-[#0a2c35] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#2ac0db]/30 shadow-2xl overflow-hidden min-h-[220px] flex items-center">
        
        {/* Ambient Gradient Lighting */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#2ac0db]/15 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Hero Text Content */}
        <div className="relative z-10 max-w-3xl space-y-4 text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Pioneering Early Childhood <span className="text-[#2ac0db]">Excellence</span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
            Connecting early childhood institutions with exceptional vetted early years educators, spatial design and child literacy programs.
          </p>
        </div>
      </div>

      {/* FOUNDER PROFILE SPOTLIGHT */}
      <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Executive Profile Portrait - Full Card Background */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-[#2ac0db]/30 min-h-[380px] sm:min-h-[460px] bg-slate-950 flex flex-col justify-end group">
            <img
              src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293997/IMG_4473.jpg"
              alt="Miss Nancie"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top absolute inset-0 group-hover:scale-103 transition-transform duration-700"
            />
          </div>

          {/* Profile Bio & Leadership Information */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
              Miss Nancie <span className="text-[#126373]">(Founder & Lead Education Consultant)</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              With over a decade of practical experience as an early childhood director, early years mentor, Cambridge Educator and educator trainer, Miss Nancie established CEC Educational Consult to champion high-standard educator development, learner-centred pedagogy, innovative and future-ready learning environments that respond to the evolving needs of today’s learners.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              At CEC Educational Consult, we believe every great school begins with a great vision. Our goal is to turn educational dreams into realities through expert guidance, innovative solutions and timely execution.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We are passionate about helping educators and children build strong foundations for early learning and lasting impact. Together, let us create, educate and cultivate a new education era to improve the whole child.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenConsultationModal()}
                className="px-5 py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
              <button
                onClick={() => onNavigate('reading-club')}
                className="px-5 py-3 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Reading Club</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* THE CEC TEAM - CLEAN, BOLD PICTURES WITH JUST NAME AND POSITION (2 COLUMNS SIDE BY SIDE ON MOBILE) */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-left space-y-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900">
            Meet the Team
          </h2>
        </div>

        {/* 2 TEAM CARDS SIDE BY SIDE ON MOBILE */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:max-w-md">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#2ac0db]/40 transition-all flex flex-col space-y-2.5 sm:space-y-3 text-left group"
            >
              {/* Bold Portrait Photo */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-slate-950 aspect-[3/4] min-h-[190px] sm:min-h-[210px]">
                <img 
                  src={member.imageUrl} 
                  alt={`${member.name} - ${member.position}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700"
                />
              </div>

              {/* Just Name and Position */}
              <div className="space-y-0.5 sm:space-y-1 px-1">
                <h3 className="text-sm sm:text-2xl font-heading font-bold text-slate-900 leading-tight">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-base font-semibold text-[#126373]">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-3 shadow-2xs text-left">
          <div className="w-10 h-10 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Our Mission</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            To provide schools with verified, competent early childhood educators and literacy programs while elevating teacher training, compensation and professional standards internationally.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-3 shadow-2xs text-left">
          <div className="w-10 h-10 rounded-xl bg-[#fa7b2d]/15 text-[#fa7b2d] flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Our Vision</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            To be an international benchmark early childhood educational consultancy for teacher recruitment, classroom spatial design and transformative child literacy.
          </p>
        </div>
      </section>

    </div>
  );
};

