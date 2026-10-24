import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Plus, Video, MapPin, Phone, Trash2, Check, X, Building2, Clock } from 'lucide-react';
import type { AppointmentInput, AppointmentRow } from '../../hooks/useAdminData';
import { useToast } from '../../context/ToastContext';
import {
  PanelHeader,
  EmptyState,
  LoadingState,
  ErrorBanner,
  Chip,
  StatusDot,
  inputClass,
  primaryButton,
  secondaryButton
} from './adminUi';

export const APPOINTMENT_KINDS = ['Consultation', 'Teacher Interview', 'School Audit', 'School Visit', 'Workshop', 'Other'];
const FORMATS = ['In-Person', 'Google Meet / Zoom', 'Phone Call', 'School Site Visit'];

const todayIso = () => new Date().toISOString().slice(0, 10);

export const blankAppointment = (): AppointmentInput => ({
  title: '',
  client_name: '',
  organization: '',
  phone: '',
  appointment_date: todayIso(),
  start_time: '10:00',
  kind: 'Consultation',
  format: 'In-Person',
  meeting_link: '',
  notes: '',
  status: 'confirmed',
  inquiry_id: null
});

const formatDay = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

const formatTime = (value: string) => {
  const match = /^(\d{1,2}):(\d{2})/.exec(value);
  if (!match) return value;
  const hours = Number(match[1]);
  return `${((hours + 11) % 12) + 1}:${match[2]} ${hours < 12 ? 'AM' : 'PM'}`;
};

interface CalendarPanelProps {
  appointments: AppointmentRow[];
  loading: boolean;
  error: string | null;
  onCreate: (input: AppointmentInput) => Promise<{ error: string | null }>;
  onUpdate: (id: string, updates: Partial<AppointmentInput>) => Promise<{ error: string | null }>;
  onDelete: (id: string) => Promise<{ error: string | null }>;
  /** Pre-filled appointment (e.g. from an inquiry); opens the form when set */
  draft: AppointmentInput | null;
  onDraftHandled: () => void;
}

