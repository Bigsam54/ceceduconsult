import React, { useRef, useState } from 'react';
import { ShoppingBag, BookOpen, Package, Edit, Trash2, Upload, Loader2, Plus, X } from 'lucide-react';
import { LearningProduct, StoreSection } from '../../types';
import { ProductInput } from '../../hooks/useStoreProducts';
import { STORE_SECTIONS } from '../../data/storeSections';
import { uploadToCloudinary, CLOUDINARY_FOLDERS } from '../../lib/cloudinary';
import { prepareImage } from '../../utils/prepareImage';
import { useToast } from '../../context/ToastContext';

interface StoreManagerPanelProps {
  products: LearningProduct[];
  createProduct: (input: ProductInput) => Promise<{ error: string | null }>;
  deleteProduct: (id: string) => Promise<{ error: string | null }>;
  onAdd: (section: StoreSection) => void;
  onEdit: (product: LearningProduct) => void;
}

type SectionFilter = StoreSection | 'all';

// "the_gruffalo-cover.jpg" -> "The Gruffalo Cover"; camera/WhatsApp names become a placeholder
const titleFromFileName = (fileName: string) => {
  const base = fileName.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!base || /^(img|dsc|pxl|image|photo|whatsapp|screenshot)\b/i.test(base) || /^\d+$/.test(base)) {
    return 'New Book (add title)';
  }
  return base.replace(/\b\w/g, (c) => c.toUpperCase());
};

