import React, { useState, useEffect } from 'react';
import { LearningProduct } from '../types';
import { safeOpenUrl } from '../utils/safeWindow';
import { useToast } from '../context/ToastContext';
import { X, ArrowLeft, Truck } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ProductQuickViewModalProps {
  product: LearningProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Reset quantity and selected image when modal opens with new product
  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1);
      setSelectedImage(product.image);
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

  const allImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const currentImg = selectedImage || product.image;

  const handleInquiry = () => {
    toast.info(`Preparing WhatsApp inquiry for ${quantity}x ${product.name}...`, 'Opening WhatsApp');
    const msg = `Hello CEC Learning Essentials!\n\nI am interested in ordering:\n*Product:* ${product.name}\n*Quantity:* ${quantity}\n\nPlease share delivery details and availability in Ghana.`;
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
            
            {/* Product Visual Box - Real Product Image */}
            <div className="bg-slate-50 p-6 flex flex-col items-center justify-center text-center space-y-3 border-b md:border-b-0 md:border-r border-slate-200">
              <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
                <img
                  src={currentImg}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Multi-image thumbnails */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        currentImg === img ? 'border-[#2ac0db] scale-105 shadow-xs' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#126373] uppercase tracking-wider bg-[#2ac0db]/15 px-2.5 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4 text-xs">
              <div>
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
                  {product.name}
                </h3>

                <div className="mt-3 text-xl sm:text-2xl font-extrabold text-slate-900">
                  {product.priceDisplay || `GH₵ ${product.price.toLocaleString()}`}
                  <span className="text-xs text-slate-500 font-normal"> / unit</span>
                </div>

                {product.specs && (
                  <div className="mt-2 text-xs font-semibold text-[#126373] bg-[#2ac0db]/10 p-2 rounded-xl">
                    {product.specs}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                  <Truck className="w-4 h-4 text-[#2ac0db] shrink-0" />
                  <span>Delivery available</span>
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
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
