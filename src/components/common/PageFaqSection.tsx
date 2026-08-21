import React, { useState } from 'react';
import { FAQItem } from '../../types';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface PageFaqSectionProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  faqs: FAQItem[];
  className?: string;
}

export const PageFaqSection: React.FC<PageFaqSectionProps> = ({
  title = 'Frequently Asked Questions',
  subtitle = 'Clear answers to common questions about our programs, standards, and services.',
  badgeText = 'Knowledge & Guidance',
  faqs,
  className = ''
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className={`bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-2xs space-y-8 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {subtitle}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
          <HelpCircle className="w-4 h-4 text-[#126373]" />
          <span>{faqs.length} Questions Answered</span>
        </div>
      </div>

      <div className="divide-y divide-slate-100 space-y-2">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={faq.id || idx} 
              className={`rounded-2xl transition-all ${isOpen ? 'bg-slate-50/80 border border-slate-200/80 p-4 sm:p-5 my-3 shadow-2xs' : 'p-3 sm:p-4 hover:bg-slate-50/50'}`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full flex items-center justify-between gap-4 text-left font-heading font-bold text-sm sm:text-base text-slate-900 hover:text-[#126373] transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center font-extrabold shrink-0 transition-colors ${
                    isOpen ? 'bg-[#2ac0db] text-slate-950 shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {idx + 1}
                  </span>
                  <span>{faq.question}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#126373]' : ''}`} />
              </button>

              {isOpen && (
                <div className="mt-3 pl-9 pr-2 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
