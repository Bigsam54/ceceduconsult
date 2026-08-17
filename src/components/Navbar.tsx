import React, { useState, useRef, useEffect } from 'react';
import { ViewMode } from '../types';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Search, 
  UserCheck, 
  LayoutDashboard, 
  ShieldAlert,
  ChevronDown,
  BookOpenCheck,
  LayoutGrid,
  ShoppingBag,
  Info,
  PhoneCall,
  Ticket,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
      if (portalRef.current && !portalRef.current.contains(event.target as Node)) {
        setPortalDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setAboutDropdownOpen(false);
    setPortalDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isServicesActive = ['consultancy', 'reading-club', 'cec-spaces', 'workshops', 'learning-essentials'].includes(currentView);
  const isAboutActive = ['about', 'join-network', 'contact'].includes(currentView);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28 py-2">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center cursor-pointer select-none group py-1"
          >
            <img
              src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png"
              alt="CEC Educational Consults"
              className="h-16 sm:h-20 lg:h-24 w-auto max-w-[220px] sm:max-w-[280px] object-contain transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Consolidated Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            
            {/* Home */}
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                currentView === 'home'
                  ? 'text-[#126373] bg-[#2ac0db]/15 border border-[#2ac0db]/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            {/* Teachers */}
            <button
              onClick={() => handleNav('directory')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'directory'
                  ? 'text-[#126373] bg-[#2ac0db]/15 border border-[#2ac0db]/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Teachers</span>
              <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase bg-[#2ac0db] text-slate-950 rounded-md">
                1,000+
              </span>
            </button>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => {
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  setAboutDropdownOpen(false);
                  setPortalDropdownOpen(false);
                }}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  isServicesActive && currentView !== 'reading-club'
                    ? 'text-[#126373] bg-[#2ac0db]/15 border border-[#2ac0db]/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#2ac0db]' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    School & Literacy Services
                  </div>
                  
                  {/* Reading Club inside dropdown */}
                  <button
                    onClick={() => handleNav('reading-club')}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center gap-3 hover:bg-[#2ac0db]/10 transition-colors ${
                      currentView === 'reading-club' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#fa7b2d]/15 text-[#fa7b2d] flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <span>CEC Reading Club</span>
                        <span className="px-1.5 py-0.2 bg-[#fa7b2d] text-white text-[9px] font-bold rounded">New</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Phonics, book boxes & storytelling</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('consultancy')}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center gap-3 hover:bg-[#2ac0db]/10 transition-colors ${
                      currentView === 'consultancy' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center shrink-0">
                      <BookOpenCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Educational Consultancy</div>
                      <div className="text-[11px] text-slate-500">Curriculum audits & school advisory</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('cec-spaces')}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center gap-3 hover:bg-[#2ac0db]/10 transition-colors ${
                      currentView === 'cec-spaces' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center shrink-0">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">CEC Spaces</div>
                      <div className="text-[11px] text-slate-500">Preschool classroom setup & layouts</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('workshops')}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center gap-3 hover:bg-[#2ac0db]/10 transition-colors ${
                      currentView === 'workshops' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center shrink-0">
                      <Ticket className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Teacher Workshops</div>
                      <div className="text-[11px] text-slate-500">EYFS & classroom masterclasses</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('learning-essentials')}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center gap-3 hover:bg-[#2ac0db]/10 transition-colors ${
                      currentView === 'learning-essentials' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Learning Essentials</div>
                      <div className="text-[11px] text-slate-500">Montessori tools & learning aids</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* About & Community Dropdown */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => {
                  setAboutDropdownOpen(!aboutDropdownOpen);
                  setServicesDropdownOpen(false);
                  setPortalDropdownOpen(false);
                }}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  isAboutActive
                    ? 'text-[#126373] bg-[#2ac0db]/15 border border-[#2ac0db]/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>About & Network</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-[#2ac0db]' : ''}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNav('about')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center gap-2.5 hover:bg-[#2ac0db]/10 ${
                      currentView === 'about' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <Info className="w-4 h-4 text-[#126373]" />
                    <span>About Miss Nancy & CEC</span>
                  </button>

                  <button
                    onClick={() => handleNav('join-network')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center gap-2.5 hover:bg-[#2ac0db]/10 ${
                      currentView === 'join-network' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-[#126373]" />
                    <span>Join Teacher Network</span>
                  </button>

                  <button
                    onClick={() => handleNav('contact')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center gap-2.5 hover:bg-[#2ac0db]/10 ${
                      currentView === 'contact' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <PhoneCall className="w-4 h-4 text-[#126373]" />
                    <span>Contact CEC Office</span>
                  </button>
                </div>
              )}
            </div>

          </nav>

          {/* Desktop Right Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Quick Portals Dropdown */}
            <div className="relative" ref={portalRef}>
              <button
                onClick={() => {
                  setPortalDropdownOpen(!portalDropdownOpen);
                  setServicesDropdownOpen(false);
                  setAboutDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                <span>Portals</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${portalDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {portalDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    SaaS Portals
                  </div>
                  <button
                    onClick={() => handleNav('teacher-dashboard')}
                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-[#2ac0db]/10 flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#126373]" />
                    <span>Teacher Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleNav('admin-dashboard')}
                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-[#2ac0db]/10 flex items-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4 text-[#fa7b2d]" />
                    <span>Admin Dashboard</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onOpenLogin}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Login
            </button>

            <button
              onClick={() => handleNav('directory')}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-[#2ac0db] hover:bg-[#22a8c0] rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Teachers Directory</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Structured Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          
          <div className="space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-4 py-2 text-xs font-bold rounded-xl flex items-center justify-between ${
                currentView === 'home' ? 'bg-[#2ac0db]/15 text-[#126373]' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNav('directory')}
              className={`w-full text-left px-4 py-2 text-xs font-bold rounded-xl flex items-center justify-between ${
                currentView === 'directory' ? 'bg-[#2ac0db]/15 text-[#126373]' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>Teachers</span>
                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-[#2ac0db] text-slate-950 rounded-md">1,000+</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
              Services
            </div>
            <button
              onClick={() => handleNav('reading-club')}
              className={`w-full text-left px-4 py-2 text-xs font-medium rounded-xl flex items-center gap-2.5 ${
                currentView === 'reading-club' ? 'bg-[#fa7b2d]/15 text-[#fa7b2d] font-bold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#fa7b2d]" />
              <span className="flex items-center justify-between flex-1">
                <span>CEC Reading Club</span>
                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-[#fa7b2d] text-white rounded">Featured</span>
              </span>
            </button>
            <button
              onClick={() => handleNav('consultancy')}
              className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <BookOpenCheck className="w-4 h-4 text-[#126373]" />
              <span>Educational Consultancy</span>
            </button>
            <button
              onClick={() => handleNav('cec-spaces')}
              className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <LayoutGrid className="w-4 h-4 text-[#126373]" />
              <span>CEC Spaces (Classroom Setup)</span>
            </button>
            <button
              onClick={() => handleNav('workshops')}
              className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <Ticket className="w-4 h-4 text-[#126373]" />
              <span>Teacher Workshops</span>
            </button>
            <button
              onClick={() => handleNav('learning-essentials')}
              className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <ShoppingBag className="w-4 h-4 text-[#126373]" />
              <span>Learning Essentials Store</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
              About & Network
            </div>
            <button
              onClick={() => handleNav('about')}
              className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <Info className="w-4 h-4 text-[#126373]" />
              <span>About Miss Nancy & CEC</span>
            </button>
            <button
              onClick={() => handleNav('join-network')}
              className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <UserCheck className="w-4 h-4 text-[#126373]" />
              <span>Join Teacher Network</span>
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <PhoneCall className="w-4 h-4 text-[#126373]" />
              <span>Contact Us</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="flex-1 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl text-center cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNav('register');
              }}
              className="flex-1 py-2 text-xs font-bold text-slate-950 bg-[#2ac0db] hover:bg-[#22a8c0] rounded-xl text-center shadow-xs cursor-pointer"
            >
              Join Network
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
