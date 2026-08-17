import React, { useState } from 'react';
import { Workshop } from '../types';
import { 
  X, 
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
  if (!isOpen || !workshop) return null;

  const [registered, setRegistered] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 p-6 text-white flex items-center justify-between border-b border-sky-800">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-sky-300">
              <Ticket className="w-3.5 h-3.5" /> Workshop Registration
            </span>
            <h3 className="text-xl font-heading font-bold text-white">
              {registered ? 'Seat Confirmed!' : workshop.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {registered ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>
            <h4 className="text-2xl font-heading font-bold text-slate-900">
              Registration Successful!
            </h4>
            <p className="text-slate-600 text-sm max-w-sm mx-auto">
              You've registered {ticketCount} ticket(s) for <strong>{workshop.title}</strong>.
            </p>

            {/* Digital Pass Preview */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl text-left font-mono text-xs space-y-2 relative overflow-hidden border border-slate-800">
              <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-sky-500/20 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-sky-300 font-bold">CEC WORKSHOP PASS</span>
                <span className="text-[10px] text-slate-400">#CEC-WK-{Math.floor(Math.random() * 8999 + 1000)}</span>
              </div>
              <p><strong>Attendee:</strong> {formData.name}</p>
              <p><strong>Date & Time:</strong> {workshop.date} ({workshop.time})</p>
              <p><strong>Venue:</strong> {workshop.venue}</p>
              <p><strong>Pass Count:</strong> {ticketCount} Seat(s)</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl shadow-xs cursor-pointer"
            >
              Close & Save Pass
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            
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
                placeholder="e.g. Grace Okafor"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="teacher@school.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">School / Organization Name</label>
              <input
                type="text"
                placeholder="e.g. Corona Early Childhood Center"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Number of Seats</label>
              <select
                value={ticketCount}
                onChange={(e) => setTicketCount(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 font-medium"
              >
                <option value={1}>1 Seat (Individual Teacher)</option>
                <option value={2}>2 Seats (Teacher Pair)</option>
                <option value={5}>5 Seats (School Faculty Group - 10% Off)</option>
                <option value={10}>10 Seats (Full Preschool Staff - 20% Off)</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-slate-600 hover:text-slate-900 font-semibold rounded-xl border border-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Confirm Workshop Spot
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

