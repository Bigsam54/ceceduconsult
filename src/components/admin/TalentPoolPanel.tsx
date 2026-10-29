import React, { useMemo, useState } from 'react';
import { Users, Search, Eye, RefreshCw, Phone } from 'lucide-react';
import type { TeacherProfileRow } from '../../context/TeacherProfileContext';
import { useToast } from '../../context/ToastContext';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import {
  PanelHeader,
  EmptyState,
  LoadingState,
  ErrorBanner,
  StatusDot,
  Avatar,
  VERIFICATION_META,
  AVAILABILITY_META,
  inputClass,
  secondaryButton,
  toWhatsAppNumber
} from './adminUi';

interface TalentPoolPanelProps {
  teachers: TeacherProfileRow[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onSetAvailability: (userId: string, availability: string) => Promise<{ error: string | null }>;
  onViewDetails: (teacher: TeacherProfileRow) => void;
}

const AVAILABILITY_OPTIONS = ['Immediate', 'Next Academic Term', 'Not Available'];

export const TalentPoolPanel: React.FC<TalentPoolPanelProps> = ({ teachers, loading, error, onRefresh, onSetAvailability, onViewDetails }) => {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [savingId, setSavingId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return teachers.filter((t) => {
      if (availabilityFilter !== 'all' && t.availability !== availabilityFilter) return false;
      if (verificationFilter !== 'all' && t.verification_status !== verificationFilter) return false;
      if (!q) return true;
      return [t.full_name, t.email, t.phone, t.location, t.teaching_level, t.qualification].some((f) => (f ?? '').toLowerCase().includes(q));
    });
  }, [teachers, search, availabilityFilter, verificationFilter]);

  const changeAvailability = async (teacher: TeacherProfileRow, value: string) => {
    setSavingId(teacher.user_id);
    const { error: saveError } = await onSetAvailability(teacher.user_id, value);
    setSavingId(null);
    if (saveError) toast.error(saveError, 'Update Failed');
    else toast.success(`${teacher.full_name || 'Teacher'} is now marked "${AVAILABILITY_META[value]?.label ?? value}".`, 'Availability Updated');
  };

  return (
    <div className="space-y-5">
      <PanelHeader
        icon={Users}
        title="Teachers"
        description="Every registered teacher. Update availability here; changes appear in Live Movements and on Find a Teacher."
        actions={
          <button onClick={onRefresh} className={secondaryButton}>
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        }
      />

      <div className="bg-white p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, location..." className={`${inputClass} pl-9`} />
        </div>
        <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} className={inputClass}>
          <option value="all">All availability</option>
          {AVAILABILITY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{AVAILABILITY_META[opt].label}</option>
          ))}
        </select>
        <select value={verificationFilter} onChange={(e) => setVerificationFilter(e.target.value)} className={inputClass}>
          <option value="all">All verification</option>
          <option value="approved">Verified</option>
          <option value="pending">Pending review</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <ErrorBanner message={error} />

      {loading && teachers.length === 0 ? (
        <LoadingState label="Loading teachers..." />
      ) : visible.length === 0 ? (
        <EmptyState
          icon={Users}
          title={teachers.length === 0 ? 'No teachers have registered yet' : 'No teachers match these filters'}
          description={teachers.length === 0 ? 'Teachers who sign up through "Join the Network" will appear here.' : 'Try clearing the search or filters.'}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Teacher</th>
                  <th className="py-3 px-4">Level & Qualification</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Verification</th>
                  <th className="py-3 px-4">Availability</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((t) => {
                  const verification = VERIFICATION_META[t.verification_status] ?? VERIFICATION_META.pending;
                  return (
                    <tr key={t.user_id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={t.full_name || t.email} url={t.avatar_url} />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 truncate max-w-[180px]">{t.full_name || 'Name not provided'}</div>
                            <div className="text-[11px] text-slate-500 truncate max-w-[180px]">{t.location || '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        <div className="font-semibold">{t.teaching_level || '—'}</div>
                        <div className="text-[11px] text-slate-500">{t.qualification || '—'} · {t.experience_years ?? 0} yrs</div>
                      </td>
                      <td className="py-3 px-4">
                        {t.phone ? (
                          <div className="flex items-center gap-2 text-slate-700">
                            <a href={`tel:${t.phone}`} className="flex items-center gap-1 hover:text-[#126373]"><Phone className="w-3 h-3" /> {t.phone}</a>
                            <a href={`https://wa.me/${toWhatsAppNumber(t.phone)}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600" title="WhatsApp">
                              <WhatsAppIcon className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        ) : (
                          <span className="text-slate-400">{t.email}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <StatusDot dot={verification.dot} label={verification.label} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${AVAILABILITY_META[t.availability]?.dot ?? 'bg-slate-300'}`} />
                          <select
                            value={AVAILABILITY_OPTIONS.includes(t.availability) ? t.availability : 'Immediate'}
                            onChange={(e) => changeAvailability(t, e.target.value)}
                            disabled={savingId === t.user_id}
                            className="p-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 outline-none cursor-pointer disabled:opacity-50"
                          >
                            {AVAILABILITY_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>{AVAILABILITY_META[opt].label}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onViewDetails(t)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-[#126373] text-white font-bold text-xs rounded-lg inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
