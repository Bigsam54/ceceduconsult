import React, { useEffect, useRef, useState } from 'react';
import { X, Save, ImagePlus, Loader2, Trash2, Link2, RefreshCw, Video, Lock } from 'lucide-react';
import { Workshop } from '../../types';
import { WorkshopInput } from '../../hooks/useWorkshops';
import { WORKSHOP_CATEGORIES } from '../../data/workshopTopics';
import { uploadToCloudinary, CLOUDINARY_FOLDERS } from '../../lib/cloudinary';
import { prepareImage } from '../../utils/prepareImage';
import { useToast } from '../../context/ToastContext';

interface WorkshopFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (input: WorkshopInput) => Promise<{ error: string | null }>;
  editing: Workshop | null;
  /** Loads the private meeting link of the workshop being edited */
  loadMeetingLink?: (workshopId: string) => Promise<string>;
}

// Only the title is required; everything else can be filled in when it's known
const blank: WorkshopInput = {
  title: '',
  category: WORKSHOP_CATEGORIES[0],
  date: '',
  time: '',
  venue: '',
  price: 'Free',
  availableSeats: 0,
  totalSeats: 0,
  description: '',
  image: ''
};

const isFreePrice = (price: string) => !price.trim() || /^free$/i.test(price.trim());

// "500" -> "GH₵ 500"; anything already formatted (e.g. "GH₵ 300 per person") is kept
const formatPrice = (amount: string) => {
  const trimmed = amount.trim();
  return /^[\d.,\s]+$/.test(trimmed) ? `GH₵ ${trimmed}` : trimmed;
};
const amountFromPrice = (price: string) => price.replace(/^GH₵\s*/i, '');

const inputClass = 'w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]';

