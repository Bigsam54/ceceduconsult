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
  MessageCircle,
  ShoppingBag,
  BookOpen,
  FileCheck,
  Check
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
  const [activeTab, setActiveTab] = useState<'schools' | 'teachers'>('schools');

  const levels = ['All', 'Preschool (EYFS)', 'Nursery', 'Kindergarten', 'Lower Primary'];

  const filteredTeachers = selectedLevel === 'All'
    ? MOCK_TEACHERS.slice(0, 3)
    : MOCK_TEACHERS.filter(t => t.teachingLevel === selectedLevel).slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 sm:pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5 sm:space-y-6">
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Quality Teachers for <span className="block text-[#2ac0db] whitespace-nowrap mt-1">Growing Schools</span>
          </h1>

          {/* Subheadline - Concise */}
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            We connect preschools with vetted, EYFS-trained teachers and support educators through mentorship, workshops, and classroom development.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-1">
            <button
              onClick={() => onNavigate('directory')}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Teachers Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('reading-club')}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Reading Club</span>
            </button>

            <button
              onClick={() => onNavigate('join-network')}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#2ac0db]" />
              <span>Join as a Teacher</span>
            </button>
          </div>

        </div>
      </section>

      {/* STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-2xs grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          
          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-[#126373]">
              1,000+
            </div>
            <div className="text-xs font-bold text-slate-800">Vetted Teachers</div>
            <p className="text-[10px] sm:text-[11px] text-slate-500">Nursery & Primary</p>
          </div>

          <div className="space-y-0.5 pt-3 sm:pt-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-[#fa7b2d]">
              250+
            </div>
            <div className="text-xs font-bold text-slate-800">Partner Schools</div>
            <p className="text-[10px] sm:text-[11px] text-slate-500">Preschools & Academies</p>
          </div>

          <div className="space-y-0.5 pt-3 sm:pt-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-[#126373]">
              500+
            </div>
            <div className="text-xs font-bold text-slate-800">Placements Made</div>
            <p className="text-[10px] sm:text-[11px] text-slate-500">90-Day Guarantee</p>
          </div>

          <div className="space-y-0.5 pt-3 sm:pt-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-slate-800">
              10+ Yrs
            </div>
            <div className="text-xs font-bold text-slate-800">Advisory Experience</div>
            <p className="text-[10px] sm:text-[11px] text-slate-500">Led by Miss Nancy</p>
          </div>

        </div>
      </section>

      {/* SERVICES OVERVIEW SECTION (Including Reading Club) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
            What We Do at CEC
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Tailored solutions for preschool proprietors, teachers, and young learners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          
          {/* Service 1: Recruitment */}
          <div 
            onClick={() => onNavigate('directory')}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2ac0db] transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#126373]">
                Teacher Recruitment
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Screened, certified preschool and EYFS teachers matched to your school.
              </p>
            </div>
            <span className="text-xs font-bold text-[#126373] flex items-center gap-1 pt-2">
              View Directory <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Service 2: Reading Club */}
          <div 
            onClick={() => onNavigate('reading-club')}
            className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#2ac0db] shadow-xs hover:border-[#fa7b2d] transition-all cursor-pointer group space-y-3 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#fa7b2d] text-white text-[9px] font-bold rounded-md">
              Featured
            </div>
            <div className="space-y-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#fa7b2d]/15 text-[#fa7b2d] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#fa7b2d]">
                Reading Club
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Weekly phonics, guided storytelling, and monthly book boxes for ages 2–8.
              </p>
            </div>
            <span className="text-xs font-bold text-[#fa7b2d] flex items-center gap-1 pt-2">
              Explore Club <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Service 3: Consultancy */}
          <div 
            onClick={() => onNavigate('consultancy')}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2ac0db] transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center">
                <BookOpenCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#126373]">
                Consultancy
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Curriculum audits, EYFS alignment, and school operational guidance.
              </p>
            </div>
            <span className="text-xs font-bold text-[#126373] flex items-center gap-1 pt-2">
              Consultancy <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Service 4: CEC Spaces */}
          <div 
            onClick={() => onNavigate('cec-spaces')}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2ac0db] transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#126373]">
                CEC Spaces
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Classroom setup, wooden furniture layout, and sensory play nooks.
              </p>
            </div>
            <span className="text-xs font-bold text-[#126373] flex items-center gap-1 pt-2">
              Spaces <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Service 5: Learning Essentials */}
          <div 
            onClick={() => onNavigate('learning-essentials')}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2ac0db] transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#126373]">
                Learning Store
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Montessori wooden materials, Jolly Phonics cards, and sensory aids.
              </p>
            </div>
            <span className="text-xs font-bold text-[#126373] flex items-center gap-1 pt-2">
              Store <ArrowRight className="w-3 h-3" />
            </span>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-slate-100/80 py-10 sm:py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2.5 max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
              How It Works
            </h2>

            {/* Toggle */}
            <div className="inline-flex bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setActiveTab('schools')}
                className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'schools'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For School Owners
              </button>
              <button
                onClick={() => setActiveTab('teachers')}
                className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'teachers'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Teachers
              </button>
            </div>
          </div>

          {/* Steps */}
          {activeTab === 'schools' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {[
                { num: '01', title: 'Search Directory', desc: 'Browse verified candidates with EYFS qualifications and location filters.' },
                { num: '02', title: 'Inspect Profiles', desc: 'Review verified credentials, classroom experience, and salary ranges.' },
                { num: '03', title: 'Contact CEC', desc: 'Schedule interviews with Miss Nancy to review candidate suitability.' },
                { num: '04', title: 'Hire with Guarantee', desc: 'Onboard your teacher backed by CEC’s 90-day replacement guarantee.' }
              ].map((step, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2">
                  <div className="text-xl sm:text-2xl font-heading font-extrabold text-[#2ac0db]">
                    {step.num}
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-xs sm:text-sm">{step.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {[
                { num: '01', title: 'Register Profile', desc: 'Create your account and list your early childhood experience.' },
                { num: '02', title: 'Add Credentials', desc: 'Upload certifications, teaching philosophy, and preferred levels.' },
                { num: '03', title: 'Complete Vetting', desc: 'Pass CEC’s credentials audit and classroom practice review.' },
                { num: '04', title: 'Get Placed', desc: 'Connect with reputable preschools matching your salary expectations.' }
              ].map((step, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2">
                  <div className="text-xl sm:text-2xl font-heading font-extrabold text-[#fa7b2d]">
                    {step.num}
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-xs sm:text-sm">{step.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* MEET MISS NANCY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl relative overflow-hidden text-center max-w-4xl mx-auto space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2ac0db]/15 text-[#2ac0db] text-xs font-bold border border-[#2ac0db]/30 mx-auto">
            <span>Meet Miss Nancy</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white leading-snug max-w-3xl mx-auto">
            “Every preschooler deserves a teacher who understands early child development.”
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Miss Nancy founded CEC Educational Consults to solve the challenge school owners face in finding vetted early years teachers, and to provide educators with mentorship and dignified compensation.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenConsultationModal}
              className="w-full sm:w-auto px-6 py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl shadow transition-all text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book Advisory Session with Miss Nancy</span>
            </button>
          </div>
        </div>
      </section>

      {/* VIDEO TESTIMONIALS SECTION */}
      <VideoTestimonialsSection />

    </div>
  );
};
