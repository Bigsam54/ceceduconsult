/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewMode, Teacher, ConsultationService, Workshop, LearningProduct } from './types';
import { safeScrollToTop } from './utils/safeWindow';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContactTeacherModal } from './components/ContactTeacherModal';
import { BookConsultationModal } from './components/BookConsultationModal';
import { WorkshopRegisterModal } from './components/WorkshopRegisterModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { SplashScreen } from './components/SplashScreen';

// Views
import { HomeView } from './views/HomeView';
import { DirectoryView } from './views/DirectoryView';
import { TeacherProfileView } from './views/TeacherProfileView';
import { JoinNetworkView } from './views/JoinNetworkView';
import { ConsultancyView } from './views/ConsultancyView';
import { ReadingClubView } from './views/ReadingClubView';
import { WorkshopsView } from './views/WorkshopsView';
import { CecSpacesView } from './views/CecSpacesView';
import { LearningEssentialsView } from './views/LearningEssentialsView';
import { SchoolsView } from './views/SchoolsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { TeacherDashboardView } from './views/TeacherDashboardView';
import { AdminLoginView } from './views/AdminLoginView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { useAuth, INTENDED_PORTAL_KEY, AccountRole } from './context/AuthContext';
import { getPathFromView, getViewFromPath } from './utils/routes';
import { applyViewSeo } from './utils/seoMeta';

// The admin login isn't linked anywhere in the public site - it's reached
// directly via its real URL (e.g. https://yoursite.com/admin-login) and is
// excluded from the sitemap and disallowed in robots.txt.
const getInitialView = (): ViewMode => getViewFromPath(window.location.pathname);

