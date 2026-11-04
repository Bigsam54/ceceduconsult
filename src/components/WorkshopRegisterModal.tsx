import React, { useState, useEffect } from 'react';
import { Workshop } from '../types';
import { useToast } from '../context/ToastContext';
import {
  X,
  ArrowLeft,
  Calendar,
  MapPin,
  CheckCircle2,
  Ticket,
  UserRound,
  Users,
  School,
  Loader2,
  Video,
  Copy,
  Check,
  ExternalLink,
  MailCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { workshopPriceLabel, workshopWhen, hasSeatLimit } from '../utils/workshopDisplay';
import { registerForWorkshop } from '../hooks/useWorkshops';

interface WorkshopRegisterModalProps {
  workshop: Workshop | null;
  isOpen: boolean;
  onClose: () => void;
}

type Attending = 'me' | 'two' | 'school';

const isOnlineVenue = (venue: string) => /online|zoom|google meet|virtual/i.test(venue);

const inputClass =
  'w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 font-medium text-xs';

export const WorkshopRegisterModal: React.FC<WorkshopRegisterModalProps> = ({ workshop, isOpen, onClose }) => {
  const toast = useToast();
  const [registered, setRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attending, setAttending] = useState<Attending>('me');
  const [schoolCount, setSchoolCount] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [emailRequested, setEmailRequested] = useState(false);
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
      setAttending('me');
      setSchoolCount('');
      setMeetingLink('');
      setCopied(false);
      setEmailRequested(false);
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

  const seats = attending === 'me' ? 1 : attending === 'two' ? 2 : Math.max(1, Number(schoolCount) || 0);
  const online = isOnlineVenue(workshop.venue);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === 'school' && !formData.schoolName.trim()) {
      toast.error('Please enter your school name.', 'School Needed');
      return;
    }
    if (attending === 'school' && !(Number(schoolCount) > 0)) {
      toast.error('Please enter how many people from your school will attend.', 'Number Needed');
      return;
    }
    if (hasSeatLimit(workshop) && seats > workshop.availableSeats) {
      toast.error(`Only ${workshop.availableSeats} seat${workshop.availableSeats === 1 ? '' : 's'} left for this workshop.`, 'Not Enough Seats');
      return;
    }

    setSubmitting(true);
    const { meetingLink: link, emailRequested: emailed, error } = await registerForWorkshop(workshop.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: formData.schoolName,
      quantity: seats
    });
    setSubmitting(false);

    if (error) {
      toast.error('We could not complete your registration. Please try again, or reach us on WhatsApp.', 'Not Registered');
      return;
    }
    setMeetingLink(link);
    setEmailRequested(emailed);
    setRegistered(true);
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
    } catch {
      // ignore
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.info(meetingLink, 'Copy this link');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={() => onClose()}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden border border-slate-200/80"
      >

        {/* Header */}
        <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => onClose()}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold shrink-0"
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#2ac0db]">
                <Ticket className="w-3.5 h-3.5" /> Workshop Registration
              </span>
              <h3 className="text-sm sm:text-base font-heading font-bold text-white truncate">
                {registered ? "You're registered!" : workshop.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onClose()}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4 text-xs">
          {registered ? (
            <div className="py-2 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xl font-heading font-extrabold text-slate-900">
                  See you there, {formData.name.split(/\s+/)[0]}!
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto">
                  You're registered for <strong>{workshop.title}</strong>
                  {seats > 1 ? ` (${seats} seats)` : ''}.
                </p>
              </div>

              {/* Online workshops: the join link appears right away */}
              {meetingLink ? (
                <div className="p-4 rounded-2xl bg-[#126373]/5 border border-[#126373]/20 text-left space-y-3">
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#126373]" /> Your workshop link
                  </p>
                  <p className="text-xs text-[#126373] font-semibold break-all bg-white rounded-xl border border-slate-200 p-2.5">{meetingLink}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={copyLink} className="py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer">
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy link'}
                    </button>
                    <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="py-2.5 bg-[#126373] hover:bg-[#0e4f5c] text-white font-bold rounded-xl flex items-center justify-center gap-1.5">
                      <ExternalLink className="w-4 h-4" /> Open link
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-500">Save this link now. Take a screenshot or copy it somewhere safe so you can join on the day.</p>
                </div>
              ) : online ? (
                <p className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
                  The online joining link will be shared with you on <strong>{formData.phone}</strong> before the workshop.
                </p>
              ) : null}

              {emailRequested && (
                <p className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2 text-left">
                  <MailCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    We're emailing your confirmation{meetingLink ? ' and the join link' : ''} to <strong>{formData.email}</strong>. Check your spam folder if it doesn't arrive in a few minutes.
                  </span>
                </p>
              )}

              {/* Pass */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl text-left text-xs space-y-1.5">
                <p className="text-[#2ac0db] font-bold uppercase tracking-wider text-[10px] pb-1 border-b border-slate-800">CEC Workshop Pass</p>
                <p><strong>Attendee:</strong> {formData.name}{formData.schoolName ? ` · ${formData.schoolName}` : ''}</p>
                {workshopWhen(workshop) && <p><strong>When:</strong> {workshopWhen(workshop)}</p>}
                {workshop.venue && <p><strong>Where:</strong> {workshop.venue}</p>}
                <p><strong>Seats:</strong> {seats}</p>
              </div>

              <button
                type="button"
                onClick={() => onClose()}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Workshop Quick Info */}
              <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200/80 space-y-1.5 text-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-950 text-sm">{workshopPriceLabel(workshop)}</span>
                  {hasSeatLimit(workshop) && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-sky-200 text-sky-950 rounded-full border border-sky-300">
                      {workshop.availableSeats} seats left
                    </span>
                  )}
                </div>
                {workshopWhen(workshop) && (
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-sky-700" />
                    <span>{workshopWhen(workshop)}</span>
                  </div>
                )}
                {workshop.venue && (
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-sky-700" />
                    <span>{workshop.venue}</span>
                  </div>
                )}
              </div>

              {/* Who is attending */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Who is attending?</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { key: 'me', icon: UserRound, label: 'Just me', hint: '1 seat' },
                    { key: 'two', icon: Users, label: '2 people', hint: '2 seats' },
                    { key: 'school', icon: School, label: 'A school', hint: 'Our team' }
                  ] as const).map(({ key, icon: Icon, label, hint }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setAttending(key)}
                      className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                        attending === key ? 'border-[#126373] bg-[#126373]/5' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mx-auto mb-1 ${attending === key ? 'text-[#126373]' : 'text-slate-400'}`} />
                      <span className="block text-xs font-bold text-slate-900">{label}</span>
                      <span className="block text-[10px] text-slate-500">{hint}</span>
                    </button>
                  ))}
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
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="024 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                  <p className="text-[10px] text-slate-400 -mt-0.5 mb-1">We'll email your confirmation{online ? ' and join link' : ''}</p>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className={attending === 'school' ? 'grid grid-cols-1 sm:grid-cols-3 gap-3' : ''}>
                <div className={attending === 'school' ? 'sm:col-span-2' : ''}>
                  <label className="block text-slate-700 font-bold mb-1">
                    {attending === 'school' ? 'School Name *' : 'School / Organization (optional)'}
                  </label>
                  <input
                    type="text"
                    required={attending === 'school'}
                    placeholder="e.g. Accra Ridge Early Childhood"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    className={inputClass}
                  />
                </div>
                {attending === 'school' && (
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">How many people? *</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      inputMode="numeric"
                      placeholder="e.g. 8"
                      value={schoolCount}
                      onChange={(e) => setSchoolCount(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="order-2 sm:order-1 sm:w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="order-1 sm:order-2 sm:w-2/3 py-2.5 bg-[#2ac0db] hover:bg-[#22a8c0] disabled:opacity-60 text-slate-950 font-extrabold rounded-xl transition-all cursor-pointer text-xs flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? 'Registering...' : 'Register for this Workshop'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
