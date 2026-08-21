import React, { useState, useRef } from 'react';
import { ViewMode } from '../types';
import { 
  LayoutDashboard, 
  Eye, 
  Briefcase, 
  Settings, 
  Award, 
  TrendingUp, 
  ArrowUpRight,
  Upload,
  Camera,
  Trash2,
  CheckCircle2,
  Sparkles,
  Save,
  GraduationCap,
  MapPin,
  DollarSign,
  BookOpen,
  FileCheck
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface TeacherDashboardViewProps {
  onNavigate: (view: ViewMode) => void;
}

const viewsData = [
  { day: 'Mon', views: 12 },
  { day: 'Tue', views: 24 },
  { day: 'Wed', views: 38 },
  { day: 'Thu', views: 29 },
  { day: 'Fri', views: 52 },
  { day: 'Sat', views: 41 },
  { day: 'Sun', views: 65 }
];

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'opportunities' | 'settings'>('overview');
  const [availability, setAvailability] = useState<'Immediate' | '2 Weeks Notice' | 'Not Available'>('Immediate');
  
  // Teacher profile state with direct image upload support
  const [profileImage, setProfileImage] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
  const [fullName, setFullName] = useState<string>('Akosua Mensah');
  const [headline, setHeadline] = useState<string>('Lead EYFS & Montessori Educator');
  const [location, setLocation] = useState<string>('Accra, Ghana (East Legon / Cantonments)');
  const [qualification, setQualification] = useState<string>('B.Ed Early Childhood + Montessori Diploma');
  const [salaryExpectation, setSalaryExpectation] = useState<string>('GH₵ 8,000 - 12,000 / month');
  const [bio, setBio] = useState<string>('Dedicated early childhood specialist with 6+ years of classroom experience. Certified in EYFS curriculum delivery, Jolly Phonics multi-sensory reading, and Montessori math sensorial methods in Accra.');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Jolly Phonics', 'EYFS Framework', 'Montessori Pedagogy', 'Sensory Play', 'Early Literacy', 'Classroom Management'
  ]);
  const [newSkillInput, setNewSkillInput] = useState<string>('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showSaveNotification('File size exceeds 5MB limit. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
          showSaveNotification('Profile picture updated successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        showSaveNotification('File size exceeds 5MB limit. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
          showSaveNotification('Profile picture uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showSaveNotification('Profile photo removed.');
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !selectedSkills.includes(newSkillInput.trim())) {
      setSelectedSkills([...selectedSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skillToRemove));
  };

  const showSaveNotification = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => {
      setSaveSuccessMessage('');
    }, 4000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showSaveNotification('Candidate profile and qualifications saved successfully!');
  };

  const initials = fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Save Success Banner */}
      {saveSuccessMessage && (
        <div className="bg-[#2ac0db]/15 border border-[#2ac0db] text-[#126373] px-4 py-3 rounded-2xl flex items-center gap-2 font-bold text-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* Top Welcome Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Avatar with click-to-upload or edit */}
          <div className="relative group shrink-0">
            {profileImage ? (
              <img
                src={profileImage}
                alt={fullName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#2ac0db] shadow-md"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0b2228] to-[#114c5a] text-white flex items-center justify-center font-heading font-extrabold text-xl sm:text-2xl border-2 border-[#2ac0db] shadow-md">
                {initials}
              </div>
            )}
            <button
              onClick={() => setActiveTab('settings')}
              className="absolute -bottom-1.5 -right-1.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 p-1.5 rounded-full shadow-md transition-transform hover:scale-110 cursor-pointer"
              title="Change Profile Photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">Welcome, {fullName}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#2ac0db]/15 text-[#126373] border border-[#2ac0db]/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> CEC Verified Teacher
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{headline} • {location}</p>
            <p className="text-[11px] text-slate-400 mt-1">Profile ID: <span className="font-mono font-bold text-slate-600">CEC-T-8492</span></p>
          </div>
        </div>

        {/* Status & Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700">Placement:</span>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1 text-xs font-bold text-slate-800 outline-none cursor-pointer focus:ring-2 focus:ring-[#2ac0db]"
            >
              <option value="Immediate">Immediate Placement</option>
              <option value="2 Weeks Notice">2 Weeks Notice</option>
              <option value="Not Available">Currently Employed</option>
            </select>
          </div>

          <button
            onClick={() => onNavigate('directory')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors cursor-pointer"
          >
            Public Directory
          </button>
        </div>
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
                    <span className="text-xs font-bold text-slate-700">Profile Status</span>
                    <Award className="w-4 h-4 text-[#2ac0db]" />
                  </div>
                  <div className="text-2xl font-extrabold text-[#126373]">100%</div>
                  <p className="text-[11px] text-[#126373] font-bold">Verified & Visible to Recruiters</p>
                </div>
              </div>

              {/* Chart: Views Over Time */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-sm">School Owner Search Views</h3>
                    <p className="text-xs text-slate-500">Impressions when school owners filter by EYFS & Montessori credentials</p>
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
                  <h3 className="font-heading font-bold text-slate-900 text-base">Recommended Preschool Opportunities</h3>
                  <p className="text-xs text-slate-500">Matched to your EYFS and Montessori qualifications</p>
                </div>
                <span className="text-xs font-bold text-[#126373] bg-[#2ac0db]/15 px-3 py-1 rounded-full border border-[#2ac0db]/30">
                  3 Open Vacancies
                </span>
              </div>
              
              {[
                { school: 'Morning Star Early Years Academy', role: 'Head Nursery Educator', location: 'East Legon, Accra', salary: 'GH₵ 9,000 - 12,000 / mo', requirements: 'EYFS + 4+ Years Experience' },
                { school: 'Lincoln Community Early Childhood', role: 'EYFS Phonics Specialist', location: 'Airport Residential, Accra', salary: 'GH₵ 10,000 - 13,500 / mo', requirements: 'Jolly Phonics Certified' },
                { school: 'Al-Rayan International Preschool', role: 'Senior Kindergarten Lead', location: 'Cantonments, Accra', salary: 'GH₵ 8,500 - 11,000 / mo', requirements: 'Montessori Diploma' }
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
                    onClick={() => showSaveNotification(`Interest registered for ${job.role} at ${job.school}. Miss Nancie's team will contact you!`)}
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
                      <div className="absolute -bottom-1 -right-1 bg-[#2ac0db] text-slate-950 p-1.5 rounded-full shadow ring-2 ring-white">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-800">{fullName}</span>
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

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs font-bold text-slate-900 hover:text-[#126373] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{profileImage ? 'Change Photo' : 'Select Photo File'}</span>
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

              {/* Profile Details Form */}
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2 mb-1">
                    <GraduationCap className="w-5 h-5 text-[#2ac0db]" />
                    Candidate Profile & Qualifications
                  </h3>
                  <p className="text-xs text-slate-500">Keep your information up-to-date for school proprietors and Miss Nancie's placement team.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Headline Role</label>
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Location & Preferred Zones</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Primary Qualification</label>
                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Salary Expectation</label>
                    <input
                      type="text"
                      value={salaryExpectation}
                      onChange={(e) => setSalaryExpectation(e.target.value)}
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
                      placeholder="Add a new skill (e.g. Jolly Phonics, EYFS Assessment)..."
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
                    className="px-6 py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-2xl shadow-md transition-all text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Changes</span>
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
