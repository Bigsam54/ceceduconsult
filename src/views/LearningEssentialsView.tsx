import React, { useEffect, useMemo, useState } from 'react';
import { LearningProduct, StoreSection } from '../types';
import { useStoreProducts } from '../hooks/useStoreProducts';
import { STORE_SECTIONS, STORE_SECTION_ORDER } from '../data/storeSections';
import {
  ShoppingBag,
  Search,
  Eye,
  PackageCheck,
  Blocks,
  BookOpen,
  Layers,
  Shapes,
  ArrowRight,
  ArrowLeft,
  Package
} from 'lucide-react';

interface LearningEssentialsViewProps {
  onQuickView: (product: LearningProduct) => void;
}

const SECTION_PARAM = 'section';

const readSectionFromUrl = (): StoreSection | null => {
  try {
    const value = new URLSearchParams(window.location.search).get(SECTION_PARAM);
    return value === 'books' || value === 'school-resources' ? value : null;
  } catch {
    return null;
  }
};

// Keeps ?section=books in the address bar so a section can be shared or bookmarked
const writeSectionToUrl = (section: StoreSection | null) => {
  try {
    const url = new URL(window.location.href);
    if (section) url.searchParams.set(SECTION_PARAM, section);
    else url.searchParams.delete(SECTION_PARAM);
    window.history.replaceState(window.history.state, '', url.toString());
  } catch {
    // ignore (e.g. sandboxed previews)
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Child-Friendly Furniture':
      return <PackageCheck className="w-10 h-10 text-[#126373]" />;
    case 'Outdoor & Play Equipment':
      return <Layers className="w-10 h-10 text-[#126373]" />;
    case 'Educational Toys':
      return <Blocks className="w-10 h-10 text-[#126373]" />;
    case 'Sensory & Play':
      return <Shapes className="w-10 h-10 text-[#126373]" />;
    default:
      return <BookOpen className="w-10 h-10 text-[#126373]" />;
  }
};

const priceLabel = (product: LearningProduct) => product.priceDisplay || `GH₵ ${product.price.toLocaleString()}`;

