import React, { useState } from 'react';
import { ViewMode, Teacher } from '../types';
import { MOCK_TEACHERS } from '../data/mockData';
import { TeacherCard } from '../components/TeacherCard';
import { VideoTestimonialsSection } from '../components/VideoTestimonialsSection';
import { 
  Search, 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  LayoutGrid, 
  BookOpenCheck, 
  UserCheck, 
  ShoppingBag,
  BookOpen,
  FileCheck,
  Check,
  Quote,
  Sparkles
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectTeacher: (teacher: Teacher) => void;
  onContactTeacher: (teacher: Teacher) => void;
  onOpenConsultationModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectTeacher,
  onContactTeacher,
  onOpenConsultationModal
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const levels = ['All', 'Early Childhood (EYFS)', 'Nursery', 'Kindergarten', 'Lower Primary'];

  const filteredTeachers = selectedLevel === 'All'
    ? MOCK_TEACHERS.slice(0, 3)
    : MOCK_TEACHERS.filter(t => t.teachingLevel === selectedLevel).slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 sm:pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 bg-slate-950 text-white border-b border-slate-800 overflow-hidden min-h-[420px] sm:min-h-[480px] flex items-center">
        
        {/* Kids Classroom Learning & Discovery Background Photo */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=2000&q=85"
            alt="Young children actively learning, reading, and exploring in a vibrant modern early years classroom"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-50 contrast-110 scale-102 transition-transform duration-1000"
          />
          {/* Ambient Lighting Gradients - Ensures text remains crisp and readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/50" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2ac0db]/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl space-y-5 sm:space-y-6 text-left">

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Inspiring Early Learning, <span className="text-[#2ac0db]">School & Classroom Setup</span>
            </h1>

            {/* Short, direct CEC Brand Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl font-medium">
              We connect schools and families with vetted educators, educational consultancy, and signature school and classroom setups.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('directory')}
                className="px-5 sm:px-6 py-3.5 sm:py-4 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold rounded-xl shadow-lg transition-all text-sm sm:text-base flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Find an Educator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('consultancy')}
                className="px-5 sm:px-6 py-3.5 sm:py-4 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl border border-white/20 transition-all text-sm sm:text-base flex items-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                <GraduationCap className="w-4 h-4 text-[#fa7b2d]" />
                <span>Educational Consultancy</span>
              </button>

              <button
                onClick={() => onNavigate('reading-club')}
                className="px-5 sm:px-6 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/15 transition-all text-sm sm:text-base flex items-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                <BookOpen className="w-4 h-4 text-[#2ac0db]" />
                <span>The Reading Lounge</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW SECTION (What We Do at CEC) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-8">
        
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900">
            What We Do at CEC
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base font-medium">
            Tailored solutions for early childhood education and more
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-5">
          
          {/* Service 1: Recruitment */}
          <div 
            onClick={() => onNavigate('directory')}
            className="bg-white p-3.5 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2ac0db] transition-all cursor-pointer group space-y-2 sm:space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1.5 sm:space-y-2.5">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center">
                <UserCheck className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-heading font-bold text-xs sm:text-base lg:text-lg text-slate-900 group-hover:text-[#126373] leading-snug">
                Teacher Recruitment & Staff Placement
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs lg:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                Screened, certified teachers for all levels matched to your school.
              </p>
            </div>
            <span className="text-[11px] sm:text-xs lg:text-sm font-bold text-[#126373] flex items-center gap-1 pt-1 sm:pt-2">
              <span>View Directory</span> <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </span>
          </div>

          {/* Service 2: Reading Club */}
          <div 
            onClick={() => onNavigate('reading-club')}
            className="bg-white p-3.5 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2ac0db] transition-all cursor-pointer group space-y-2 sm:space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1.5 sm:space-y-2.5">
              <div className="h-8 sm:h-11 flex items-center">
                <img
                  src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293997/The_Reading_Lounge_5.png"
                  alt="The Reading Lounge Logo"
                  referrerPolicy="no-referrer"
                  className="h-6 sm:h-9 w-auto object-contain"
                />
              </div>
              <h3 className="font-heading font-bold text-xs sm:text-base lg:text-lg text-slate-900 group-hover:text-[#126373] leading-snug">
                The Reading Lounge
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs lg:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                Inspiring lifelong love for reading in children ages 4 to 12 years through virtual interactions.
              </p>
            </div>
            <span className="text-[11px] sm:text-xs lg:text-sm font-bold text-[#126373] flex items-center gap-1 pt-1 sm:pt-2">
              <span>Explore Club</span> <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </span>
          </div>

          {/* Service 3: Consultancy */}
          <div 
            onClick={() => onNavigate('consultancy')}
            className="bg-white p-3.5 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2ac0db] transition-all cursor-pointer group space-y-2 sm:space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1.5 sm:space-y-2.5">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center">
                <BookOpenCheck className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-heading font-bold text-xs sm:text-base lg:text-lg text-slate-900 group-hover:text-[#126373] leading-snug">
                Educational Consultancy
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs lg:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                School Setup, early years curriculum development international early years alignment and school operational guidance.
              </p>
            </div>
            <span className="text-[11px] sm:text-xs lg:text-sm font-bold text-[#126373] flex items-center gap-1 pt-1 sm:pt-2">
              <span>Consultancy</span> <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </span>
          </div>

          {/* Service 4: CEC Inspire Spaces */}
          <div 
            onClick={() => onNavigate('cec-spaces')}
            className="bg-white p-3.5 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2ac0db] transition-all cursor-pointer group space-y-2 sm:space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1.5 sm:space-y-2.5">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center">
                <LayoutGrid className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-heading font-bold text-xs sm:text-base lg:text-lg text-slate-900 group-hover:text-[#126373] leading-snug">
                CEC Inspire Spaces
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs lg:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                Themed school design, signature classroom setups. child friendly layout.
              </p>
            </div>
            <span className="text-[11px] sm:text-xs lg:text-sm font-bold text-[#126373] flex items-center gap-1 pt-1 sm:pt-2">
              <span>Spaces</span> <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Service 5: Learning Essentials */}
          <div 
            onClick={() => onNavigate('learning-essentials')}
            className="col-span-2 sm:col-span-1 bg-white p-3.5 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2ac0db] transition-all cursor-pointer group space-y-2 sm:space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1.5 sm:space-y-2.5">
              <div className="h-8 sm:h-11 flex items-center">
                <img
                  src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786994345/CEC_Learning_Essentials-removebg-preview.png"
                  alt="CEC Learning Essentials Logo"
                  referrerPolicy="no-referrer"
                  className="h-6 sm:h-9 w-auto object-contain"
                />
              </div>
              <h3 className="font-heading font-bold text-xs sm:text-base lg:text-lg text-slate-900 group-hover:text-[#126373] leading-snug">
                Learning Essentials
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs lg:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                Age appropriate learning resources and child friendly furniture.
              </p>
            </div>
            <span className="text-[11px] sm:text-xs lg:text-sm font-bold text-[#126373] flex items-center gap-1 pt-1 sm:pt-2">
              <span>Essentials</span> <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>
      </section>

      {/* ADVISORY & MISSION CALLOUT SECTION WITH INTEGRATED PHOTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#082229] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#2ac0db]/25 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2ac0db]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#fa7b2d]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Featured Photo */}
            <div className="lg:col-span-5 space-y-2">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/15 shadow-2xl group bg-slate-950 aspect-4/3 sm:aspect-5/4 max-h-[400px]">
                <img
                  src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1788008924/photo_2026-08-29_13-03-56.jpg"
                  alt="Early Childhood Mentorship and Teaching in Action"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-bottom group-hover:scale-103 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Column: Quote & Mission Message */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#2ac0db]/15 border border-[#2ac0db]/30 text-[#2ac0db] text-xs sm:text-sm font-bold">
                <Quote className="w-3.5 h-3.5" />
                <span>Our Guiding Philosophy</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-white leading-snug">
                “Every child deserves a teacher who understands child development and pedagogy”
              </h2>

              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                CEC Educational Consult solves the challenge school owners face in finding vetted educators, establishing inspiring school environments, and ensuring lasting academic excellence.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* VIDEO TESTIMONIALS SECTION */}
      <VideoTestimonialsSection />

    </div>
  );
};
