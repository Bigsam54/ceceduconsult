import React, { useMemo, useState } from 'react';
import { Inbox, Search, RefreshCw, Phone, Mail, CalendarPlus, Trash2, Save, Building2, CalendarDays } from 'lucide-react';
import type { InquiryKind, InquiryRow, InquiryStatus } from '../../services/inquiryService';
import { useToast } from '../../context/ToastContext';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import {
  PanelHeader,
  EmptyState,
  LoadingState,
  ErrorBanner,
  Chip,
  inputClass,
  secondaryButton,
  timeAgo,
  formatDate,
  toWhatsAppNumber
} from './adminUi';

export const INQUIRY_KIND_LABELS: Record<InquiryKind, string> = {
  consultation: 'Consultation',
  teacher_request: 'Teacher Request',
  workshop: 'Workshop Sign-up',
  contact: 'Contact Message',
  product: 'Store Enquiry'
};

const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: 'New',
  in_progress: 'In progress',
  scheduled: 'Scheduled',
  completed: 'Completed',
  closed: 'Closed'
};

// Teacher requests follow the placement pipeline
const STATUS_LABELS_BY_KIND: Partial<Record<InquiryKind, Partial<Record<InquiryStatus, string>>>> = {
  teacher_request: { new: 'New request', in_progress: 'Shortlisting', scheduled: 'Interview set', completed: 'Placed' },
  workshop: { scheduled: 'Confirmed', completed: 'Attended' }
};

export const statusLabel = (kind: InquiryKind, status: InquiryStatus) => STATUS_LABELS_BY_KIND[kind]?.[status] ?? STATUS_LABELS[status];

const STATUS_DOTS: Record<InquiryStatus, string> = {
  new: 'bg-[#2ac0db]',
  in_progress: 'bg-amber-500',
  scheduled: 'bg-sky-500',
  completed: 'bg-emerald-500',
  closed: 'bg-slate-400'
};

type KindFilter = InquiryKind | 'all';
type StatusFilter = 'open' | 'all' | InquiryStatus;

