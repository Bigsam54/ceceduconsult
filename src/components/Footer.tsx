import React from 'react';
import { ViewMode } from '../types';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle,
  ShieldCheck, 
  Award,
  BookOpen
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenConsultationModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultationModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-10 border-t border-slate-800 relative overflow-hidden">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2ac0db]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#fa7b2d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Callout Card */}
        <div className="bg-gradient-to-r from-slate-950 via-[#0d3842] to-slate-950 p-6 sm:p-8 lg:p-10 rounded-3xl border border-[#2ac0db]/20 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white">
              Ready to Partner with CEC?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Find vetted teachers, join the reading club or schedule a school audit with CEC today.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2.5 w-full lg:w-auto shrink-0">
            <button
              onClick={() => onNavigate('directory')}
              className="px-5 py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl shadow transition-all text-xs text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Teacher Network</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('reading-club')}
              className="px-5 py-3 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold rounded-xl shadow transition-all text-xs text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Join Reading Club</span>
            </button>
            <button
              onClick={() => onOpenConsultationModal()}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all text-xs text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#2ac0db]" />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div 
              onClick={() => onNavigate('home')}
              className="cursor-pointer inline-block group"
            >
              <img
                src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png"
                alt="CEC Educational Consult"
                className="h-18 sm:h-22 w-auto max-w-[260px] object-contain transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Premier early childhood educational consult. We specialize in teacher recruitment, EYFS curriculum audits, Reading Club setups and classroom design.
            </p>
            
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1 text-[#2ac0db] font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>1,000+ Vetted Teachers</span>
              </div>
              <div className="flex items-center gap-1 text-[#fa7b2d] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>250+ Schools</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-2.5">
            <h4 className="text-white font-heading font-bold text-xs tracking-wider uppercase">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('directory')} className="hover:text-[#2ac0db] transition-colors cursor-pointer">
                  Teacher Recruitment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reading-club')} className="hover:text-[#fa7b2d] transition-colors cursor-pointer">
                  The Reading Lounge
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('consultancy')} className="hover:text-[#2ac0db] transition-colors cursor-pointer">
                  Educational Consultancy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cec-spaces')} className="hover:text-[#2ac0db] transition-colors cursor-pointer">
                  CEC Spaces (Classroom Setup)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learning-essentials')} className="hover:text-[#2ac0db] transition-colors cursor-pointer">
                  CEC Learning Essentials Store
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshops')} className="hover:text-[#2ac0db] transition-colors cursor-pointer">
                  Workshops & Masterclasses
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-white font-heading font-bold text-xs tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('join-network')} className="hover:text-[#2ac0db] transition-colors cursor-pointer">
                  Join Teacher Network
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#2ac0db] transition-colors cursor-pointer">
                  About CEC Educational Consult
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')} className="hover:text-[#2ac0db] transition-colors cursor-pointer">
                  Teacher Registration
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('teacher-dashboard')} className="hover:text-[#2ac0db] transition-colors text-[#2ac0db] font-medium cursor-pointer">
                  Teacher Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-dashboard')} className="hover:text-[#2ac0db] transition-colors text-[#2ac0db] font-medium cursor-pointer">
                  Admin Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-2.5">
            <h4 className="text-white font-heading font-bold text-xs tracking-wider uppercase">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#2ac0db] shrink-0" />
                <span>+233 54 039 0029 / +233 20 685 5347</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#2ac0db] shrink-0" />
                <span>contact@ceceduconsult.org</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CEC Educational Consult. Designed for Early Childhood Education Excellence.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Teacher Verification Standard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
