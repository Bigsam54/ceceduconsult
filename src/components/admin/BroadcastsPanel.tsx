import React, { useState } from 'react';
import { Send, Trash2, Megaphone } from 'lucide-react';
import type { BroadcastRow } from '../../hooks/useAdminData';
import { useToast } from '../../context/ToastContext';
import { PanelHeader, EmptyState, LoadingState, ErrorBanner, inputClass, primaryButton, timeAgo } from './adminUi';

interface BroadcastsPanelProps {
  broadcasts: BroadcastRow[];
  loading: boolean;
  error: string | null;
  teacherCount: number;
  onSend: (title: string, body: string) => Promise<{ error: string | null }>;
  onDelete: (id: string) => Promise<{ error: string | null }>;
}

export const BroadcastsPanel: React.FC<BroadcastsPanelProps> = ({ broadcasts, loading, error, teacherCount, onSend, onDelete }) => {
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error('Please add a subject and a message.', 'Missing Details');
      return;
    }
    setSending(true);
    const { error: sendError } = await onSend(title.trim(), body.trim());
    setSending(false);
    if (sendError) {
      toast.error(sendError, 'Could Not Send');
      return;
    }
    toast.success('Announcement published to every teacher dashboard.', 'Broadcast Sent');
    setTitle('');
    setBody('');
  };

  return (
    <div className="space-y-5">
      <PanelHeader
        icon={Send}
        title="Broadcasts & Announcements"
        description="Messages appear on every teacher's dashboard under Updates from CEC."
      />

      <form onSubmit={send} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#126373]" /> New announcement
          </p>
          <span className="text-[11px] text-slate-500">Goes to {teacherCount} registered teacher{teacherCount === 1 ? '' : 's'}</span>
        </div>
        <div>
          <label className="block font-bold text-slate-700 mb-1">Subject</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. New term placements are open" className={inputClass} />
        </div>
        <div>
          <label className="block font-bold text-slate-700 mb-1">Message</label>
          <textarea rows={4} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your announcement..." className={inputClass} />
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={sending} className={primaryButton}>
            <Send className="w-3.5 h-3.5" /> {sending ? 'Publishing...' : 'Publish to Teachers'}
          </button>
        </div>
      </form>

      <ErrorBanner message={error} />

      {loading && broadcasts.length === 0 ? (
        <LoadingState label="Loading announcements..." />
      ) : broadcasts.length === 0 ? (
        <EmptyState icon={Megaphone} title="No announcements yet" description="Your published announcements will be listed here." />
      ) : (
        <div className="space-y-3">
          {broadcasts.map((b) => (
            <div key={b.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-slate-900 text-sm">{b.title}</h4>
                  <span className="text-[11px] text-slate-400">{timeAgo(b.created_at)}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{b.body}</p>
              </div>
              <button
                onClick={async () => {
                  if (!window.confirm('Remove this announcement from teacher dashboards?')) return;
                  const { error: deleteError } = await onDelete(b.id);
                  if (deleteError) toast.error(deleteError, 'Delete Failed');
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer shrink-0"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
