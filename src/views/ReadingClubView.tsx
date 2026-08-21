import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Calendar, 
  Award, 
  Heart, 
  Layers, 
  Send,
  Building2,
  Smile,
  PackageOpen,
  Package,
  GraduationCap,
  Phone,
  MessageCircle,
  Clock,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReadingClubViewProps {
  onOpenConsultationModal?: () => void;
}

export const ReadingClubView: React.FC<ReadingClubViewProps> = ({ onOpenConsultationModal }) => {
  const [enrollForm, setEnrollForm] = useState({
    parentName: '',
    phone: '',
    email: '',
    childName: '',
    childAge: '4-5 Years (Phonics Explorers)',
    track: 'Saturday Community Reading Club (Accra)',
    schoolName: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Hero Banner with Children Reading Background Photo */}
      <div className="relative rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#2ac0db]/25 shadow-2xl overflow-hidden min-h-[280px] sm:min-h-[320px] flex items-center bg-slate-950 text-white">
        
        {/* Full Hero Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1787049904/pexels-marta-wave-6437845.jpg"
            alt="Children Reading and Learning"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-85 contrast-105"
          />
          {/* Subtle Ambient Gradient Overlays for High Contrast Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#2ac0db]/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 max-w-2xl space-y-4 text-left">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            The Reading Lounge & <span className="text-[#2ac0db]">Phonics Club</span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium">
            Inspiring lifelong love for reading in children ages 4 to 11 years through hands-on activities, Synthetic Phonics, guided storytelling, tactile reading games and monthly curated book collections.
          </p>
        </div>
      </div>

      {/* Age Groups & Tracks */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-slate-900">
            Programs Tailored to Every Age (4 to 11 Years)
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Child-led learning tracks aligned with Synthetic Phonics, tactile exploration, and guided reading confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Level 1: Ages 4-5 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-[#2ac0db] transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-[#2ac0db]/15 text-[#126373] text-[11px] font-bold rounded-lg">
                Ages 4 – 5
              </span>
              <Smile className="w-5 h-5 text-[#2ac0db]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Early Phonics & Storytelling
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Focuses on hands-on activities, tactile letter exploration, rhyme, and guided storytelling to spark joy and phonemic awareness.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Hands-on sound & letter games</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Tactile picture-book exploration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Guided interactive storytelling</span>
              </li>
            </ul>
          </div>

          {/* Level 2: Ages 6-8 */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#2ac0db] shadow-md space-y-4 relative">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-[#fa7b2d] text-white text-[10px] font-bold rounded-full">
              Most Popular
            </div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-[#2ac0db]/20 text-[#126373] text-[11px] font-bold rounded-lg">
                Ages 6 – 8
              </span>
              <BookOpen className="w-5 h-5 text-[#2ac0db]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Synthetic Phonics & Fluency
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Systematic Synthetic Phonics, multisensory word blending, decodable reader mastery, and tactile reading games for fluency.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Synthetic Phonics letter-sound blending</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Tactile reading games & tricky words</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Decodable & early chapter books</span>
              </li>
            </ul>
          </div>

          {/* Level 3: Ages 9-11 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-[#2ac0db] transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-[#2ac0db]/15 text-[#126373] text-[11px] font-bold rounded-lg">
                Ages 9 – 11
              </span>
              <Award className="w-5 h-5 text-[#fa7b2d]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Independent Readers & Book Circles
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Monthly curated book collections, deep comprehension discussions, expressive storytelling, and child book review journals.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Monthly curated book collections</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Comprehension & lively discussion circles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Creative storytelling & review journals</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enroll-form" className="max-w-3xl mx-auto">
        <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-5 sm:space-y-6">
          
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <img
                src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293997/The_Reading_Lounge_5.png"
                alt="The Reading Lounge Logo"
                referrerPolicy="no-referrer"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                Enroll in The Reading Lounge & Phonics Club
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                Complete the quick form below. Miss Nancie’s literacy team in Ghana will contact you within 24 hours.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Enrollment Received!</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, <strong>{enrollForm.parentName || 'Parent'}</strong>. We've received the registration for <strong>{enrollForm.childName || 'your child'}</strong>.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Enroll Another Child
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Akosua Mensah"
                    value={enrollForm.parentName}
                    onChange={(e) => setEnrollForm({ ...enrollForm, parentName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+233 54 039 0029"
                    value={enrollForm.phone}
                    onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Child's Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwame"
                    value={enrollForm.childName}
                    onChange={(e) => setEnrollForm({ ...enrollForm, childName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Age Group</label>
                  <select
                    value={enrollForm.childAge}
                    onChange={(e) => setEnrollForm({ ...enrollForm, childAge: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 font-semibold"
                  >
                    <option value="4-5 Years (Early Phonics & Storytelling)">Ages 4-5 (Early Phonics & Storytelling)</option>
                    <option value="6-8 Years (Synthetic Phonics & Fluency)">Ages 6-8 (Synthetic Phonics & Fluency)</option>
                    <option value="9-11 Years (Independent Readers & Book Circles)">Ages 9-11 (Independent Readers & Book Circles)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Session Format & Track</label>
                <select
                  value={enrollForm.track}
                  onChange={(e) => setEnrollForm({ ...enrollForm, track: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 font-semibold"
                >
                  <option value="Saturday In-Person Reading Club">Saturday In-Person Reading Club</option>
                  <option value="Virtual Live Reading Circle">Virtual Live Interactive Reading Circle (Zoom)</option>
                  <option value="In-School Partner Program">In-School Reading Club Setup (For Schools)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Reading Club Enrollment</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </section>

    </div>
  );
};
