import React, { useState, useEffect } from 'react';
import { LearningProduct } from '../types';
import { safeOpenUrl } from '../utils/safeWindow';
import { X, ArrowLeft, Star, MessageCircle, Truck, Package, BookOpen, Sparkles, Shapes, Music, Puzzle } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: LearningProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when modal opens with new product
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  // Handle ESC key to close and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const getProductIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'phonics':
        return <BookOpen className="w-14 h-14 text-[#2ac0db]" />;
      case 'sensory':
        return <Sparkles className="w-14 h-14 text-[#2ac0db]" />;
      case 'mathematics':
        return <Shapes className="w-14 h-14 text-[#2ac0db]" />;
      case 'stem':
        return <Puzzle className="w-14 h-14 text-[#2ac0db]" />;
      case 'creative':
        return <Music className="w-14 h-14 text-[#2ac0db]" />;
      default:
        return <Package className="w-14 h-14 text-[#2ac0db]" />;
    }
  };

  const handleInquiry = () => {
    const msg = `Hello CEC Learning Essentials (Ghana)!\n\nI would like to order ${quantity}x "${product.name}" (GH₵${product.price * quantity * 15} / $${product.price * quantity}).\n\nPlease let me know delivery availability in Accra/Ghana.`;
    safeOpenUrl(`https://wa.me/233540390029?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        onClick={() => onClose()}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        aria-hidden="true"
      />

      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl z-10 overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 fade-in duration-200"
      >
        
        {/* Top Header */}
        <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <button
            type="button"
            onClick={() => onClose()}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </button>
          <button
            type="button"
            onClick={() => onClose()}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Product Visual Box */}
            <div className="bg-slate-50 p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-3 border-b md:border-b-0 md:border-r border-slate-200">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#2ac0db]/10 border border-[#2ac0db]/20 flex items-center justify-center shadow-inner">
                {getProductIcon(product.category)}
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#126373] uppercase tracking-wider bg-[#2ac0db]/15 px-2.5 py-1 rounded-full">
                  {product.category} Material
                </span>
                <p className="text-[11px] text-slate-500 font-medium">CEC Early Years Certified Standard</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4 text-xs">
              <div>
                <span className="px-2 py-0.5 bg-[#2ac0db]/15 text-[#126373] text-[10px] font-extrabold uppercase rounded-full">
                  {product.category}
                </span>

                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 mt-1">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 text-xs mt-1.5 text-slate-600">
                  <div className="flex items-center text-[#fa7b2d] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#fa7b2d] text-[#fa7b2d]" />
                    <span className="ml-1 text-slate-800">{product.rating}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span>{product.reviews} reviews</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-semibold text-[#126373]">{product.ageGroup}</span>
                </div>

                <div className="mt-3 text-xl sm:text-2xl font-extrabold text-slate-900">
                  ${product.price} <span className="text-xs text-slate-500 font-normal">/ unit</span>
                </div>

                <p className="text-slate-600 leading-relaxed mt-2 text-xs">
                  {product.description}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                  <Truck className="w-4 h-4 text-[#2ac0db] shrink-0" />
                  <span>Doorstep delivery available for schools across Accra & nationwide in Ghana</span>
                </div>
              </div>

              {/* Quantity Selector & WhatsApp Inquiry */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between font-bold text-slate-700">
                  <span>Quantity:</span>
                  <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center font-bold text-slate-700 cursor-pointer hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-extrabold text-slate-900 text-sm">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center font-bold text-slate-700 cursor-pointer hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleInquiry}
                  className="w-full py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp (${product.price * quantity})</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
