import React, { useState } from 'react';
import { ViewMode } from '../types';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import {
  Lock,
  Mail,
  ArrowRight,
  AlertTriangle,
  ShieldAlert
} from 'lucide-react';

interface AdminLoginViewProps {
  onNavigate: (view: ViewMode) => void;
  onLoginSuccess: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onNavigate, onLoginSuccess }) => {
  const toast = useToast();
  const { signIn, signOut, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.', 'Sign In Required');
      return;
    }

    setSubmitting(true);
    const { error } = await signIn(email, password);

    if (error) {
      setSubmitting(false);
      toast.error(error, 'Sign In Failed');
      return;
    }

    // Confirm this specific account actually has the admin role before letting it through.
    const { data: userData } = await supabase!.auth.getUser();
    const userId = userData.user?.id;
    const { data: roleRow } = await supabase!
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    setSubmitting(false);

    if (roleRow?.role !== 'admin') {
      await signOut();
      toast.error('This account does not have admin access.', 'Access Denied');
      return;
    }

    toast.success('Welcome back, Admin!', 'Authentication Successful');
    onLoginSuccess();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">

        {/* Left Panel */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#1a1005] text-white p-8 sm:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden">
          <div className="space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer inline-block"
            >
              <img
                src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png"
                alt="CEC Consult"
                className="h-18 sm:h-22 w-auto max-w-[260px] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fa7b2d]/20 border border-[#fa7b2d]/40 rounded-full text-[#fa7b2d] text-xs font-extrabold uppercase tracking-wide">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Access Only</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white leading-tight">
              CEC Admin Center
            </h2>

            <p className="text-slate-300 text-xs leading-relaxed">
              This portal is restricted to authorized CEC Educational Consult staff. If you're a teacher, use the
              regular Login page instead.
            </p>
          </div>

          {!isConfigured && (
            <div className="p-4 bg-amber-500/15 rounded-2xl border border-amber-400/30 text-xs space-y-1 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-300">Backend Not Connected Yet</p>
                <p className="text-slate-300">Logins won't work until a Supabase project is connected.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Form Panel */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-heading font-bold text-slate-900">Admin Sign In</h3>
            <p className="text-xs text-slate-500">Enter your administrator credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="admin@ceceduconsult.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{submitting ? 'Signing In...' : 'Login to Admin Center'}</span>
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
