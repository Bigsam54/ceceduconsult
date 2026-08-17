import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send, 
  Clock, 
  CheckCircle2,
  Building2,
  User
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
    } catch (e) {
      // ignore
    }
  };

  const launchWhatsApp = () => {
    const text = `Hello Miss Nancy / CEC Consults!\n\nI am ${formData.name || 'a visitor'} from ${formData.schoolName || 'our school'}.\n\nMessage: ${formData.message || 'I would like to inquire about your teacher recruitment and consultancy services.'}`;
    window.open(`https://wa.me/2348012345678?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0d3842] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/20 shadow-2xl space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
          Contact CEC Educational Consults
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
          Have questions about teacher recruitment, school setup, reading clubs, or consulting with Miss Nancy? We are here to assist.
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
                Thank you for contacting CEC. Miss Nancy's administrative assistant will respond to your inquiry within 24 business hours.
              </p>
              <button
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
                    placeholder="Mrs. Folake Davies"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">School Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Grange Early Childhood"
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
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db] font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="contact@school.com"
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
                  placeholder="How can Miss Nancy & CEC Consults assist your school or teaching career?"
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
                  <span>Instant WhatsApp Message</span>
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

        {/* Right: Info & Map Placeholder */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          
          <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5 shadow-md">
            <h3 className="font-heading font-bold text-base sm:text-lg text-[#2ac0db]">CEC Office Headquarters</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2ac0db] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-200">Lagos Office</strong>
                  <span className="text-slate-400">CEC Consults Center, Admiralty Way, Lekki Phase 1, Lagos State, Nigeria</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#2ac0db] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-200">Phone & WhatsApp</strong>
                  <span className="text-slate-400">+234 801 234 5678 / +234 809 876 5432</span>
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
                  <span className="text-slate-400">Monday - Friday: 8:00 AM - 5:00 PM (WAT)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Placeholder */}
          <div className="bg-slate-100 rounded-3xl overflow-hidden h-40 sm:h-44 relative flex items-center justify-center text-center p-6 border border-slate-200">
            <div className="space-y-1">
              <MapPin className="w-7 h-7 text-[#fa7b2d] mx-auto animate-bounce" />
              <p className="font-bold text-slate-800 text-xs">CEC HQ • Lekki Phase 1, Lagos</p>
              <p className="text-[10px] text-slate-500">Advisory & Training Center</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