export const WorkshopFormModal: React.FC<WorkshopFormModalProps> = ({ isOpen, onClose, onSave, editing, loadMeetingLink }) => {
  const toast = useToast();
  const [form, setForm] = useState<WorkshopInput>(blank);
  const [priceType, setPriceType] = useState<'free' | 'paid'>('free');
  const [amount, setAmount] = useState('');
  const [limitSeats, setLimitSeats] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const initial = editing ? { ...editing } : blank;
    setForm(initial);
    const free = isFreePrice(initial.price);
    setPriceType(free ? 'free' : 'paid');
    setAmount(free ? '' : amountFromPrice(initial.price));
    setLimitSeats(initial.totalSeats > 0);
    setShowUrlInput(false);
    setMeetingLink('');
    if (editing && isOpen && loadMeetingLink) {
      loadMeetingLink(editing.id).then(setMeetingLink);
    }
  }, [editing, isOpen, loadMeetingLink]);

  if (!isOpen) return null;

  const uploadImage = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file (JPG, PNG or WEBP).', 'Upload Failed');
      return;
    }
    setUploading(true);
    try {
      const blob = await prepareImage(file);
      const url = await uploadToCloudinary(blob, { folder: CLOUDINARY_FOLDERS.workshops, fileName: file.name });
      setForm((prev) => ({ ...prev, image: url }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not upload the image.', 'Upload Failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) {
      toast.info('Please wait for the image to finish uploading.', 'Still Uploading');
      return;
    }
    if (priceType === 'paid' && !amount.trim()) {
      toast.error('Enter the amount, or choose Free.', 'Amount Needed');
      return;
    }
    const totalSeats = limitSeats ? Math.max(0, form.totalSeats) : 0;
    const input: WorkshopInput = {
      ...form,
      title: form.title.trim(),
      price: priceType === 'free' ? 'Free' : formatPrice(amount),
      totalSeats,
      // 0 seats means unlimited registration
      availableSeats: limitSeats ? Math.min(Math.max(0, form.availableSeats), totalSeats) : 0,
      meetingLink
    };
    setSaving(true);
    const { error } = await onSave(input);
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
          <p className="text-[11px] text-slate-500">Only the title is required. Fill in the rest whenever you have the details.</p>

          {/* Flyer / cover image */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-700">Flyer or Cover Image</label>
            {form.image ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img src={form.image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-50" />
                <img src={form.image} alt="Workshop flyer preview" className="relative mx-auto max-h-72 w-auto object-contain" />
                {uploading && (
                  <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center">
                    <Loader2 className="w-7 h-7 animate-spin text-white" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1.5">
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="px-2.5 py-1.5 rounded-lg bg-white/95 text-slate-800 font-bold shadow flex items-center gap-1 cursor-pointer">
                    <RefreshCw className="w-3.5 h-3.5" /> Replace
                  </button>
                  <button type="button" onClick={() => setForm({ ...form, image: '' })} className="p-1.5 rounded-lg bg-white/95 text-rose-600 shadow cursor-pointer" aria-label="Remove image">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  uploadImage(e.dataTransfer.files?.[0]);
                }}
                disabled={uploading}
                className="w-full py-8 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#2ac0db] hover:bg-[#2ac0db]/5 text-slate-500 hover:text-[#126373] flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {uploading ? <Loader2 className="w-6 h-6 animate-spin text-[#2ac0db]" /> : <ImagePlus className="w-6 h-6" />}
                <span className="font-bold">{uploading ? 'Uploading...' : 'Upload flyer or image'}</span>
                <span className="text-[11px] text-slate-400">Click or drag a JPG / PNG here</span>
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => uploadImage(e.target.files?.[0])} />
            {showUrlInput ? (
              <input placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputClass} />
            ) : (
              <button type="button" onClick={() => setShowUrlInput(true)} className="text-[11px] font-semibold text-slate-500 hover:text-[#126373] flex items-center gap-1 cursor-pointer">
                <Link2 className="w-3.5 h-3.5" /> Or paste an image link
              </button>
            )}
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Title *</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
                {/* Keep an older category selectable when editing an existing workshop */}
                {(WORKSHOP_CATEGORIES.includes(form.category) || !form.category ? WORKSHOP_CATEGORIES : [form.category, ...WORKSHOP_CATEGORIES]).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Price</label>
              <select value={priceType} onChange={(e) => setPriceType(e.target.value as 'free' | 'paid')} className={inputClass}>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          {priceType === 'paid' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-500">GH₵</span>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 300"
                  inputMode="decimal"
                  className={`${inputClass} pl-12`}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Date</label>
              <input placeholder="e.g. Saturday, 19 December 2026" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Time</label>
              <input placeholder="e.g. 9:30 AM" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Venue</label>
            <input placeholder="e.g. Hotel Messiah, Airport-Ridge, Takoradi" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} className={inputClass} />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Online meeting link</label>
            <div className="relative">
              <Video className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="url"
                placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                className={`${inputClass} pl-9`}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Private: only shown to people right after they register. Leave empty for in-person workshops.
            </p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" checked={limitSeats} onChange={(e) => setLimitSeats(e.target.checked)} />
              Limit the number of seats
            </label>
            {limitSeats ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Seats</label>
                  <input type="number" min={0} value={form.totalSeats} onChange={(e) => setForm({ ...form, totalSeats: Number(e.target.value) })} className={inputClass} />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Seats Still Available</label>
                  <input type="number" min={0} value={form.availableSeats} onChange={(e) => setForm({ ...form, availableSeats: Number(e.target.value) })} className={inputClass} />
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">No limit: anyone can register.</p>
            )}
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-end gap-2 shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2.5 text-slate-600 font-bold rounded-xl hover:bg-slate-100 cursor-pointer">
            Cancel
          </button>
          <button type="submit" disabled={saving || uploading}
            className="px-5 py-2.5 bg-[#2ac0db] hover:bg-[#22a8c0] disabled:opacity-60 text-slate-950 font-bold rounded-xl flex items-center gap-2 cursor-pointer">
            <Save className="w-4 h-4" />
            <span>{uploading ? 'Uploading image...' : saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Workshop'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
