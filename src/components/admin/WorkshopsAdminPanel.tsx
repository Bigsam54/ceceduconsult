import React, { useState } from 'react';
import { Ticket, Plus, Edit, Trash2, Clock, MapPin, Users, ChevronDown, Phone, Mail } from 'lucide-react';
import type { Workshop } from '../../types';
import type { InquiryRow } from '../../services/inquiryService';
import { useToast } from '../../context/ToastContext';
import { PanelHeader, EmptyState, Chip, primaryButton, timeAgo } from './adminUi';

interface WorkshopsAdminPanelProps {
  workshops: Workshop[];
  registrations: InquiryRow[];
  onCreate: () => void;
  onEdit: (workshop: Workshop) => void;
  onDelete: (id: string) => Promise<{ error: string | null }>;
}

export const WorkshopsAdminPanel: React.FC<WorkshopsAdminPanelProps> = ({ workshops, registrations, onCreate, onEdit, onDelete }) => {
  const toast = useToast();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <PanelHeader
        icon={Ticket}
        title="Workshops & CPD"
        description="Workshops shown on the public Workshops page. Sign-ups reserve seats automatically."
        actions={
          <button onClick={onCreate} className={primaryButton}>
            <Plus className="w-3.5 h-3.5" /> Create Workshop
          </button>
        }
      />

      {workshops.length === 0 ? (
        <EmptyState icon={Ticket} title="No workshops yet" description='Click "Create Workshop" to publish your first one.' />
      ) : (
        <div className="space-y-3">
          {workshops.map((ws) => {
            const signups = registrations.filter((r) => r.reference_id === ws.id);
            const seatsBooked = signups.reduce((sum, r) => sum + r.quantity, 0);
            const isOpen = openId === ws.id;
            return (
              <div key={ws.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 min-w-0">
                    <Chip tone="brand">{ws.category}</Chip>
                    <h4 className="font-bold text-slate-900 text-sm">{ws.title}</h4>
                    <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {ws.date} · {ws.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {ws.venue}</span>
                    </div>
                    <p className="text-xs text-slate-700">
                      <span className="font-bold">{ws.availableSeats}</span> of {ws.totalSeats} seats left · <span className="font-bold">{seatsBooked}</span> booked online
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-extrabold text-slate-900 mr-1">{ws.price}</span>
                    <button onClick={() => onEdit(ws)} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer" title="Edit">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={async () => {
                        if (!window.confirm(`Delete "${ws.title}"? This can't be undone.`)) return;
                        const { error } = await onDelete(ws.id);
                        if (error) toast.error(error, 'Delete Failed');
                        else toast.success('Workshop removed.', 'Deleted');
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setOpenId(isOpen ? null : ws.id)}
                  className="w-full px-4 sm:px-5 py-2.5 bg-slate-50 border-t border-slate-100 text-xs font-bold text-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-100"
                >
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#126373]" /> {signups.length} registration{signups.length === 1 ? '' : 's'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="divide-y divide-slate-100 border-t border-slate-100">
                    {signups.length === 0 ? (
                      <p className="p-4 text-xs text-slate-400 text-center">No one has registered online yet.</p>
                    ) : (
                      signups.map((r) => (
                        <div key={r.id} className="px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                          <div>
                            <p className="font-bold text-slate-900">{r.name || 'No name'} {r.quantity > 1 && <span className="text-slate-500 font-semibold">· {r.quantity} seats</span>}</p>
                            {r.organization && <p className="text-slate-500">{r.organization}</p>}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-slate-600">
                            {r.phone && <a href={`tel:${r.phone}`} className="flex items-center gap-1 hover:text-[#126373]"><Phone className="w-3 h-3" /> {r.phone}</a>}
                            {r.email && <a href={`mailto:${r.email}`} className="flex items-center gap-1 hover:text-[#126373]"><Mail className="w-3 h-3" /> {r.email}</a>}
                            <span className="text-slate-400">{timeAgo(r.created_at)}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
