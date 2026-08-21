import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  minDuration = 900 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 350);
      return () => clearTimeout(exitTimer);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-350 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-label="Loading CEC Educational Consult"
    >
      <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in-95 duration-400">
        {/* Simple Logo Display */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png"
            alt="CEC Logo"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Minimalist Subtitle */}
        <div className="text-center space-y-1">
          <h2 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">
            CEC Educational Consult
          </h2>
          <p className="text-[11px] text-slate-400 font-medium">
            Early Childhood Education
          </p>
        </div>

        {/* Simple Subtle Loading Bar */}
        <div className="w-24 h-0.5 bg-slate-100 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-[#2ac0db] rounded-full animate-pulse w-full" />
        </div>
      </div>
    </div>
  );
};

