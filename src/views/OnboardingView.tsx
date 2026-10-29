import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  User,
  BookOpen,
  IdCard,
  CalendarClock,
  ClipboardCheck,
  PartyPopper,
  Camera,
  Loader2,
  ArrowRight,
  Minus,
  Plus,
  Phone,
  MapPin,
  CheckCircle2,
  Pencil,
  LogIn
} from 'lucide-react';
import { ViewMode } from '../types';
import { useAuth } from '../context/AuthContext';
import { useTeacherProfile, TeacherProfileRow } from '../context/TeacherProfileContext';
import { useToast } from '../context/ToastContext';
import { AppScreen, primaryCta, fieldClass, FieldLabel, ChoiceChip } from '../components/onboarding/AppScreen';
import { GhanaCardCapture, GhanaCardState, emptyGhanaCard, isGhanaCardComplete } from '../components/GhanaCardCapture';
import { uploadToCloudinary, CLOUDINARY_FOLDERS } from '../lib/cloudinary';
import { prepareImage } from '../utils/prepareImage';

interface OnboardingViewProps {
  onNavigate: (view: ViewMode) => void;
}

const LEVELS = ['Pre-school', 'Primary', 'JHS', 'Special Needs'];
const QUALIFICATIONS = ['Masters', 'Bachelors', 'PGDE', 'Diploma', 'Certificate'];
const AVAILABILITY = [
  { value: 'Immediate', label: 'Available now', description: 'Ready to start a new role straight away' },
  { value: 'Next Academic Term', label: 'Next academic term', description: 'Ready from the start of next term' },
  { value: 'Not Available', label: 'Currently employed', description: 'Open to hearing about the right opportunity' }
];
const LOCATION_SUGGESTIONS = ['Accra', 'East Legon, Accra', 'Tema', 'Kumasi', 'Takoradi', 'Cape Coast'];

// Welcome is step 0 and has no progress bar; steps 1-5 are the numbered steps
const STEPS = ['welcome', 'about', 'teaching', 'ghana-card', 'availability', 'review'] as const;
type Step = (typeof STEPS)[number];
const NUMBERED_STEPS = STEPS.length - 1;

interface Draft {
  full_name: string;
  phone: string;
  location: string;
  avatar_url: string;
  teaching_level: string;
  experience_years: number;
  qualification: string;
  availability: string;
  salary_expectation: string;
  bio: string;
}

const draftFrom = (p: TeacherProfileRow | null, fallbackName: string, fallbackAvatar: string): Draft => ({
  full_name: p?.full_name || fallbackName,
  phone: p?.phone ?? '',
  location: p?.location ?? '',
  avatar_url: p?.avatar_url || fallbackAvatar,
  teaching_level: p?.teaching_level ?? '',
  experience_years: p?.experience_years ?? 0,
  qualification: p?.qualification ?? '',
  availability: p?.availability || 'Immediate',
  salary_expectation: p?.salary_expectation ?? '',
  bio: p?.bio ?? ''
});

