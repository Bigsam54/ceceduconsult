import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  minDuration = 1800 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [typedIndex, setTypedIndex] = useState(0);

  const fullText = "Create • Educate • Cultivate";

  useEffect(() => {
    // Typewriter effect
    const interval = setInterval(() => {
      setTypedIndex(prev => {
        if (prev < fullText.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 400);
      return () => clearTimeout(exitTimer);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-400 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-label="Loading CEC Educational Consult: Create, Educate, Cultivate"
    >
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 bg-[#2ac0db]/15 rounded-full blur-3xl pointer-events-none -top-10 -left-10" />
      <div className="absolute w-80 h-80 bg-[#fa7b2d]/10 rounded-full blur-3xl pointer-events-none -bottom-10 -right-10" />

      <div className="relative z-10 flex flex-col items-center space-y-5 px-6 max-w-md text-center animate-in fade-in zoom-in-95 duration-500">
        
        {/* Logo Display with subtle pulse */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png"
            alt="CEC Logo"
            className="w-full h-full object-contain filter drop-shadow-md"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Title and Acronym Animated Reveal */}
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white tracking-tight">
            CEC Educational Consult
          </h2>

          {/* Typewriter text for Create • Educate • Cultivate */}
          <div className="min-h-[28px] flex items-center justify-center">
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#2ac0db] inline-flex items-center">
              <span>{fullText.slice(0, typedIndex)}</span>
              <span className="w-1.5 h-4 ml-1 bg-[#fa7b2d] animate-pulse inline-block" />
            </p>
          </div>
        </div>

        {/* Dynamic Loading Bar */}
        <div className="w-36 h-1 bg-white/10 rounded-full overflow-hidden mt-3">
          <div className="h-full bg-gradient-to-r from-[#2ac0db] via-[#126373] to-[#fa7b2d] rounded-full animate-pulse w-full transition-all duration-1000" />
        </div>

        {/* Sub-label */}
        <span className="text-[11px] text-slate-400 font-medium tracking-wider uppercase">
          Empowering Early Childhood Excellence
        </span>

      </div>
    </div>
  );
};


