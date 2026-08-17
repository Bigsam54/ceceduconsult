import React, { useState } from 'react';
import { safeOpenUrl } from '../utils/safeWindow';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send, 
  Clock, 
  CheckCircle2,
  Building2,
  User,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const launchWhatsApp = () => {
    const text = `Hello Miss Nancy / CEC Consults (Ghana)!\n\nI am ${formData.name || 'a visitor'} from ${formData.schoolName || 'our school'}.\n\nMessage: ${formData.message || 'I would like to inquire about your teacher recruitment, reading club, and consultancy services.'}`;
    safeOpenUrl(`https://wa.me/233540390029?text=${encodeURIComponent(text)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0d3842] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/20 shadow-2xl space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2ac0db]/15 border border-[#2ac0db]/30 rounded-full text-xs font-bold text-[#2ac0db]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Accra, Ghana Headquarters</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
          Contact CEC Educational Consults
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
          Have questions about teacher recruitment in Ghana, school setup, reading clubs, or consulting with Miss Nancy? We are here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-8 lg:p-10 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-heading font-bold text-slate-900">Send Us a Direct Message</h2>

          {submitted ? (
            <div className="p-6 sm:p-8 text-center space-y-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#2ac0db]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-slate-600 text-xs">
                Thank you for contacting CEC Consults. Miss Nancy's team in Accra will respond to your inquiry within 24 business hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mrs. Akosua Mensah"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">School Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Morning Star Early Years"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
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

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="contact@school.edu.gh"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Inquiry Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can Miss Nancy & CEC Consults assist your school, teaching career, or child literacy in Ghana?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={launchWhatsApp}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 bg-[#2ac0db]/15 text-[#126373] font-bold rounded-xl flex items-center justify-center gap-2 border border-[#2ac0db]/30 cursor-pointer text-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#126373]" />
                  <span>Instant WhatsApp Chat</span>
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry Form</span>
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Right: Info & Map */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          
          <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5 shadow-md">
            <h3 className="font-heading font-bold text-base sm:text-lg text-[#2ac0db]">CEC Office Headquarters (Ghana)</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2ac0db] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-200">Accra Office Location</strong>
                  <span className="text-slate-400">CEC Consults Hub, East Legon / Airport Residential Area, Accra, Ghana</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#2ac0db] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-200">Phone & WhatsApp Lines</strong>
                  <div className="text-slate-300 space-y-1 mt-1 font-semibold">
                    <p>+233 54 039 0029 (Primary / WhatsApp)</p>
                    <p>+233 20 685 5347</p>
                    <p>+233 24 935 6337</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#2ac0db] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-200">Email</strong>
                  <span className="text-slate-400">contact@ceceduconsults.org</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#2ac0db] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-200">Business Hours</strong>
                  <span className="text-slate-400">Monday - Friday: 8:00 AM - 5:00 PM (GMT)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Visual Badge */}
          <div className="bg-slate-100 rounded-3xl overflow-hidden h-40 sm:h-44 relative flex items-center justify-center text-center p-6 border border-slate-200">
            <div className="space-y-1">
              <MapPin className="w-7 h-7 text-[#fa7b2d] mx-auto animate-bounce" />
              <p className="font-bold text-slate-800 text-xs">CEC Ghana HQ • East Legon, Accra</p>
              <p className="text-[10px] text-slate-500">Advisory, Teacher Placement & Training Center</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