interface InquiriesPanelProps {
  inquiries: InquiryRow[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onUpdate: (id: string, updates: Partial<Pick<InquiryRow, 'status' | 'admin_notes'>>) => Promise<{ error: string | null }>;
  onDelete: (id: string) => Promise<{ error: string | null }>;
  onSchedule: (inquiry: InquiryRow) => void;
}

const InquiryCard: React.FC<{
  inquiry: InquiryRow;
  onUpdate: InquiriesPanelProps['onUpdate'];
  onDelete: InquiriesPanelProps['onDelete'];
  onSchedule: InquiriesPanelProps['onSchedule'];
}> = ({ inquiry, onUpdate, onDelete, onSchedule }) => {
  const toast = useToast();
  const [notes, setNotes] = useState(inquiry.admin_notes);
  const [savingNotes, setSavingNotes] = useState(false);

  const changeStatus = async (status: InquiryStatus) => {
    const { error } = await onUpdate(inquiry.id, { status });
    if (error) toast.error(error, 'Update Failed');
  };

  const saveNotes = async () => {
    setSavingNotes(true);
    const { error } = await onUpdate(inquiry.id, { admin_notes: notes });
    setSavingNotes(false);
    if (error) toast.error(error, 'Could Not Save Notes');
    else toast.success('Notes saved.', 'Saved');
  };

  const canSchedule = inquiry.kind === 'consultation' || inquiry.kind === 'teacher_request' || inquiry.kind === 'contact';

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden ${inquiry.status === 'new' ? 'border-[#126373]/30' : 'border-slate-200'}`}>
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Chip tone="brand">{INQUIRY_KIND_LABELS[inquiry.kind]}</Chip>
              {inquiry.status === 'new' && <span className="text-[10px] font-extrabold text-[#126373] uppercase tracking-wider">New</span>}
              <span className="text-[11px] text-slate-400">{timeAgo(inquiry.created_at)}</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">
              {inquiry.subject || INQUIRY_KIND_LABELS[inquiry.kind]}
              {inquiry.quantity > 1 && <span className="text-slate-500 font-semibold"> × {inquiry.quantity}</span>}
            </h4>
            <p className="text-xs text-slate-600">
              {inquiry.name || (inquiry.kind === 'product' ? 'Visitor continued on WhatsApp' : 'No name given')}
              {inquiry.organization && (
                <span className="inline-flex items-center gap-1 ml-2 text-slate-500">
                  <Building2 className="w-3 h-3" /> {inquiry.organization}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`w-2 h-2 rounded-full ${STATUS_DOTS[inquiry.status]}`} />
            <select
              value={inquiry.status}
              onChange={(e) => changeStatus(e.target.value as InquiryStatus)}
              className="p-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 outline-none cursor-pointer"
            >
              {(Object.keys(STATUS_LABELS) as InquiryStatus[]).map((s) => (
                <option key={s} value={s}>{statusLabel(inquiry.kind, s)}</option>
              ))}
            </select>
          </div>
        </div>

        {inquiry.message && (
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-3 whitespace-pre-line">{inquiry.message}</p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
          {inquiry.phone && (
            <span className="flex items-center gap-2">
              <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1 hover:text-[#126373]"><Phone className="w-3.5 h-3.5" /> {inquiry.phone}</a>
              <a href={`https://wa.me/${toWhatsAppNumber(inquiry.phone)}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600" title="WhatsApp">
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
            </span>
          )}
          {inquiry.email && (
            <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1 hover:text-[#126373]"><Mail className="w-3.5 h-3.5" /> {inquiry.email}</a>
          )}
          {inquiry.preferred_date && (
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" />
              {inquiry.kind === 'workshop' ? inquiry.preferred_date : `Preferred: ${/^\d{4}-\d{2}-\d{2}$/.test(inquiry.preferred_date) ? formatDate(inquiry.preferred_date) : inquiry.preferred_date}`}
            </span>
          )}
          {inquiry.meeting_format && <span>{inquiry.meeting_format}</span>}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Private notes (e.g. Called on Monday, sending 3 CVs)"
            className={inputClass}
          />
          {notes !== inquiry.admin_notes && (
            <button onClick={saveNotes} disabled={savingNotes} className={secondaryButton}>
              <Save className="w-3.5 h-3.5" /> {savingNotes ? 'Saving...' : 'Save'}
            </button>
          )}
        </div>
      </div>

      <div className="px-4 sm:px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
        {canSchedule && (
          <button onClick={() => onSchedule(inquiry)} className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg border border-slate-200 flex items-center gap-1 cursor-pointer">
            <CalendarPlus className="w-3.5 h-3.5" /> Schedule
          </button>
        )}
        <button
          onClick={async () => {
            if (!window.confirm('Delete this inquiry? This cannot be undone.')) return;
            const { error } = await onDelete(inquiry.id);
            if (error) toast.error(error, 'Delete Failed');
          }}
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export const InquiriesPanel: React.FC<InquiriesPanelProps> = ({ inquiries, loading, error, onRefresh, onUpdate, onDelete, onSchedule }) => {
  const [kindFilter, setKindFilter] = useState<KindFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('open');
  const [search, setSearch] = useState('');

  const kindCounts = useMemo(() => {
    const counts: Record<string, number> = { all: inquiries.length };
    inquiries.forEach((i) => { counts[i.kind] = (counts[i.kind] ?? 0) + 1; });
    return counts;
  }, [inquiries]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inquiries.filter((i) => {
      if (kindFilter !== 'all' && i.kind !== kindFilter) return false;
      if (statusFilter === 'open' && (i.status === 'completed' || i.status === 'closed')) return false;
      if (statusFilter !== 'open' && statusFilter !== 'all' && i.status !== statusFilter) return false;
      if (!q) return true;
      return [i.name, i.email, i.phone, i.organization, i.subject, i.message].some((f) => f.toLowerCase().includes(q));
    });
  }, [inquiries, kindFilter, statusFilter, search]);

  const kindTabs: { key: KindFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'consultation', label: 'Consultations' },
    { key: 'teacher_request', label: 'Teacher Requests' },
    { key: 'workshop', label: 'Workshop Sign-ups' },
    { key: 'contact', label: 'Messages' },
    { key: 'product', label: 'Store' }
  ];

  return (
    <div className="space-y-5">
      <PanelHeader
        icon={Inbox}
        title="Inquiries Inbox"
        description="Everything submitted on the website: consultation bookings, teacher requests, workshop sign-ups, messages and store enquiries."
        actions={
          <button onClick={onRefresh} className={secondaryButton}>
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        }
      />

      <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {kindTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setKindFilter(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                kindFilter === tab.key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 rounded-full text-[10px] ${kindFilter === tab.key ? 'bg-white/20' : 'bg-white'}`}>{kindCounts[tab.key] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, school, phone, message..." className={`${inputClass} pl-9`} />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)} className={inputClass}>
            <option value="open">Open (not completed)</option>
            <option value="all">All statuses</option>
            {(Object.keys(STATUS_LABELS) as InquiryStatus[]).map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>
      </div>

      <ErrorBanner message={error} />

      {loading && inquiries.length === 0 ? (
        <LoadingState label="Loading inquiries..." />
      ) : visible.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={inquiries.length === 0 ? 'Your inbox is empty' : 'Nothing matches these filters'}
          description={inquiries.length === 0 ? 'When someone books a consultation, requests a teacher, signs up for a workshop or sends a message, it appears here.' : 'Try "All statuses" or clear the search.'}
        />
      ) : (
        <div className="space-y-3">
          {visible.map((inquiry) => (
            <InquiryCard key={inquiry.id} inquiry={inquiry} onUpdate={onUpdate} onDelete={onDelete} onSchedule={onSchedule} />
          ))}
        </div>
      )}
    </div>
  );
};
