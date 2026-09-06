import React, { useState, useEffect } from 'react';
import { ConsultationService } from '../types';
import { useToast } from '../context/ToastContext';
import { 
  X, 
  ArrowLeft, 
  Calendar, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  Send,
  Clock
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import confetti from 'canvas-confetti';

interface BookConsultationModalProps {
  service: ConsultationService | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookConsultationModal: React.FC<BookConsultationModalProps> = ({ service, isOpen, onClose }) => {
  const toast = useToast();
  const validService = (service && typeof service === 'object' && 'title' in service && typeof service.title === 'string') 
    ? service 
    : null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    email: '',
    phone: '',
    serviceTitle: validService ? validService.title : 'Teacher Recruitment & Staff Placement',
    preferredDate: '',
    meetingType: 'In-Person (Accra, Ghana)' as 'In-Person (Accra, Ghana)' | 'Virtual (Google Meet / Zoom)',
    notes: ''
  });

  // Sync service title if service prop changes
  useEffect(() => {
    if (validService) {
      setFormData(prev => ({
        ...prev,
        serviceTitle: validService.title
      }));
    }
  }, [validService]);

  // Handle ESC key to close and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scrolling when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success(
      `Consultation booking request received for "${formData.serviceTitle}". Miss Nancie will contact you within 24 hours.`,
      'Booking Received'
    );
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      // ignore
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overscroll-contain">
      {/* Dimmed backdrop - clicking closes modal */}
      <div 
        onClick={() => onClose()}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[85dvh] sm:max-h-[88vh] overflow-hidden border border-slate-200/80 animate-in slide-in-from-bottom-6 sm:zoom-in-95 fade-in duration-200"
      >
        {/* Mobile Grab Indicator */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mt-2 sm:hidden shrink-0" />
        
        {/* Modal Header */}
        <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onClose()}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden xs:inline">Back</span>
            </button>
            <div className="h-4 w-px bg-slate-700 mx-1 hidden xs:block" />
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#2ac0db]">
                <ShieldCheck className="w-3.5 h-3.5" /> Early Years Advisory
              </span>
              <h3 className="text-sm sm:text-base font-heading font-bold text-white truncate max-w-[220px] sm:max-w-xs">
                {submitted ? 'Request Received' : 'Schedule Call with Miss Nancie'}
              </h3>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => onClose()}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4 overscroll-contain">
          
          {submitted ? (
            <div className="py-4 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
              </div>
              <h4 className="text-xl font-heading font-extrabold text-slate-900">
                Consultation Request Received!
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                Thank you, <strong className="text-slate-900">{formData.name || 'School Leader'}</strong>. Miss Nancie’s advisory team in Accra, Ghana will reach out to you within 24 hours.
              </p>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 text-left space-y-1.5">
                <p><strong>Service:</strong> {formData.serviceTitle}</p>
                <p><strong>School / Org:</strong> {formData.schoolName || 'N/A'}</p>
                <p><strong>Contact:</strong> {formData.phone || 'N/A'}</p>
                <p><strong>Session Format:</strong> {formData.meetingType}</p>
                <p><strong>Preferred Date:</strong> {formData.preferredDate || 'Earliest Available'}</p>
              </div>

              {/* Instant WhatsApp Option */}
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <p className="text-xs text-emerald-950 font-medium">Need immediate advisory assistance?</p>
                <a
                  href={`https://wa.me/233540390029?text=Hello%20Miss%20Nancie,%20I%20just%20submitted%20a%20consultation%20request%20for%20${encodeURIComponent(formData.schoolName || 'my school')}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Chat with Miss Nancie on WhatsApp</span>
                </a>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Selected service banner */}
              {validService && (
                <div className="p-3 bg-[#2ac0db]/10 rounded-2xl border border-[#2ac0db]/25 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#126373] uppercase tracking-wider block">Requested Topic</span>
                    <span className="font-extrabold text-slate-900 text-sm">{validService.title}</span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-white text-[#126373] rounded-lg border border-[#2ac0db]/30">
                    {validService.fee}
                  </span>
                </div>
              )}

              {/* Direct WhatsApp Callout */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#2ac0db]" />
                  <span className="text-[11px] font-semibold">Direct Ghana Lines:</span>
                </div>
                <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                  <a href="tel:+233540390029" className="hover:text-[#126373] transition-colors">+233 54 039 0029</a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mrs. Akosua Mensah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">School / Organization *</label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Morning Star Early Years"
                      value={formData.schoolName}
                      onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+233 54 039 0029"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="headmistress@school.edu.gh"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Meeting Format</label>
                  <select
                    value={formData.meetingType}
                    onChange={(e) => setFormData({ ...formData, meetingType: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 text-xs font-semibold"
                  >
                    <option value="In-Person (Accra, Ghana)">In-Person (Accra, Ghana)</option>
                    <option value="Virtual (Google Meet / Zoom)">Virtual (Google Meet / Zoom)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specific Goals or Needs</label>
                <textarea
                  rows={2}
                  placeholder="Share details (e.g. number of early years teachers required, school audit request, curriculum setup)..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 resize-none text-xs"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="order-2 sm:order-1 sm:w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer text-xs"
                >
                  Cancel / Back
                </button>
                <button
                  type="submit"
                  className="order-1 sm:order-2 sm:w-2/3 py-2.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Consultation Request</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
