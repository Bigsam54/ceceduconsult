import React, { useState } from 'react';
import { ViewMode } from '../types';
import { 
  Target, 
  Eye,
  Award,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  BookOpen,
  Sparkles,
  Heart,
  Users,
  Camera,
  Layers,
  GraduationCap
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenConsultationModal: () => void;
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

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenConsultationModal }) => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const activities: ActivityItem[] = [
    {
      id: 'act-1',
      title: 'Sample 1',
      category: 'Activity',
      description: 'description',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293993/IMG_4483.jpg',
      tag: 'Sample 1',
      rotation: '-rotate-2'
    },
    {
      id: 'act-2',
      title: 'Sample 2',
      category: 'Activity',
      description: 'description',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293993/IMG_4476.jpg',
      tag: 'Sample 2',
      rotation: 'rotate-1'
    },
    {
      id: 'act-3',
      title: 'Sample 3',
      category: 'Activity',
      description: 'description',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293995/IMG_4472.jpg',
      tag: 'Sample 3',
      rotation: '-rotate-1'
    },
    {
      id: 'act-4',
      title: 'Sample 4',
      category: 'Activity',
      description: 'description',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293993/IMG_4480.jpg',
      tag: 'Sample 4',
      rotation: 'rotate-2'
    },
    {
      id: 'act-5',
      title: 'Sample 5',
      category: 'Activity',
      description: 'description',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293993/IMG_4479.jpg',
      tag: 'Sample 5',
      rotation: '-rotate-2'
    },
    {
      id: 'act-6',
      title: 'Sample 6',
      category: 'Activity',
      description: 'description',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/f_auto,q_auto/v1787294779/IMG_4128.jpg',
      tag: 'Sample 6',
      rotation: 'rotate-1'
    },
    {
      id: 'act-7',
      title: 'Sample 7',
      category: 'Activity',
      description: 'description',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788008924/photo_2026-08-29_13-03-56.jpg',
      tag: 'Sample 7',
      rotation: '-rotate-1'
    },
    {
      id: 'act-8',
      title: 'Sample 8',
      category: 'Activity',
      description: 'description',
      image: 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1788008924/photo_2026-08-29_13-04-18.jpg',
      tag: 'Sample 8',
      rotation: 'rotate-2'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-14">
      
      {/* HERO BANNER */}
      <div className="relative bg-gradient-to-r from-slate-950 via-[#0a2c35] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#2ac0db]/30 shadow-2xl overflow-hidden min-h-[220px] flex items-center">
        
        {/* Ambient Gradient Lighting */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#2ac0db]/15 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Hero Text Content */}
        <div className="relative z-10 max-w-3xl space-y-4 text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Pioneering Early Childhood <span className="text-[#2ac0db]">Excellence</span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
            Connecting early childhood institutions with exceptional vetted early years educators, spatial design and child literacy programs.
          </p>
        </div>
      </div>

      {/* FOUNDER PROFILE SPOTLIGHT */}
      <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Executive Profile Portrait - Full Card Background */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-[#2ac0db]/30 min-h-[380px] sm:min-h-[460px] bg-slate-950 flex flex-col justify-end group">
            <img
              src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293997/IMG_4473.jpg"
              alt="Miss Nancie"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top absolute inset-0 group-hover:scale-103 transition-transform duration-700"
            />
          </div>

          {/* Profile Bio & Leadership Information */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
              Miss Nancie <span className="text-[#126373]">(Founder & Lead Education Consultant)</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              With over a decade of practical experience as an early childhood director, early years mentor and educator trainer, Miss Nancie established CEC Educational Consult to champion high-standard teacher placements, curriculum audits and reading initiatives.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              At CEC, our passion lies in bridging the gap between school owners seeking reliable, pedagogically trained educators and dedicated teachers looking for mentorship, dignity and global career progression.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenConsultationModal()}
                className="px-5 py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
              <button
                onClick={() => onNavigate('reading-club')}
                className="px-5 py-3 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Reading Club</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FUN ACTIVITIES & TEACHING IN ACTION PHOTO GALLERY */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Teaching, Mentorship & Activities in Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Moments from CEC Phonics workshops, classroom setup audits, teacher trainings and joyful child reading sessions.
            </p>
          </div>
        </div>

        {/* Fun Scrapbook / Polaroid Tilted Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {activities.map((act) => (
            <div
              key={act.id}
              onClick={() => setSelectedActivity(act)}
              className={`bg-white p-3 rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 transform ${act.rotation} hover:rotate-0 hover:-translate-y-1.5 cursor-pointer group`}
            >
              {/* Clean Photo without overlays or captions */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-100">
                <img
                  src={act.image}
                  alt={act.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-2xs text-left">
          <div className="w-10 h-10 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Our Mission</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            To provide schools with verified, competent early childhood educators and literacy programs while elevating teacher training, compensation and professional standards internationally.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-2xs text-left">
          <div className="w-10 h-10 rounded-xl bg-[#fa7b2d]/15 text-[#fa7b2d] flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Our Vision</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            To be an international benchmark early childhood educational consultancy for teacher recruitment, classroom spatial design and transformative child literacy.
          </p>
        </div>
      </section>

      {/* ACTIVITY DETAIL MODAL */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
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

            <div className="p-4 flex justify-end border-t border-slate-100">
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

