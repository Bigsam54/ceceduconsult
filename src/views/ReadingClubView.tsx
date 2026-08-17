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
  GraduationCap
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
    track: 'Weekend Community Reading Club',
    schoolName: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0d3842] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/20 shadow-2xl space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
          CEC Early Readers & <span className="text-[#2ac0db]">Phonics Club</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
          Nurturing confident, joyful readers through multisensory Jolly Phonics, guided storytelling, and monthly curated book boxes for children ages 2 to 8.
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4 pt-1 text-xs font-semibold text-slate-200">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2ac0db]" />
            <span>Certified EYFS Mentors</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#fa7b2d]" />
            <span>Monthly Physical Book Box</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2ac0db]" />
            <span>In-School & Weekend Tracks</span>
          </div>
        </div>
      </div>

      {/* Age Groups & Tracks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
            Programs Tailored to Every Age
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Child-led learning tracks aligned with early phonemic progression and Montessori language principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Level 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#2ac0db] transition-all space-y-4">
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
          <div className="bg-white p-6 rounded-2xl border-2 border-[#2ac0db] shadow-md space-y-4 relative">
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
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#2ac0db] transition-all space-y-4">
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

      {/* What is Included (2 Paths: Parents vs Schools) */}
      <section className="bg-slate-100/80 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
              Two Ways to Join the Reading Club
            </h2>
            <p className="text-slate-600 text-xs">
              Flexible options for individual families and partnering preschools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Option A: Families */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center font-bold">
                <PackageOpen className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                For Parents & Families
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Saturday in-person or live virtual reading circles with a monthly physical box delivered to your home.
              </p>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-start gap-2.5">
                  <Package className="w-4 h-4 text-[#126373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block sm:inline mr-1">Monthly Book Box:</strong>
                    <span>2 curated age-graded books, phonics flashcards, and reading sticker tracker.</span>
                  </div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-[#126373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block sm:inline mr-1">Saturday Sessions:</strong>
                    <span>Small-group interactive phonics circles led by certified teachers.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Option B: Schools */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#fa7b2d]/15 text-[#fa7b2d] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                For Partner Preschools
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                CEC sets up, equips, and oversees an official Reading Club branch inside your school schedule.
              </p>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-[#fa7b2d] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block sm:inline mr-1">In-School Setup:</strong>
                    <span>Reading corner layout, phonics kit supply, and termly book replenishment.</span>
                  </div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#fa7b2d] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block sm:inline mr-1">Teacher Coaching:</strong>
                    <span>Training your nursery teachers on expressive reading techniques.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Enrollment Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-5 sm:space-y-6">
          
          <div className="text-center space-y-1 sm:space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
              Enroll in CEC Reading Club
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Complete the quick form below. Our literacy team will contact you within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-[#2ac0db]/10 rounded-2xl border border-[#2ac0db]/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#2ac0db] text-slate-950 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Enrollment Received!</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, <strong>{enrollForm.parentName || 'Parent'}</strong>. We've saved your spot for <strong>{enrollForm.childName || 'your child'}</strong> in the {enrollForm.track}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Submit Another Child
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Parent / Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mary Adeleke"
                    value={enrollForm.parentName}
                    onChange={(e) => setEnrollForm({ ...enrollForm, parentName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 801 234 5678"
                    value={enrollForm.phone}
                    onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Child's Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David"
                    value={enrollForm.childName}
                    onChange={(e) => setEnrollForm({ ...enrollForm, childName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Age Group / Track</label>
                  <select
                    value={enrollForm.childAge}
                    onChange={(e) => setEnrollForm({ ...enrollForm, childAge: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-800 font-medium"
                  >
                    <option value="2-3 Years (Little Storytellers)">Ages 2-3 (Little Storytellers)</option>
                    <option value="4-5 Years (Phonics Champions)">Ages 4-5 (Phonics Champions)</option>
                    <option value="6-8 Years (Independent Readers)">Ages 6-8 (Independent Readers)</option>
                    <option value="School Partnership">School Reading Club Setup</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Preferred Track</label>
                <select
                  value={enrollForm.track}
                  onChange={(e) => setEnrollForm({ ...enrollForm, track: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-800 font-medium"
                >
                  <option value="Weekend Community Reading Club">Saturday In-Person Reading Club (Lekki / Ikeja)</option>
                  <option value="Virtual Live Reading Circle">Virtual Zoom Interactive Reading Club</option>
                  <option value="In-School Partner Program">In-School Reading Club Setup (For School Owners)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
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
