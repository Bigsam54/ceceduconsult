import React from 'react';
import { ArrowLeft, X } from 'lucide-react';

const LOGO_URL = 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png';

interface AppScreenProps {
  /** 0-based index of the current step and total steps; omit to hide the progress bar */
  step?: number;
  totalSteps?: number;
  onBack?: () => void;
  onClose?: () => void;
  icon?: React.ElementType;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  /** Sticky bottom action area (primary button etc.) */
  footer?: React.ReactNode;
  /** Changes on every step so the content animates in */
  animationKey?: string | number;
}

/**
 * Mobile-app style screen used for sign-up and onboarding: full screen on phones
 * with a sticky bottom action, a centred card on larger screens.
 */
export const AppScreen: React.FC<AppScreenProps> = ({
  step,
  totalSteps,
  onBack,
  onClose,
  icon: Icon,
  title,
  subtitle,
  children,
  footer,
  animationKey
}) => (
  <div className="min-h-[100dvh] bg-gradient-to-br from-[#e8f7fa] via-white to-[#fff3ea] sm:flex sm:items-center sm:justify-center sm:p-6">
    <div className="relative w-full sm:max-w-lg min-h-[100dvh] sm:min-h-0 bg-white sm:rounded-[2rem] sm:shadow-2xl sm:border sm:border-slate-200/80 flex flex-col overflow-hidden">

      {/* Top bar */}
      <div className="px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-3 flex items-center justify-between gap-3">
        {onBack ? (
          <button onClick={onBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer" aria-label="Back">
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <img src={LOGO_URL} alt="CEC Educational Consult" className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
        )}

        {typeof step === 'number' && totalSteps ? (
          <div className="flex-1 flex items-center gap-1.5 max-w-[220px]">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-[#126373]' : 'bg-slate-200'}`}
              />
            ))}
          </div>
        ) : (
          <span className="flex-1" />
        )}

        {onClose ? (
          <button onClick={onClose} className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        ) : (
          <span className="w-10" />
        )}
      </div>

      {/* Content */}
      <div key={animationKey} className="flex-1 px-6 pb-6 pt-2 animate-screen-in">
        {Icon && (
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2ac0db] to-[#126373] text-white flex items-center justify-center shadow-lg shadow-[#2ac0db]/25 mb-5">
            <Icon className="w-7 h-7" />
          </div>
        )}
        {typeof step === 'number' && totalSteps && (
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#126373] mb-1.5">Step {step + 1} of {totalSteps}</p>
        )}
        <h1 className="text-2xl sm:text-[1.7rem] font-heading font-extrabold text-slate-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-2 leading-relaxed">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>

      {/* Sticky action area */}
      {footer && (
        <div className="sticky bottom-0 px-6 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur border-t border-slate-100">
          {footer}
        </div>
      )}
    </div>
  </div>
);

export const primaryCta =
  'w-full py-4 rounded-2xl bg-[#126373] hover:bg-[#0e4f5c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#126373]/20 transition-all active:scale-[0.99] cursor-pointer';

export const fieldClass =
  'w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#126373] focus:ring-4 focus:ring-[#126373]/10 transition-all';

export const FieldLabel: React.FC<{ children: React.ReactNode; optional?: boolean }> = ({ children, optional }) => (
  <label className="block text-xs font-bold text-slate-700 mb-1.5">
    {children} {optional && <span className="font-medium text-slate-400">(optional)</span>}
  </label>
);

/** Large tappable option, used for levels, qualifications and availability */
export const ChoiceChip: React.FC<{ selected: boolean; onClick: () => void; children: React.ReactNode; description?: string }> = ({
  selected,
  onClick,
  children,
  description
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-left px-4 py-3 rounded-2xl border-2 transition-all cursor-pointer ${
      selected ? 'border-[#126373] bg-[#126373]/5 text-[#126373]' : 'border-slate-200 text-slate-700 hover:border-slate-300'
    }`}
  >
    <span className="block text-sm font-bold">{children}</span>
    {description && <span className="block text-[11px] text-slate-500 font-medium mt-0.5">{description}</span>}
  </button>
);
