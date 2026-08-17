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
      
      {/* Hero Banner with Ghanaian Kids Reading & Learning Image */}
      <div className="relative bg-gradient-to-br from-slate-950 via-[#0a2f38] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/25 shadow-2xl overflow-hidden">
        
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2ac0db]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2ac0db]/15 border border-[#2ac0db]/30 rounded-full text-xs font-bold text-[#2ac0db]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Early Childhood Literacy • Accra, Ghana</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              CEC Early Readers & <span className="text-[#2ac0db]">Phonics Club</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
              Inspiring a lifelong love for reading in Ghanaian children ages 2 to 8 through hands-on Jolly Phonics, guided storytelling, tactile reading games, and monthly curated book collections.
            </p>

            <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db]" />
                <span>Certified EYFS Reading Mentors</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#fa7b2d]" />
                <span>Monthly Storybook Box</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db]" />
                <span>Weekend & In-School Tracks</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#enroll-form"
                className="px-5 py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Enroll Your Child Today</span>
              </a>
              <a
                href="https://wa.me/233540390029?text=Hello%20Miss%20Nancy,%20I%20would%20like%20to%20inquire%20about%20the%20CEC%20Reading%20Club."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/15 transition-all inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +233 54 039 0029</span>
              </a>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden border-2 border-[#2ac0db]/40 shadow-2xl relative aspect-4/3 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80"
                  alt="Ghanaian school children reading books together joyfully"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-950/85 backdrop-blur-xs rounded-2xl border border-white/15 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#2ac0db] text-slate-950 flex items-center justify-center font-bold">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-white">Joyful Phonics Readers</div>
                      <div className="text-[10px] text-slate-300">Ages 2 – 8 Early Literacy</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#fa7b2d] font-bold text-[11px]">
                    <Star className="w-3.5 h-3.5 fill-[#fa7b2d]" />
                    <span>5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Age Groups & Tracks */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-slate-900">
            Programs Tailored to Every Age
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Child-led learning tracks aligned with early phonemic progression and Montessori language principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Level 1 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-[#2ac0db] transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-[#2ac0db]/15 text-[#126373] text-[11px] font-bold rounded-lg">
                Ages 2 – 3
              </span>
              <Smile className="w-5 h-5 text-[#2ac0db]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Little Storytellers
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Focuses on rhyme, rhythm, expressive picture-walks, and sensory texture books to build early vocabulary and listening stamina.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Nursery rhymes & sound recognition</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Tactile picture-book exploration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Speech cadence & word association</span>
              </li>
            </ul>
          </div>

          {/* Level 2 */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#2ac0db] shadow-md space-y-4 relative">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-[#fa7b2d] text-white text-[10px] font-bold rounded-full">
              Most Popular
            </div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-[#2ac0db]/20 text-[#126373] text-[11px] font-bold rounded-lg">
                Ages 4 – 5
              </span>
              <BookOpen className="w-5 h-5 text-[#2ac0db]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Phonics Champions
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Multisensory Jolly Phonics 42 letter sounds, tactile letter tracing, CVC word blending, and decodable reader confidence.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Kinesthetic sound-action blending</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Tricky words & sight-word mastery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Independent simple reader books</span>
              </li>
            </ul>
          </div>

          {/* Level 3 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-[#2ac0db] transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-[#2ac0db]/15 text-[#126373] text-[11px] font-bold rounded-lg">
                Ages 6 – 8
              </span>
              <Award className="w-5 h-5 text-[#fa7b2d]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Independent Readers
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Early chapter book reading, deep comprehension discussions, expressive storytelling, and child book review journals.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Comprehension & question circles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Expressive narration & voice pacing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>Book review journaling</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enroll-form" className="max-w-3xl mx-auto">
        <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-5 sm:space-y-6">
          
          <div className="text-center space-y-1 sm:space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#126373] bg-[#2ac0db]/15 px-3 py-1 rounded-full">
              Registration Open
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              Enroll in CEC Reading Club
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Complete the quick form below. Miss Nancy’s literacy team in Ghana will contact you within 24 hours.
            </p>
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
                    <option value="2-3 Years (Little Storytellers)">Ages 2-3 (Little Storytellers)</option>
                    <option value="4-5 Years (Phonics Champions)">Ages 4-5 (Phonics Champions)</option>
                    <option value="6-8 Years (Independent Readers)">Ages 6-8 (Independent Readers)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Session Location & Track (Ghana)</label>
                <select
                  value={enrollForm.track}
                  onChange={(e) => setEnrollForm({ ...enrollForm, track: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 font-semibold"
                >
                  <option value="Saturday Community Reading Club (Accra)">Saturday In-Person Reading Club (East Legon, Accra)</option>
                  <option value="Saturday Reading Club (Tema / Airport Residential)">Saturday Reading Club (Airport Residential, Accra)</option>
                  <option value="Virtual Live Reading Circle">Virtual Zoom Live Interactive Reading Circle</option>
                  <option value="In-School Partner Program">In-School Reading Club Setup (For School Owners)</option>
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
