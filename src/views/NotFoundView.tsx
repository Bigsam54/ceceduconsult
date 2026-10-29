import React from 'react';
import { Compass, Home, Users, PhoneCall } from 'lucide-react';
import { ViewMode } from '../types';

interface NotFoundViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => (
  <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center space-y-6">
    <div className="w-16 h-16 rounded-2xl bg-[#126373]/10 text-[#126373] flex items-center justify-center mx-auto">
      <Compass className="w-8 h-8" />
    </div>
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-widest text-[#126373]">Page not found</p>
      <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900">We couldn't find that page</h1>
      <p className="text-sm sm:text-base text-slate-500">The link may be old or mistyped. Here are some good places to start.</p>
    </div>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <button onClick={() => onNavigate('home')} className="w-full sm:w-auto px-5 py-3 bg-[#126373] hover:bg-[#0e4f5c] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer">
        <Home className="w-4 h-4" /> Go to Home
      </button>
      <button onClick={() => onNavigate('directory')} className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 flex items-center justify-center gap-2 cursor-pointer">
        <Users className="w-4 h-4" /> Find a Teacher
      </button>
      <button onClick={() => onNavigate('contact')} className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 flex items-center justify-center gap-2 cursor-pointer">
        <PhoneCall className="w-4 h-4" /> Contact Us
      </button>
    </div>
  </div>
);
