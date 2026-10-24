import React, { useMemo } from 'react';
import {
  Users,
  UserCheck,
  ShieldCheck,
  Inbox,
  CalendarDays,
  Ticket,
  BookOpen,
  Eye,
  Activity,
  ArrowRight,
  Clock
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import type { TeacherProfileRow } from '../../context/TeacherProfileContext';
import type { InquiryRow } from '../../services/inquiryService';
import type { ActivityRow, AppointmentRow } from '../../hooks/useAdminData';
import type { Workshop, LearningProduct } from '../../types';
import { StatCard, timeAgo, Chip } from './adminUi';
import { describeActivity } from './ActivityStreamPanel';
import { INQUIRY_KIND_LABELS } from './InquiriesPanel';

export type AdminTab =
  | 'overview'
  | 'activity'
  | 'teachers'
  | 'approvals'
  | 'inquiries'
  | 'calendar'
  | 'workshops'
  | 'store'
  | 'broadcasts'
  | 'profile';

interface AdminOverviewPanelProps {
  teachers: TeacherProfileRow[];
  inquiries: InquiryRow[];
  appointments: AppointmentRow[];
  activity: ActivityRow[];
  workshops: Workshop[];
  products: LearningProduct[];
  profileViews: number | null;
  onOpen: (tab: AdminTab) => void;
}

const LEVEL_GROUPS: { label: string; pattern: RegExp }[] = [
  { label: 'Pre-school', pattern: /pre-?school|early|eyfs|nursery|kindergarten|\bkg\b|creche/i },
  { label: 'Primary', pattern: /primary/i },
  { label: 'JHS', pattern: /jhs|junior high/i },
  { label: 'Special Needs', pattern: /special|\bsen\b/i }
];

export const AdminOverviewPanel: React.FC<AdminOverviewPanelProps> = ({
  teachers,
  inquiries,
  appointments,
  activity,
  workshops,
  products,
  profileViews,
  onOpen
}) => {
  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return {
      total: teachers.length,
      verified: teachers.filter((t) => t.verification_status === 'approved').length,
      pending: teachers.filter((t) => t.verification_status === 'pending').length,
      availableNow: teachers.filter((t) => t.verification_status === 'approved' && t.availability === 'Immediate').length,
      newThisWeek: teachers.filter((t) => t.created_at && new Date(t.created_at).getTime() > weekAgo).length,
      openInquiries: inquiries.filter((i) => i.status === 'new' || i.status === 'in_progress').length,
      newInquiries: inquiries.filter((i) => i.status === 'new').length,
      upcoming: appointments.filter((a) => a.status === 'confirmed' && a.appointment_date >= today).length,
      workshopSignups: inquiries.filter((i) => i.kind === 'workshop').reduce((sum, i) => sum + i.quantity, 0),
      books: products.filter((p) => p.section === 'books').length
    };
  }, [teachers, inquiries, appointments, products]);

  // Registrations per month for the last 6 months
  const registrations = useMemo(() => {
    const months: { key: string; month: string; teachers: number }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        month: d.toLocaleDateString('en-GB', { month: 'short' }),
        teachers: 0
      });
    }
    teachers.forEach((t) => {
      if (!t.created_at) return;
      const d = new Date(t.created_at);
      const bucket = months.find((m) => m.key === `${d.getFullYear()}-${d.getMonth()}`);
      if (bucket) bucket.teachers += 1;
    });
    return months;
  }, [teachers]);

  const levels = useMemo(() => {
    const counts = LEVEL_GROUPS.map((g) => ({ label: g.label, count: 0 }));
    let other = 0;
    teachers.forEach((t) => {
      const idx = LEVEL_GROUPS.findIndex((g) => g.pattern.test(t.teaching_level));
      if (idx >= 0) counts[idx].count += 1;
      else other += 1;
    });
    if (other > 0) counts.push({ label: 'Not specified', count: other });
    return counts;
  }, [teachers]);
  const maxLevel = Math.max(1, ...levels.map((l) => l.count));

  return (
    <div className="space-y-6">
      {/* Teacher KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Registered Teachers" value={stats.total} hint={`${stats.newThisWeek} joined this week`} icon={Users} onClick={() => onOpen('teachers')} />
        <StatCard label="Verified" value={stats.verified} hint="Visible on Find a Teacher" icon={ShieldCheck} onClick={() => onOpen('teachers')} />
        <StatCard label="Pending Review" value={stats.pending} hint="Waiting for your approval" icon={UserCheck} onClick={() => onOpen('approvals')} />
        <StatCard label="Available Now" value={stats.availableNow} hint="Verified & ready to place" icon={Activity} onClick={() => onOpen('teachers')} />
      </div>

      {/* Operations KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Open Inquiries" value={stats.openInquiries} hint={`${stats.newInquiries} new, not yet handled`} icon={Inbox} onClick={() => onOpen('inquiries')} />
        <StatCard label="Upcoming Sessions" value={stats.upcoming} hint="Confirmed in your calendar" icon={CalendarDays} onClick={() => onOpen('calendar')} />
        <StatCard label="Workshop Sign-ups" value={stats.workshopSignups} hint={`Across ${workshops.length} workshop${workshops.length === 1 ? '' : 's'}`} icon={Ticket} onClick={() => onOpen('workshops')} />
        <StatCard label="Profile Views" value={profileViews ?? '—'} hint={`${stats.books} books in the store`} icon={Eye} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-sm">Teacher Registrations</h3>
            <p className="text-xs text-slate-500">New sign-ups over the last 6 months</p>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrations}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} tickLine={false} axisLine={false} width={28} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="teachers" fill="#126373" radius={[6, 6, 0, 0]} name="Teachers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-sm">Teachers by Level</h3>
            <p className="text-xs text-slate-500">Based on the teaching level each teacher entered</p>
          </div>
          {teachers.length === 0 ? (
            <p className="text-xs text-slate-400 py-10 text-center">No teachers have registered yet.</p>
          ) : (
            <div className="space-y-3 pt-1">
              {levels.map((level) => (
                <div key={level.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{level.label}</span>
                    <span className="font-bold text-slate-900">{level.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#126373]" style={{ width: `${(level.count / maxLevel) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent activity & inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-slate-900 text-sm">Recent Teacher Activity</h3>
            <button onClick={() => onOpen('activity')} className="text-xs font-bold text-[#126373] hover:underline flex items-center gap-1 cursor-pointer">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          {activity.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">Activity appears here as teachers register and update their status.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {activity.slice(0, 6).map((a) => (
                <li key={a.id} className="py-2.5 flex items-start justify-between gap-3">
                  <p className="text-xs text-slate-700">
                    <span className="font-bold text-slate-900">{a.teacher_name || 'A teacher'}</span> {describeActivity(a)}
                  </p>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {timeAgo(a.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-slate-900 text-sm">Latest Inquiries</h3>
            <button onClick={() => onOpen('inquiries')} className="text-xs font-bold text-[#126373] hover:underline flex items-center gap-1 cursor-pointer">
              Open inbox <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          {inquiries.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">Bookings, workshop sign-ups and messages from the website appear here.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {inquiries.slice(0, 6).map((i) => (
                <li key={i.id} className="py-2.5 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{i.name || i.organization || 'Website visitor'}</p>
                    <p className="text-[11px] text-slate-500 truncate">{i.subject}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Chip tone={i.status === 'new' ? 'brand' : 'neutral'}>{INQUIRY_KIND_LABELS[i.kind]}</Chip>
                    <span className="text-[10px] text-slate-400">{timeAgo(i.created_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {stats.books === 0 && (
        <button
          onClick={() => onOpen('store')}
          className="w-full bg-white p-4 rounded-2xl border border-dashed border-slate-300 hover:border-[#126373]/40 text-left flex items-center gap-3 cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-[#126373]" />
          <span className="text-xs text-slate-600">
            <span className="font-bold text-slate-900">No books in the store yet.</span> Add your first books from Learning Essentials.
          </span>
        </button>
      )}
    </div>
  );
};
