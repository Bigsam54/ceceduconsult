import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { X, School, UserRound, Check, Loader2, CheckCircle2, CalendarDays, Phone, Mail, Building2, Users } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { submitInquiry } from '../services/inquiryService';
import { safeOpenUrl } from '../utils/safeWindow';
import { WORKSHOP_TOPIC_GROUPS, WORKSHOP_CONTACT_NUMBERS } from '../data/workshopTopics';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

type RequestFor = 'school' | 'individual';

const FORMATS: Record<RequestFor, string[]> = {
  school: ['At our school (in person)', 'Online', 'At a CEC venue'],
  individual: ['Online', 'In person (CEC venue)', 'Either is fine']
};

interface WorkshopRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Topic to pre-select, e.g. when a visitor taps a topic on the Workshops page */
  initialTopic?: string | null;
}

const inputClass =
  'w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#126373] focus:ring-4 focus:ring-[#126373]/10 transition-all';

export const WorkshopRequestModal: React.FC<WorkshopRequestModalProps> = ({ isOpen, onClose, initialTopic }) => {
  const toast = useToast();
  const [requestFor, setRequestFor] = useState<RequestFor>('school');
  const [topics, setTopics] = useState<string[]>([]);
  const [otherTopic, setOtherTopic] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [participants, setParticipants] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [format, setFormat] = useState(FORMATS.school[0]);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fresh form each time it opens, with the tapped topic already ticked
  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    setTopics(initialTopic ? [initialTopic] : []);
  }, [isOpen, initialTopic]);

  useEffect(() => {
    setFormat(FORMATS[requestFor][0]);
  }, [requestFor]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleTopic = (topic: string) =>
    setTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]));

  const allTopics = [...topics, ...(otherTopic.trim() ? [`Other: ${otherTopic.trim()}`] : [])];
  const requestLabel = requestFor === 'school' ? 'For a whole school' : 'For an individual';

  const summaryText = () =>
    [
      `Request: ${requestLabel}`,
      `Topics:\n${allTopics.map((t) => `• ${t}`).join('\n')}`,
      requestFor === 'school' && participants ? `Participants: about ${participants}` : '',
      `Format: ${format}`,
      notes.trim() ? `Notes: ${notes.trim()}` : ''
    ]
      .filter(Boolean)
      .join('\n\n');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (allTopics.length === 0) return toast.error('Please choose at least one workshop topic.', 'Topic Needed');
    if (!name.trim()) return toast.error('Please enter your name.', 'Name Needed');
    if (phone.replace(/\D/g, '').length < 9) return toast.error('Please enter a valid phone or WhatsApp number.', 'Phone Needed');
    if (requestFor === 'school' && !organization.trim()) return toast.error('Please enter your school name.', 'School Needed');

    setSubmitting(true);
    const { error } = await submitInquiry({
      kind: 'workshop_request',
      name,
      phone,
      email,
      organization,
      subject: `${requestLabel}: ${allTopics.length === 1 ? allTopics[0] : `${allTopics.length} topics`}`,
      message: summaryText(),
      preferredDate,
      meetingFormat: format,
      quantity: Math.max(1, Math.min(100, Number(participants) || 1))
    });
    setSubmitting(false);

    if (error) {
      toast.error('We could not send your request. Please try again, or reach us on WhatsApp.', 'Not Sent');
      return;
    }
    setSubmitted(true);
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const openWhatsApp = () => {
    const text = `Hello CEC Educational Consult,\n\nI just requested a workshop on your website.\n\nName: ${name}${organization ? `\nSchool: ${organization}` : ''}\n\n${summaryText()}`;
    safeOpenUrl(`https://wa.me/233540390029?text=${encodeURIComponent(text)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request a workshop"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[92dvh] overflow-hidden"
      >
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#126373]">CEC Workshops</p>
            <h2 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
              {submitted ? 'Request received' : 'Request a Workshop'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="overflow-y-auto p-6 sm:p-8 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-heading font-bold text-slate-900">Thank you, {name.split(/\s+/)[0]}!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                The CEC team has your workshop request and will contact you on <span className="font-bold text-slate-800">{phone}</span> to plan
                the topics, date and fees.
              </p>
            </div>
            <div className="text-left p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{requestLabel}</p>
              <ul className="space-y-1">
                {allTopics.map((t) => (
                  <li key={t} className="text-sm text-slate-700 flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#126373] shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <button onClick={openWhatsApp} className="px-5 py-3 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                <WhatsAppIcon className="w-4 h-4" /> Also message us on WhatsApp
              </button>
              <button onClick={onClose} className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl cursor-pointer">
                Done
              </button>
            </div>
            <p className="text-xs text-slate-400">Questions? Call {WORKSHOP_CONTACT_NUMBERS.join(' or ')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col min-h-0">
            <div className="overflow-y-auto px-5 sm:px-6 py-5 space-y-6">

              {/* 1. Who for */}
              <section className="space-y-2.5">
                <p className="text-sm font-bold text-slate-900">1. Who is this workshop for?</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {([
                    { key: 'school', icon: School, title: 'A whole school', text: 'Train your teaching team or leaders' },
                    { key: 'individual', icon: UserRound, title: 'An individual', text: 'Grow your own skills as an educator' }
                  ] as const).map(({ key, icon: Icon, title, text }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRequestFor(key)}
                      className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        requestFor === key ? 'border-[#126373] bg-[#126373]/5' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1.5 ${requestFor === key ? 'text-[#126373]' : 'text-slate-400'}`} />
                      <span className="block text-sm font-bold text-slate-900">{title}</span>
                      <span className="block text-[11px] text-slate-500 leading-snug">{text}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* 2. Topics */}
              <section className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-slate-900">2. Choose your topics</p>
                  {topics.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#126373] text-white text-[11px] font-bold">{topics.length} selected</span>
                  )}
                </div>
                {WORKSHOP_TOPIC_GROUPS.map((group) => (
                  <div key={group.key} className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {group.label} <span className="normal-case tracking-normal font-medium">· {group.audience}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.topics.map((topic) => {
                        const selected = topics.includes(topic);
                        return (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => toggleTopic(topic)}
                            aria-pressed={selected}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                              selected
                                ? 'bg-[#126373] border-[#126373] text-white'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-[#126373]/40'
                            }`}
                          >
                            {selected && <Check className="w-3.5 h-3.5" />}
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <input value={otherTopic} onChange={(e) => setOtherTopic(e.target.value)} placeholder="Another topic in mind? Type it here (optional)" className={inputClass} />
              </section>

              {/* 3. Details */}
              <section className="space-y-3">
                <p className="text-sm font-bold text-slate-900">3. Your details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" autoComplete="name" className={inputClass} />
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone / WhatsApp" autoComplete="tel" className={`${inputClass} pl-10`} />
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" autoComplete="email" className={`${inputClass} pl-10`} />
                  </div>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      required={requestFor === 'school'}
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder={requestFor === 'school' ? 'School name' : 'School you work at (optional)'}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                  {requestFor === 'school' && (
                    <div className="relative">
                      <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input type="number" min={1} inputMode="numeric" value={participants} onChange={(e) => setParticipants(e.target.value)} placeholder="Number of participants" className={`${inputClass} pl-10`} />
                    </div>
                  )}
                  <div className="relative">
                    <CalendarDays className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} aria-label="Preferred date" className={`${inputClass} pl-10`} />
                  </div>
                  <select value={format} onChange={(e) => setFormat(e.target.value)} aria-label="Format" className={`${inputClass} ${requestFor === 'school' ? '' : 'sm:col-span-2'}`}>
                    {FORMATS[requestFor].map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything else we should know? (optional)" className={`${inputClass} resize-none`} />
              </section>
            </div>

            <div className="px-5 sm:px-6 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-slate-100 bg-white shrink-0">
              <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-2xl bg-[#126373] hover:bg-[#0e4f5c] disabled:opacity-60 text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? 'Sending...' : `Send Workshop Request${allTopics.length ? ` (${allTopics.length} topic${allTopics.length === 1 ? '' : 's'})` : ''}`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
