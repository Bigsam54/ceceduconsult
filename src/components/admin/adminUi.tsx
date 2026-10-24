import React from 'react';
import { Loader2 } from 'lucide-react';

// Shared building blocks for the admin dashboard. The palette is deliberately
// calm: slate neutrals, CEC teal (#126373) as the one accent, and status shown
// as a small coloured dot rather than loud coloured blocks.

export const AVAILABILITY_META: Record<string, { label: string; dot: string }> = {
  'Immediate': { label: 'Available now', dot: 'bg-emerald-500' },
  'Next Academic Term': { label: 'Next term', dot: 'bg-sky-500' },
  'Not Available': { label: 'Employed / placed', dot: 'bg-slate-400' },
  '2 Weeks Notice': { label: '2 weeks notice', dot: 'bg-amber-500' }
};

export const availabilityLabel = (value: string) => AVAILABILITY_META[value]?.label ?? (value || '—');

export const VERIFICATION_META: Record<string, { label: string; dot: string }> = {
  pending: { label: 'Pending review', dot: 'bg-amber-500' },
  approved: { label: 'Verified', dot: 'bg-emerald-500' },
  rejected: { label: 'Rejected', dot: 'bg-rose-500' }
};

export const StatusDot: React.FC<{ dot: string; label: string; className?: string }> = ({ dot, label, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 ${className}`}>
    <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
    {label}
  </span>
);

export const Chip: React.FC<{ children: React.ReactNode; tone?: 'neutral' | 'brand' }> = ({ children, tone = 'neutral' }) => (
  <span
    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
      tone === 'brand' ? 'bg-[#126373]/10 text-[#126373]' : 'bg-slate-100 text-slate-600'
    }`}
  >
    {children}
  </span>
);

export const PanelHeader: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  actions?: React.ReactNode;
}> = ({ icon: Icon, title, description, actions }) => (
  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#126373]/10 text-[#126373] flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg">{title}</h3>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
  </div>
);

export const StatCard: React.FC<{
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon: React.ElementType;
  onClick?: () => void;
}> = ({ label, value, hint, icon: Icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={!onClick}
    className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 text-left space-y-1.5 enabled:hover:border-[#126373]/40 enabled:hover:shadow-sm transition-all enabled:cursor-pointer disabled:cursor-default"
  >
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <Icon className="w-4 h-4 text-[#126373]" />
    </div>
    <div className="text-2xl font-extrabold text-slate-900">{value}</div>
    {hint && <p className="text-[11px] text-slate-500 font-medium">{hint}</p>}
  </button>
);

export const EmptyState: React.FC<{ title: string; description: string; icon?: React.ElementType }> = ({ title, description, icon: Icon }) => (
  <div className="bg-white p-10 rounded-2xl border border-dashed border-slate-300 text-center space-y-1.5">
    {Icon && <Icon className="w-8 h-8 text-slate-300 mx-auto" />}
    <p className="text-sm font-bold text-slate-700">{title}</p>
    <p className="text-xs text-slate-500 max-w-md mx-auto">{description}</p>
  </div>
);

export const LoadingState: React.FC<{ label?: string }> = ({ label = 'Loading...' }) => (
  <div className="bg-white p-10 rounded-2xl border border-slate-200 flex items-center justify-center gap-2 text-sm text-slate-500 font-semibold">
    <Loader2 className="w-5 h-5 animate-spin text-[#126373]" /> {label}
  </div>
);

export const ErrorBanner: React.FC<{ message: string | null }> = ({ message }) =>
  message ? (
    <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl p-4">
      {message}. If this is a new feature, make sure the latest file in supabase/migrations has been run.
    </div>
  ) : null;

export const primaryButton =
  'px-4 py-2.5 bg-[#126373] hover:bg-[#0e4f5c] disabled:opacity-60 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors';
export const secondaryButton =
  'px-4 py-2.5 bg-white hover:bg-slate-50 disabled:opacity-60 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors';
export const inputClass =
  'w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:ring-2 focus:ring-[#126373]/30 focus:border-[#126373]';

export const formatDate = (value?: string | null) =>
  value ? new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

export const timeAgo = (value: string) => {
  const seconds = Math.max(0, (Date.now() - new Date(value).getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  return formatDate(value);
};

export const initialsOf = (name: string) =>
  (name || '?')
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

export const Avatar: React.FC<{ name: string; url?: string; size?: string }> = ({ name, url, size = 'w-10 h-10' }) =>
  url ? (
    <img src={url} alt={name} className={`${size} rounded-xl object-cover border border-slate-200 shrink-0`} />
  ) : (
    <div className={`${size} rounded-xl bg-[#126373] text-white flex items-center justify-center font-bold text-xs shrink-0`}>
      {initialsOf(name)}
    </div>
  );

// Ghana numbers are often typed as 0XX...; WhatsApp needs the 233 country code
export const toWhatsAppNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  return digits.startsWith('0') ? `233${digits.slice(1)}` : digits;
};
