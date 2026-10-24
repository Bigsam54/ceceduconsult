import React from 'react';
import { Teacher } from '../types';
import { CediIcon } from '../components/icons/CediIcon';
import { 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  Clock, 
  Star, 
  Sparkles, 
  GraduationCap, 
  Award, 
  PhoneCall, 
  ChevronLeft, 
  ShieldCheck,
  Check,
  BookOpen
} from 'lucide-react';

interface TeacherProfileViewProps {
  teacher: Teacher | null;
  onBack: () => void;
  onContactCEC: (teacher: Teacher) => void;
}

export const TeacherProfileView: React.FC<TeacherProfileViewProps> = ({
  teacher,
  onBack,
  onContactCEC
}) => {
  if (!teacher) return null;

  const initials = teacher.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onBack()}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Find a Teacher</span>
        </button>

        <span className="text-xs text-slate-500 font-semibold">
          Candidate Ref: <span className="font-mono text-slate-800">{teacher.id.toUpperCase()}</span>
        </span>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden">

        {/* Cover Banner */}
        <div className="h-36 sm:h-44 relative overflow-hidden bg-gradient-to-br from-[#0b2228] via-[#114c5a] to-[#126373]">
          <div className="absolute -top-20 -right-10 w-72 h-72 rounded-full bg-[#2ac0db]/30 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 w-64 h-64 rounded-full bg-[#fa7b2d]/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '18px 18px' }}
          />
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#2ac0db] via-[#fa7b2d] to-[#2ac0db]" />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-bold border border-white/25 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2ac0db]" /> CEC Vetted Candidate
            </span>
          </div>
        </div>

        {/* Profile Info Row - the avatar overlaps the banner, all text sits on white */}
        <div className="px-6 sm:px-10 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">

              {/* Teacher Avatar (Photo or Monogram) */}
              <div className="relative shrink-0 -mt-16 sm:-mt-20">
                {teacher.photo && teacher.photo.trim() !== '' ? (
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl object-cover shadow-xl ring-4 ring-white bg-slate-100"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-[#2ac0db] to-[#126373] flex items-center justify-center text-white font-heading font-extrabold text-4xl shadow-xl ring-4 ring-white">
                    {initials}
                  </div>
                )}
                {teacher.isVerified && (
                  <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white p-1.5 rounded-full ring-4 ring-white shadow-md" title="CEC Verified">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="space-y-2.5 sm:pt-4">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 leading-tight">
                    {teacher.name}
                  </h1>
                  {teacher.isVerified && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Educator
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base font-bold text-[#fa7b2d]">{teacher.title}</p>

                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs flex-wrap">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#126373]" /> {teacher.location}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">
                    <Briefcase className="w-3.5 h-3.5 text-[#126373]" /> {teacher.experienceYears} Years Experience
                  </span>
                  {teacher.reviewsCount > 0 ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-bold border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {teacher.rating} ({teacher.reviewsCount} School Audits)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2ac0db]/10 text-[#126373] font-bold border border-[#2ac0db]/25">
                      <Sparkles className="w-3.5 h-3.5" /> New to CEC
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => onContactCEC(teacher)}
                className="w-full md:w-auto px-6 py-3.5 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#fa7b2d]/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request This Teacher</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Main Grid: Details + Sticky CTA Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Deep Profile Information */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* About & Bio */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#126373]" /> About & Teaching Philosophy
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {teacher.aboutDetailed}
            </p>
          </section>

          {/* Core Competencies & Skills */}
          {(teacher.skills.length > 0 || teacher.subjects.length > 0) && (
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#126373]" /> Pedagogy & Key Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {teacher.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-[#2ac0db]/10 text-[#126373] text-xs font-bold rounded-xl border border-[#2ac0db]/20 flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-[#2ac0db]" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>

            {teacher.subjects.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Teaching Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((subj, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#126373]" />
                    <span>{subj}</span>
                  </span>
                ))}
              </div>
            </div>
            )}
          </section>
          )}

          {/* Timeline Section: Work Experience & Education */}
          {teacher.timeline.length > 0 && (
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#126373]" /> Career & Education Timeline
            </h2>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {teacher.timeline.map((item) => (
                <div key={item.id} className="relative pl-10 space-y-1">
                  <div className={`absolute left-1.5 top-1.5 w-4 h-4 rounded-full border-2 bg-white ${
                    item.type === 'experience' ? 'border-[#126373] bg-[#126373]' : 'border-[#fa7b2d] bg-[#fa7b2d]'
                  }`} />
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">{item.role}</h3>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#126373]">{item.institution}</p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
          )}

        </div>

        {/* Right Column: Sticky Employment Overview Box */}
        <aside className="lg:col-span-4 space-y-6 sticky top-28">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-md space-y-6">
            <h3 className="font-heading font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
              Candidate Key Conditions
            </h3>

            <div className="space-y-4 text-xs">
              
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#126373] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-medium block">Availability</span>
                  <span className="font-bold text-slate-900 text-sm">{teacher.availability}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CediIcon className="w-4 h-4 text-[#126373] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-medium block">Salary Expectation</span>
                  <span className="font-bold text-slate-900 text-sm">{teacher.salaryExpectation}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="w-4 h-4 text-[#126373] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-medium block">Highest Qualification</span>
                  <span className="font-bold text-slate-900 text-sm">{teacher.qualification}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-4 h-4 text-[#126373] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-medium block">Preferred Role Type</span>
                  <span className="font-bold text-slate-900">{teacher.employmentPreferences.type}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#126373] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-medium block">Preferred School Locations</span>
                  <span className="font-semibold text-slate-800">
                    {teacher.employmentPreferences.preferredLocations.join(', ') || 'Flexible'}
                  </span>
                </div>
              </div>

            </div>

            {/* Direct Contact Action */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => onContactCEC(teacher)}
                className="w-full py-3.5 bg-[#126373] hover:bg-[#0e4f5c] text-white font-bold text-xs rounded-2xl shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request Interview</span>
              </button>
              
              <p className="text-[10px] text-slate-400 text-center">
                Candidate contact details managed exclusively by CEC Consult for candidate privacy & safety.
              </p>
            </div>

          </div>

        </aside>

      </div>

    </div>
  );
};

