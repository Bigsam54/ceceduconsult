import React, { useState } from 'react';
import { ViewMode } from '../types';
import { 
  GraduationCap, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

interface LoginViewProps {
  onNavigate: (view: ViewMode) => void;
  onLoginSuccess: (portal: 'teacher' | 'admin') => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('amina.bello@cecteachers.org');
  const [password, setPassword] = useState('••••••••••••');
  const [accountType, setAccountType] = useState<'teacher' | 'admin'>('teacher');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(accountType);
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

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs font-bold border border-sky-400/30">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Portal Access
            </span>

            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white leading-tight">
              Welcome Back to CEC Educational Consult
            </h2>

            <p className="text-slate-300 text-xs leading-relaxed">
              Access candidate profiles, management tools, teacher applications, and Miss Nancie's consultation schedules.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-xs space-y-1">
            <p className="font-bold text-sky-300">Demo Login Quick Access</p>
            <p className="text-slate-300">Choose <strong>Teacher Dashboard</strong> or <strong>Admin Portal</strong> above to test full features instantly.</p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-heading font-bold text-slate-900">Sign In</h3>
            <p className="text-xs text-slate-500">Enter your credentials to manage your account.</p>
          </div>

          {/* Account Type Toggle */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setAccountType('teacher');
                setEmail('amina.bello@cecteachers.org');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                accountType === 'teacher'
                  ? 'bg-sky-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Teacher Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setAccountType('admin');
                setEmail('miss.nancy@ceceduconsult.org');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                accountType === 'admin'
                  ? 'bg-sky-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin Portal
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Login to {accountType === 'teacher' ? 'Teacher Dashboard' : 'Admin Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

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

