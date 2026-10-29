import React, { useState } from 'react';
import { ViewMode } from '../types';
import { useToast } from '../context/ToastContext';
import { useAuth, INTENDED_PORTAL_KEY } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { AppScreen, primaryCta, fieldClass, FieldLabel } from '../components/onboarding/AppScreen';
import { PasswordVisibilityToggle } from '../components/common/PasswordVisibilityToggle';
import { Sparkles, ShieldCheck, Briefcase, GraduationCap, MailCheck, Loader2, ArrowRight, User, Mail, Lock } from 'lucide-react';

interface RegisterViewProps {
  onNavigate: (view: ViewMode) => void;
}

const GoogleLogo: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

type Screen = 'start' | 'email' | 'check-inbox';

/**
 * Step one of joining: create the account. Everything else (details, teaching
 * info, Ghana Card) happens in the onboarding steps right after, for both
 * Google and email sign-ups.
 */
export const RegisterView: React.FC<RegisterViewProps> = ({ onNavigate }) => {
  const toast = useToast();
  const { signInWithGoogle, isConfigured } = useAuth();
  const [screen, setScreen] = useState<Screen>('start');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const notConnected = () => toast.error('Sign-up is not available right now. Please try again shortly.', 'Not Connected');

  const handleGoogle = async () => {
    if (!isConfigured) return notConnected();
    setGoogleSubmitting(true);
    const { error } = await signInWithGoogle('teacher');
    setGoogleSubmitting(false);
    if (error) toast.error(error, 'Google Sign-Up Failed');
    // On success the browser goes to Google, then returns and continues to onboarding
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return notConnected();
    if (fullName.trim().split(/\s+/).length < 2) {
      toast.error('Please enter your first and last name.', 'Full Name Needed');
      return;
    }
    if (password.length < 6) {
      toast.error('Your password must be at least 6 characters.', 'Password Too Short');
      return;
    }
    if (!agreed) {
      toast.error('Please agree to the Terms of Service and Privacy Policy.', 'Agreement Needed');
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim() },
        // The confirmation link brings them straight into onboarding
        emailRedirectTo: `${window.location.origin}/onboarding`
      }
    });
    setSubmitting(false);

    if (error) {
      toast.error(error.message, 'Sign-Up Failed');
      return;
    }
    if (data.session) {
      // Email confirmation is switched off: continue immediately
      onNavigate('onboarding');
      return;
    }
    try {
      localStorage.setItem(INTENDED_PORTAL_KEY, 'teacher');
    } catch {
      // ignore
    }
    setScreen('check-inbox');
  };

  const resendEmail = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/onboarding` }
    });
    if (error) toast.error(error.message, 'Could Not Resend');
    else toast.success('We have sent the confirmation email again.', 'Email Sent');
  };

  if (screen === 'check-inbox') {
    return (
      <AppScreen
        icon={MailCheck}
        title="Check your inbox"
        subtitle={<>We sent a confirmation link to <span className="font-bold text-slate-800">{email}</span>. Tap it to confirm your email and continue setting up your profile.</>}
        onClose={() => onNavigate('home')}
        footer={
          <button onClick={() => onNavigate('login')} className={primaryCta}>
            I've confirmed, log me in <ArrowRight className="w-4 h-4" />
          </button>
        }
      >
        <div className="space-y-3 text-sm text-slate-600">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <p className="font-bold text-slate-800">Can't find it?</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Check your spam or promotions folder.</li>
              <li>Make sure the email address above is correct.</li>
            </ul>
          </div>
          <button onClick={resendEmail} className="text-sm font-bold text-[#126373] hover:underline cursor-pointer">Resend confirmation email</button>
        </div>
      </AppScreen>
    );
  }

  if (screen === 'email') {
    return (
      <AppScreen
        title="Create your account"
        subtitle="You'll add your teaching details and Ghana Card next."
        onBack={() => setScreen('start')}
        onClose={() => onNavigate('home')}
        footer={
          <button type="submit" form="register-form" disabled={submitting} className={primaryCta}>
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {submitting ? 'Creating your account...' : 'Create Account'}
          </button>
        }
      >
        <form id="register-form" onSubmit={handleEmailSignUp} className="space-y-4">
          <div>
            <FieldLabel>Full name</FieldLabel>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              <input required autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Akosua Mensah" className={`${fieldClass} pl-11`} />
            </div>
          </div>
          <div>
            <FieldLabel>Email address</FieldLabel>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={`${fieldClass} pl-11`} />
            </div>
          </div>
          <div>
            <FieldLabel>Password</FieldLabel>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              <input
                required
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className={`${fieldClass} pl-11 pr-12`}
              />
              <PasswordVisibilityToggle visible={showPassword} onToggle={() => setShowPassword(!showPassword)} />
            </div>
          </div>
          <label className="flex items-start gap-3 text-xs text-slate-600 cursor-pointer pt-1">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#126373]" />
            <span>
              I agree to the{' '}
              <button type="button" onClick={() => onNavigate('terms')} className="font-bold text-[#126373] hover:underline">Terms of Service</button> and{' '}
              <button type="button" onClick={() => onNavigate('privacy')} className="font-bold text-[#126373] hover:underline">Privacy Policy</button>.
            </span>
          </label>
        </form>
      </AppScreen>
    );
  }

  return (
    <AppScreen
      title={<>Join the CEC<br />Teacher Network</>}
      subtitle="Get verified, get discovered by top schools in Ghana, and grow your teaching career."
      onClose={() => onNavigate('home')}
      footer={
        <div className="space-y-3">
          <button onClick={handleGoogle} disabled={googleSubmitting} className="w-full py-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-800 font-bold text-sm flex items-center justify-center gap-3 transition-colors cursor-pointer disabled:opacity-60">
            {googleSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleLogo />}
            {googleSubmitting ? 'Connecting to Google...' : 'Continue with Google'}
          </button>
          <button onClick={() => setScreen('email')} className={primaryCta}>
            <Mail className="w-4 h-4" /> Sign up with email
          </button>
          <p className="text-center text-xs text-slate-500 pt-1">
            Already have an account?{' '}
            <button onClick={() => onNavigate('login')} className="font-bold text-[#126373] hover:underline cursor-pointer">Log in</button>
          </p>
        </div>
      }
    >
      <div className="space-y-3">
        {[
          { icon: ShieldCheck, title: 'Get CEC Verified', text: 'Your Ghana Card and credentials are checked once, then trusted by schools.' },
          { icon: Briefcase, title: 'Get matched to schools', text: 'Schools contact CEC about you. Your phone number is never public.' },
          { icon: GraduationCap, title: 'Grow with CEC', text: 'Workshops, mentorship and updates from the CEC team.' }
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#126373] flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
        <p className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
          <Sparkles className="w-3.5 h-3.5 text-[#fa7b2d]" /> Setting up your profile takes about 3 minutes.
        </p>
      </div>
    </AppScreen>
  );
};
