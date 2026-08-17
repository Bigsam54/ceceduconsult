import React, { useState } from 'react';
import { LearningProduct } from '../types';
import { X, Star, MessageCircle, Truck, Package, BookOpen, Sparkles, Shapes, Music, Puzzle } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: LearningProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState(1);

  const getProductIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'phonics':
        return <BookOpen className="w-16 h-16 text-sky-600" />;
      case 'sensory':
        return <Sparkles className="w-16 h-16 text-sky-600" />;
      case 'mathematics':
        return <Shapes className="w-16 h-16 text-sky-600" />;
      case 'stem':
        return <Puzzle className="w-16 h-16 text-sky-600" />;
      case 'creative':
        return <Music className="w-16 h-16 text-sky-600" />;
      default:
        return <Package className="w-16 h-16 text-sky-600" />;
    }
  };

  const handleInquiry = () => {
    const msg = `Hello CEC Learning Essentials!\n\nI would like to order/inquire about ${quantity}x "${product.name}" ($${product.price * quantity}).\n\nPlease let me know delivery availability for our preschool.`;
    window.open(`https://wa.me/2348012345678?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-slate-700 rounded-full shadow-xs border border-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Product Visual Box */}
            <div className="bg-slate-100 p-8 flex flex-col items-center justify-center text-center space-y-4 border-r border-slate-200/80">
              <div className="w-28 h-28 rounded-3xl bg-sky-50 border border-sky-200 flex items-center justify-center shadow-inner">
                {getProductIcon(product.category)}
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider bg-sky-100/80 px-2.5 py-1 rounded-full border border-sky-200">
                  {product.category} Material
                </span>
                <p className="text-xs text-slate-500 font-medium">Authentic CEC Early Years Standard</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div>
                <span className="px-2.5 py-1 bg-sky-100 text-sky-900 border border-sky-200 text-[10px] font-extrabold uppercase rounded-full">
                  {product.category}
                </span>

                <h3 className="text-xl font-heading font-bold text-slate-900 mt-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 text-xs mt-2">
                  <div className="flex items-center text-sky-600 font-bold">
                    <Star className="w-4 h-4 fill-sky-500 text-sky-500" />
                    <span className="ml-1 text-slate-800">{product.rating}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-medium">{product.reviews} reviews</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-sky-700 font-semibold">{product.ageGroup}</span>
                </div>

                <div className="mt-4 text-2xl font-extrabold text-slate-900">
                  ${product.price} <span className="text-xs text-slate-500 font-normal">/ unit</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mt-3">
                  {product.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <Truck className="w-4 h-4 text-sky-600" />
                  <span>Doorstep delivery available for schools across Lagos & West Africa</span>
                </div>
              </div>

              {/* Quantity Selector & WhatsApp Inquiry */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                  <span>Quantity:</span>
                  <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-slate-900 text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleInquiry}
                  className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order / Inquire on WhatsApp (${product.price * quantity})</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

