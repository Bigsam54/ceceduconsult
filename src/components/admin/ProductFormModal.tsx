import React, { useEffect, useRef, useState } from 'react';
import { X, Save, Upload, Loader2, Star, Trash2, BookOpen, Package, ImagePlus, Link2 } from 'lucide-react';
import { LearningProduct, StoreSection } from '../../types';
import { ProductInput } from '../../hooks/useStoreProducts';
import { STORE_SECTIONS, STORE_SECTION_ORDER } from '../../data/storeSections';
import { uploadToCloudinary, CLOUDINARY_FOLDERS } from '../../lib/cloudinary';
import { prepareImage } from '../../utils/prepareImage';
import { useToast } from '../../context/ToastContext';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (input: ProductInput) => Promise<{ error: string | null }>;
  editing: LearningProduct | null;
  /** Section to start in when adding a new item */
  defaultSection?: StoreSection;
}

const blankFor = (section: StoreSection): ProductInput => ({
  name: '',
  category: STORE_SECTIONS[section].categories[0],
  price: 0,
  priceDisplay: '',
  rating: 5,
  reviews: 0,
  image: '',
  images: [],
  description: '',
  inStock: true,
  ageGroup: '',
  isFeatured: false,
  specs: '',
  section,
  author: ''
});

// Every product keeps its photos in `images`; `image` is always the first (cover) one
const imagesOf = (p: ProductInput) => (p.images && p.images.length > 0 ? p.images : p.image ? [p.image] : []);

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSave, editing, defaultSection = 'school-resources' as StoreSection }) => {
  const toast = useToast();
  const [form, setForm] = useState<ProductInput>(blankFor(defaultSection));
  const [saving, setSaving] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing) {
      setForm({ ...editing, section: editing.section ?? 'school-resources', images: imagesOf(editing) });
    } else {
      setForm(blankFor(defaultSection));
    }
    setUrlInput('');
    setShowUrlInput(false);
  }, [editing, isOpen, defaultSection]);

  if (!isOpen) return null;

  const section: StoreSection = form.section ?? 'school-resources';
  const isBook = section === 'books';
  const images = imagesOf(form);
  const sectionCategories = STORE_SECTIONS[section].categories;
  // Keep a legacy/custom category selectable when editing older items
  const categoryOptions = sectionCategories.includes(form.category) ? sectionCategories : [form.category, ...sectionCategories];

  const setImages = (next: string[]) => setForm((prev) => ({ ...prev, images: next, image: next[0] ?? '' }));

  const switchSection = (next: StoreSection) => {
    if (next === section) return;
    setForm((prev) => ({ ...prev, section: next, category: STORE_SECTIONS[next].categories[0] }));
  };

  const handleFiles = async (files: FileList | null) => {
    const list = Array.from(files ?? []).filter((f) => f.type.startsWith('image/'));
    if (list.length === 0) return;

    setUploadingCount((c) => c + list.length);
    const folder = isBook ? CLOUDINARY_FOLDERS.storeBooks : CLOUDINARY_FOLDERS.storeResources;
    await Promise.all(
      list.map(async (file) => {
        try {
          const blob = await prepareImage(file);
          const url = await uploadToCloudinary(blob, { folder, fileName: file.name });
          setForm((prev) => {
            const next = [...imagesOf(prev), url];
            return { ...prev, images: next, image: next[0] };
          });
        } catch (err) {
          toast.error(err instanceof Error ? err.message : `Could not upload ${file.name}.`, 'Upload Failed');
        } finally {
          setUploadingCount((c) => c - 1);
        }
      })
    );
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addImageUrl = () => {
    const url = urlInput.trim();
    if (!/^https?:\/\//i.test(url)) {
      toast.error('Please paste a full image link starting with https://', 'Invalid Link');
      return;
    }
    setImages([...images, url]);
    setUrlInput('');
    setShowUrlInput(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadingCount > 0) {
      toast.info('Please wait for the photos to finish uploading.', 'Still Uploading');
      return;
    }
    if (images.length === 0) {
      toast.error('Please add at least one photo.', 'Photo Required');
      return;
    }
    setSaving(true);
    const { error } = await onSave({ ...form, image: images[0], images });
    setSaving(false);
    if (!error) onClose();
  };

  const inputClass = 'w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overscroll-contain">
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs" />
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[90dvh] overflow-hidden border border-slate-200/80 text-left"
      >
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <h3 className="font-bold text-sm">
            {editing ? `Edit ${isBook ? 'Book' : 'School Resource'}` : `Add ${isBook ? 'Book' : 'School Resource'}`}
          </h3>
          <button type="button" onClick={onClose} className="p-1 hover:bg-slate-800 rounded-full cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">

          {/* Section */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Store Section *</label>
            <div className="grid grid-cols-2 gap-2">
              {STORE_SECTION_ORDER.map((key) => {
                const Icon = key === 'books' ? BookOpen : Package;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => switchSection(key)}
                    className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 font-bold text-left transition-colors cursor-pointer ${
                      section === key
                        ? 'border-[#2ac0db] bg-[#2ac0db]/10 text-[#126373]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{STORE_SECTIONS[key].label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photos */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-slate-700">{isBook ? 'Book Cover & Photos *' : 'Product Photos *'}</label>
              <span className="text-[10px] text-slate-400">The first photo is the cover. Click ★ to change it.</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {images.map((url, idx) => (
                <div key={`${url}-${idx}`} className={`relative rounded-xl overflow-hidden border-2 bg-slate-100 ${isBook ? 'aspect-[3/4]' : 'aspect-square'} ${idx === 0 ? 'border-[#2ac0db]' : 'border-slate-200'}`}>
                  <img src={url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  {idx === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-[#2ac0db] text-slate-950 text-[9px] font-extrabold">COVER</span>
                  )}
                  <div className="absolute top-1.5 right-1.5 flex gap-1">
                    {idx !== 0 && (
                      <button
                        type="button"
                        onClick={() => setImages([url, ...images.filter((_, i) => i !== idx)])}
                        className="p-1 rounded-md bg-white/90 text-amber-500 hover:bg-white shadow cursor-pointer"
                        title="Make cover photo"
                      >
                        <Star className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      className="p-1 rounded-md bg-white/90 text-rose-600 hover:bg-white shadow cursor-pointer"
                      title="Remove photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              {Array.from({ length: uploadingCount }).map((_, i) => (
                <div key={`uploading-${i}`} className={`rounded-xl border-2 border-dashed border-[#2ac0db]/50 bg-[#2ac0db]/5 flex items-center justify-center ${isBook ? 'aspect-[3/4]' : 'aspect-square'}`}>
                  <Loader2 className="w-5 h-5 animate-spin text-[#2ac0db]" />
                </div>
              ))}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFiles(e.dataTransfer.files);
                }}
                className={`rounded-xl border-2 border-dashed border-slate-300 hover:border-[#2ac0db] hover:bg-[#2ac0db]/5 text-slate-500 hover:text-[#126373] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${isBook ? 'aspect-[3/4]' : 'aspect-square'}`}
              >
                <ImagePlus className="w-5 h-5" />
                <span className="text-[10px] font-bold">Add Photos</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            {showUrlInput ? (
              <div className="flex gap-2">
                <input
                  placeholder="https://res.cloudinary.com/..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImageUrl(); } }}
                  className={inputClass}
                />
                <button type="button" onClick={addImageUrl} className="px-4 bg-slate-900 text-white font-bold rounded-xl cursor-pointer">Add</button>
              </div>
            ) : (
              <button type="button" onClick={() => setShowUrlInput(true)} className="text-[11px] font-semibold text-slate-500 hover:text-[#126373] flex items-center gap-1 cursor-pointer">
                <Link2 className="w-3.5 h-3.5" /> Or paste an image link
              </button>
            )}
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">{isBook ? 'Book Title *' : 'Product Name *'}</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </div>

          {isBook && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Author</label>
              <input placeholder="e.g. Julia Donaldson" value={form.author ?? ''} onChange={(e) => setForm({ ...form, author: e.target.value })} className={inputClass} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">{isBook ? 'Age / Reading Level' : 'Age Group *'}</label>
              <input
                required={!isBook}
                placeholder={isBook ? 'e.g. Ages 4 - 7 or Early Reader' : 'e.g. Ages 3 - 8'}
                value={form.ageGroup}
                onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Price (numeric, GH₵) *</label>
              <input required type="number" step="0.01" min={0} value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className={inputClass} />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Price Display Text</label>
              <input placeholder="e.g. GH₵ 950 or Contact for Price" value={form.priceDisplay ?? ''}
                onChange={(e) => setForm({ ...form, priceDisplay: e.target.value })}
                className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description {isBook ? '' : '*'}</label>
            <textarea
              required={!isBook}
              rows={3}
              placeholder={isBook ? 'A short summary of the book and why children will love it' : ''}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Extra Details (optional)</label>
            <input
              placeholder={isBook ? 'e.g. Paperback · 32 pages' : 'e.g. Available sizes: 14ft / 16ft'}
              value={form.specs ?? ''}
              onChange={(e) => setForm({ ...form, specs: e.target.value })}
              className={inputClass}
            />
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
          <button type="submit" disabled={saving || uploadingCount > 0}
            className="px-5 py-2.5 bg-slate-900 hover:bg-[#126373] disabled:opacity-60 text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer">
            {uploadingCount > 0 ? <Upload className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
            <span>{uploadingCount > 0 ? 'Uploading photos...' : saving ? 'Saving...' : editing ? 'Save Changes' : isBook ? 'Add Book' : 'Add Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
