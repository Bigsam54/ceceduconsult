import React, { useCallback, useMemo, useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { useTeacherProfile } from '../context/TeacherProfileContext';
import { ViewMode, Workshop, LearningProduct, StoreSection } from '../types';
import { WorkshopFormModal } from '../components/admin/WorkshopFormModal';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import { StoreManagerPanel } from '../components/admin/StoreManagerPanel';
import { TeacherApplicationsPanel } from '../components/admin/TeacherApplicationsPanel';
import { AdminOverviewPanel, AdminTab } from '../components/admin/AdminOverviewPanel';
import { ActivityStreamPanel } from '../components/admin/ActivityStreamPanel';
import { TalentPoolPanel } from '../components/admin/TalentPoolPanel';
import { InquiriesPanel } from '../components/admin/InquiriesPanel';
import { CalendarPanel, blankAppointment } from '../components/admin/CalendarPanel';
import { BroadcastsPanel } from '../components/admin/BroadcastsPanel';
import { AdminProfilePanel } from '../components/admin/AdminProfilePanel';
import { WorkshopsAdminPanel } from '../components/admin/WorkshopsAdminPanel';
import { useWorkshops } from '../hooks/useWorkshops';
import { useStoreProducts } from '../hooks/useStoreProducts';
import { useTeacherApplications } from '../hooks/useTeacherApplications';
import {
  useInquiries,
  useActivityLog,
  useAppointments,
  useBroadcasts,
  useProfileViewTotal,
  AppointmentInput
} from '../hooks/useAdminData';
import type { InquiryRow } from '../services/inquiryService';
import {
  LayoutDashboard,
  Activity,
  Users,
  UserCheck,
  Inbox,
  CalendarDays,
  Ticket,
  ShoppingBag,
  Send,
  UserCircle2,
  LogOut,
  Globe,
  Plus,
  Camera
} from 'lucide-react';

interface AdminDashboardViewProps {
  onNavigate: (view: ViewMode) => void;
}

interface NavItem {
  key: AdminTab;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigate }) => {
  const toast = useToast();
  const { signOut } = useAuth();
  const { firstName, avatarUrl, initials } = useTeacherProfile();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Real data, all from Supabase
  const teacherApplications = useTeacherApplications();
  const { workshops, createWorkshop, updateWorkshop, deleteWorkshop } = useWorkshops();
  const { products, createProduct, updateProduct, deleteProduct } = useStoreProducts();
  const inquiriesData = useInquiries();
  const activityData = useActivityLog();
  const appointmentsData = useAppointments();
  const broadcastsData = useBroadcasts();
  const profileViews = useProfileViewTotal();

  const [workshopModalOpen, setWorkshopModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<LearningProduct | null>(null);
  const [newProductSection, setNewProductSection] = useState<StoreSection>('books');
  const [appointmentDraft, setAppointmentDraft] = useState<AppointmentInput | null>(null);
  const [approvalsFocus, setApprovalsFocus] = useState<string | undefined>(undefined);

  const teachers = teacherApplications.applications;
  const today = new Date().toISOString().slice(0, 10);

  const counts = useMemo(() => ({
    pending: teachers.filter((t) => t.verification_status === 'pending').length,
    newInquiries: inquiriesData.inquiries.filter((i) => i.status === 'new').length,
    upcoming: appointmentsData.appointments.filter((a) => a.status === 'confirmed' && a.appointment_date >= today).length
  }), [teachers, inquiriesData.inquiries, appointmentsData.appointments, today]);

  const openTab = (tab: AdminTab) => {
    if (tab !== 'approvals') setApprovalsFocus(undefined);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out of the Admin Centre.', 'Logged Out');
    onNavigate('home');
  };

  // Scheduling from an inquiry pre-fills the calendar form and moves the inquiry along
  const scheduleFromInquiry = (inquiry: InquiryRow) => {
    setAppointmentDraft({
      ...blankAppointment(),
      title: inquiry.kind === 'teacher_request' ? `Interview: ${inquiry.subject}` : inquiry.subject || 'Consultation',
      client_name: inquiry.name,
      organization: inquiry.organization,
      phone: inquiry.phone,
      appointment_date: /^\d{4}-\d{2}-\d{2}$/.test(inquiry.preferred_date) && inquiry.preferred_date >= today ? inquiry.preferred_date : today,
      kind: inquiry.kind === 'teacher_request' ? 'Teacher Interview' : 'Consultation',
      format: inquiry.meeting_format.includes('Virtual') ? 'Google Meet / Zoom' : 'In-Person',
      notes: inquiry.message.slice(0, 500),
      inquiry_id: inquiry.id
    });
    openTab('calendar');
  };

  const createAppointment = async (input: AppointmentInput) => {
    const result = await appointmentsData.createAppointment(input);
    if (!result.error && input.inquiry_id) {
      await inquiriesData.updateInquiry(input.inquiry_id, { status: 'scheduled' });
    }
    return result;
  };

  const handleDraftHandled = useCallback(() => setAppointmentDraft(null), []);

  const navGroups: { title: string; items: NavItem[] }[] = [
    { title: 'Overview', items: [{ key: 'overview', label: 'Dashboard', icon: LayoutDashboard }] },
    {
      title: 'Teachers',
      items: [
        { key: 'activity', label: 'Live Movements', icon: Activity },
        { key: 'teachers', label: 'Teachers', icon: Users, badge: teachers.length },
        { key: 'approvals', label: 'Approvals', icon: UserCheck, badge: counts.pending }
      ]
    },
    {
      title: 'Operations',
      items: [
        { key: 'inquiries', label: 'Inquiries', icon: Inbox, badge: counts.newInquiries },
        { key: 'calendar', label: 'Calendar', icon: CalendarDays, badge: counts.upcoming }
      ]
    },
    {
      title: 'Content',
      items: [
        { key: 'workshops', label: 'Workshops', icon: Ticket },
        { key: 'store', label: 'Learning Essentials', icon: ShoppingBag },
        { key: 'broadcasts', label: 'Broadcasts', icon: Send }
      ]
    },
    { title: 'Account', items: [{ key: 'profile', label: 'My Profile', icon: UserCircle2 }] }
  ];
  const allItems = navGroups.flatMap((g) => g.items);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <button onClick={() => openTab('profile')} className="relative group shrink-0 cursor-pointer" title="Edit my profile">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Admin" className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-slate-200" />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#126373] text-white flex items-center justify-center font-heading font-extrabold text-xl">{initials}</div>
            )}
            <span className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 group-hover:text-[#126373] shadow-sm">
              <Camera className="w-3 h-3" />
            </span>
          </button>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#126373]">{getGreeting()}</p>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
              {firstName ? `Welcome back, ${firstName}` : 'CEC Admin Centre'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {counts.pending > 0 || counts.newInquiries > 0
                ? `${counts.pending} teacher${counts.pending === 1 ? '' : 's'} to review · ${counts.newInquiries} new inquir${counts.newInquiries === 1 ? 'y' : 'ies'}`
                : 'You are all caught up.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setAppointmentDraft(blankAppointment()); openTab('calendar'); }}
            className="px-4 py-2.5 bg-[#126373] hover:bg-[#0e4f5c] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> New Appointment
          </button>
          <button onClick={() => onNavigate('home')} className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 flex items-center gap-1.5 cursor-pointer">
            <Globe className="w-3.5 h-3.5" /> View Website
          </button>
          <button onClick={handleLogout} className="px-4 py-2.5 bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 font-bold text-xs rounded-xl border border-slate-200 flex items-center gap-1.5 cursor-pointer">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Mobile tab strip */}
      <div className="lg:hidden flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
        {allItems.map((item) => (
          <button
            key={item.key}
            onClick={() => openTab(item.key)}
            className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === item.key ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
            {item.badge ? <span className={`px-1.5 rounded-full text-[10px] ${activeTab === item.key ? 'bg-white/20' : 'bg-slate-100'}`}>{item.badge}</span> : null}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-3 rounded-2xl border border-slate-200 sticky top-32 space-y-4">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-0.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-1 pb-1.5">{group.title}</p>
              {group.items.map((item) => (
                <button
                  key={item.key}
                  onClick={() => openTab(item.key)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === item.key ? 'bg-[#126373]/10 text-[#126373]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </span>
                  {item.badge ? (
                    <span className={`min-w-[20px] px-1.5 py-0.5 rounded-full text-[10px] text-center ${
                      activeTab === item.key ? 'bg-[#126373] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          ))}
        </aside>

        {/* Workspace */}
        <main className="lg:col-span-9 min-w-0">
          {activeTab === 'overview' && (
            <AdminOverviewPanel
              teachers={teachers}
              inquiries={inquiriesData.inquiries}
              appointments={appointmentsData.appointments}
              activity={activityData.activity}
              workshops={workshops}
              products={products}
              profileViews={profileViews}
              onOpen={openTab}
            />
          )}

          {activeTab === 'activity' && (
            <ActivityStreamPanel
              activity={activityData.activity}
              teachers={teachers}
              loading={activityData.loading}
              error={activityData.error}
              onRefresh={activityData.refresh}
              onAddNote={activityData.addNote}
            />
          )}

          {activeTab === 'teachers' && (
            <TalentPoolPanel
              teachers={teachers}
              loading={teacherApplications.loading}
              error={teacherApplications.error}
              onRefresh={teacherApplications.refresh}
              onSetAvailability={async (userId, availability) => {
                const result = await teacherApplications.setAvailability(userId, availability);
                if (!result.error) activityData.refresh();
                return result;
              }}
              onViewDetails={(t) => {
                setApprovalsFocus(t.email);
                setActiveTab('approvals');
              }}
            />
          )}

          {activeTab === 'approvals' && (
            <TeacherApplicationsPanel
              applications={teachers}
              loading={teacherApplications.loading}
              error={teacherApplications.error}
              onRefresh={teacherApplications.refresh}
              onSetStatus={async (userId, status) => {
                const result = await teacherApplications.setVerificationStatus(userId, status);
                if (!result.error) activityData.refresh();
                return result;
              }}
              focusSearch={approvalsFocus}
            />
          )}

          {activeTab === 'inquiries' && (
            <InquiriesPanel
              inquiries={inquiriesData.inquiries}
              loading={inquiriesData.loading}
              error={inquiriesData.error}
              onRefresh={inquiriesData.refresh}
              onUpdate={inquiriesData.updateInquiry}
              onDelete={inquiriesData.deleteInquiry}
              onSchedule={scheduleFromInquiry}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarPanel
              appointments={appointmentsData.appointments}
              loading={appointmentsData.loading}
              error={appointmentsData.error}
              onCreate={createAppointment}
              onUpdate={appointmentsData.updateAppointment}
              onDelete={appointmentsData.deleteAppointment}
              draft={appointmentDraft}
              onDraftHandled={handleDraftHandled}
            />
          )}

          {activeTab === 'workshops' && (
            <WorkshopsAdminPanel
              workshops={workshops}
              registrations={inquiriesData.inquiries.filter((i) => i.kind === 'workshop')}
              onCreate={() => { setEditingWorkshop(null); setWorkshopModalOpen(true); }}
              onEdit={(ws) => { setEditingWorkshop(ws); setWorkshopModalOpen(true); }}
              onDelete={deleteWorkshop}
            />
          )}

          {activeTab === 'store' && (
            <StoreManagerPanel
              products={products}
              createProduct={createProduct}
              deleteProduct={deleteProduct}
              onAdd={(section) => { setEditingProduct(null); setNewProductSection(section); setProductModalOpen(true); }}
              onEdit={(prod) => { setEditingProduct(prod); setProductModalOpen(true); }}
            />
          )}

          {activeTab === 'broadcasts' && (
            <BroadcastsPanel
              broadcasts={broadcastsData.broadcasts}
              loading={broadcastsData.loading}
              error={broadcastsData.error}
              teacherCount={teachers.length}
              onSend={broadcastsData.sendBroadcast}
              onDelete={broadcastsData.deleteBroadcast}
            />
          )}

          {activeTab === 'profile' && <AdminProfilePanel />}
        </main>
      </div>

      <WorkshopFormModal
        isOpen={workshopModalOpen}
        onClose={() => setWorkshopModalOpen(false)}
        editing={editingWorkshop}
        onSave={async (input) => {
          const { error } = editingWorkshop
            ? await updateWorkshop(editingWorkshop.id, input)
            : await createWorkshop(input);
          if (error) toast.error(error, 'Save Failed');
          else toast.success(editingWorkshop ? 'Workshop updated.' : 'Workshop created and listed on the website.', 'Saved');
          return { error };
        }}
      />

      <ProductFormModal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        editing={editingProduct}
        defaultSection={newProductSection}
        onSave={async (input) => {
          const { error } = editingProduct
            ? await updateProduct(editingProduct.id, input)
            : await createProduct(input);
          if (error) toast.error(error, 'Save Failed');
          else toast.success(editingProduct ? 'Changes saved to the store.' : (input.section === 'books' ? 'Book added to the store.' : 'Item added to the store.'), 'Saved');
          return { error };
        }}
      />
    </div>
  );
};
