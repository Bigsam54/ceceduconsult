import React, { useState } from 'react';
import { ViewMode } from '../types';
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
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegisterViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    teachingLevel: 'Preschool (EYFS)',
    experienceYears: '5',
    qualification: 'B.Ed Early Childhood',
    salaryExpectation: '$1,200 - $1,500/mo',
    availability: 'Immediate',
    bio: ''
  });

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch (e) {
        // ignore
      }
      setStep(6);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const stepsList = [
    { num: 1, title: 'Personal' },
    { num: 2, title: 'Professional' },
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
          Complete your candidate application to get vetted by Miss Nancy.
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
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
        
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-sky-700" /> Step 1: Personal Details
            </h2>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Blessing Okon"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="blessing@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Location / City *</label>
              <input
                type="text"
                required
                placeholder="Lagos, Nigeria (Island)"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-900"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-sky-700" /> Step 2: Professional Details
            </h2>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Teaching Level Preference *</label>
              <select
                value={formData.teachingLevel}
                onChange={(e) => setFormData({ ...formData, teachingLevel: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-900"
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
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Short Teaching Bio / Summary</label>
              <textarea
                rows={3}
                placeholder="Briefly describe your classroom leadership style and passion for early childhood..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-900"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sky-700" /> Step 3: Qualifications
            </h2>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Highest Early Childhood Qualification *</label>
              <select
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-900"
              >
                <option value="B.Ed Early Childhood">B.Ed Early Childhood</option>
                <option value="EYFS Certified">EYFS Certified</option>
                <option value="Montessori Diploma">Montessori Diploma</option>
                <option value="PGDE">PGDE</option>
                <option value="Early Years Specialist">Early Years Specialist</option>
              </select>
            </div>

            <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center space-y-2">
              <Upload className="w-6 h-6 text-sky-700 mx-auto" />
              <p className="font-bold text-slate-800">Upload Credentials / CV (PDF)</p>
              <p className="text-[10px] text-slate-500">Drag & drop or click to upload demo file</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-sky-700" /> Step 4: Availability & Expectations
            </h2>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Earliest Availability *</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-900"
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

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-slate-800">
              <p><strong>Name:</strong> {formData.fullName || 'Blessing Okon'}</p>
              <p><strong>Email:</strong> {formData.email || 'blessing@example.com'}</p>
              <p><strong>Level:</strong> {formData.teachingLevel}</p>
              <p><strong>Experience:</strong> {formData.experienceYears} Years</p>
              <p><strong>Qualification:</strong> {formData.qualification}</p>
              <p><strong>Availability:</strong> {formData.availability}</p>
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
              Miss Nancy and the CEC verification team will review your application within 48 hours. You will receive an email invitation for your practical classroom simulation audit.
            </p>
            <button
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
                onClick={handlePrev}
                className="px-4 py-2.5 text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
            ) : <div />}

            <button
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