export const StoreManagerPanel: React.FC<StoreManagerPanelProps> = ({ products, createProduct, deleteProduct, onAdd, onEdit }) => {
  const toast = useToast();
  const [filter, setFilter] = useState<SectionFilter>('books');
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkCategory, setBulkCategory] = useState(STORE_SECTIONS.books.categories[0]);
  const [bulkProgress, setBulkProgress] = useState<{ done: number; total: number } | null>(null);
  const bulkInputRef = useRef<HTMLInputElement | null>(null);

  const sectionOf = (p: LearningProduct): StoreSection => p.section ?? 'school-resources';
  const counts = {
    all: products.length,
    books: products.filter((p) => sectionOf(p) === 'books').length,
    'school-resources': products.filter((p) => sectionOf(p) === 'school-resources').length
  };
  const visible = filter === 'all' ? products : products.filter((p) => sectionOf(p) === filter);

  const handleBulkFiles = async (files: FileList | null) => {
    const list = Array.from(files ?? []).filter((f) => f.type.startsWith('image/'));
    if (list.length === 0) return;

    setBulkProgress({ done: 0, total: list.length });
    let added = 0;
    // One at a time so the progress count is meaningful and the network isn't flooded
    for (const file of list) {
      try {
        const blob = await prepareImage(file);
        const url = await uploadToCloudinary(blob, { folder: CLOUDINARY_FOLDERS.storeBooks, fileName: file.name });
        const { error } = await createProduct({
          name: titleFromFileName(file.name),
          category: bulkCategory,
          price: 0,
          priceDisplay: 'Contact for Price',
          rating: 5,
          reviews: 0,
          image: url,
          images: [url],
          description: '',
          inStock: true,
          ageGroup: '',
          isFeatured: false,
          specs: '',
          section: 'books',
          author: ''
        });
        if (error) throw new Error(error);
        added += 1;
      } catch (err) {
        toast.error(err instanceof Error ? err.message : `Could not add ${file.name}.`, 'Upload Failed');
      }
      setBulkProgress((prev) => (prev ? { ...prev, done: prev.done + 1 } : prev));
    }

    setBulkProgress(null);
    if (bulkInputRef.current) bulkInputRef.current.value = '';
    if (added > 0) {
      setBulkOpen(false);
      setFilter('books');
      toast.success(`${added} book${added === 1 ? '' : 's'} added. Click the edit button on each to add its title, author and price.`, 'Books Uploaded');
    }
  };

  const filterTabs: { key: SectionFilter; label: string; icon: React.ElementType }[] = [
    { key: 'books', label: 'Books', icon: BookOpen },
    { key: 'school-resources', label: 'School Resources', icon: Package },
    { key: 'all', label: 'All Items', icon: ShoppingBag }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2ac0db]" />
              Learning Essentials Manager
            </h3>
            <p className="text-xs text-slate-500">Add books and school resources with photos. Changes appear on the public store straight away.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setBulkOpen(!bulkOpen)}
              className="px-4 py-2.5 bg-[#fa7b2d]/10 hover:bg-[#fa7b2d]/20 text-[#b45309] border border-[#fa7b2d]/30 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Bulk Upload Book Covers</span>
            </button>
            <button
              onClick={() => onAdd('books')}
              className="px-4 py-2.5 bg-[#126373] hover:bg-[#0e4f5c] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Book</span>
            </button>
            <button
              onClick={() => onAdd('school-resources')}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add School Resource</span>
            </button>
          </div>
        </div>

        {bulkOpen && (
          <div className="rounded-2xl border border-[#fa7b2d]/25 bg-gradient-to-br from-[#fa7b2d]/5 to-white p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">Upload many book covers at once</p>
                <p className="text-xs text-slate-500">
                  Each photo becomes its own book listing. The file name is used as the title (e.g. "the-gruffalo.jpg" becomes "The Gruffalo").
                  You can add the author and price afterwards.
                </p>
              </div>
              <button onClick={() => setBulkOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer" aria-label="Close bulk upload">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
              <label className="font-bold text-slate-700 shrink-0">Category for these books:</label>
              <select
                value={bulkCategory}
                onChange={(e) => setBulkCategory(e.target.value)}
                disabled={Boolean(bulkProgress)}
                className="p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
              >
                {STORE_SECTIONS.books.categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                onClick={() => bulkInputRef.current?.click()}
                disabled={Boolean(bulkProgress)}
                className="sm:ml-auto px-5 py-2.5 bg-[#fa7b2d] hover:bg-[#e66b1d] disabled:opacity-70 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {bulkProgress ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading {bulkProgress.done} of {bulkProgress.total}...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Choose Book Photos</span>
                  </>
                )}
              </button>
            </div>
            {bulkProgress && (
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#fa7b2d] to-[#2ac0db] transition-all"
                  style={{ width: `${(bulkProgress.done / bulkProgress.total) * 100}%` }}
                />
              </div>
            )}
            <input ref={bulkInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleBulkFiles(e.target.files)} />
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {filterTabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                filter === key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
              <span className={`px-1.5 rounded-full text-[10px] ${filter === key ? 'bg-[#2ac0db] text-slate-950' : 'bg-white text-slate-600'}`}>{counts[key]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {visible.map((prod) => {
          const isBook = sectionOf(prod) === 'books';
          const needsDetails = isBook && (prod.name.startsWith('New Book') || prod.price === 0);
          return (
            <div key={prod.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className={`${isBook ? 'w-11 h-14' : 'w-12 h-12'} rounded-xl object-cover border border-slate-200 shrink-0`}
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">{prod.name}</h4>
                  <p className="text-[11px] text-[#126373] font-semibold truncate">
                    {isBook && prod.author ? `${prod.author} • ` : ''}{prod.category}{prod.ageGroup ? ` • ${prod.ageGroup}` : ''}
                  </p>
                  {needsDetails && (
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                      Add title / price
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
                <span className="hidden sm:inline font-extrabold text-slate-900 text-sm">{prod.priceDisplay || `GH₵ ${prod.price}`}</span>
                <span className={`hidden md:inline px-2 py-0.5 font-bold rounded border ${prod.inStock ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                  {prod.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <button
                  onClick={() => onEdit(prod)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl cursor-pointer"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={async () => {
                    if (!window.confirm(`Delete "${prod.name}"? This can't be undone.`)) return;
                    const { error } = await deleteProduct(prod.id);
                    if (error) toast.error(error, 'Delete Failed');
                    else toast.success('Item removed from the store.', 'Deleted');
                  }}
                  className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl cursor-pointer border border-rose-200"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
        {visible.length === 0 && (
          <div className="bg-white p-10 rounded-3xl border border-dashed border-slate-300 text-center space-y-1">
            <p className="text-sm font-bold text-slate-700">{filter === 'books' ? 'No books yet' : 'Nothing here yet'}</p>
            <p className="text-xs text-slate-500">
              {filter === 'books' ? 'Use "Add Book" or "Bulk Upload Book Covers" to add your first books.' : 'Click an "Add" button above to add an item.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
