import React, { useEffect } from 'react';
import { AdvertisedSchool } from '../types';
import { safeOpenUrl } from '../utils/safeWindow';
import { useToast } from '../context/ToastContext';
import {
  X,
  MapPin,
  Phone,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

interface SchoolDetailModalProps {
  school: AdvertisedSchool | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolDetailModal: React.FC<SchoolDetailModalProps> = ({ school, isOpen, onClose }) => {
  const toast = useToast();

  // Lock body scroll and ESC key listener
  useEffect(() => {
    if (!isOpen || !school) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, school, onClose]);

  if (!isOpen || !school) return null;

  const handleWhatsAppInquiry = () => {
    toast.info(`Preparing admission enquiry for ${school.name}...`, 'Opening WhatsApp');
    const msg = `Hello CEC School Placement & Admissions Desk!\n\nI am interested in learning more about:\n*School:* ${school.name}\n*Location:* ${school.location} (${school.city})\n*Curriculum:* ${school.curriculum}\n*Student Ages:* ${school.studentAges}\n\nPlease share admission requirements, open slots, and fees schedule. Thank you!`;
    safeOpenUrl(`https://wa.me/233540390029?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overscroll-contain animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[88dvh] sm:max-h-[90vh] overflow-hidden border border-slate-200/80 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 text-left"
      >
        {/* Mobile Grab Pill */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Pinned Header with Close Button */}
        <div className="px-5 py-3.5 sm:py-4 bg-slate-900 text-white flex items-center justify-between gap-3 shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#2ac0db] shrink-0 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#2ac0db] truncate">
              Featured Partner School
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {/* Main School Image Banner */}
          <div className="relative h-52 sm:h-64 w-full bg-slate-100 overflow-hidden">
            <img 
              src={school.image} 
              alt={school.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold leading-tight text-white drop-shadow-md">
                {school.name}
              </h2>
            </div>
          </div>

          {/* Core Info & Specs */}
          <div className="p-5 sm:p-6 space-y-5">
            {/* Tagline & Location */}
            <div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 italic">
                "{school.tagline}"
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                <MapPin className="w-4 h-4 text-[#fa7b2d] shrink-0" />
                <span>{school.location}, {school.city}</span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-slate-100 bg-slate-50/70 p-3 rounded-2xl">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Curriculum</span>
                <span className="text-xs font-bold text-slate-900 leading-tight block mt-0.5">{school.curriculum}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Ages / Grades</span>
                <span className="text-xs font-bold text-slate-900 leading-tight block mt-0.5">{school.studentAges}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                About the Institution
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {school.description}
              </p>
            </div>

            {/* Highlights Checklist */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Features & Campus Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {school.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0 mt-0.5" />
                    <span className="font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Assurance Card */}
            <div className="p-3.5 bg-[#ebfafc] rounded-2xl border border-[#2ac0db]/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#126373] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 space-y-0.5">
                <span className="font-bold text-[#126373] block">CEC Verified Standard</span>
                <p className="text-[11px] text-slate-600 leading-normal">
                  This school partners with CEC Educational Consult for early years advisory, classroom setup standards, or certified educator placement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pinned Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleWhatsAppInquiry}
            className="flex-1 py-3 px-5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all text-xs sm:text-sm cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Enquire on WhatsApp</span>
          </button>

          <a
            href={`tel:${school.contactPhone.replace(/\s+/g, '')}`}
            className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm"
          >
            <Phone className="w-4 h-4 text-slate-600" />
            <span>Call Admissions</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold rounded-xl transition-colors text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
