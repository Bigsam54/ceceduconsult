import React, { useState } from 'react';
import { LearningProduct } from '../types';
import { MOCK_LEARNING_PRODUCTS } from '../data/mockData';
import { 
  ShoppingBag, 
  Search, 
  Eye, 
  PackageCheck,
  Blocks,
  BookOpen,
  Sparkles,
  Layers,
  Shapes
} from 'lucide-react';

interface LearningEssentialsViewProps {
  onQuickView: (product: LearningProduct) => void;
}

export const LearningEssentialsView: React.FC<LearningEssentialsViewProps> = ({ onQuickView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Child-Friendly Furniture',
    'Outdoor & Play Equipment',
    'Educational Toys',
    'Sensory & Play'
  ];

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
        return <PackageCheck className="w-10 h-10 text-[#126373]" />;
    }
  };

  const filteredProducts = MOCK_LEARNING_PRODUCTS.filter((prod) => {
    if (searchQuery.trim() && !prod.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedCategory !== 'All' && prod.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
      
      {/* Banner */}
      <div className="relative bg-gradient-to-r from-slate-950 via-[#0d3842] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/20 shadow-2xl overflow-hidden">
        
        {/* Clearly Visible Background Accent */}
        <div className="absolute right-0 sm:right-6 top-1/2 -translate-y-1/2 opacity-75 sm:opacity-85 pointer-events-none select-none drop-shadow-2xl">
          <img
            src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786994345/CEC_Learning_Essentials-removebg-preview.png"
            alt="CEC Learning Essentials Backdrop"
            referrerPolicy="no-referrer"
            className="h-48 sm:h-64 w-auto object-contain"
          />
        </div>

        <div className="relative z-10 space-y-3 sm:space-y-4 max-w-3xl">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            Age-Appropriate Learning Resources & Child-Friendly Furniture
          </h1>
          <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-medium">
            Age appropriate learning resources and child friendly furniture, sensory play materials, and concrete early literacy aids.
          </p>

          {/* Search */}
          <div className="pt-2 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search products (e.g., Table, Trampoline, Blocks)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2ac0db] shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Chips */}
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#2ac0db] transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Product Visual Display - Real Image */}
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

              {/* Product Info */}
              <div className="p-4 sm:p-5 space-y-2">
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#126373] transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </div>
            </div>

            {/* Price & Action */}
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 block font-medium">Price</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 truncate block">
                  {product.priceDisplay || `GH₵ ${product.price.toLocaleString()}`}
                </span>
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

    </div>
  );
};

