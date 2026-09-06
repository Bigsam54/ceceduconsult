import React, { useState } from 'react';
import { ViewMode } from '../types';
import { 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  DollarSign,
  CheckCircle2,
  GraduationCap,
  Users,
  Camera
} from 'lucide-react';

interface JoinNetworkViewProps {
  onNavigate: (view: ViewMode) => void;
}

interface ActivityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tag: string;
  rotation: string;
}

export const JoinNetworkView: React.FC<JoinNetworkViewProps> = ({ onNavigate }) => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const activities: ActivityItem[] = [
    {
      id: 'act-1',
      title: 'Practical Teaching & Phonics Workshop',
      category: 'Mentorship',
      description: 'Hands-on synthetic phonics and apparatus training led by CEC mentors.',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293993/IMG_4483.jpg',
      tag: 'Phonics Session',
      rotation: '-rotate-2'
    },
    {
      id: 'act-2',
      title: 'Classroom Dynamic & Circle Time',
      category: 'Classroom',
      description: 'Engaging early learners with active storytelling, rhymes and structured exploration.',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293993/IMG_4476.jpg',
      tag: 'Circle Time',
      rotation: 'rotate-1'
    },
    {
      id: 'act-3',
      title: 'Sensory Learning & Visual Literacy',
      category: 'Sensory',
      description: 'Applying sensory materials to build letter recognition and foundational motor skills.',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293995/IMG_4472.jpg',
      tag: 'Sensory Play',
      rotation: '-rotate-1'
    },
    {
      id: 'act-4',
      title: 'Educator Mentorship in Action',
      category: 'Mentorship',
      description: 'One-on-one coaching sessions empowering early childhood teachers with confidence.',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293993/IMG_4480.jpg',
      tag: 'Teacher Coaching',
      rotation: 'rotate-2'
    },
    {
      id: 'act-5',
      title: 'Child-Centered Learning Corners',
      category: 'Setup',
      description: 'Observing student self-directed play and discovery in themed classroom spaces.',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293993/IMG_4479.jpg',
      tag: 'Learning Corners',
      rotation: '-rotate-2'
    },
    {
      id: 'act-6',
      title: 'CEC Network Teacher Cohort',
      category: 'Community',
      description: 'Vetted, passionate educators collaborating during termly peer enrichment forums.',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/f_auto,q_auto/v1787294779/IMG_4128.jpg',
      tag: 'Network Cohort',
      rotation: 'rotate-1'
    },
    {
      id: 'act-7',
      title: 'Interactive Guided Reading',
      category: 'Reading',
      description: 'Fostering deep comprehension and phonemic awareness in small reader circles.',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788008924/photo_2026-08-29_13-03-56.jpg',
      tag: 'Guided Reading',
      rotation: '-rotate-1'
    },
    {
      id: 'act-8',
      title: 'Joyful Early Literacy Milestones',
      category: 'Achievement',
      description: 'Celebrating learner breakthroughs in reading confidence and verbal expression.',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788008924/photo_2026-08-29_13-04-18.jpg',
      tag: 'Literacy Joy',
      rotation: 'rotate-2'
    }
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Hero Banner with Integrated Background Photo */}
      <div className="relative bg-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#2ac0db]/25 shadow-2xl overflow-hidden min-h-[320px] sm:min-h-[360px] flex items-center">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="https://res.cloudinary.com/qg0w6ewi/image/upload/f_auto,q_auto/v1787294779/IMG_4128.jpg"
            alt="CEC Teacher Network Community"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-85 contrast-105"
          />
          {/* Ambient Lighting Gradients for High Contrast Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2ac0db]/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-5 text-left">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            Elevate Your Career with <span className="text-[#2ac0db]">CEC Teacher Network</span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium">
            Join the most reputable early childhood teacher community. Get discovered by top international and private schools, access CEC's specialized mentorship and earn dignified compensation.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold rounded-xl shadow-lg transition-all text-xs sm:text-sm flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Apply to Join Network Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('workshops')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all text-xs sm:text-sm cursor-pointer"
            >
              Explore Teacher Workshops
            </button>
          </div>

          {/* Quick Badges Row */}
          <div className="pt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/70 border border-white/10 px-3 py-1 rounded-lg backdrop-blur-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
              <span>Direct School Introductions</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/70 border border-white/10 px-3 py-1 rounded-lg backdrop-blur-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2ac0db]" />
              <span>Free Application & Vetting</span>
            </div>
          </div>
        </div>

      </div>

      {/* WHY JOIN SECTION */}
      <section className="space-y-8 sm:space-y-10">
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
            Why Top Educators Choose CEC
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            We do not just place teachers, we nurture your professional dignity and long-term career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3 sm:space-y-4 hover:shadow-lg hover:border-[#2ac0db] transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
              Higher Salary Opportunities
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              CEC partners with leading international and private early childhood schools that offer competitive compensation and respectful work environments.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3 sm:space-y-4 hover:shadow-lg hover:border-[#fa7b2d] transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#fa7b2d]/15 text-[#fa7b2d] flex items-center justify-center font-bold">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
              CEC Specialized Mentorship
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Receive direct coaching on EYFS lesson planning, child-friendly apparatus usage, Synthetic Phonics mastery and classroom management techniques.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3 sm:space-y-4 hover:shadow-lg hover:border-[#2ac0db] transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
              Verified Prestige Badge
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Stand out to school proprietors with CEC's verified educator seal, confirming your classroom competence and professional background.
            </p>
          </div>

        </div>
      </section>

      {/* STEP-BY-STEP SELECTION PROCESS */}
      <section className="bg-slate-100/80 py-10 sm:py-14 rounded-3xl border border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
              How You Get Verified & Placed
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              { step: '01', title: 'Submit Application', desc: 'Fill out our teacher profile form with your qualifications, teaching level and preferences.' },
              { step: '02', title: 'Credentials Audit', desc: 'Our team verifies your degrees, certifications, background and previous school references.' },
              { step: '03', title: 'Get Placed', desc: 'Your verified profile goes live on the CEC Network and school interview opportunities begin!' }
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                <span className="text-3xl font-heading font-extrabold text-[#2ac0db]">{s.step}</span>
                <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHING, MENTORSHIP & ACTIVITIES IN ACTION PHOTO GALLERY */}
      <section className="space-y-6 sm:space-y-8 pt-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ac0db]/15 border border-[#2ac0db]/30 text-[#126373] text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Real Life Classroom Moments</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900">
            Teaching, Mentorship & Activities in Action
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
            See our teachers in action: hands-on early years apparatus training, synthetic phonics lessons, classroom setup simulations and inspiring peer mentorship.
          </p>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 pt-2">
          {activities.map((act) => (
            <div
              key={act.id}
              onClick={() => setSelectedActivity(act)}
              className={`bg-white p-2.5 sm:p-3.5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 transform ${act.rotation} hover:rotate-0 hover:-translate-y-1.5 cursor-pointer group`}
            >
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-100">
                <img
                  src={act.image}
                  alt={act.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-2 px-1 text-left space-y-0.5">
                <span className="text-[10px] font-bold text-[#126373] uppercase tracking-wide">{act.tag}</span>
                <p className="text-xs font-bold text-slate-900 truncate">{act.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-5 pt-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
          Ready to Take the Next Step in Your Teaching Journey?
        </h2>
        <button
          type="button"
          onClick={() => onNavigate('register')}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer"
        >
          Start Your Free Teacher Application Now
        </button>
      </section>

      {/* PHOTO PREVIEW MODAL */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 text-left space-y-4">
            <div className="relative aspect-16/10 bg-slate-950">
              <img
                src={selectedActivity.image}
                alt={selectedActivity.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors cursor-pointer text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5 pt-0 space-y-2">
              <span className="text-xs font-extrabold text-[#126373] uppercase tracking-wider">{selectedActivity.category}</span>
              <h4 className="text-base font-bold text-slate-900 font-heading">{selectedActivity.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedActivity.description}</p>
            </div>

            <div className="p-4 flex justify-end border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
