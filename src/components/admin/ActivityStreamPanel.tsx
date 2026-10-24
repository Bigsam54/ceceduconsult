import React, { useState } from 'react';
import { Activity, ArrowRight, Plus, RefreshCw, StickyNote, UserPlus, ShieldCheck, Repeat, X } from 'lucide-react';
import type { ActivityRow } from '../../hooks/useAdminData';
import type { TeacherProfileRow } from '../../context/TeacherProfileContext';
import { useToast } from '../../context/ToastContext';
import {
  PanelHeader,
  EmptyState,
  LoadingState,
  ErrorBanner,
  StatusDot,
  AVAILABILITY_META,
  VERIFICATION_META,
  availabilityLabel,
  timeAgo,
  primaryButton,
  secondaryButton,
  inputClass
} from './adminUi';

export const describeActivity = (a: ActivityRow) => {
  switch (a.event) {
    case 'registered':
      return 'registered on the website';
    case 'availability_changed':
      return `changed availability to ${availabilityLabel(a.new_value).toLowerCase()}`;
    case 'verification_changed':
      return a.new_value === 'approved' ? 'was verified by CEC' : a.new_value === 'rejected' ? 'was not approved' : 'was moved back to review';
    default:
      return `— ${a.note}`;
  }
};

const EVENT_ICONS: Record<ActivityRow['event'], React.ElementType> = {
  registered: UserPlus,
  availability_changed: Repeat,
  verification_changed: ShieldCheck,
  note: StickyNote
};

type EventFilter = 'all' | ActivityRow['event'];

interface ActivityStreamPanelProps {
  activity: ActivityRow[];
  teachers: TeacherProfileRow[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onAddNote: (teacherId: string, teacherName: string, note: string) => Promise<{ error: string | null }>;
}

export const ActivityStreamPanel: React.FC<ActivityStreamPanelProps> = ({ activity, teachers, loading, error, onRefresh, onAddNote }) => {
  const toast = useToast();
  const [filter, setFilter] = useState<EventFilter>('all');
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteTeacherId, setNoteTeacherId] = useState('');
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);

  const visible = filter === 'all' ? activity : activity.filter((a) => a.event === filter);

  const saveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = teachers.find((t) => t.user_id === noteTeacherId);
    if (!teacher || !noteText.trim()) {
      toast.error('Choose a teacher and write a short note.', 'Missing Details');
      return;
    }
    setSaving(true);
    const { error: saveError } = await onAddNote(teacher.user_id, teacher.full_name || teacher.email, noteText.trim());
    setSaving(false);
    if (saveError) {
      toast.error(saveError, 'Could Not Save Note');
      return;
    }
    toast.success('Note added to the activity log.', 'Saved');
    setNoteText('');
    setNoteOpen(false);
  };

  const filters: { key: EventFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'registered', label: 'Registrations' },
    { key: 'availability_changed', label: 'Availability' },
    { key: 'verification_changed', label: 'Verification' },
    { key: 'note', label: 'Notes' }
  ];

  return (
    <div className="space-y-5">
      <PanelHeader
        icon={Activity}
        title="Live Teacher Movements"
        description="Recorded automatically when teachers register, change availability or are verified. Add notes for placements."
        actions={
          <>
            <button onClick={onRefresh} className={secondaryButton}>
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button onClick={() => setNoteOpen(!noteOpen)} className={primaryButton}>
              <Plus className="w-3.5 h-3.5" /> Add Note
            </button>
          </>
        }
      />

      {noteOpen && (
        <form onSubmit={saveNote} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-900">Add a note to a teacher's history</p>
            <button type="button" onClick={() => setNoteOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={noteTeacherId} onChange={(e) => setNoteTeacherId(e.target.value)} className={inputClass}>
              <option value="">Choose a teacher...</option>
              {teachers.map((t) => (
                <option key={t.user_id} value={t.user_id}>{t.full_name || t.email}</option>
              ))}
            </select>
            <input
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Placed at Morning Star Academy, East Legon"
              className={`${inputClass} sm:col-span-2`}
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={saving} className={primaryButton}>{saving ? 'Saving...' : 'Save Note'}</button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              filter === f.key ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ErrorBanner message={error} />

      {loading && activity.length === 0 ? (
        <LoadingState label="Loading activity..." />
      ) : visible.length === 0 ? (
        <EmptyState icon={Activity} title="No activity yet" description="As teachers register and update their availability, every change is listed here automatically." />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
          {visible.map((a) => {
            const Icon = EVENT_ICONS[a.event];
            const meta = a.event === 'verification_changed' ? VERIFICATION_META : AVAILABILITY_META;
            return (
              <div key={a.id} className="p-4 sm:px-5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm text-slate-700">
                    <span className="font-bold text-slate-900">{a.teacher_name || 'A teacher'}</span> {describeActivity(a)}
                  </p>
                  {(a.event === 'availability_changed' || a.event === 'verification_changed') && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {a.previous_value && (
                        <>
                          <StatusDot dot={meta[a.previous_value]?.dot ?? 'bg-slate-300'} label={meta[a.previous_value]?.label ?? a.previous_value} className="text-slate-500" />
                          <ArrowRight className="w-3 h-3 text-slate-300" />
                        </>
                      )}
                      <StatusDot dot={meta[a.new_value]?.dot ?? 'bg-slate-300'} label={meta[a.new_value]?.label ?? a.new_value} />
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] text-slate-400">{timeAgo(a.created_at)}</p>
                  <p className="text-[10px] font-semibold text-slate-500 capitalize">by {a.changed_by}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
