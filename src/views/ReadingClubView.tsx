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
  Star,
  Video,
  Globe2,
  Laptop
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
    childAge: 'Book Buddies (Ages 4 to 5, Beginner Readers)',
    track: 'Live Online Reading & Phonics Circle (Zoom)',
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
      <div className="relative rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#2ac0db]/25 shadow-2xl overflow-hidden min-h-[300px] sm:min-h-[340px] flex items-center bg-slate-950 text-white">
        
        {/* Full Hero Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1787049904/pexels-marta-wave-6437845.jpg"
            alt="Children Reading and Learning"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-85 contrast-105"
          />
          {/* Subtle Ambient Gradient Overlays for High Contrast Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#2ac0db]/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 max-w-2xl space-y-4 text-left">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            The Reading Lounge & <span className="text-[#2ac0db]">Phonics Club</span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-medium">
            Inspiring lifelong love for reading in children ages 4 to 12 years through live interactive virtual sessions, Synthetic Phonics, guided storytelling, tactile reading games and monthly book collections delivered to your doorstep.
          </p>
        </div>
      </div>

      {/* Online Experience Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center">
            <Video className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Live Virtual Interactive Rooms</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Small cohort live Zoom circles with certified early literacy educators. Children interact, practice blending and share stories in real time from home.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#fa7b2d]/15 text-[#fa7b2d] flex items-center justify-center">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Accessible Worldwide</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            No commuting required. Families across Ghana, Nigeria, the UK, US, Canada and globally connect weekly to boost their children's reading fluency.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Monthly Book Box & Worksheets</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Physical book deliveries and printable decodable phonics packs complement our live online reading sessions for hands-on tactile practice.
          </p>
        </div>
      </div>

      {/* Structured Age Sections (Ages 4 to 12) */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2ac0db]/15 text-[#126373] text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Age Sections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900">
            Programs Tailored to Every Age (Ages 4 to 12)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Child-centered live virtual cohorts designed for each developmental milestone from emergent readers to confident analytical leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Level 1: Book Buddies (Ages 4-5) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs hover:border-[#2ac0db] transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#2ac0db]/15 text-[#126373] text-xs font-bold rounded-lg">
                  Ages 4 to 5
                </span>
                <Smile className="w-6 h-6 text-[#2ac0db]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Book Buddies
                </h3>
                <span className="inline-block text-xs font-bold text-[#126373] uppercase tracking-wider">
                  Beginner Readers
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Playful, gentle foundation focusing on storytelling, phonological awareness, vocabulary and early comprehension.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-slate-700 pt-3 border-t border-slate-100">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                <span>Storytelling & phonological awareness</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                <span>Playful vocabulary & sound games</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                <span>Early comprehension foundations</span>
              </li>
            </ul>
          </div>

          {/* Level 2: Book Champs (Ages 6-7) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#2ac0db] shadow-md space-y-4 relative flex flex-col justify-between">
            <div className="absolute -top-3 right-4 px-3 py-0.5 bg-[#fa7b2d] text-white text-xs font-bold rounded-full">
              Popular Track
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#2ac0db]/20 text-[#126373] text-xs font-bold rounded-lg">
                  Ages 6 to 7
                </span>
                <BookOpen className="w-6 h-6 text-[#2ac0db]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Book Champs
                </h3>
                <span className="inline-block text-xs font-bold text-[#fa7b2d] uppercase tracking-wider">
                  Early Readers
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Growing confident readers focusing on fluency, reading comprehension, vocabulary and reading aloud.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-slate-700 pt-3 border-t border-slate-100">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                <span>Fluency & expressive reading aloud</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                <span>Synthetic Phonics decoding mastery</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                <span>Reading comprehension & vocabulary</span>
              </li>
            </ul>
          </div>

          {/* Level 3: Booksmiths (Ages 8-9) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs hover:border-[#2ac0db] transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#2ac0db]/15 text-[#126373] text-xs font-bold rounded-lg">
                  Ages 8 to 9
                </span>
                <Award className="w-6 h-6 text-[#fa7b2d]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Booksmiths
                </h3>
                <span className="inline-block text-xs font-bold text-[#126373] uppercase tracking-wider">
                  Confident Readers
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Developing analytical thinkers focusing on inference, discussion, debates and creative review journals.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-slate-700 pt-3 border-t border-slate-100">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                <span>Inference & analytical thinking</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                <span>Lively discussion & book debates</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                <span>Creative writing & review journals</span>
              </li>
            </ul>
          </div>

          {/* Level 4: Booked & Busy (Ages 10-12) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs hover:border-[#2ac0db] transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#2ac0db]/15 text-[#126373] text-xs font-bold rounded-lg">
                  Ages 10 to 12
                </span>
                <GraduationCap className="w-6 h-6 text-[#126373]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Booked & Busy
                </h3>
                <span className="inline-block text-xs font-bold text-[#126373] uppercase tracking-wider">
                  Advanced Readers
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Developing readers who read, think, discuss and lead with critical thinking, thematic analysis and public communication.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-slate-700 pt-3 border-t border-slate-100">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                <span>Critical thinking & thematic analysis</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                <span>Discussion, debates & leadership</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                <span>Public communication & presentation</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enroll-form" className="max-w-3xl mx-auto">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <img
                src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293997/The_Reading_Lounge_5.png"
                alt="The Reading Lounge Logo"
                referrerPolicy="no-referrer"
                className="h-12 sm:h-14 w-auto object-contain drop-shadow-xs"
              />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
                Enroll in The Reading Lounge & Phonics Club (Online)
              </h2>
              <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
                Complete the form below to register for live virtual online sessions. The CEC literacy team will contact you within 24 hours.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Online Enrollment Received!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you, <strong>{enrollForm.parentName || 'Parent'}</strong>. We've received the registration for <strong>{enrollForm.childName || 'your child'}</strong> for our live online sessions.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Enroll Another Child
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Akosua Mensah"
                    value={enrollForm.parentName}
                    onChange={(e) => setEnrollForm({ ...enrollForm, parentName: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+233 54 039 0029"
                    value={enrollForm.phone}
                    onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Child's Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwame"
                    value={enrollForm.childName}
                    onChange={(e) => setEnrollForm({ ...enrollForm, childName: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Age Group & Cohort</label>
                  <select
                    value={enrollForm.childAge}
                    onChange={(e) => setEnrollForm({ ...enrollForm, childAge: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 font-semibold text-sm"
                  >
                    <option value="Book Buddies (Ages 4 to 5, Beginner Readers)">Book Buddies (Ages 4 to 5: Beginner Readers)</option>
                    <option value="Book Champs (Ages 6 to 7, Early Readers)">Book Champs (Ages 6 to 7: Early Readers)</option>
                    <option value="Booksmiths (Ages 8 to 9, Confident Readers)">Booksmiths (Ages 8 to 9: Confident Readers)</option>
                    <option value="Booked & Busy (Ages 10 to 12, Advanced Readers)">Booked & Busy (Ages 10 to 12: Advanced Readers)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Online Program Format</label>
                <select
                  value={enrollForm.track}
                  onChange={(e) => setEnrollForm({ ...enrollForm, track: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2ac0db] outline-none text-slate-900 font-semibold text-sm"
                >
                  <option value="Live Online Reading & Phonics Circle (Zoom)">Live Online Reading & Phonics Circle (Weekly Live Zoom Cohort)</option>
                  <option value="Virtual 1-on-1 Literacy Coaching">Virtual 1-on-1 Literacy Coaching (Private Online Mentorship)</option>
                  <option value="Online School Partnership Program">Virtual Reading Club Program for Schools</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Online Reading Club Enrollment</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </section>

    </div>
  );
};
