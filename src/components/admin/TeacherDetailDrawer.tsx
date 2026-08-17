import React, { useState } from 'react';
import { Teacher, AvailabilityStatus } from '../../types';
import { 
  X, 
  CheckCircle2, 
  GraduationCap, 
  MapPin, 
  DollarSign, 
  Phone, 
  Mail, 
  ShieldCheck, 
  FileText, 
  Video, 
  Building2, 
  Briefcase, 
  Save, 
  ExternalLink,
  Award,
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface TeacherDetailDrawerProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (teacherId: string, availability: AvailabilityStatus, isVerified: boolean, adminNotes?: string) => void;
}

export const TeacherDetailDrawer: React.FC<TeacherDetailDrawerProps> = ({
  teacher,
  isOpen,
  onClose,
  onUpdateStatus
}) => {
  const [currentAvailability, setCurrentAvailability] = useState<AvailabilityStatus>(teacher?.availability || 'available');
  const [isVerified, setIsVerified] = useState<boolean>(teacher?.isVerified || false);
  const [adminNotes, setAdminNotes] = useState<string>(teacher?.adminNotes || '');
  const [assignedSchool, setAssignedSchool] = useState<string>(teacher?.currentPlacedSchool || '');
  const [saveBanner, setSaveBanner] = useState<boolean>(false);

  // Sync state whenever selected teacher changes
  React.useEffect(() => {
    if (teacher) {
      setCurrentAvailability(teacher.availability);
      setIsVerified(teacher.isVerified);
      setAdminNotes(teacher.adminNotes || '');
      setAssignedSchool(teacher.currentPlacedSchool || '');
    }
  }, [teacher]);

  if (!isOpen || !teacher) return null;

  const handleSave = () => {
    onUpdateStatus(teacher.id, currentAvailability, isVerified, adminNotes);
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 3000);
  };

  const initials = teacher.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div 
        onClick={() => onClose()}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Main Slide-Up Modal Dialog (Sliding from bottom instead of right) */}
      <div className="relative w-full max-w-3xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center font-extrabold text-sm shadow-xs">
              CEC
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg text-slate-900">
                Teacher Profile & Details
              </h2>
              <p className="text-xs text-slate-500">
                View qualifications, contact info, and update work availability
              </p>
            </div>
          </div>
          <button 
            onClick={() => onClose()}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {saveBanner && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Teacher profile and availability updated successfully!</span>
            </div>
          )}

          {/* Teacher Summary Card */}
          <div className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200/90 hidden sm:flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative shrink-0">
              {teacher.photo ? (
                <img 
                  src={teacher.photo} 
                  alt={teacher.name}
                  className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover ring-4 ring-white shadow-md"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br from-[#0b2228] to-[#114c5a] text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
                  {initials}
                </div>
              )}
              {isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-[#2ac0db] text-slate-950 p-1 rounded-full shadow ring-2 ring-white" title="Verified Teacher">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-heading font-extrabold text-xl text-slate-900">
                  {teacher.name}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  isVerified ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-900 border border-amber-200'
                }`}>
                  {isVerified ? 'Verified by Miss Nancy' : 'Pending Verification'}
                </span>
              </div>

              <p className="text-xs font-bold text-[#126373]">{teacher.title}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {teacher.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {teacher.experienceYears}+ Years Teaching Experience
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  Salary Expectation: {teacher.salaryExpectation}
                </span>
              </div>
            </div>
          </div>

          {/* Work Availability & Verification */}
          <div className="bg-[#2ac0db]/10 p-5 rounded-2xl border border-[#2ac0db]/30 space-y-4 hidden sm:block">
            <h4 className="font-heading font-bold text-sm text-[#126373] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2ac0db]" />
              Work Availability & Verification Settings
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Availability Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Is this teacher currently ready to work?
                </label>
                <select
                  value={currentAvailability}
                  onChange={(e) => setCurrentAvailability(e.target.value as AvailabilityStatus)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                >
                  <option value="Immediate">🟢 Ready immediately</option>
                  <option value="2 Weeks Notice">🟡 Needs 2 weeks notice</option>
                  <option value="Next Academic Term">🔵 Looking for next term (Sept / Jan)</option>
                  <option value="Placed / Employed">🟣 Already placed in a school</option>
                  <option value="On Leave">⚪ On leave / Not active right now</option>
                </select>
              </div>

              {/* Verification Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Miss Nancy Verification Status
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsVerified(true)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isVerified ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Teacher
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsVerified(false)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      !isVerified ? 'bg-amber-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    Not Verified Yet
                  </button>
                </div>
              </div>
            </div>

            {/* School Placement Name */}
            <div className="pt-2 border-t border-[#2ac0db]/20">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                School Name (If already placed or hired)
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Grange School Early Years, Ikeja"
                  value={assignedSchool}
                  onChange={(e) => setAssignedSchool(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900 hidden sm:flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#126373]" />
              Contact Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a 
                href={`https://wa.me/${teacher.contactWhatsappNumber.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl hidden sm:flex items-center justify-between text-xs font-bold text-emerald-900 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-[10px]">WA</span>
                  <span>WhatsApp: {teacher.contactWhatsappNumber}</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
              </a>

              <a 
                href={`mailto:${teacher.email}`}
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl hidden sm:flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="truncate max-w-[200px]">{teacher.email}</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Teaching Qualifications & Document Checks */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#126373]" />
              Qualifications & Background Checks
            </h4>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                <span className="font-medium text-slate-600">Educational Degree</span>
                <span className="font-bold text-slate-900">{teacher.qualification}</span>
              </div>
              <div className="hidden sm:flex items-center justify-between py-1 border-b border-slate-200/60">
                <span className="font-medium text-slate-600">Teaching License (TRCN)</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified and Active
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                <span className="font-medium text-slate-600">Police Character Check</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Clean Background Checked
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                <span className="font-medium text-slate-600">Classroom Teaching Demo Video</span>
                <span className="font-bold text-[#126373] flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" /> Reviewed & Approved (94%)
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="font-medium text-slate-600">Reviewed By</span>
                <span className="font-bold text-slate-900">Miss Nancy (Lead Consultant)</span>
              </div>
            </div>
          </div>

          {/* Key Skills */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-sm text-slate-900">
              Teaching Skills & Methods
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {teacher.skills.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Private Admin Notes */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-sm text-slate-900">
              Private Notes
            </h4>
            <textarea
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add any helpful notes about this teacher's interviews, personality, or suitable school types..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 sticky bottom-0 z-10">
          <button
            type="button"
            onClick={() => onClose()}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Profile Changes
          </button>
        </div>

      </div>
    </div>
  );
};
