import React, { useEffect, useMemo, useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  Search,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  BookOpen,
  Briefcase,
  CalendarDays,
  IdCard,
  AlertTriangle,
  FileText,
  ExternalLink,
  X,
  Maximize2,
  RotateCcw,
  Loader2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import type { TeacherProfileRow } from '../../context/TeacherProfileContext';
import type { VerificationStatus } from '../../hooks/useTeacherApplications';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';

interface TeacherApplicationsPanelProps {
  applications: TeacherProfileRow[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onSetStatus: (userId: string, status: VerificationStatus) => Promise<{ error: string | null }>;
  /** Opens the queue focused on one teacher (e.g. from the Talent Pool) */
  focusSearch?: string;
}

type StatusFilter = VerificationStatus | 'all';

const CARD_ASPECT = 85.6 / 54;

const STATUS_STYLES: Record<VerificationStatus, { label: string; className: string }> = {
  pending: { label: 'Pending Review', className: 'bg-amber-50 text-amber-800 border-amber-200' },
  approved: { label: 'Verified', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  rejected: { label: 'Rejected', className: 'bg-rose-50 text-rose-700 border-rose-200' }
};

const isPdfUrl = (url: string) => /\.pdf($|\?)/i.test(url);

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

const getInitials = (name: string) =>
  (name || '?')
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

// Ghana numbers are often typed as 0XX...; WhatsApp needs the 233 country code
const toWhatsAppNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) return `233${digits.slice(1)}`;
  return digits;
};

interface CardViewerProps {
  teacher: TeacherProfileRow;
  initialSide: 'front' | 'back';
  onClose: () => void;
}

const GhanaCardViewer: React.FC<CardViewerProps> = ({ teacher, initialSide, onClose }) => {
  const [side, setSide] = useState<'front' | 'back'>(initialSide);
  const url = side === 'front' ? teacher.ghana_card_front_url : teacher.ghana_card_back_url;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setSide('back');
      if (e.key === 'ArrowLeft') setSide('front');
    };
    window.addEventListener('keydown', handleKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/90 backdrop-blur-sm flex flex-col animate-in fade-in duration-150" onClick={onClose}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2.5 min-w-0">
          <IdCard className="w-5 h-5 text-[#2ac0db] shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-heading font-bold truncate">{teacher.full_name || teacher.email}</p>
            <p className="text-[11px] text-slate-400">Ghana Card · {side === 'front' ? 'Front' : 'Back'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open Original</span>
            </a>
          )}
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 cursor-pointer" aria-label="Close viewer">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0">
        <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
          {!url ? (
            <div className="rounded-3xl border-2 border-dashed border-white/20 text-slate-300 text-sm font-semibold flex items-center justify-center" style={{ aspectRatio: CARD_ASPECT }}>
              This side has not been uploaded.
            </div>
          ) : isPdfUrl(url) ? (
            <div className="rounded-3xl bg-slate-900 border border-white/10 text-white flex flex-col items-center justify-center gap-3" style={{ aspectRatio: CARD_ASPECT }}>
              <FileText className="w-12 h-12 text-[#2ac0db]" />
              <p className="text-sm font-semibold">This side was uploaded as a PDF.</p>
              <a href={url} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 bg-[#2ac0db] text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" /> Open PDF
              </a>
            </div>
          ) : (
            <img src={url} alt={`Ghana Card ${side}`} className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl bg-slate-900" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pb-6" onClick={(e) => e.stopPropagation()}>
        {(['front', 'back'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              side === s ? 'bg-[#2ac0db] text-slate-950' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {s === 'front' ? 'Front' : 'Back'}
          </button>
        ))}
      </div>
    </div>
  );
};

export const TeacherApplicationsPanel: React.FC<TeacherApplicationsPanelProps> = ({
  applications,
  loading,
  error,
  onRefresh,
  onSetStatus,
  focusSearch
}) => {
  const toast = useToast();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(focusSearch ? 'all' : 'pending');
  const [search, setSearch] = useState(focusSearch ?? '');

  useEffect(() => {
    if (focusSearch) {
      setSearch(focusSearch);
      setStatusFilter('all');
    }
  }, [focusSearch]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [viewer, setViewer] = useState<{ teacher: TeacherProfileRow; side: 'front' | 'back' } | null>(null);

  const counts = useMemo(
    () => ({
      all: applications.length,
      pending: applications.filter((a) => a.verification_status === 'pending').length,
      approved: applications.filter((a) => a.verification_status === 'approved').length,
      rejected: applications.filter((a) => a.verification_status === 'rejected').length
    }),
    [applications]
  );

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return applications.filter((a) => {
      if (statusFilter !== 'all' && a.verification_status !== statusFilter) return false;
      if (!q) return true;
      return [a.full_name, a.email, a.phone, a.location, a.teaching_level, a.qualification]
        .some((field) => (field ?? '').toLowerCase().includes(q));
    });
  }, [applications, statusFilter, search]);

  const changeStatus = async (teacher: TeacherProfileRow, status: VerificationStatus) => {
    setUpdatingId(teacher.user_id);
    const { error: updateError } = await onSetStatus(teacher.user_id, status);
    setUpdatingId(null);
    const name = teacher.full_name || teacher.email;
    if (updateError) {
      toast.error(updateError, 'Update Failed');
      return;
    }
    if (status === 'approved') toast.success(`${name} is now a CEC Verified teacher.`, 'Teacher Approved');
    else if (status === 'rejected') toast.info(`${name}'s application was marked as rejected.`, 'Application Rejected');
    else toast.info(`${name} was moved back to the review queue.`, 'Moved to Pending');
  };

  const filterTabs: { key: StatusFilter; label: string }[] = [
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Verified' },
    { key: 'rejected', label: 'Rejected' },
    { key: 'all', label: 'All' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#2ac0db]" />
              Teacher Verification Queue
            </h3>
            <p className="text-xs text-slate-500">Review each applicant's details and Ghana Card, then approve or reject their CEC verification.</p>
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="self-start sm:self-auto px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  statusFilter === tab.key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 rounded-full text-[10px] ${statusFilter === tab.key ? 'bg-[#2ac0db] text-slate-950' : 'bg-white text-slate-600'}`}>
                  {counts[tab.key]}
                </span>
              </button>
            ))}
          </div>
          <div className="relative md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, phone, location..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2ac0db]"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl p-4">
          Couldn't load teacher applications: {error}. Make sure supabase/migrations/0003_teacher_identity_uploads.sql has been run.
        </div>
      )}

      {loading && applications.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 flex items-center justify-center gap-2 text-sm text-slate-500 font-semibold">
          <Loader2 className="w-5 h-5 animate-spin text-[#2ac0db]" /> Loading applications...
        </div>
      ) : visible.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border border-dashed border-slate-300 text-center space-y-1">
          <p className="text-sm font-bold text-slate-700">No teachers here yet</p>
          <p className="text-xs text-slate-500">
            {statusFilter === 'pending' ? 'New registrations will appear here for review.' : 'Try a different filter or search.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((teacher) => {
            const status = STATUS_STYLES[teacher.verification_status] ?? STATUS_STYLES.pending;
            const hasCard = Boolean(teacher.ghana_card_front_url && teacher.ghana_card_back_url);
            const isUpdating = updatingId === teacher.user_id;
            const name = teacher.full_name || 'Name not provided';

            return (
              <div key={teacher.user_id} className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">

                  {/* Applicant details */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-start gap-4">
                      {teacher.avatar_url ? (
                        <img src={teacher.avatar_url} alt={name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0" />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2ac0db] to-[#126373] text-white font-heading font-extrabold text-xl flex items-center justify-center shrink-0">
                          {getInitials(teacher.full_name)}
                        </div>
                      )}
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-heading font-bold text-slate-900 text-base">{name}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${status.className}`}>{status.label}</span>
                        </div>
                        {teacher.headline && <p className="text-xs font-bold text-[#fa7b2d]">{teacher.headline}</p>}
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" /> Registered {formatDate(teacher.created_at)}
                          {teacher.verified_at && teacher.verification_status === 'approved' && <> · Verified {formatDate(teacher.verified_at)}</>}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-700">
                      <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 hover:text-[#126373] min-w-0">
                        <Mail className="w-3.5 h-3.5 text-[#126373] shrink-0" /> <span className="truncate">{teacher.email}</span>
                      </a>
                      {teacher.phone ? (
                        <span className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#126373] shrink-0" />
                          <a href={`tel:${teacher.phone}`} className="hover:text-[#126373]">{teacher.phone}</a>
                          <a
                            href={`https://wa.me/${toWhatsAppNumber(teacher.phone)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700"
                            title="Chat on WhatsApp"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5" />
                          </a>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-slate-400"><Phone className="w-3.5 h-3.5 shrink-0" /> No phone on file</span>
                      )}
                      <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#126373] shrink-0" /> {teacher.location || '—'}</span>
                      <span className="flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-[#126373] shrink-0" /> {teacher.experience_years ?? 0} years experience</span>
                      <span className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-[#126373] shrink-0" /> {teacher.teaching_level || '—'}</span>
                      <span className="flex items-center gap-2"><GraduationCap className="w-3.5 h-3.5 text-[#126373] shrink-0" /> {teacher.qualification || '—'}</span>
                    </div>

                    {teacher.bio && (
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-2xl p-3 line-clamp-3">{teacher.bio}</p>
                    )}
                  </div>

                  {/* Ghana Card */}
                  <div className="lg:col-span-5 space-y-2">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <IdCard className="w-3.5 h-3.5 text-[#126373]" /> Ghana Card
                    </p>
                    {hasCard ? (
                      <div className="grid grid-cols-2 gap-2.5">
                        {(['front', 'back'] as const).map((side) => {
                          const url = side === 'front' ? teacher.ghana_card_front_url : teacher.ghana_card_back_url;
                          return (
                            <button
                              key={side}
                              onClick={() => setViewer({ teacher, side })}
                              className="group text-left space-y-1 cursor-pointer"
                            >
                              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200" style={{ aspectRatio: CARD_ASPECT }}>
                                {isPdfUrl(url) ? (
                                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-white">
                                    <FileText className="w-6 h-6 text-[#2ac0db]" />
                                    <span className="text-[10px] font-bold">PDF</span>
                                  </span>
                                ) : (
                                  <img src={url} alt={`Ghana Card ${side}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                )}
                                <span className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                                  <Maximize2 className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </span>
                              </div>
                              <span className="text-[10px] font-semibold text-slate-500 capitalize">{side}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800 font-medium">
                          {teacher.ghana_card_front_url || teacher.ghana_card_back_url
                            ? 'Only one side of the Ghana Card has been uploaded.'
                            : 'No Ghana Card uploaded yet. The teacher can add it from their dashboard.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
                  {isUpdating && <Loader2 className="w-4 h-4 animate-spin text-[#2ac0db] mr-auto" />}
                  {teacher.verification_status !== 'pending' && (
                    <button
                      onClick={() => changeStatus(teacher, 'pending')}
                      disabled={isUpdating}
                      className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 flex items-center gap-1 cursor-pointer disabled:opacity-60"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Back to Pending</span>
                    </button>
                  )}
                  {teacher.verification_status !== 'rejected' && (
                    <button
                      onClick={() => changeStatus(teacher, 'rejected')}
                      disabled={isUpdating}
                      className="px-3.5 py-2 bg-white hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}
                  {teacher.verification_status !== 'approved' && (
                    <button
                      onClick={() => changeStatus(teacher, 'approved')}
                      disabled={isUpdating || !hasCard}
                      title={hasCard ? undefined : 'Both sides of the Ghana Card are needed before approval'}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewer && <GhanaCardViewer teacher={viewer.teacher} initialSide={viewer.side} onClose={() => setViewer(null)} />}
    </div>
  );
};
