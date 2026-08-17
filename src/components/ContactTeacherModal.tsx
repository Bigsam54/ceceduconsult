import React, { useState } from 'react';
import { Teacher } from '../types';
import { 
  X, 
  MessageCircle, 
  Copy, 
  Check, 
  Send, 
  ShieldCheck, 
  Building2, 
  User, 
  Phone, 
  Calendar 
} from 'lucide-react';

interface ContactTeacherModalProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactTeacherModal: React.FC<ContactTeacherModalProps> = ({ teacher, isOpen, onClose }) => {
  if (!isOpen || !teacher) return null;

  const [schoolName, setSchoolName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [requestedDate, setRequestedDate] = useState('');
  const [copied, setCopied] = useState(false);

  const initials = teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  const defaultMessage = `Hello Miss Nancy (CEC Consults),\n\nI am ${contactPerson || '[Your Name]'} representing ${schoolName || '[School Name]'}.\n\nWe viewed the verified profile for ${teacher.name} (${teacher.title}, ${teacher.teachingLevel}) on CEC Teacher Network.\n\nWe would like to request candidate details and schedule an interview on ${requestedDate || '[Target Date]'}.\n\nPlease reach us back at ${phone || '[Phone]'}.\n\nThank you!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const encoded = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/2348012345678?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-950 p-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2ac0db] flex items-center justify-center text-slate-950 font-bold">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#2ac0db]">
                <ShieldCheck className="w-3.5 h-3.5" /> Placement Inquiry
              </span>
              <h3 className="text-base font-heading font-bold text-white">
                Request Interview for {teacher.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          
          {/* Candidate Card Summary */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#0b2228] text-white flex items-center justify-center font-bold text-xs">
                {initials}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{teacher.name}</h4>
                <p className="text-slate-500 text-[11px]">{teacher.title} • {teacher.teachingLevel}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 bg-[#2ac0db]/15 text-[#126373] text-[10px] font-bold rounded">
                {teacher.availability}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">{teacher.experienceYears} Yrs Exp.</p>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Mrs. Folashade"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">School Name *</label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Meadowland Preschool"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Phone / WhatsApp *</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Interview Date</label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={requestedDate}
                  onChange={(e) => setRequestedDate(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Generated Message Preview */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-700">Message Preview:</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[#126373] hover:text-[#2ac0db] font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={4}
              value={defaultMessage}
              className="w-full p-2.5 bg-slate-100/80 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-700 leading-relaxed resize-none focus:outline-none"
            />
          </div>

          {/* Direct CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="w-full sm:flex-1 py-2.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send WhatsApp to CEC Office</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
