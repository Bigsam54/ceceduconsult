import React from 'react';
import { Teacher } from '../types';
import { 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Star, 
  ArrowRight, 
  PhoneCall,
  GraduationCap,
  Building2
} from 'lucide-react';

interface TeacherCardProps {
  teacher: Teacher;
  onViewProfile: (teacher: Teacher) => void;
  onContactCEC: (teacher: Teacher) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onViewProfile, onContactCEC }) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Immediate':
        return 'bg-[#2ac0db]/15 text-[#126373] border-[#2ac0db]/30';
      case '2 Weeks Notice':
        return 'bg-[#fa7b2d]/15 text-[#aa4407] border-[#fa7b2d]/30';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Extract initials from teacher name
  const initials = teacher.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-[#2ac0db] transition-all duration-200 flex flex-col justify-between group overflow-hidden">
      <div>
        {/* Top Header Banner with Initials Avatar & Badges */}
        <div className="p-4 sm:p-5 pb-3 border-b border-slate-100">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              
              {/* Avatar Badge (Photo or Monogram) */}
              <div className="relative">
                {teacher.photo && teacher.photo.trim() !== '' ? (
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    className="w-12 h-12 rounded-xl object-cover shadow-xs border border-slate-200 bg-slate-100"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0b2228] to-[#114c5a] flex items-center justify-center text-white font-heading font-extrabold text-base tracking-wider shadow-xs border border-slate-200">
                    {initials}
                  </div>
                )}
                {teacher.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-[#2ac0db] text-slate-950 p-0.5 rounded-full shadow-xs ring-2 ring-white" title="CEC Verified Teacher">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-[#126373] transition-colors">
                    {teacher.name}
                  </h3>
                  {teacher.isVerified && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#2ac0db]/15 text-[#126373] border border-[#2ac0db]/30">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-[#126373]">{teacher.title}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate max-w-[160px]">{teacher.location}</span>
                </div>
              </div>
            </div>

            {/* Rating badge */}
            <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 shrink-0">
              <Star className="w-3 h-3 fill-[#fa7b2d] text-[#fa7b2d]" />
              <span>{teacher.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Key Attribute Pills */}
        <div className="px-4 sm:px-5 py-2.5 bg-slate-50/70 border-b border-slate-100 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>{teacher.experienceYears} Yrs Exp.</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{teacher.salaryExpectation}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getAvailabilityColor(teacher.availability)}`}>
              {teacher.availability}
            </span>
          </div>
        </div>

        {/* Bio & Qualification */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
            "{teacher.bio}"
          </p>

          <div className="flex flex-wrap gap-1.5 pt-0.5">
            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md border border-slate-200 flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-[#126373] shrink-0" />
              <span>{teacher.qualification}</span>
            </span>
            <span className="px-2 py-0.5 bg-[#2ac0db]/10 text-[#126373] text-[10px] font-semibold rounded-md border border-[#2ac0db]/20 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#126373] shrink-0" />
              <span>{teacher.teachingLevel}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onViewProfile(teacher)}
          className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors text-center flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onContactCEC(teacher)}
          className="py-2 px-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center justify-center gap-1 cursor-pointer"
          title="Request candidate interview"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Request</span>
        </button>
      </div>
    </div>
  );
};
