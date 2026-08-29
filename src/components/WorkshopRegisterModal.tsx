import React, { useState, useEffect } from 'react';
import { Workshop } from '../types';
import { useToast } from '../context/ToastContext';
import { 
  X, 
  ArrowLeft,
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Ticket 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WorkshopRegisterModalProps {
  workshop: Workshop | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WorkshopRegisterModal: React.FC<WorkshopRegisterModalProps> = ({ workshop, isOpen, onClose }) => {
  const toast = useToast();
  const [registered, setRegistered] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: ''
  });

  // Reset form when modal opens with new workshop
  useEffect(() => {
    if (isOpen) {
      setRegistered(false);
      setTicketCount(1);
    }
  }, [isOpen, workshop]);

  // Handle ESC key to close and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !workshop) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    toast.success(
      `Registration confirmed for ${ticketCount} seat(s) at "${workshop.title}". Confirmation email sent!`,
      'Seat Reserved'
    );
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        onClick={() => onClose()}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden border border-slate-200/80 animate-in slide-in-from-bottom-6 sm:zoom-in-95 fade-in duration-200"
      >
        
        {/* Header */}
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
                <Ticket className="w-3.5 h-3.5" /> Workshop Registration
              </span>
              <h3 className="text-sm sm:text-base font-heading font-bold text-white truncate max-w-[220px]">
                {registered ? 'Seat Confirmed!' : workshop.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onClose()}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4 text-xs">
          {registered ? (
            <div className="py-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
              </div>
              <h4 className="text-xl font-heading font-extrabold text-slate-900">
                Registration Confirmed!
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto">
                You've registered {ticketCount} ticket(s) for <strong>{workshop.title}</strong>.
              </p>

              {/* Digital Pass Preview */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl text-left font-mono text-xs space-y-2 relative overflow-hidden border border-slate-800">
                <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-[#2ac0db]/20 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[#2ac0db] font-bold">CEC WORKSHOP PASS</span>
                  <span className="text-[10px] text-slate-400">#CEC-WK-{Math.floor(Math.random() * 8999 + 1000)}</span>
                </div>
                <p><strong>Attendee:</strong> {formData.name}</p>
                <p><strong>Date & Time:</strong> {workshop.date} ({workshop.time})</p>
                <p><strong>Venue:</strong> {workshop.venue}</p>
                <p><strong>Pass Count:</strong> {ticketCount} Seat(s)</p>
              </div>

              <button
                type="button"
                onClick={() => onClose()}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Close & Save Pass
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Workshop Quick Info */}
              <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200/80 space-y-1.5 text-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-950 text-sm">{workshop.price}</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-sky-200 text-sky-950 rounded-full border border-sky-300">
                    {workshop.availableSeats} seats left
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-sky-700" />
                  <span>{workshop.date} ({workshop.time})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-sky-700" />
                  <span className="truncate">{workshop.venue}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grace Mensah"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 font-medium text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+233 54 039 0029"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 font-medium text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="teacher@school.edu.gh"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 font-medium text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">School / Organization Name</label>
                <input
                  type="text"
                  placeholder="e.g. Accra Ridge Early Childhood"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 font-medium text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Number of Seats</label>
                <select
                  value={ticketCount}
                  onChange={(e) => setTicketCount(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 font-semibold text-xs"
                >
                  <option value={1}>1 Seat (Individual Teacher)</option>
                  <option value={2}>2 Seats (Teacher Pair)</option>
                  <option value={5}>5 Seats (School Faculty Group - 10% Off)</option>
                  <option value={10}>10 Seats (Full Preschool Staff - 20% Off)</option>
                </select>
              </div>

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
                  className="order-1 sm:order-2 sm:w-2/3 py-2.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold rounded-xl shadow-xs transition-all cursor-pointer text-xs"
                >
                  Confirm Workshop Spot
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
