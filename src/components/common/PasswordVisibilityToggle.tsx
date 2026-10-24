import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordVisibilityToggleProps {
  visible: boolean;
  onToggle: () => void;
}

// Eye button that sits inside the right edge of a `relative` password field wrapper
export const PasswordVisibilityToggle: React.FC<PasswordVisibilityToggleProps> = ({ visible, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
    aria-label={visible ? 'Hide password' : 'Show password'}
    title={visible ? 'Hide password' : 'Show password'}
  >
    {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
  </button>
);
