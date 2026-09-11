import React, { useEffect, useState } from 'react';
import { X, Save } from 'lucide-react';
import { Workshop } from '../../types';
import { WorkshopInput } from '../../hooks/useWorkshops';

interface WorkshopFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (input: WorkshopInput) => Promise<{ error: string | null }>;
  editing: Workshop | null;
}

const blank: WorkshopInput = {
  title: '',
  category: 'Classroom Management',
  date: '',
  time: '',
  venue: '',
  price: '',
  availableSeats: 20,
  totalSeats: 20,
  description: '',
  image: ''
};

export const WorkshopFormModal: React.FC<WorkshopFormModalProps> = ({ isOpen, onClose, onSave, editing }) => {
  const [form, setForm] = useState<WorkshopInput>(blank);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(editing ? { ...editing } : blank);
  }, [editing, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await onSave(form);
    setSaving(false);
    if (!error) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overscroll-contain">
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs" />
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[90dvh] overflow-hidden border border-slate-200/80 text-left"
      >
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <h3 className="font-bold text-sm">{editing ? 'Edit Workshop' : 'Create Workshop'}</h3>
          <button type="button" onClick={onClose} className="p-1 hover:bg-slate-800 rounded-full cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Title *</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Workshop['category'] })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]">
                <option value="Classroom Management">Classroom Management</option>
                <option value="Early Literacy & Phonics">Early Literacy & Phonics</option>
                <option value="Early STEM & Math">Early STEM & Math</option>
                <option value="Early Childhood Leadership">Early Childhood Leadership</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Price *</label>
              <input required placeholder="e.g. GH₵ 600" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Date *</label>
              <input required placeholder="e.g. Saturday, August 15, 2026" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Time *</label>
              <input required placeholder="e.g. 10:00 AM - 2:00 PM GMT" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Venue *</label>
            <input required value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Seats *</label>
              <input required type="number" min={0} value={form.totalSeats}
                onChange={(e) => setForm({ ...form, totalSeats: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Seats Still Available *</label>
              <input required type="number" min={0} value={form.availableSeats}
                onChange={(e) => setForm({ ...form, availableSeats: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Cover Image URL *</label>
            <input required placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description *</label>
            <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-end gap-2 shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2.5 text-slate-600 font-bold rounded-xl hover:bg-slate-100 cursor-pointer">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="px-5 py-2.5 bg-[#2ac0db] hover:bg-[#22a8c0] disabled:opacity-60 text-slate-950 font-bold rounded-xl flex items-center gap-2 cursor-pointer">
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Workshop'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