// Pick up where the teacher left off
const resumeStep = (p: TeacherProfileRow | null): Step => {
  if (!p || (!p.phone && !p.location)) return 'welcome';
  if (!p.full_name || !p.phone || !p.location) return 'about';
  if (!p.teaching_level || !p.qualification) return 'teaching';
  if (!p.ghana_card_front_url || !p.ghana_card_back_url) return 'ghana-card';
  return 'availability';
};

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onNavigate }) => {
  const toast = useToast();
  const { session, role, loading: authLoading, roleLoading } = useAuth();
  const { profile, loading: profileLoading, saveProfile, displayName, avatarUrl } = useTeacherProfile();

  const [step, setStep] = useState<Step>('welcome');
  const [draft, setDraft] = useState<Draft>(() => draftFrom(null, '', ''));
  const [ghanaCard, setGhanaCard] = useState<GhanaCardState>(emptyGhanaCard);
  const [replacingCard, setReplacingCard] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [finished, setFinished] = useState(false);
  const initialised = useRef(false);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  // Seed the form once the profile has loaded
  useEffect(() => {
    if (initialised.current || profileLoading || !profile) return;
    initialised.current = true;
    setDraft(draftFrom(profile, displayName, avatarUrl));
    setStep(resumeStep(profile));
  }, [profile, profileLoading, displayName, avatarUrl]);

  // Already onboarded (or an admin): nothing to do here
  useEffect(() => {
    if (finished) return;
    if (role === 'admin') onNavigate('admin-dashboard');
    else if (profile?.onboarding_completed) onNavigate('teacher-dashboard');
  }, [profile?.onboarding_completed, role, finished, onNavigate]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const stepIndex = STEPS.indexOf(step);
  const goTo = (s: Step) => setStep(s);
  const goBack = () => stepIndex > 0 && setStep(STEPS[stepIndex - 1]);
  const firstName = draft.full_name.trim().split(/\s+/)[0] || displayName.split(/\s+/)[0] || '';
  const hasSavedCard = Boolean(profile?.ghana_card_front_url && profile?.ghana_card_back_url);

  const save = async (updates: Partial<TeacherProfileRow>) => {
    setSaving(true);
    const { error } = await saveProfile(updates);
    setSaving(false);
    if (error) toast.error(error, 'Could Not Save');
    return !error;
  };

  const uploadPhoto = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose a photo.', 'Upload Failed');
      return;
    }
    setPhotoUploading(true);
    try {
      const blob = await prepareImage(file);
      const url = await uploadToCloudinary(blob, { folder: CLOUDINARY_FOLDERS.avatars, fileName: file.name });
      set('avatar_url', url);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not upload your photo.', 'Upload Failed');
    } finally {
      setPhotoUploading(false);
      if (photoInputRef.current) photoInputRef.current.value = '';
    }
  };

  const nextFromAbout = async () => {
    if (draft.full_name.trim().split(/\s+/).length < 2) return toast.error('Please enter your first and last name.', 'Full Name Needed');
    if (draft.phone.replace(/\D/g, '').length < 9) return toast.error('Please enter a valid phone or WhatsApp number.', 'Phone Needed');
    if (!draft.location.trim()) return toast.error('Please tell us where you are based.', 'Location Needed');
    if (await save({ full_name: draft.full_name.trim(), phone: draft.phone.trim(), location: draft.location.trim(), avatar_url: draft.avatar_url })) {
      goTo('teaching');
    }
  };

  const nextFromTeaching = async () => {
    if (!draft.teaching_level) return toast.error('Please choose the level you teach.', 'Teaching Level Needed');
    if (!draft.qualification.trim()) return toast.error('Please choose your highest qualification.', 'Qualification Needed');
    const headline = profile?.headline || `${draft.teaching_level} Teacher`;
    if (await save({ teaching_level: draft.teaching_level, qualification: draft.qualification.trim(), experience_years: draft.experience_years, headline })) {
      goTo('ghana-card');
    }
  };

  const nextFromGhanaCard = async () => {
    if (isGhanaCardComplete(ghanaCard)) {
      if (await save({ ghana_card_front_url: ghanaCard.front?.url ?? '', ghana_card_back_url: ghanaCard.back?.url ?? '' })) {
        setReplacingCard(false);
        goTo('availability');
      }
      return;
    }
    if (hasSavedCard && !replacingCard) return goTo('availability');
    const uploading = ghanaCard.front?.status === 'uploading' || ghanaCard.back?.status === 'uploading';
    toast.error(
      uploading ? 'Please wait for your photos to finish uploading.' : 'Please add both the front and back of your Ghana Card.',
      'Ghana Card Needed'
    );
  };

  const nextFromAvailability = async () => {
    if (await save({ availability: draft.availability, salary_expectation: draft.salary_expectation.trim(), bio: draft.bio.trim() })) {
      goTo('review');
    }
  };

  const submit = async () => {
    if (!draft.full_name.trim() || !draft.phone.trim() || !draft.location.trim()) {
      toast.error('Please complete your name, phone and location.', 'Details Missing');
      return goTo('about');
    }
    if (!draft.teaching_level || !draft.qualification.trim()) {
      toast.error('Please add your teaching level and qualification.', 'Details Missing');
      return goTo('teaching');
    }
    if (!hasSavedCard) {
      toast.error('Please add both sides of your Ghana Card before submitting.', 'Ghana Card Needed');
      return goTo('ghana-card');
    }
    if (!agreed) return toast.error('Please confirm your details and agree to the terms.', 'Agreement Needed');
    setFinished(true);
    if (await save({ onboarding_completed: true })) {
      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    } else {
      setFinished(false);
    }
  };

  /* ---------- Loading & signed-out states ---------- */
  if (authLoading || (session && (roleLoading || profileLoading))) {
    return (
      <AppScreen title="Getting things ready..." subtitle="Loading your profile.">
        <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-[#126373]" /></div>
      </AppScreen>
    );
  }

  if (!session) {
    return (
      <AppScreen
        icon={LogIn}
        title="Log in to continue"
        subtitle="Sign in to finish setting up your teacher profile."
        onClose={() => onNavigate('home')}
        footer={
          <div className="space-y-3">
            <button onClick={() => onNavigate('login')} className={primaryCta}>Log in <ArrowRight className="w-4 h-4" /></button>
            <button onClick={() => onNavigate('register')} className="w-full py-3 text-sm font-bold text-[#126373] cursor-pointer">Create an account instead</button>
          </div>
        }
      >
        <p className="text-sm text-slate-500">If you just confirmed your email, log in with the email and password you signed up with.</p>
      </AppScreen>
    );
  }

  /* ---------- Finished ---------- */
  if (finished && profile?.onboarding_completed) {
    return (
      <AppScreen
        icon={PartyPopper}
        title={firstName ? `You're all set, ${firstName}!` : "You're all set!"}
        subtitle="Your profile has been sent to the CEC team. We'll review your details and Ghana Card, usually within 48 hours."
        footer={
          <button onClick={() => onNavigate('teacher-dashboard')} className={primaryCta}>
            Go to my dashboard <ArrowRight className="w-4 h-4" />
          </button>
        }
      >
        <div className="space-y-3">
          {[
            'CEC reviews your profile and Ghana Card',
            'Once verified, schools can find you on Find a Teacher',
            'Keep your availability up to date from your dashboard'
          ].map((text, i) => (
            <div key={text} className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="w-8 h-8 rounded-full bg-[#126373] text-white text-xs font-extrabold flex items-center justify-center shrink-0">{i + 1}</span>
              <p className="text-sm text-slate-700 font-medium">{text}</p>
            </div>
          ))}
        </div>
      </AppScreen>
    );
  }

  const progress = { step: stepIndex - 1, totalSteps: NUMBERED_STEPS };
  const nextButton = (onClick: () => void, label = 'Continue') => (
    <button onClick={onClick} disabled={saving || photoUploading} className={primaryCta}>
      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
      {saving ? 'Saving...' : label} {!saving && <ArrowRight className="w-4 h-4" />}
    </button>
  );

  /* ---------- Steps ---------- */
  switch (step) {
    case 'welcome':
      return (
        <AppScreen
          animationKey={step}
          icon={Sparkles}
          title={firstName ? `Welcome, ${firstName}!` : 'Welcome to CEC!'}
          subtitle="Let's set up your teacher profile. It takes about 3 minutes, and you can stop and come back any time."
          footer={nextButton(() => goTo('about'), "Let's get started")}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">You'll need</p>
          <div className="space-y-2.5">
            {[
              { icon: Phone, text: 'Your phone or WhatsApp number' },
              { icon: BookOpen, text: 'Your teaching level and qualification' },
              { icon: IdCard, text: 'Your Ghana Card (front and back)' },
              { icon: Camera, text: 'A clear photo of yourself (optional)' }
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <Icon className="w-5 h-5 text-[#126373] shrink-0" />
                <p className="text-sm text-slate-700 font-medium">{text}</p>
              </div>
            ))}
          </div>
        </AppScreen>
      );

    case 'about':
      return (
        <AppScreen
          animationKey={step}
          {...progress}
          onBack={goBack}
          icon={User}
          title="Tell us about you"
          subtitle="This is how schools and the CEC team will know you."
          footer={nextButton(nextFromAbout)}
        >
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => photoInputRef.current?.click()} className="relative shrink-0 cursor-pointer" aria-label="Add profile photo">
                {draft.avatar_url ? (
                  <img src={draft.avatar_url} alt="" className="w-20 h-20 rounded-full object-cover ring-4 ring-[#126373]/10" referrerPolicy="no-referrer" />
                ) : (
                  <span className="w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                    <Camera className="w-7 h-7" />
                  </span>
                )}
                {photoUploading && (
                  <span className="absolute inset-0 rounded-full bg-slate-950/50 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-white" /></span>
                )}
                <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#126373] text-white flex items-center justify-center ring-2 ring-white">
                  <Plus className="w-4 h-4" />
                </span>
              </button>
              <div>
                <p className="text-sm font-bold text-slate-800">Profile photo</p>
                <p className="text-xs text-slate-500">Optional, but profiles with a friendly photo get noticed more.</p>
              </div>
              <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => uploadPhoto(e.target.files?.[0])} />
            </div>

            <div>
              <FieldLabel>Full name</FieldLabel>
              <input value={draft.full_name} onChange={(e) => set('full_name', e.target.value)} autoComplete="name" placeholder="e.g. Akosua Mensah" className={fieldClass} />
            </div>
            <div>
              <FieldLabel>Phone / WhatsApp number</FieldLabel>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                <input type="tel" inputMode="tel" autoComplete="tel" value={draft.phone} onChange={(e) => set('phone', e.target.value)} placeholder="024 123 4567" className={`${fieldClass} pl-11`} />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">Only the CEC team sees this. It's never shown publicly.</p>
            </div>
            <div>
              <FieldLabel>Where are you based?</FieldLabel>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                <input value={draft.location} onChange={(e) => set('location', e.target.value)} placeholder="e.g. Osu, Accra" className={`${fieldClass} pl-11`} />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {LOCATION_SUGGESTIONS.map((loc) => (
                  <button key={loc} type="button" onClick={() => set('location', loc)} className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#126373]/10 text-xs font-semibold text-slate-600 cursor-pointer">
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AppScreen>
      );

    case 'teaching':
      return (
        <AppScreen
          animationKey={step}
          {...progress}
          onBack={goBack}
          icon={BookOpen}
          title="Your teaching"
          subtitle="This helps us match you with the right schools."
          footer={nextButton(nextFromTeaching)}
        >
          <div className="space-y-6">
            <div>
              <FieldLabel>Which level do you teach?</FieldLabel>
              <div className="grid grid-cols-2 gap-2.5">
                {LEVELS.map((level) => (
                  <ChoiceChip key={level} selected={draft.teaching_level === level} onClick={() => set('teaching_level', level)}>{level}</ChoiceChip>
                ))}
              </div>
            </div>

            <div>
              <FieldLabel>Years of teaching experience</FieldLabel>
              <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 border border-slate-200">
                <button type="button" onClick={() => set('experience_years', Math.max(0, draft.experience_years - 1))} className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 cursor-pointer" aria-label="Fewer years">
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-lg font-extrabold text-slate-900">
                  {draft.experience_years} <span className="text-sm font-semibold text-slate-500">{draft.experience_years === 1 ? 'year' : 'years'}</span>
                </span>
                <button type="button" onClick={() => set('experience_years', Math.min(50, draft.experience_years + 1))} className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 cursor-pointer" aria-label="More years">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <FieldLabel>Highest qualification</FieldLabel>
              <div className="grid grid-cols-2 gap-2.5">
                {QUALIFICATIONS.map((q) => (
                  <ChoiceChip key={q} selected={draft.qualification === q || draft.qualification.startsWith(`${q} `)} onClick={() => set('qualification', q)}>{q}</ChoiceChip>
                ))}
              </div>
              <input
                value={QUALIFICATIONS.includes(draft.qualification) ? '' : draft.qualification}
                onChange={(e) => set('qualification', e.target.value)}
                placeholder="Or type it, e.g. B.Ed Early Childhood (UCC)"
                className={`${fieldClass} mt-2.5`}
              />
            </div>
          </div>
        </AppScreen>
      );

    case 'ghana-card':
      return (
        <AppScreen
          animationKey={step}
          {...progress}
          onBack={goBack}
          icon={IdCard}
          title="Verify your identity"
          subtitle="Take a photo of the front and back of your Ghana Card. Only the CEC team sees it."
          footer={nextButton(nextFromGhanaCard)}
        >
          {hasSavedCard && !replacingCard ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800 font-medium">Your Ghana Card is uploaded. You can continue, or replace it if the photos weren't clear.</p>
              </div>
              <button type="button" onClick={() => setReplacingCard(true)} className="text-sm font-bold text-[#126373] hover:underline cursor-pointer">Replace my Ghana Card</button>
            </div>
          ) : (
            <GhanaCardCapture value={ghanaCard} onChange={setGhanaCard} />
          )}
        </AppScreen>
      );

    case 'availability':
      return (
        <AppScreen
          animationKey={step}
          {...progress}
          onBack={goBack}
          icon={CalendarClock}
          title="Availability & about you"
          subtitle="Let schools know when you can start and what makes you a great teacher."
          footer={nextButton(nextFromAvailability)}
        >
          <div className="space-y-6">
            <div>
              <FieldLabel>When can you start?</FieldLabel>
              <div className="grid gap-2.5">
                {AVAILABILITY.map((opt) => (
                  <ChoiceChip key={opt.value} selected={draft.availability === opt.value} onClick={() => set('availability', opt.value)} description={opt.description}>
                    {opt.label}
                  </ChoiceChip>
                ))}
              </div>
            </div>
            <div>
              <FieldLabel optional>Expected monthly salary</FieldLabel>
              <input value={draft.salary_expectation} onChange={(e) => set('salary_expectation', e.target.value)} placeholder="e.g. GH₵ 3,000 - 4,500" className={fieldClass} />
            </div>
            <div>
              <FieldLabel optional>Short bio</FieldLabel>
              <textarea
                rows={4}
                value={draft.bio}
                onChange={(e) => set('bio', e.target.value)}
                placeholder="A few lines about your teaching style and what you love about teaching."
                className={`${fieldClass} resize-none`}
              />
            </div>
          </div>
        </AppScreen>
      );

    case 'review': {
      const rows: { label: string; value: string; edit: Step }[] = [
        { label: 'Name', value: draft.full_name, edit: 'about' },
        { label: 'Phone', value: draft.phone, edit: 'about' },
        { label: 'Location', value: draft.location, edit: 'about' },
        { label: 'Teaching level', value: draft.teaching_level, edit: 'teaching' },
        { label: 'Experience', value: `${draft.experience_years} ${draft.experience_years === 1 ? 'year' : 'years'}`, edit: 'teaching' },
        { label: 'Qualification', value: draft.qualification, edit: 'teaching' },
        { label: 'Ghana Card', value: hasSavedCard ? 'Front & back uploaded' : 'Missing', edit: 'ghana-card' },
        { label: 'Availability', value: AVAILABILITY.find((a) => a.value === draft.availability)?.label ?? draft.availability, edit: 'availability' }
      ];
      return (
        <AppScreen
          animationKey={step}
          {...progress}
          onBack={goBack}
          icon={ClipboardCheck}
          title="Review & submit"
          subtitle="Check everything looks right, then send your profile to the CEC team."
          footer={nextButton(submit, 'Submit my profile')}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-[#126373] to-[#0b2228] text-white">
              {draft.avatar_url ? (
                <img src={draft.avatar_url} alt="" className="w-14 h-14 rounded-full object-cover ring-2 ring-white/30" referrerPolicy="no-referrer" />
              ) : (
                <span className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center font-extrabold text-lg">
                  {draft.full_name.split(/\s+/).map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              )}
              <div className="min-w-0">
                <p className="font-heading font-bold truncate">{draft.full_name}</p>
                <p className="text-xs text-[#2ac0db] font-semibold">{draft.teaching_level} Teacher</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100">
              {rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{row.label}</p>
                    <p className={`text-sm font-semibold truncate ${row.value === 'Missing' ? 'text-rose-600' : 'text-slate-800'}`}>{row.value || '—'}</p>
                  </div>
                  <button onClick={() => goTo(row.edit)} className="p-2 rounded-full text-slate-400 hover:text-[#126373] hover:bg-slate-50 cursor-pointer" aria-label={`Edit ${row.label}`}>
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <label className="flex items-start gap-3 text-xs text-slate-600 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#126373]" />
              <span>
                I confirm these details are true, and I agree to the{' '}
                <button type="button" onClick={() => onNavigate('terms')} className="font-bold text-[#126373] hover:underline">Terms of Service</button> and{' '}
                <button type="button" onClick={() => onNavigate('privacy')} className="font-bold text-[#126373] hover:underline">Privacy Policy</button>.
              </span>
            </label>
          </div>
        </AppScreen>
      );
    }
  }
};