export const CalendarPanel: React.FC<CalendarPanelProps> = ({ appointments, loading, error, onCreate, onUpdate, onDelete, draft, onDraftHandled }) => {
  const toast = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<AppointmentInput>(blankAppointment());
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    if (draft) {
      setForm(draft);
      setFormOpen(true);
      onDraftHandled();
    }
  }, [draft, onDraftHandled]);

  const today = todayIso();
  const visible = useMemo(() => {
    const list = appointments.filter((a) => (view === 'upcoming' ? a.appointment_date >= today : a.appointment_date < today));
    return view === 'past' ? [...list].reverse() : list;
  }, [appointments, view, today]);

  // Group by day for an agenda layout
  const grouped = useMemo(() => {
    const map = new Map<string, AppointmentRow[]>();
    visible.forEach((a) => map.set(a.appointment_date, [...(map.get(a.appointment_date) ?? []), a]));
    return Array.from(map.entries());
  }, [visible]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Please give the appointment a title.', 'Title Required');
      return;
    }
    setSaving(true);
    const { error: saveError } = await onCreate(form);
    setSaving(false);
    if (saveError) {
      toast.error(saveError, 'Could Not Save');
      return;
    }
    toast.success('Appointment added to your calendar.', 'Scheduled');
    setFormOpen(false);
    setForm(blankAppointment());
  };

  const setStatus = async (a: AppointmentRow, status: AppointmentRow['status']) => {
    const { error: saveError } = await onUpdate(a.id, { status });
    if (saveError) toast.error(saveError, 'Update Failed');
  };

  return (
    <div className="space-y-5">
      <PanelHeader
        icon={CalendarDays}
        title="Schedule & Calendar"
        description="Consultations, teacher interviews, school audits and visits. Schedule straight from an inquiry to pre-fill the details."
        actions={
          <button onClick={() => { setForm(blankAppointment()); setFormOpen(true); }} className={primaryButton}>
            <Plus className="w-3.5 h-3.5" /> New Appointment
          </button>
        }
      />

      {formOpen && (
        <form onSubmit={save} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-900">New appointment</p>
            <button type="button" onClick={() => setFormOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Recruitment consultation" className={inputClass} />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Client name</label>
              <input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">School / organisation</label>
              <input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Date *</label>
              <input required type="date" value={form.appointment_date} onChange={(e) => setForm({ ...form, appointment_date: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Time</label>
              <input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Type</label>
              <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })} className={inputClass}>
                {APPOINTMENT_KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Format</label>
              <select value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value })} className={inputClass}>
                {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Meeting link (optional)</label>
              <input value={form.meeting_link} onChange={(e) => setForm({ ...form, meeting_link: e.target.value })} placeholder="https://meet.google.com/..." className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Notes</label>
              <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setFormOpen(false)} className={secondaryButton}>Cancel</button>
            <button type="submit" disabled={saving} className={primaryButton}>{saving ? 'Saving...' : 'Save Appointment'}</button>
          </div>
        </form>
      )}

      <div className="inline-flex p-1 bg-slate-100 rounded-xl">
        {(['upcoming', 'past'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${view === v ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
          >
            {v}
          </button>
        ))}
      </div>

      <ErrorBanner message={error} />

      {loading && appointments.length === 0 ? (
        <LoadingState label="Loading calendar..." />
      ) : grouped.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title={view === 'upcoming' ? 'Nothing scheduled yet' : 'No past appointments'}
          description="Add an appointment, or open an inquiry and choose Schedule."
        />
      ) : (
        <div className="space-y-4">
          {grouped.map(([day, items]) => (
            <div key={day} className="space-y-2">
              <p className={`text-xs font-bold uppercase tracking-wider ${day === today ? 'text-[#126373]' : 'text-slate-500'}`}>
                {day === today ? 'Today · ' : ''}{formatDay(day)}
              </p>
              {items.map((a) => (
                <div key={a.id} className={`bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${a.status === 'cancelled' ? 'opacity-60' : ''}`}>
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-16 shrink-0 text-center py-1.5 rounded-xl bg-slate-50 border border-slate-100">
                      <Clock className="w-3.5 h-3.5 text-slate-400 mx-auto" />
                      <p className="text-[11px] font-bold text-slate-800 mt-0.5">{formatTime(a.start_time) || '—'}</p>
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`font-bold text-slate-900 text-sm ${a.status === 'cancelled' ? 'line-through' : ''}`}>{a.title}</h4>
                        <Chip tone="brand">{a.kind}</Chip>
                        {a.status !== 'confirmed' && <StatusDot dot={a.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-400'} label={a.status === 'completed' ? 'Completed' : 'Cancelled'} />}
                      </div>
                      <p className="text-xs text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                        {a.client_name && <span>{a.client_name}</span>}
                        {a.organization && <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {a.organization}</span>}
                        <span className="flex items-center gap-1">
                          {a.format.includes('Meet') ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />} {a.format}
                        </span>
                        {a.phone && <a href={`tel:${a.phone}`} className="flex items-center gap-1 hover:text-[#126373]"><Phone className="w-3 h-3" /> {a.phone}</a>}
                      </p>
                      {a.notes && <p className="text-[11px] text-slate-500">{a.notes}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {a.meeting_link && (
                      <a href={a.meeting_link} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-[#126373] text-white font-bold text-xs rounded-lg flex items-center gap-1">
                        <Video className="w-3.5 h-3.5" /> Join
                      </a>
                    )}
                    {a.status === 'confirmed' && (
                      <>
                        <button onClick={() => setStatus(a, 'completed')} className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer" title="Mark completed">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setStatus(a, 'cancelled')} className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer" title="Cancel">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={async () => {
                        if (!window.confirm(`Delete "${a.title}"?`)) return;
                        const { error: deleteError } = await onDelete(a.id);
                        if (deleteError) toast.error(deleteError, 'Delete Failed');
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
