import React, { useState, useRef, useEffect } from 'react';
import { ViewMode } from '../types';
import { safeScrollToTop } from '../utils/safeWindow';
import { useAuth } from '../context/AuthContext';
import { useTeacherProfile } from '../context/TeacherProfileContext';
import { useToast } from '../context/ToastContext';
import {
  GraduationCap,
  Menu,
  X,
  Search,
  UserCheck,
  ChevronDown,
  Info,
  PhoneCall,
  ChevronRight,
  Mail,
  Building2,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const toast = useToast();
  const { session, role, signOut } = useAuth();
  const { displayName, firstName, avatarUrl, initials } = useTeacherProfile();
  const isAdmin = role === 'admin';
  const accountName = isAdmin ? (displayName || 'Administrator') : (displayName || 'My Account');
  const accountFirstName = isAdmin ? (firstName || 'Admin') : (firstName || 'My Account');
  const accountRoleLabel = isAdmin ? 'CEC Administrator' : 'CEC Teacher';
  const dashboardView: ViewMode = isAdmin ? 'admin-dashboard' : 'teacher-dashboard';

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
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
    setAccountMenuOpen(false);
    safeScrollToTop();
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('You have been logged out. See you soon!', 'Logged Out');
    handleNav('home');
  };

  const renderAvatar = (sizeClass: string, textClass: string) =>
    avatarUrl ? (
      <img
        src={avatarUrl}
        alt={accountName}
        className={`${sizeClass} rounded-full object-cover ring-2 ring-white shadow-sm`}
        referrerPolicy="no-referrer"
      />
    ) : (
      <span className={`${sizeClass} rounded-full bg-gradient-to-br from-[#126373] to-[#2ac0db] text-white font-heading font-extrabold flex items-center justify-center ring-2 ring-white shadow-sm ${textClass}`}>
        {initials}
      </span>
    );

  const isServicesActive = ['consultancy', 'reading-club', 'cec-spaces', 'workshops', 'learning-essentials'].includes(currentView);
  const isAboutActive = ['about', 'join-network', 'contact'].includes(currentView);

  return (
    <>
      {/* Top Utility Bar - Brand Tagline & Contact (Desktop Only) */}
      <div className="hidden lg:block bg-slate-950 text-slate-300 text-[11px] font-semibold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="tel:+233543633161" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3 text-[#2ac0db]" />
              <span>+233 54 363 3161</span>
            </a>
            <a href="https://wa.me/233540390029" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <WhatsAppIcon className="w-3 h-3 text-[#2ac0db]" />
              <span>+233 54 039 0029</span>
            </a>
            <a href="mailto:contact@ceceduconsult.org" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3 h-3 text-[#2ac0db]" />
              <span>contact@ceceduconsult.org</span>
            </a>
          </div>
          <div className="w-56 overflow-hidden">
            <div className="animate-ticker gap-x-6 text-[#2ac0db] tracking-widest uppercase">
              <span className="shrink-0">Create &bull; Educate &bull; Cultivate</span>
              <span className="shrink-0">Create &bull; Educate &bull; Cultivate</span>
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all relative">
        {/* Brand Accent Stripe */}
        <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#2ac0db] via-[#fa7b2d] to-[#2ac0db]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28 py-2 relative">

          {/* Brand Logo */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center cursor-pointer select-none group py-1"
          >
            <img
              src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png"
              alt="CEC Educational Consult"
              className="h-16 sm:h-20 lg:h-24 w-auto max-w-[220px] sm:max-w-[280px] object-contain transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Mobile Scrolling Tagline - centered between logo and hamburger */}
          <div className="lg:hidden absolute left-1/2 -translate-x-1/2 w-36 sm:w-52 overflow-hidden">
            <div className="animate-ticker gap-x-6 text-[#2ac0db] text-sm sm:text-base font-bold tracking-widest uppercase">
              <span className="shrink-0">Create &bull; Educate &bull; Cultivate</span>
              <span className="shrink-0">Create &bull; Educate &bull; Cultivate</span>
            </div>
          </div>

          {/* Consolidated Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 p-1.5 bg-slate-50/90 border border-slate-200/80 rounded-2xl shadow-inner">
            
            {/* Home */}
            <button
              onClick={() => handleNav('home')}
              className={`relative px-2.5 xl:px-4 py-2.5 text-sm xl:text-[15px] font-bold rounded-xl transition-all duration-200 ${
                currentView === 'home'
                  ? 'text-white bg-gradient-to-r from-[#126373] to-[#2ac0db] shadow-md shadow-[#2ac0db]/30'
                  : 'text-slate-700 hover:text-[#126373] hover:bg-white hover:shadow-sm after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#2ac0db] after:to-[#fa7b2d] after:transition-all after:duration-300 hover:after:w-1/2'
              }`}
            >
              Home
            </button>

            {/* Teachers */}
            <button
              onClick={() => handleNav('directory')}
              className={`relative px-2.5 xl:px-4 py-2.5 text-sm xl:text-[15px] font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                currentView === 'directory'
                  ? 'text-white bg-gradient-to-r from-[#126373] to-[#2ac0db] shadow-md shadow-[#2ac0db]/30'
                  : 'text-slate-700 hover:text-[#126373] hover:bg-white hover:shadow-sm after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#2ac0db] after:to-[#fa7b2d] after:transition-all after:duration-300 hover:after:w-1/2'
              }`}
            >
              <span>Teachers</span>
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase bg-[#fa7b2d] text-white rounded-md shadow-sm">
                1,000+
              </span>
            </button>

            {/* Schools */}
            <button
              onClick={() => handleNav('schools')}
              className={`relative px-2.5 xl:px-4 py-2.5 text-sm xl:text-[15px] font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                currentView === 'schools'
                  ? 'text-white bg-gradient-to-r from-[#126373] to-[#2ac0db] shadow-md shadow-[#2ac0db]/30'
                  : 'text-slate-700 hover:text-[#126373] hover:bg-white hover:shadow-sm after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#2ac0db] after:to-[#fa7b2d] after:transition-all after:duration-300 hover:after:w-1/2'
              }`}
            >
              <span>Schools</span>
            </button>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => {
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  setAboutDropdownOpen(false);
                }}
                className={`relative px-2.5 xl:px-4 py-2.5 text-sm xl:text-[15px] font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isServicesActive && currentView !== 'reading-club'
                    ? 'text-white bg-gradient-to-r from-[#126373] to-[#2ac0db] shadow-md shadow-[#2ac0db]/30'
                    : 'text-slate-700 hover:text-[#126373] hover:bg-white hover:shadow-sm after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#2ac0db] after:to-[#fa7b2d] after:transition-all after:duration-300 hover:after:w-1/2'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#2ac0db]' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  
                  {/* Reading Club inside dropdown */}
                  <button
                    onClick={() => handleNav('reading-club')}
                    className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-3 hover:bg-[#2ac0db]/10 transition-colors ${
                      currentView === 'reading-club' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 p-1 border border-slate-200">
                      <img
                        src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293997/The_Reading_Lounge_5.png"
                        alt="The Reading Lounge"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <span>The Reading Lounge</span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('consultancy')}
                    className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-3 hover:bg-[#2ac0db]/10 transition-colors ${
                      currentView === 'consultancy' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 p-1 border border-slate-200">
                      <img
                        src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png"
                        alt="CEC Educational Consult"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Educational Consultancy</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('cec-spaces')}
                    className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-3 hover:bg-[#2ac0db]/10 transition-colors ${
                      currentView === 'cec-spaces' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
                      <img
                        src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1788711783/WhatsApp_Image_2026-09-06_at_4.21.24_PM.jpg"
                        alt="CEC Inspire Spaces"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">CEC Spaces</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('workshops')}
                    className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-3 hover:bg-[#2ac0db]/10 transition-colors ${
                      currentView === 'workshops' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 p-1 border border-slate-200">
                      <img
                        src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png"
                        alt="CEC Educational Consult"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Teacher Workshops</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('learning-essentials')}
                    className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-3 hover:bg-[#2ac0db]/10 transition-colors ${
                      currentView === 'learning-essentials' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 p-1 border border-slate-200">
                      <img
                        src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786994345/CEC_Learning_Essentials-removebg-preview.png"
                        alt="CEC Learning Essentials"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Learning Essentials</div>
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
                }}
                className={`relative px-2.5 xl:px-4 py-2.5 text-sm xl:text-[15px] font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isAboutActive
                    ? 'text-white bg-gradient-to-r from-[#126373] to-[#2ac0db] shadow-md shadow-[#2ac0db]/30'
                    : 'text-slate-700 hover:text-[#126373] hover:bg-white hover:shadow-sm after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#2ac0db] after:to-[#fa7b2d] after:transition-all after:duration-300 hover:after:w-1/2'
                }`}
              >
                <span>About & Network</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-[#2ac0db]' : ''}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNav('about')}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-2.5 hover:bg-[#2ac0db]/10 ${
                      currentView === 'about' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <Info className="w-4 h-4 text-[#126373]" />
                    <span>About CEC Educational Consult</span>
                  </button>

                  <button
                    onClick={() => handleNav('join-network')}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-2.5 hover:bg-[#2ac0db]/10 ${
                      currentView === 'join-network' ? 'bg-[#2ac0db]/15 text-[#126373] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-[#126373]" />
                    <span>Join Teacher Network</span>
                  </button>

                  <button
                    onClick={() => handleNav('contact')}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-2.5 hover:bg-[#2ac0db]/10 ${
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

            {session ? (
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => {
                    setAccountMenuOpen(!accountMenuOpen);
                    setServicesDropdownOpen(false);
                    setAboutDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2.5 pl-1.5 pr-2.5 py-1.5 rounded-2xl border bg-white transition-all cursor-pointer ${
                    accountMenuOpen || currentView === dashboardView
                      ? 'border-[#2ac0db] shadow-md shadow-[#2ac0db]/15'
                      : 'border-slate-200 hover:border-[#2ac0db] hover:shadow-md'
                  }`}
                  aria-label="Open account menu"
                >
                  <span className="relative shrink-0">
                    {renderAvatar('w-10 h-10', 'text-sm')}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </span>
                  <span className="text-left leading-tight">
                    <span className="block text-sm font-bold text-slate-900 max-w-[150px] truncate">
                      <span className="xl:hidden">{accountFirstName}</span>
                      <span className="hidden xl:inline">{accountName}</span>
                    </span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#126373]">{accountRoleLabel}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${accountMenuOpen ? 'rotate-180 text-[#2ac0db]' : ''}`} />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-4 bg-gradient-to-br from-[#0b2228] via-[#114c5a] to-[#126373] flex items-center gap-3">
                      {renderAvatar('w-12 h-12', 'text-base')}
                      <div className="min-w-0">
                        <p className="text-sm font-heading font-bold text-white truncate">{accountName}</p>
                        <p className="text-[11px] font-semibold text-[#2ac0db]">{accountRoleLabel}</p>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => handleNav(dashboardView)}
                        className="w-full text-left px-3.5 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-[#2ac0db]/10 hover:text-[#126373] flex items-center gap-2.5 cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#126373]" />
                        <span>My Dashboard</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3.5 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-rose-50 hover:text-rose-700 flex items-center gap-2.5 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenLogin()}
                className="px-3 py-2 text-sm xl:text-[15px] font-bold text-slate-700 hover:text-[#126373] transition-colors cursor-pointer"
              >
                Login
              </button>
            )}

            {!session && (
            <button
              onClick={() => handleNav('directory')}
              className="hidden xl:flex px-5 py-2.5 text-[15px] font-bold text-white bg-gradient-to-r from-[#fa7b2d] to-[#f59e0b] hover:from-[#e66b1d] hover:to-[#fa7b2d] rounded-xl shadow-md shadow-[#fa7b2d]/30 hover:-translate-y-0.5 transition-all items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Find a Teacher</span>
            </button>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-1.5">
            {session && (
              <button
                onClick={() => handleNav(dashboardView)}
                className="p-0.5 rounded-full ring-2 ring-[#2ac0db]/40 cursor-pointer"
                aria-label="Open my dashboard"
              >
                {renderAvatar('w-9 h-9', 'text-xs')}
              </button>
            )}
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
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-12 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain shadow-2xl">
          
          <div className="space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-4 py-2.5 text-sm font-bold rounded-xl flex items-center justify-between ${
                currentView === 'home' ? 'bg-[#2ac0db]/15 text-[#126373]' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNav('directory')}
              className={`w-full text-left px-4 py-2.5 text-sm font-bold rounded-xl flex items-center justify-between ${
                currentView === 'directory' ? 'bg-[#2ac0db]/15 text-[#126373]' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>Teachers</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#fa7b2d] text-white rounded-md">1,000+</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNav('schools')}
              className={`w-full text-left px-4 py-2.5 text-sm font-bold rounded-xl flex items-center justify-between ${
                currentView === 'schools' ? 'bg-[#2ac0db]/15 text-[#126373]' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#fa7b2d]" />
                <span>Schools</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="text-[11px] font-bold text-[#126373] uppercase tracking-wider px-3 py-1">
              Services
            </div>
            <button
              onClick={() => handleNav('reading-club')}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2.5 ${
                currentView === 'reading-club' ? 'bg-[#fa7b2d]/15 text-[#fa7b2d] font-bold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center shrink-0 p-0.5 border border-slate-200 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1787293997/The_Reading_Lounge_5.png"
                  alt="The Reading Lounge"
                  className="w-full h-full object-contain"
                />
              </span>
              <span className="flex items-center justify-between flex-1">
                <span>The Reading Lounge</span>
              </span>
            </button>
            <button
              onClick={() => handleNav('consultancy')}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center shrink-0 p-0.5 border border-slate-200 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png"
                  alt="CEC Educational Consult"
                  className="w-full h-full object-contain"
                />
              </span>
              <span>Educational Consultancy</span>
            </button>
            <button
              onClick={() => handleNav('cec-spaces')}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1788711783/WhatsApp_Image_2026-09-06_at_4.21.24_PM.jpg"
                  alt="CEC Inspire Spaces"
                  className="w-full h-full object-cover"
                />
              </span>
              <span>CEC Spaces (Classroom Setup)</span>
            </button>
            <button
              onClick={() => handleNav('workshops')}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center shrink-0 p-0.5 border border-slate-200 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png"
                  alt="CEC Educational Consult"
                  className="w-full h-full object-contain"
                />
              </span>
              <span>Teacher Workshops</span>
            </button>
            <button
              onClick={() => handleNav('learning-essentials')}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center shrink-0 p-0.5 border border-slate-200 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/qg0w6ewi/image/upload/v1786994345/CEC_Learning_Essentials-removebg-preview.png"
                  alt="CEC Learning Essentials"
                  className="w-full h-full object-contain"
                />
              </span>
              <span>Learning Essentials Store</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="text-[11px] font-bold text-[#126373] uppercase tracking-wider px-3 py-1">
              About & Network
            </div>
            <button
              onClick={() => handleNav('about')}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <Info className="w-4 h-4 text-[#126373]" />
              <span>About CEC Educational Consult</span>
            </button>
            <button
              onClick={() => handleNav('join-network')}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <UserCheck className="w-4 h-4 text-[#126373]" />
              <span>Join Teacher Network</span>
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5"
            >
              <PhoneCall className="w-4 h-4 text-[#126373]" />
              <span>Contact Us</span>
            </button>
          </div>

          {session ? (
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-[#0b2228] via-[#114c5a] to-[#126373]">
              {renderAvatar('w-11 h-11', 'text-sm')}
              <div className="min-w-0">
                <p className="text-sm font-heading font-bold text-white truncate">{accountName}</p>
                <p className="text-[11px] font-semibold text-[#2ac0db]">{accountRoleLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav(dashboardView)}
                className="flex-1 py-2.5 text-sm font-bold text-slate-950 bg-[#2ac0db] hover:bg-[#22a8c0] rounded-xl text-center shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>My Dashboard</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded-xl text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
          ) : (
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="flex-1 py-2.5 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl text-center cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNav('register');
              }}
              className="flex-1 py-2.5 text-sm font-bold text-slate-950 bg-[#2ac0db] hover:bg-[#22a8c0] rounded-xl text-center shadow-xs cursor-pointer"
            >
              Join Network
            </button>
          </div>
          )}

        </div>
      )}
      </header>
    </>
  );
};
