import React, { useState } from 'react';
import { ViewMode } from '../types';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import {
  Lock,
  Mail,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';

interface LoginViewProps {
  onNavigate: (view: ViewMode) => void;
  onLoginSuccess: (portal: 'teacher' | 'admin') => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate, onLoginSuccess }) => {
  const toast = useToast();
  const { signIn, signInWithGoogle, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.', 'Sign In Required');
      return;
    }

    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);

    if (error) {
      toast.error(error, 'Sign In Failed');
      return;
    }

    toast.success('Welcome back! Logged into Teacher Dashboard successfully.', 'Authentication Successful');
    onLoginSuccess('teacher');
  };

  const handleGoogleSignIn = async () => {
    setGoogleSubmitting(true);
    const { error } = await signInWithGoogle('teacher');
    setGoogleSubmitting(false);
    if (error) {
      toast.error(error, 'Google Sign-In Failed');
    }
    // On success, Supabase redirects the browser to Google, so nothing else to do here.
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">

        {/* Left Illustration / Marketing Panel */}
        <div className="bg-gradient-to-br from-sky-950 via-sky-900 to-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden">
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

            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white leading-tight">
              Welcome Back to CEC Educational Consult
            </h2>

            <p className="text-slate-300 text-xs leading-relaxed">
              Access candidate profiles, management tools, teacher applications and Miss Nancie's consultation schedules.
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
            <h3 className="text-2xl font-heading font-bold text-slate-900">Teacher Sign In</h3>
            <p className="text-xs text-slate-500">Enter your credentials to manage your teacher profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold text-slate-700">Password</label>
                <span className="text-[11px] font-semibold text-sky-700 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-sky-700 hover:bg-sky-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{submitting ? 'Signing In...' : 'Login to Teacher Dashboard'}</span>
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleSubmitting}
            className="w-full py-3 bg-white hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed text-slate-800 font-bold text-xs rounded-xl border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.42-.22-2.05H12v3.72h6.6c-.13 1.05-.86 2.63-2.47 3.7l-.02.15 3.59 2.7.25.02c2.28-2.05 3.57-5.07 3.57-8.24z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.05 7.93-2.86l-3.78-2.87c-1.02.7-2.38 1.18-4.15 1.18-3.18 0-5.87-2.05-6.83-4.9l-.14.01-3.73 2.8-.05.13C3.24 21.3 7.28 24 12 24z" />
              <path fill="#FBBC05" d="M5.17 14.55A6.9 6.9 0 0 1 4.8 12c0-.89.16-1.75.36-2.55L5.15 9.4 1.38 6.53l-.12.06A12 12 0 0 0 0 12c0 1.94.47 3.77 1.26 5.4l3.91-2.85z" />
              <path fill="#EA4335" d="M12 4.75c2.26 0 3.78.94 4.65 1.73l3.39-3.3C17.94 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.26 6.6l3.9 2.85c.97-2.85 3.66-4.7 6.84-4.7z" />
            </svg>
            <span>{googleSubmitting ? 'Connecting...' : `Continue with Google`}</span>
          </button>

          <div className="pt-2 text-center text-xs text-slate-500">
            Don't have a teacher profile?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-sky-800 font-bold hover:underline cursor-pointer"
            >
              Join Network Here
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
