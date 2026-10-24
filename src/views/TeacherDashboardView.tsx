import React, { useState, useRef, useEffect } from 'react';
import { ViewMode } from '../types';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { useTeacherProfile } from '../hooks/useTeacherProfile';
import { uploadToCloudinary, CLOUDINARY_FOLDERS } from '../lib/cloudinary';
import { GhanaCardCapture, GhanaCardState, emptyGhanaCard, isGhanaCardComplete } from '../components/GhanaCardCapture';
import {
  LayoutDashboard,
  Eye,
  Briefcase,
  Award,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Upload,
  Camera,
  Trash2,
  CheckCircle2,
  Circle,
  Save,
  GraduationCap,
  MapPin,
  BookOpen,
  LogOut,
  Loader2,
  Users,
  PenLine,
  ShieldCheck,
  Clock,
  XCircle,
  IdCard
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface TeacherDashboardViewProps {
  onNavigate: (view: ViewMode) => void;
}

type PlacementStatus = 'Immediate' | 'Next Academic Term' | 'Not Available';

const viewsData = [
  { day: 'Mon', views: 12 },
  { day: 'Tue', views: 24 },
  { day: 'Wed', views: 38 },
  { day: 'Thu', views: 29 },
  { day: 'Fri', views: 52 },
  { day: 'Sat', views: 41 },
  { day: 'Sun', views: 65 }
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({ onNavigate }) => {
  const toast = useToast();
  const { signOut } = useAuth();
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    saveProfile,
    displayName,
    firstName,
    avatarUrl,
    initials
  } = useTeacherProfile();
  const [activeTab, setActiveTab] = useState<'overview' | 'opportunities' | 'settings'>('overview');
  const [availability, setAvailability] = useState<PlacementStatus>('Immediate');

  // Teacher profile state - seeded from the real Supabase row once it loads
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [photoUploading, setPhotoUploading] = useState(false);
  const [fullName, setFullName] = useState<string>('');
  const [headline, setHeadline] = useState<string>('');
  const [teachingLevel, setTeachingLevel] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [qualification, setQualification] = useState<string>('');
  const [salaryExpectation, setSalaryExpectation] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [newSkillInput, setNewSkillInput] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [ghanaCard, setGhanaCard] = useState<GhanaCardState>(emptyGhanaCard);
  const [replacingCard, setReplacingCard] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // While a new photo uploads, show the local preview; otherwise the saved one
  const profileImage = photoPreview || avatarUrl;

  // Populate the editable fields once the real profile row has loaded
  useEffect(() => {
    if (!profile) return;
    setFullName(profile.full_name || displayName);
    setHeadline(profile.headline);
    setTeachingLevel(profile.teaching_level);
    setLocation(profile.location);
    setQualification(profile.qualification);
    setSalaryExpectation(profile.salary_expectation);
    setBio(profile.bio);
    setSelectedSkills(profile.skills ?? []);
    setAvailability(profile.availability as PlacementStatus);
  }, [profile]);

  // Once both sides finish uploading, save them to the profile for CEC to review
  useEffect(() => {
    if (!isGhanaCardComplete(ghanaCard)) return;
    saveProfile({
      ghana_card_front_url: ghanaCard.front?.url ?? '',
      ghana_card_back_url: ghanaCard.back?.url ?? ''
    }).then(({ error }) => {
      if (error) {
        toast.error(error, 'Could Not Save Ghana Card');
        return;
      }
      toast.success('Your Ghana Card has been saved and sent to the CEC team for verification.', 'Ghana Card Saved');
      setGhanaCard(emptyGhanaCard);
      setReplacingCard(false);
    });
  }, [ghanaCard.front?.url, ghanaCard.back?.url]);

  const uploadPhoto = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file (PNG, JPG or WEBP).', 'Upload Failed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit. Please choose a smaller image.', 'Upload Failed');
      return;
    }

    const preview = URL.createObjectURL(file);
    setPhotoPreview(preview);
    setPhotoUploading(true);
    try {
      const url = await uploadToCloudinary(file, { folder: CLOUDINARY_FOLDERS.avatars, fileName: file.name });
      const { error } = await saveProfile({ avatar_url: url });
      if (error) throw new Error(error);
      toast.success('Your new profile photo is live on your profile.', 'Photo Updated');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not upload your photo.', 'Upload Failed');
    } finally {
      setPhotoUploading(false);
      setPhotoPreview('');
      URL.revokeObjectURL(preview);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadPhoto(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) uploadPhoto(file);
  };

  const handleRemovePhoto = async () => {
    const { error } = await saveProfile({ avatar_url: '' });
    if (error) {
      toast.error(error, 'Could Not Remove Photo');
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Profile photo removed.');
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !selectedSkills.includes(newSkillInput.trim())) {
      setSelectedSkills([...selectedSkills, newSkillInput.trim()]);
      setNewSkillInput('');
      toast.success(`Skill "${newSkillInput.trim()}" added to your profile.`);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skillToRemove));
    toast.info(`Removed "${skillToRemove}" from skills list.`);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await saveProfile({
      full_name: fullName,
      headline,
      teaching_level: teachingLevel,
      location,
      qualification,
      salary_expectation: salaryExpectation,
      bio,
      skills: selectedSkills
    });
    setSaving(false);

    if (error) {
      toast.error(error, 'Save Failed');
      return;
    }
    toast.success('Candidate profile, qualifications and teaching level saved successfully!', 'Profile Updated');
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully from Teacher Portal.', 'Logged Out');
    onNavigate('home');
  };

  // Profile strength is based on what schools and the CEC team need to see
  const completionItems = [
    { label: 'Profile photo', done: Boolean(avatarUrl) },
    { label: 'Full name', done: Boolean(profile?.full_name) },
    { label: 'Professional title', done: Boolean(profile?.headline) },
    { label: 'Teaching level', done: Boolean(profile?.teaching_level) },
    { label: 'Location', done: Boolean(profile?.location) },
    { label: 'Qualification', done: Boolean(profile?.qualification) },
    { label: 'Teaching bio', done: Boolean(profile?.bio) },
    { label: 'Skills & methods', done: (profile?.skills?.length ?? 0) > 0 },
    { label: 'Ghana Card', done: Boolean(profile?.ghana_card_front_url && profile?.ghana_card_back_url) }
  ];
  const completedCount = completionItems.filter((item) => item.done).length;
  const completionPercent = Math.round((completedCount / completionItems.length) * 100);
  const missingItems = completionItems.filter((item) => !item.done);

  const hasSavedCard = Boolean(profile?.ghana_card_front_url && profile?.ghana_card_back_url);
  const verificationStatus = profile?.verification_status ?? 'pending';
  const verificationBadge = {
    approved: { label: 'CEC Verified', icon: ShieldCheck, className: 'bg-emerald-400/15 border-emerald-300/30 text-emerald-200' },
    pending: { label: hasSavedCard ? 'Verification in review' : 'Verification pending', icon: Clock, className: 'bg-amber-400/15 border-amber-300/30 text-amber-200' },
    rejected: { label: 'Verification unsuccessful', icon: XCircle, className: 'bg-rose-400/15 border-rose-300/30 text-rose-200' }
  }[verificationStatus];
  const VerificationIcon = verificationBadge.icon;

  const placementLabel: Record<PlacementStatus, string> = {
    'Immediate': 'Available Immediately',
    'Next Academic Term': 'Available Next Term',
    'Not Available': 'Currently Employed'
  };

  if (profileLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#2ac0db]" />
        <p className="text-sm text-slate-500 font-semibold">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {profileError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl p-4">
          Couldn't load your profile from the database: {profileError}. If this is your first time here, make sure the
          teacher_profiles table has been created in Supabase (see supabase/migrations/0001_teacher_profiles.sql).
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Personalised Welcome Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2228] via-[#114c5a] to-[#126373] text-white shadow-xl">
        <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-[#2ac0db]/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 left-1/3 w-72 h-72 rounded-full bg-[#fa7b2d]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#2ac0db] via-[#fa7b2d] to-[#2ac0db]" />

        <div className="relative p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">

            {/* Avatar with quick photo change */}
            <div className="relative group shrink-0 self-start sm:self-auto">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={displayName || 'Your profile photo'}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-white/20 shadow-xl"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#2ac0db] to-[#126373] text-white flex items-center justify-center font-heading font-extrabold text-2xl sm:text-3xl ring-4 ring-white/20 shadow-xl">
                  {initials}
                </div>
              )}
              {photoUploading && (
                <div className="absolute inset-0 rounded-3xl bg-slate-950/50 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={photoUploading}
                className="absolute -bottom-1.5 -right-1.5 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white p-2 rounded-full shadow-lg ring-4 ring-[#114c5a] transition-transform hover:scale-110 cursor-pointer"
                title="Change Profile Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2ac0db]">{getGreeting()}</p>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                {firstName ? `Welcome back, ${firstName}!` : 'Welcome to your CEC dashboard!'}
              </h1>
              <p className="text-sm text-slate-200/90 font-medium">
                {headline || 'Add your professional title so schools know your speciality'}
                {location && (
                  <span className="inline-flex items-center gap-1 ml-2 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-[#fa7b2d]" /> {location}
                  </span>
                )}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white/10 border border-white/15 text-white flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#2ac0db]" /> CEC Teacher Network
                </span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border flex items-center gap-1 ${verificationBadge.className}`}>
                  <VerificationIcon className="w-3 h-3" /> {verificationBadge.label}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-400/15 border border-emerald-300/30 text-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {placementLabel[availability] ?? availability}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#fa7b2d]/15 border border-[#fa7b2d]/30 text-orange-200">
                  Profile {completionPercent}% complete
                </span>
              </div>
            </div>
          </div>

          {/* Status & Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 pl-3 rounded-2xl border border-white/15">
              <span className="text-xs font-bold text-slate-200">Placement</span>
              <select
                value={availability}
                onChange={async (e) => {
                  const val = e.target.value as PlacementStatus;
                  setAvailability(val);
                  const { error } = await saveProfile({ availability: val });
                  if (error) {
                    toast.error(error, 'Status Update Failed');
                  } else {
                    toast.info(`Placement status updated to "${placementLabel[val]}".`, 'Status Updated');
                  }
                }}
                className="bg-white border-0 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 outline-none cursor-pointer focus:ring-2 focus:ring-[#2ac0db]"
              >
                <option value="Immediate">Immediate</option>
                <option value="Next Academic Term">Next Academic Term</option>
                <option value="Not Available">Currently Employed</option>
              </select>
            </div>

            <button
              onClick={() => setActiveTab('settings')}
              className="px-4 py-2.5 bg-white text-slate-900 hover:bg-[#2ac0db] font-bold text-xs rounded-2xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 bg-white/10 hover:bg-rose-500/20 text-white font-bold text-xs rounded-2xl border border-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Log Out of Teacher Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {!displayName && (
          <div className="relative border-t border-white/10 bg-white/5 px-6 sm:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-xs text-slate-200">Add your full name so schools and the CEC team can recognise you.</p>
            <button
              onClick={() => setActiveTab('settings')}
              className="text-xs font-bold text-[#2ac0db] hover:text-white flex items-center gap-1 cursor-pointer"
            >
              Add my name <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Menu */}
        <aside className="lg:col-span-3 space-y-2 bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            Teacher Portal Navigation
          </div>
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#2ac0db]" />
            <span>Overview & Stats</span>
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'opportunities'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-[#2ac0db]" />
              <span>Matching School Jobs</span>
            </div>
            <span className="px-2 py-0.5 bg-[#2ac0db] text-slate-950 font-extrabold text-[10px] rounded-full">
              3 New
            </span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Camera className="w-4 h-4 text-[#2ac0db]" />
              <span>Photo & Profile Settings</span>
            </div>
            {profileImage ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            ) : (
              <span className="px-1.5 py-0.2 bg-[#fa7b2d]/15 text-[#aa4407] text-[9px] font-bold rounded">Upload Photo</span>
            )}
          </button>
        </aside>

        {/* Right Dashboard Body */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold text-slate-700">Profile Views</span>
                    <Eye className="w-4 h-4 text-[#126373]" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">261</div>
                  <p className="text-[11px] text-[#126373] font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +34% this week from School Owners
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold text-slate-700">Interview Requests</span>
                    <Briefcase className="w-4 h-4 text-[#fa7b2d]" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">4</div>
                  <p className="text-[11px] text-slate-500 font-medium">Pending Miss Nancie's schedule</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold text-slate-700">Profile Strength</span>
                    <Award className="w-4 h-4 text-[#2ac0db]" />
                  </div>
                  <div className="text-2xl font-extrabold text-[#126373]">{completionPercent}%</div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#2ac0db] to-[#126373] transition-all duration-500"
                      style={{ width: `${completionPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#126373] font-bold">
                    {missingItems.length === 0 ? 'Complete & ready for schools' : `${missingItems.length} item${missingItems.length === 1 ? '' : 's'} left to complete`}
                  </p>
                </div>
              </div>

              {/* Personal checklist of what's still missing */}
              {missingItems.length > 0 && (
                <div className="bg-gradient-to-br from-[#fa7b2d]/10 via-white to-[#2ac0db]/10 p-5 sm:p-6 rounded-3xl border border-[#fa7b2d]/20 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                        {firstName ? `${firstName}, your profile is almost there` : 'Your profile is almost there'}
                      </h3>
                      <p className="text-xs text-slate-500">Complete profiles get noticed by school owners much faster.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className="shrink-0 px-4 py-2.5 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold text-xs rounded-xl shadow-md shadow-[#fa7b2d]/25 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Complete My Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {completionItems.map((item) => (
                      <span
                        key={item.label}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border ${
                          item.done
                            ? 'bg-white/70 border-emerald-200 text-emerald-700'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        {item.done ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> : <Circle className="w-3.5 h-3.5 shrink-0 text-slate-300" />}
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Chart: Views Over Time */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-sm">School Owner Search Views</h3>
                    <p className="text-xs text-slate-500">Impressions when school owners filter by EYFS & Early Childhood credentials</p>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">Last 7 Days</span>
                </div>
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={viewsData}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2ac0db" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#2ac0db" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip />
                      <Area type="monotone" dataKey="views" stroke="#126373" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: OPPORTUNITIES */}
          {activeTab === 'opportunities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base">Recommended Early Childhood Opportunities</h3>
                  <p className="text-xs text-slate-500">Matched to your EYFS and early childhood qualifications</p>
                </div>
                <span className="text-xs font-bold text-[#126373] bg-[#2ac0db]/15 px-3 py-1 rounded-full border border-[#2ac0db]/30">
                  3 Open Vacancies
                </span>
              </div>
              
              {[
                { school: 'Morning Star Early Years Academy', role: 'Head Nursery Educator', location: 'East Legon, Accra', salary: 'GH₵ 9,000 - 12,000 / mo', requirements: 'EYFS + 4+ Years Experience' },
                { school: 'Lincoln Community Early Childhood', role: 'EYFS Phonics Specialist', location: 'Airport Residential, Accra', salary: 'GH₵ 10,000 - 13,500 / mo', requirements: 'Synthetic Phonics Certified' },
                { school: 'Al-Rayan International Early Learning', role: 'Senior Kindergarten Lead', location: 'Cantonments, Accra', salary: 'GH₵ 8,500 - 11,000 / mo', requirements: 'Early Childhood Diploma' }
              ].map((job, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{job.role}</h4>
                      <span className="px-2 py-0.2 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-200">Verified School</span>
                    </div>
                    <p className="text-xs font-semibold text-[#126373]">{job.school} • {job.location}</p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                      <span>Salary: <strong className="text-slate-800">{job.salary}</strong></span>
                      <span>•</span>
                      <span>Requires: {job.requirements}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => toast.success(`Interest registered for ${job.role} at ${job.school}. Miss Nancie's placement team notified!`, 'Application Sent')}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-[#126373] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                  >
                    <span>Express Interest</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#2ac0db]" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SETTINGS & PHOTO UPLOAD */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-8">
              
              {/* Photo Upload Section */}
              <div className="space-y-4 border-b border-slate-100 pb-8">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
                      <Camera className="w-5 h-5 text-[#2ac0db]" />
                      Profile Picture & Photo Upload
                    </h3>
                    <p className="text-xs text-slate-500">Upload a professional headshot. High-quality photos increase school interview invitations by 45%.</p>
                  </div>
                  {profileImage && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Photo</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Photo Preview */}
                  <div className="md:col-span-4 flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="relative mb-3">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile Preview"
                          className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-lg bg-slate-200"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-[#0b2228] to-[#114c5a] flex items-center justify-center text-white font-heading font-extrabold text-3xl sm:text-4xl shadow-lg border-4 border-white">
                          {initials}
                        </div>
                      )}
                      {photoUploading ? (
                        <div className="absolute inset-0 rounded-3xl bg-slate-950/50 flex items-center justify-center">
                          <Loader2 className="w-7 h-7 animate-spin text-white" />
                        </div>
                      ) : (
                        <div className="absolute -bottom-1 -right-1 bg-[#2ac0db] text-slate-950 p-1.5 rounded-full shadow ring-2 ring-white">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-800">{fullName || 'Your Name'}</span>
                    <span className="text-[10px] text-slate-500">Live Directory Preview</span>
                  </div>

                  {/* Dropzone & Buttons */}
                  <div className="md:col-span-8 space-y-3">
                    
                    {/* Drag and Drop Zone */}
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-[#2ac0db] bg-slate-50/70 hover:bg-[#2ac0db]/5 p-6 rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-[#126373] group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          Click to select a photo <span className="text-slate-400 font-normal">or drag and drop</span>
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, JPEG or WEBP (Max 5MB)</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs font-bold text-slate-900 hover:text-[#126373] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{photoUploading ? 'Uploading...' : profileImage ? 'Change Photo' : 'Select Photo File'}</span>
                      </button>
                      
                      {profileImage && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Ghana Card Verification */}
              <div className="space-y-4 border-b border-slate-100 pb-8">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
                      <IdCard className="w-5 h-5 text-[#2ac0db]" />
                      Ghana Card Verification
                    </h3>
                    <p className="text-xs text-slate-500">
                      {verificationStatus === 'approved'
                        ? 'Your identity has been verified by the CEC team.'
                        : verificationStatus === 'rejected'
                        ? 'The CEC team could not verify your Ghana Card. Please upload clearer photos of both sides.'
                        : hasSavedCard
                        ? 'Thank you! The CEC team is reviewing your Ghana Card.'
                        : 'Add the front and back of your Ghana Card so the CEC team can verify your identity.'}
                    </p>
                  </div>
                  {hasSavedCard && !replacingCard && (
                    <button
                      type="button"
                      onClick={() => setReplacingCard(true)}
                      className="text-xs font-bold text-slate-900 hover:text-[#126373] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Replace Ghana Card</span>
                    </button>
                  )}
                </div>

                {hasSavedCard && !replacingCard ? (
                  <div className="grid grid-cols-2 gap-3 max-w-lg">
                    {(['front', 'back'] as const).map((side) => {
                      const url = side === 'front' ? profile?.ghana_card_front_url : profile?.ghana_card_back_url;
                      return (
                        <div key={side} className="space-y-1">
                          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200" style={{ aspectRatio: 85.6 / 54 }}>
                            {url && /\.pdf($|\?)/i.test(url) ? (
                              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">PDF uploaded</span>
                            ) : (
                              <img src={url} alt={`Ghana Card ${side}`} className="absolute inset-0 w-full h-full object-cover" />
                            )}
                            <span className="absolute top-2 right-2 p-1 rounded-full bg-emerald-500 text-white shadow">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold text-slate-500 capitalize">{side}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <GhanaCardCapture value={ghanaCard} onChange={setGhanaCard} />
                    {replacingCard && (
                      <button
                        type="button"
                        onClick={() => {
                          setReplacingCard(false);
                          setGhanaCard(emptyGhanaCard);
                        }}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        Cancel and keep my current Ghana Card
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Profile Details Form */}
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2 mb-1">
                    <GraduationCap className="w-5 h-5 text-[#2ac0db]" />
                    Candidate Profile, Teaching Level & Qualifications
                  </h3>
                  <p className="text-xs text-slate-500">Keep your information up-to-date for school proprietors and Miss Nancie's placement team.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Akosua Mensah"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Headline Professional Title *</label>
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="e.g. Lead EYFS & Early Childhood Educator"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                      required
                    />
                  </div>

                  {/* Location free text with pre-filled examples */}
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Current Location & Preferred Zones *
                      </label>
                      <span className="text-[10px] text-slate-400">Type freely or choose a suggestion</span>
                    </div>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Osu, Accra or Odumase, Krobo"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                        required
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] text-slate-500 font-semibold">Examples:</span>
                      {['Osu, Accra', 'Odumase, Krobo', 'East Legon, Accra', 'Cantonments, Accra', 'Tema / Spintex', 'Kumasi', 'Takoradi'].map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setLocation(loc)}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-[#2ac0db]/20 text-slate-700 hover:text-slate-900 text-[10px] font-medium transition-colors border border-slate-200 cursor-pointer"
                        >
                          + {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Teaching Level free text with pre-filled examples */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Teaching Level & Focus Age Group *
                      </label>
                      <span className="text-[10px] text-slate-400">Type your level</span>
                    </div>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={teachingLevel}
                        onChange={(e) => setTeachingLevel(e.target.value)}
                        placeholder="e.g. Pre-school (Nursery & KG), Primary, JHS or Special Needs"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                        required
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {['Pre-school (Nursery & KG)', 'Primary', 'JHS', 'Special Needs'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setTeachingLevel(lvl)}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-[#2ac0db]/20 text-slate-700 hover:text-slate-900 text-[10px] font-medium transition-colors border border-slate-200 cursor-pointer"
                        >
                          + {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Qualification free text with pre-filled examples */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Primary Qualifications & Certifications *
                      </label>
                      <span className="text-[10px] text-slate-400">Type your qualifications</span>
                    </div>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        placeholder="e.g. Masters in Education, B.Ed, PGDE, Diploma or Certificate"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                        required
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {['Masters in Education', 'Bachelors (B.Ed)', 'PGDE', 'Diploma in Education', 'Teaching Certificate'].map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => setQualification(q)}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-[#2ac0db]/20 text-slate-700 hover:text-slate-900 text-[10px] font-medium transition-colors border border-slate-200 cursor-pointer"
                        >
                          + {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Salary Expectation</label>
                    <input
                      type="text"
                      value={salaryExpectation}
                      onChange={(e) => setSalaryExpectation(e.target.value)}
                      placeholder="e.g. GH₵ 8,000 - 12,000 / month"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Professional Bio & Teaching Philosophy</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                    />
                  </div>
                </div>

                {/* Skills Tag Management */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700">Competencies & Methodologies</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-slate-400 hover:text-rose-600 font-bold cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-2 max-w-md">
                    <input
                      type="text"
                      placeholder="Add a new skill (e.g. Synthetic Phonics, EYFS Assessment)..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2ac0db]"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-[#2ac0db] hover:bg-[#22a8c0] disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-bold rounded-2xl shadow-md transition-all text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
                  </button>
                </div>

              </form>

            </div>
          )}

        </main>

      </div>

    </div>
  );
};