export default function App() {
  const { session, role, loading: authLoading, roleLoading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewMode>(getInitialView);

  // Sets app state and syncs the real URL bar (so every page is a distinct,
  // shareable, crawlable link rather than one static "/" for the whole app).
  const navigateTo = (view: ViewMode) => {
    setCurrentView(view);
    const path = getPathFromView(view);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  // Keep the browser's Back/Forward buttons working with the view state.
  React.useEffect(() => {
    const onPopState = () => setCurrentView(getViewFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Give each view its own <title>, meta description and canonical tag.
  React.useEffect(() => {
    applyViewSeo(currentView, getPathFromView(currentView));
  }, [currentView]);

  // Land Google-OAuth logins on the dashboard the user picked before redirecting to Google.
  React.useEffect(() => {
    if (!session) return;
    const intendedPortal = localStorage.getItem(INTENDED_PORTAL_KEY) as AccountRole | null;
    if (intendedPortal) {
      localStorage.removeItem(INTENDED_PORTAL_KEY);
      navigateTo(intendedPortal === 'admin' ? 'admin-dashboard' : 'teacher-dashboard');
    }
  }, [session]);

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  
  // Modals state
  const [contactTeacher, setContactTeacher] = useState<Teacher | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const [consultationService, setConsultationService] = useState<ConsultationService | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const [workshopToRegister, setWorkshopToRegister] = useState<Workshop | null>(null);
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);

  const [productToView, setProductToView] = useState<LearningProduct | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Navigation Handler
  const handleNavigate = (view: ViewMode) => {
    if (typeof view === 'string') {
      navigateTo(view);
    }
    safeScrollToTop();
  };

  // Teacher Handlers
  const handleSelectTeacher = (teacher: Teacher) => {
    if (teacher && typeof teacher === 'object' && 'id' in teacher) {
      setSelectedTeacher(teacher);
      navigateTo('teacher-profile');
      safeScrollToTop();
    }
  };

  const handleContactTeacher = (teacher: Teacher) => {
    if (teacher && typeof teacher === 'object' && 'id' in teacher) {
      setContactTeacher(teacher);
      setIsContactModalOpen(true);
    }
  };

  // Consultation Handler
  const handleOpenConsultationModal = (service?: unknown) => {
    if (service && typeof service === 'object' && 'id' in (service as object) && 'title' in (service as object)) {
      setConsultationService(service as ConsultationService);
    } else {
      setConsultationService(null);
    }
    setIsConsultationModalOpen(true);
  };

  // Workshop Handler
  const handleRegisterWorkshop = (workshop: Workshop) => {
    if (workshop && typeof workshop === 'object' && 'id' in workshop) {
      setWorkshopToRegister(workshop);
      setIsWorkshopModalOpen(true);
    }
  };

  // Product Quick View
  const handleQuickViewProduct = (product: LearningProduct) => {
    if (product && typeof product === 'object' && 'id' in product) {
      setProductToView(product);
      setIsProductModalOpen(true);
    }
  };

  // Login Success Handler
  const handleLoginSuccess = (portal: 'teacher' | 'admin') => {
    navigateTo(portal === 'teacher' ? 'teacher-dashboard' : 'admin-dashboard');
    safeScrollToTop();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      
      {/* Animated Brand Splash Loading Preview */}
      <SplashScreen minDuration={1400} />

      {/* Top Sticky Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenLogin={() => handleNavigate('login')}
      />

      {/* Main Dynamic View Outlet */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectTeacher={handleSelectTeacher}
            onContactTeacher={handleContactTeacher}
            onOpenConsultationModal={handleOpenConsultationModal}
          />
        )}

        {currentView === 'directory' && (
          <DirectoryView
            onSelectTeacher={handleSelectTeacher}
            onContactTeacher={handleContactTeacher}
          />
        )}

        {currentView === 'teacher-profile' && (
          <TeacherProfileView
            teacher={selectedTeacher}
            onBack={() => handleNavigate('directory')}
            onContactCEC={handleContactTeacher}
          />
        )}

        {currentView === 'join-network' && (
          <JoinNetworkView onNavigate={handleNavigate} />
        )}

        {currentView === 'consultancy' && (
          <ConsultancyView onOpenConsultationModal={handleOpenConsultationModal} />
        )}

        {currentView === 'reading-club' && (
          <ReadingClubView onOpenConsultationModal={handleOpenConsultationModal} />
        )}

        {currentView === 'workshops' && (
          <WorkshopsView onRegisterWorkshop={handleRegisterWorkshop} />
        )}

        {currentView === 'cec-spaces' && (
          <CecSpacesView onOpenConsultationModal={handleOpenConsultationModal} />
        )}

        {currentView === 'learning-essentials' && (
          <LearningEssentialsView onQuickView={handleQuickViewProduct} />
        )}

        {currentView === 'schools' && (
          <SchoolsView onOpenConsultationModal={handleOpenConsultationModal} />
        )}

        {currentView === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenConsultationModal={handleOpenConsultationModal}
          />
        )}

        {currentView === 'contact' && <ContactView />}

        {currentView === 'login' && (
          <LoginView
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {currentView === 'register' && (
          <RegisterView onNavigate={handleNavigate} />
        )}

        {currentView === 'teacher-dashboard' && (
          authLoading ? null : session ? (
            <TeacherDashboardView onNavigate={handleNavigate} />
          ) : (
            <LoginView onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
          )
        )}

        {currentView === 'admin-login' && (
          <AdminLoginView
            onNavigate={handleNavigate}
            onLoginSuccess={() => handleNavigate('admin-dashboard')}
          />
        )}

        {currentView === 'admin-dashboard' && (
          authLoading || (session && roleLoading) ? null : session && role === 'admin' ? (
            <AdminDashboardView onNavigate={handleNavigate} />
          ) : (
            <AdminLoginView
              onNavigate={handleNavigate}
              onLoginSuccess={() => handleNavigate('admin-dashboard')}
            />
          )
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultationModal={handleOpenConsultationModal}
      />

      {/* Global Modals */}
      <ContactTeacherModal
        teacher={contactTeacher}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <BookConsultationModal
        service={consultationService}
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />

      <WorkshopRegisterModal
        workshop={workshopToRegister}
        isOpen={isWorkshopModalOpen}
        onClose={() => setIsWorkshopModalOpen(false)}
      />

      <ProductQuickViewModal
        product={productToView}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />

    </div>
  );
}
