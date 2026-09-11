import React, { useEffect, useState } from 'react';
import { X, Save } from 'lucide-react';
import { LearningProduct } from '../../types';
import { ProductInput } from '../../hooks/useStoreProducts';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (input: ProductInput) => Promise<{ error: string | null }>;
  editing: LearningProduct | null;
}

const blank: ProductInput = {
  name: '',
  category: 'Child-Friendly Furniture',
  price: 0,
  priceDisplay: '',
  rating: 5,
  reviews: 0,
  image: '',
  description: '',
  inStock: true,
  ageGroup: '',
  isFeatured: false,
  specs: ''
};

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSave, editing }) => {
  const [form, setForm] = useState<ProductInput>(blank);
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
          <h3 className="font-bold text-sm">{editing ? 'Edit Product' : 'Add Product'}</h3>
          <button type="button" onClick={onClose} className="p-1 hover:bg-slate-800 rounded-full cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Product Name *</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]">
                <option value="Child-Friendly Furniture">Child-Friendly Furniture</option>
                <option value="Outdoor & Play Equipment">Outdoor & Play Equipment</option>
                <option value="Educational Toys">Educational Toys</option>
                <option value="Sensory & Play">Sensory & Play</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Age Group *</label>
              <input required placeholder="e.g. Ages 3 - 8" value={form.ageGroup} onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Price (numeric, GH₵) *</label>
              <input required type="number" step="0.01" min={0} value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Price Display Text</label>
              <input placeholder="e.g. GH₵ 950 or Contact for Quote" value={form.priceDisplay ?? ''}
                onChange={(e) => setForm({ ...form, priceDisplay: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Image URL *</label>
            <input required placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description *</label>
            <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Extra Specs (optional)</label>
            <input placeholder="e.g. Available sizes: 14ft / 16ft" value={form.specs ?? ''} onChange={(e) => setForm({ ...form, specs: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]" />
          </div>

          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} />
              In Stock
            </label>
            <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
              Featured
            </label>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-end gap-2 shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2.5 text-slate-600 font-bold rounded-xl hover:bg-slate-100 cursor-pointer">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="px-5 py-2.5 bg-slate-900 hover:bg-[#126373] disabled:opacity-60 text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer">
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