export const LearningEssentialsView: React.FC<LearningEssentialsViewProps> = ({ onQuickView }) => {
  const { products, loading } = useStoreProducts();
  const [section, setSection] = useState<StoreSection | null>(readSectionFromUrl);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    writeSectionToUrl(section);
    setSelectedCategory('All');
    setSearchQuery('');
  }, [section]);

  const productsBySection = useMemo(() => {
    const grouped: Record<StoreSection, LearningProduct[]> = { books: [], 'school-resources': [] };
    products.forEach((p) => grouped[p.section ?? 'school-resources'].push(p));
    return grouped;
  }, [products]);

  const openSection = (next: StoreSection | null) => {
    setSection(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ---------- Landing: choose Books or School Resources ---------- */
  if (!section) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2ac0db]/10 text-[#126373] text-[11px] font-bold uppercase tracking-widest border border-[#2ac0db]/25">
            <ShoppingBag className="w-3.5 h-3.5" /> CEC Learning Essentials
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 leading-tight">
            Everything Your Learners Need
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Carefully selected books and age-appropriate school resources for classrooms, homes and early learning centres across Ghana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {STORE_SECTION_ORDER.map((key) => {
            const config = STORE_SECTIONS[key];
            const count = productsBySection[key].length;
            const Icon = key === 'books' ? BookOpen : Package;
            // Use a real book cover for the Books card once some have been uploaded
            const cover = key === 'books' && productsBySection.books[0]?.image ? productsBySection.books[0].image : config.coverImage;

            return (
              <button
                key={key}
                onClick={() => openSection(key)}
                className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden text-left shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <img
                  src={cover}
                  alt={config.label}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/10" />
                <div className={`absolute top-0 inset-x-0 h-1.5 ${key === 'books' ? 'bg-[#fa7b2d]' : 'bg-[#2ac0db]'}`} />

                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${key === 'books' ? 'bg-[#fa7b2d] text-white' : 'bg-[#2ac0db] text-slate-950'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">{config.label}</h2>
                    <p className="text-sm text-slate-200 leading-relaxed max-w-md">{config.tagline}</p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-slate-300">
                      {loading ? 'Loading...' : count > 0 ? `${count} item${count === 1 ? '' : 's'}` : 'Coming soon'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-extrabold group-hover:bg-[#2ac0db] transition-colors">
                      Browse {config.label} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------- Section view ---------- */
  const config = STORE_SECTIONS[section];
  const isBooks = section === 'books';
  const sectionProducts = productsBySection[section];
  // Section categories first, plus any custom ones admins have used
  const extraCategories = Array.from(new Set(sectionProducts.map((p) => p.category))).filter((c) => !config.categories.includes(c));
  const categories = ['All', ...config.categories.filter((c) => sectionProducts.some((p) => p.category === c)), ...extraCategories];

  const query = searchQuery.trim().toLowerCase();
  const filteredProducts = sectionProducts.filter((prod) => {
    if (query && !`${prod.name} ${prod.author ?? ''}`.toLowerCase().includes(query)) return false;
    if (selectedCategory !== 'All' && prod.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 sm:space-y-8">

      {/* Section switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => openSection(null)}
          className="self-start inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Learning Essentials</span>
        </button>
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl self-start sm:self-auto">
          {STORE_SECTION_ORDER.map((key) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                section === key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {key === 'books' ? <BookOpen className="w-3.5 h-3.5" /> : <Package className="w-3.5 h-3.5" />}
              {STORE_SECTIONS[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="relative bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-[#2ac0db]/20 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src={config.coverImage}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-50 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/50" />
        </div>
        <div className={`absolute top-0 inset-x-0 h-1.5 ${isBooks ? 'bg-[#fa7b2d]' : 'bg-[#2ac0db]'}`} />

        <div className="relative z-10 space-y-3 sm:space-y-4 max-w-3xl">
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-tight">
            {isBooks ? 'Books for Curious Young Minds' : 'Age-Appropriate Learning Resources & Child-Friendly Furniture'}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed font-medium">{config.tagline}</p>

          <div className="pt-2 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder={isBooks ? 'Search books by title or author...' : 'Search products (e.g., Table, Trampoline, Blocks)...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2ac0db] shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#2ac0db] text-slate-950 shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <p className="text-center text-sm text-slate-500 font-semibold py-8">Loading {config.label.toLowerCase()}...</p>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-12 space-y-2">
          {isBooks ? <BookOpen className="w-10 h-10 text-slate-300 mx-auto" /> : <Package className="w-10 h-10 text-slate-300 mx-auto" />}
          <p className="text-sm text-slate-600 font-bold">
            {sectionProducts.length === 0 ? `New ${config.label.toLowerCase()} are on the way.` : 'Nothing matches your search yet.'}
          </p>
          {sectionProducts.length === 0 && (
            <p className="text-xs text-slate-500">Check back soon, or contact CEC to ask about what's available.</p>
          )}
        </div>
      )}

      {/* Books Grid */}
      {isBooks ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((book) => (
            <div key={book.id} className="group flex flex-col">
              <button
                type="button"
                onClick={() => onQuickView(book)}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={book.image}
                  alt={book.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Spine shading for a book-like feel */}
                <span className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/25 to-transparent" />
                {!book.inStock && (
                  <span className="absolute top-2.5 left-3 px-2 py-0.5 rounded-md bg-slate-900/85 text-white text-[10px] font-bold">Out of Stock</span>
                )}
                {book.ageGroup && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 text-[#126373] text-[10px] font-bold shadow-sm">{book.ageGroup}</span>
                )}
                <span className="absolute inset-x-0 bottom-0 p-2.5 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-3 py-1.5 rounded-xl bg-white text-slate-900 text-[11px] font-bold shadow-md flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#126373]" /> Quick View
                  </span>
                </span>
              </button>
              <div className="pt-3 space-y-0.5 flex-1">
                <h3 className="font-heading font-bold text-sm text-slate-900 line-clamp-2 leading-snug">{book.name}</h3>
                {book.author && <p className="text-xs text-slate-500 truncate">by {book.author}</p>}
              </div>
              <div className="pt-2 flex items-center justify-between gap-2">
                <span className="text-sm font-extrabold text-slate-900 truncate">{priceLabel(book)}</span>
                <button
                  onClick={() => onQuickView(book)}
                  className="shrink-0 px-3 py-1.5 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold text-[11px] rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <ShoppingBag className="w-3 h-3" /> Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* School Resources Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#2ac0db] transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 sm:h-64 bg-slate-100 overflow-hidden border-b border-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to category placeholder if image fails to load
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="hidden w-full h-full flex-col items-center justify-center bg-slate-100 p-6">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-[#2ac0db]/20 flex items-center justify-center">
                      {getCategoryIcon(product.category)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onQuickView(product)}
                    className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/95 hover:bg-white text-slate-800 text-xs font-bold rounded-xl shadow-md border border-slate-200 flex items-center gap-1 backdrop-blur-sm cursor-pointer transition-transform active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#126373]" />
                    <span>Quick View</span>
                  </button>
                </div>

                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#126373] transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-slate-400 block font-medium">Price</span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 truncate block">{priceLabel(product)}</span>
                </div>

                <button
                  onClick={() => onQuickView(product)}
                  className="shrink-0 px-3.5 sm:px-4 py-2 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
