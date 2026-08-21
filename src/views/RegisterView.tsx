import React, { useState, useRef } from 'react';
import { ViewMode } from '../types';
import { safeScrollToTop } from '../utils/safeWindow';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  Sparkles, 
  Upload, 
  ShieldCheck,
  Check,
  Camera,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegisterViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: 'East Legon, Accra',
    teachingLevel: 'Preschool (EYFS)',
    experienceYears: '5',
    qualification: 'B.Ed Early Childhood',
    salaryExpectation: 'GH₵ 8,000 - 12,000 / month',
    availability: 'Immediate',
    bio: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('File size exceeds 5MB limit. Please choose a smaller photo.');
        return;
      }
      setUploadError('');
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
      safeScrollToTop();
    } else {
      // Complete
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch {
        // ignore
      }
      setStep(6);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      safeScrollToTop();
    }
  };

  const stepsList = [
    { num: 1, title: 'Personal & Photo' },
    { num: 2, title: 'Experience' },
    { num: 3, title: 'Qualifications' },
    { num: 4, title: 'Availability' },
    { num: 5, title: 'Submit' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-1.5 sm:space-y-2">
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
          Join the CEC Teacher Network
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Complete your application to get vetted by Miss Nancie and placed in top preschools in Accra.
        </p>
      </div>

      {step <= 5 && (
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between text-xs font-bold">
          {stepsList.map((s) => (
            <div key={s.num} className="flex items-center gap-1.5">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs ${
                step === s.num
                  ? 'bg-[#2ac0db] text-slate-950 shadow-xs'
                  : step > s.num
                  ? 'bg-[#2ac0db]/20 text-[#126373]'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {step > s.num ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
              </span>
              <span className={`hidden sm:inline ${step === s.num ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Wizard Box */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
        
        {step === 1 && (
          <div className="space-y-5 text-xs">
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-[#2ac0db]" /> Step 1: Personal Details & Photo
            </h2>

            {/* Profile Photo Upload Field */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
              <div className="relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Teacher Preview"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-[#2ac0db] shadow-md"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                    <Camera className="w-8 h-8" />
                  </div>
                )}
                {profileImage && (
                  <button
                    type="button"
                    onClick={() => setProfileImage('')}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-rose-600 text-white rounded-full flex items-center justify-center shadow hover:bg-rose-700"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="flex-1 space-y-1 text-center sm:text-left">
                <p className="font-bold text-slate-800 text-xs">Upload Your Profile Picture</p>
                <p className="text-[11px] text-slate-500">A clear, friendly photo helps schools connect with you faster.</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1 px-3.5 py-1.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl text-[11px] flex items-center gap-1.5 mx-auto sm:mx-0 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{profileImage ? 'Change Photo' : 'Select Photo'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Akosua Mensah"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="akosua@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+233 54 039 0029"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Location in Ghana *</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
              >
                <option value="East Legon, Accra">East Legon, Accra</option>
                <option value="Airport Residential / Cantonments, Accra">Airport Residential / Cantonments, Accra</option>
                <option value="Tema / Spintex, Accra">Tema / Spintex, Accra</option>
                <option value="Osu / Labone, Accra">Osu / Labone, Accra</option>
                <option value="Kumasi, Ashanti Region">Kumasi, Ashanti Region</option>
                <option value="Takoradi, Western Region">Takoradi, Western Region</option>
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#2ac0db]" /> Step 2: Professional Experience
            </h2>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Teaching Level Preference *</label>
              <select
                value={formData.teachingLevel}
                onChange={(e) => setFormData({ ...formData, teachingLevel: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
              >
                <option value="Preschool (EYFS)">Preschool (EYFS)</option>
                <option value="Nursery">Nursery</option>
                <option value="Kindergarten">Kindergarten</option>
                <option value="Lower Primary">Lower Primary</option>
                <option value="Special Needs (SEN)">Special Needs (SEN)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Years of Teaching Experience *</label>
              <input
                type="number"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Short Teaching Bio / Summary</label>
              <textarea
                rows={3}
                placeholder="Briefly describe your classroom leadership style and passion for early childhood..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#2ac0db]" /> Step 3: Qualifications
            </h2>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Highest Early Childhood Qualification *</label>
              <select
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
              >
                <option value="B.Ed Early Childhood">B.Ed Early Childhood</option>
                <option value="EYFS Certified">EYFS Certified</option>
                <option value="Montessori Diploma">Montessori Diploma</option>
                <option value="PGDE">PGDE</option>
                <option value="Early Years Specialist">Early Years Specialist</option>
              </select>
            </div>

            <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center space-y-2">
              <Upload className="w-6 h-6 text-[#126373] mx-auto" />
              <p className="font-bold text-slate-800">Upload Credentials / CV (PDF or Word)</p>
              <p className="text-[10px] text-slate-500">You can also provide physical copies during your interview</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#2ac0db]" /> Step 4: Availability & Expectations
            </h2>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Earliest Availability *</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
              >
                <option value="Immediate">Immediate</option>
                <option value="2 Weeks Notice">2 Weeks Notice</option>
                <option value="Next Academic Term">Next Academic Term</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Expected Monthly Salary Range</label>
              <input
                type="text"
                value={formData.salaryExpectation}
                onChange={(e) => setFormData({ ...formData, salaryExpectation: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#126373]" /> Step 5: Review Your Profile
            </h2>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-slate-800">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-12 h-12 rounded-xl object-cover border border-[#2ac0db]" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                    {formData.fullName ? formData.fullName.substring(0, 2).toUpperCase() : 'AM'}
                  </div>
                )}
                <div>
                  <p className="font-bold text-sm text-slate-900">{formData.fullName || 'Akosua Mensah'}</p>
                  <p className="text-xs text-slate-500">{formData.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <p><strong>Email:</strong> {formData.email || 'akosua@example.com'}</p>
                <p><strong>Phone:</strong> {formData.phone || '+233 54 039 0029'}</p>
                <p><strong>Level:</strong> {formData.teachingLevel}</p>
                <p><strong>Experience:</strong> {formData.experienceYears} Years</p>
                <p><strong>Qualification:</strong> {formData.qualification}</p>
                <p><strong>Availability:</strong> {formData.availability}</p>
                <p className="col-span-2"><strong>Salary:</strong> {formData.salaryExpectation}</p>
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-[#2ac0db]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Application Submitted!</h2>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Miss Nancie and the CEC verification team in Accra will review your application within 48 hours. You will receive an invitation for your classroom simulation audit.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('teacher-dashboard')}
              className="px-6 py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer"
            >
              Proceed to Teacher Dashboard Demo
            </button>
          </div>
        )}

        {step <= 5 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2.5 text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>{step === 5 ? 'Submit Application' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
