import React, { useState } from 'react';
import { 
  ViewMode, 
  PendingTeacherApproval, 
  ConsultationBooking, 
  Teacher, 
  AvailabilityStatus,
  AvailabilityMovementLog 
} from '../types';
import { 
  MOCK_PENDING_APPROVALS, 
  MOCK_CONSULTATION_BOOKINGS, 
  MOCK_ADMIN_ANALYTICS,
  MOCK_TEACHERS,
  MOCK_WORKSHOPS,
  MOCK_LEARNING_PRODUCTS
} from '../data/mockData';
import { INITIAL_MOVEMENT_LOGS } from '../data/movementLogs';
import { TeacherDetailDrawer } from '../components/admin/TeacherDetailDrawer';
import { 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  BookOpenCheck, 
  TrendingUp, 
  BarChart3, 
  Building2,
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Video,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
  ShoppingBag,
  Ticket,
  Send,
  Bell,
  Download,
  Eye,
  Check,
  AlertCircle,
  Activity,
  ArrowRight,
  Users,
  Briefcase,
  FileText
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface AdminDashboardViewProps {
  onNavigate: (view: ViewMode) => void;
}

interface CalendarAppointment {
  id: string;
  title: string;
  clientName: string;
  schoolName: string;
  date: string;
  time: string;
  type: 'EYFS Audit' | 'Proprietor Consultation' | 'Teacher Screening' | 'CEC Space Walkthrough';
  format: 'Google Meet / Zoom' | 'In-Person (Lekki Office)' | 'On-Site School Visit';
  meetingLink?: string;
  status: 'Confirmed' | 'Pending Review' | 'Completed' | 'Cancelled';
  notes?: string;
}

interface SchoolPipelineLead {
  id: string;
  schoolName: string;
  contactPerson: string;
  contactPhone: string;
  requestedRole: string;
  location: string;
  stage: 'Discovery' | 'Shortlisting' | 'Interviews' | 'Placed' | '90-Day Guarantee';
  assignedTeacher?: string;
  budget: string;
  date: string;
}

interface BroadcastMessage {
  id: string;
  target: 'All Teachers' | 'School Owners' | 'All Platform Users';
  title: string;
  body: string;
  date: string;
  status: 'Sent' | 'Scheduled';
  readsCount: number;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'movements' | 'candidates' | 'calendar' | 'approvals' | 'consultations' | 'placements' | 'workshops' | 'store' | 'broadcasts'
  >('dashboard');

  // State Management
  const [teachersList, setTeachersList] = useState<Teacher[]>(MOCK_TEACHERS);
  const [pendingList, setPendingList] = useState<PendingTeacherApproval[]>(MOCK_PENDING_APPROVALS);
  const [consultationsList, setConsultationsList] = useState<ConsultationBooking[]>(MOCK_CONSULTATION_BOOKINGS);
  const [movementLogs, setMovementLogs] = useState<AvailabilityMovementLog[]>(INITIAL_MOVEMENT_LOGS);
  const [movementFilter, setMovementFilter] = useState<'All' | 'Immediate' | 'Placed / Employed' | '2 Weeks Notice'>('All');
  
  // Teacher Profile Drawer / Modal State
  const [selectedTeacherForDrawer, setSelectedTeacherForDrawer] = useState<Teacher | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  
  // Candidates directory search/filter in admin
  const [candidateSearch, setCandidateSearch] = useState<string>('');
  const [candidateAvailabilityFilter, setCandidateAvailabilityFilter] = useState<string>('All');
  const [candidateVerifiedFilter, setCandidateVerifiedFilter] = useState<string>('All');

  const [toastMessage, setToastMessage] = useState<string>('');

  // Manual Movement Modal
  const [showLogMovementModal, setShowLogMovementModal] = useState<boolean>(false);
  const [manualLogTeacherName, setManualLogTeacherName] = useState<string>('Amina Bello');
  const [manualLogPrevStatus, setManualLogPrevStatus] = useState<AvailabilityStatus>('2 Weeks Notice');
  const [manualLogNewStatus, setManualLogNewStatus] = useState<AvailabilityStatus>('Immediate');
  const [manualLogReason, setManualLogReason] = useState<string>('');
  const [manualLogSchool, setManualLogSchool] = useState<string>('');

  // Calendar State
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>('2026-08-18');
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([
    {
      id: 'apt-1',
      title: 'Full EYFS Curriculum Audit Review',
      clientName: 'Dr. Elizabeth Taylor',
      schoolName: 'Oakwood International Academy',
      date: '2026-08-18',
      time: '10:00 AM - 11:30 AM',
      type: 'EYFS Audit',
      format: 'Google Meet / Zoom',
      meetingLink: 'https://meet.google.com/cec-audit-missnancy',
      status: 'Confirmed',
      notes: 'Reviewing Nursery 1 & 2 phonics progress and lesson plan alignment.'
    },
    {
      id: 'apt-2',
      title: 'Teacher Placement Discovery Call',
      clientName: 'Chief Rotimi Adeyemi',
      schoolName: 'Royal Tots Nursery School',
      date: '2026-08-18',
      time: '02:00 PM - 03:00 PM',
      type: 'Proprietor Consultation',
      format: 'Google Meet / Zoom',
      meetingLink: 'https://meet.google.com/cec-proprietor-nancy',
      status: 'Confirmed',
      notes: 'Needs 2 EYFS Montessori specialists for September term start.'
    },
    {
      id: 'apt-3',
      title: 'Candidate Vetting: Senior Phonics Lead',
      clientName: 'Blessing Okon',
      schoolName: 'Candidate Ref: T-902',
      date: '2026-08-19',
      time: '11:00 AM - 11:45 AM',
      type: 'Teacher Screening',
      format: 'Google Meet / Zoom',
      status: 'Pending Review',
      notes: 'Evaluate Jolly Phonics accent neutral delivery and micro-teaching video.'
    },
    {
      id: 'apt-4',
      title: 'CEC Space Floorplan & Sensory Nook Inspection',
      clientName: 'Mrs. Folashade Adeleke',
      schoolName: 'Meadowland International Preschool',
      date: '2026-08-20',
      time: '01:30 PM - 03:30 PM',
      type: 'CEC Space Walkthrough',
      format: 'On-Site School Visit',
      status: 'Confirmed',
      notes: 'Site visit in Ikoyi for preschool reading hub installation.'
    }
  ]);

  const [showNewAptModal, setShowNewAptModal] = useState<boolean>(false);
  const [newApt, setNewApt] = useState<Partial<CalendarAppointment>>({
    title: '',
    clientName: '',
    schoolName: '',
    date: '2026-08-18',
    time: '10:00 AM - 11:00 AM',
    type: 'Proprietor Consultation',
    format: 'Google Meet / Zoom',
    meetingLink: '',
    notes: ''
  });

  // School Placement Pipeline State
  const [pipelineLeads, setPipelineLeads] = useState<SchoolPipelineLead[]>([
    {
      id: 'lead-1',
      schoolName: 'Meadow Hall International',
      contactPerson: 'Mrs. Cynthia Cole',
      contactPhone: '+234 803 222 1199',
      requestedRole: 'Head Nursery Educator (EYFS)',
      location: 'Lekki Phase 1, Lagos',
      stage: 'Interviews',
      assignedTeacher: 'Amina Bello (Vetted)',
      budget: '$1,400 - $1,700/mo',
      date: 'Aug 14, 2026'
    },
    {
      id: 'lead-2',
      schoolName: 'Corona Early Years Academy',
      contactPerson: 'Mr. Femi Badmus',
      contactPhone: '+234 802 444 8833',
      requestedRole: 'EYFS Phonics Specialist',
      location: 'Ikoyi, Lagos',
      stage: 'Shortlisting',
      assignedTeacher: 'Grace Nwosu (Shortlisted)',
      budget: '$1,300 - $1,600/mo',
      date: 'Aug 15, 2026'
    },
    {
      id: 'lead-3',
      schoolName: 'Grange School Early Years',
      contactPerson: 'Mrs. Judith Rowland',
      contactPhone: '+234 809 555 7711',
      requestedRole: 'Early STEM Facilitator',
      location: 'Ikeja GRA, Lagos',
      stage: 'Placed',
      assignedTeacher: 'David Osei (Placed)',
      budget: '$1,500/mo',
      date: 'Aug 10, 2026'
    },
    {
      id: 'lead-4',
      schoolName: 'Heritage Early Years Academy',
      contactPerson: 'Dr. Patrick Danladi',
      contactPhone: '+234 805 111 4455',
      requestedRole: '2x Montessori Kindergarten Teachers',
      location: 'Maitama, Abuja',
      stage: 'Discovery',
      budget: '$1,200 - $1,500/mo',
      date: 'Aug 16, 2026'
    }
  ]);

  // Broadcasts State
  const [broadcasts, setBroadcasts] = useState<BroadcastMessage[]>([
    {
      id: 'bc-1',
      target: 'All Teachers',
      title: 'Term 1 Job Matching Window Now Open',
      body: 'Top tier British and Montessori schools in Lagos and Abuja are actively screening for September appointments. Ensure your credentials are fully updated on your candidate dashboard.',
      date: 'Aug 15, 2026',
      status: 'Sent',
      readsCount: 842
    },
    {
      id: 'bc-2',
      target: 'School Owners',
      title: 'Pre-Term EYFS Classroom Audits with Miss Nancie',
      body: 'Schedule your pre-resumption curriculum and teacher readiness review before classes resume. Limited slots available this month.',
      date: 'Aug 12, 2026',
      status: 'Sent',
      readsCount: 198
    }
  ]);

  const [newBroadcastTitle, setNewBroadcastTitle] = useState('');
  const [newBroadcastBody, setNewBroadcastBody] = useState('');
  const [newBroadcastTarget, setNewBroadcastTarget] = useState<'All Teachers' | 'School Owners' | 'All Platform Users'>('All Teachers');

  // Helper feedback toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Open Profile Modal for any Teacher
  const handleOpenTeacherProfile = (teacher: Teacher) => {
    setSelectedTeacherForDrawer(teacher);
    setIsDrawerOpen(true);
  };

  // Handle updates from the Teacher Profile Modal
  const handleUpdateTeacherFromDrawer = (
    teacherId: string, 
    newAvailability: AvailabilityStatus, 
    newIsVerified: boolean, 
    newNotes?: string
  ) => {
    setTeachersList(prev => prev.map(t => {
      if (t.id === teacherId) {
        // Record movement if availability changed
        if (t.availability !== newAvailability) {
          const newLog: AvailabilityMovementLog = {
            id: `mov-${Date.now()}`,
            teacherId: t.id,
            teacherName: t.name,
            avatar: t.photo,
            previousStatus: t.availability,
            newStatus: newAvailability,
            changedBy: 'Miss Nancie (Admin)',
            reason: `Status changed from ${t.availability} to ${newAvailability}`,
            timestamp: 'Just Now'
          };
          setMovementLogs(prevLogs => [newLog, ...prevLogs]);
        }
        return {
          ...t,
          availability: newAvailability,
          isVerified: newIsVerified,
          adminNotes: newNotes
        };
      }
      return t;
    }));

    triggerToast('Teacher profile and availability updated successfully!');
  };

  // Fast One-Click Teacher Status Changes in Candidate Table
  const handleQuickAvailabilityChange = (teacherId: string, newAvail: AvailabilityStatus) => {
    setTeachersList(prev => prev.map(t => {
      if (t.id === teacherId) {
        const newLog: AvailabilityMovementLog = {
          id: `mov-${Date.now()}`,
          teacherId: t.id,
          teacherName: t.name,
          avatar: t.photo,
          previousStatus: t.availability,
          newStatus: newAvail,
          changedBy: 'Miss Nancie (Admin)',
          reason: `Availability changed to ${newAvail}`,
          timestamp: 'Just Now'
        };
        setMovementLogs(prevLogs => [newLog, ...prevLogs]);
        return { ...t, availability: newAvail };
      }
      return t;
    }));
    triggerToast(`Teacher availability updated to ${newAvail}`);
  };

  const handleQuickVerifyToggle = (teacherId: string) => {
    setTeachersList(prev => prev.map(t => {
      if (t.id === teacherId) {
        const nextState = !t.isVerified;
        if (nextState) {
          const newLog: AvailabilityMovementLog = {
            id: `mov-${Date.now()}`,
            teacherId: t.id,
            teacherName: t.name,
            avatar: t.photo,
            previousStatus: t.availability,
            newStatus: t.availability,
            changedBy: 'Miss Nancie (Admin)',
            reason: 'Issued Miss Nancie Verified Badge after document verification.',
            timestamp: 'Just Now'
          };
          setMovementLogs(prevLogs => [newLog, ...prevLogs]);
        }
        return { ...t, isVerified: nextState };
      }
      return t;
    }));
    triggerToast('Verification status updated.');
  };

  // Actions
  const handleApproveTeacher = (id: string) => {
    setPendingList(prev => prev.map(item => item.id === id ? { ...item, status: 'Approved' } : item));
    // Also record movement
    const pendingItem = pendingList.find(p => p.id === id);
    if (pendingItem) {
      const newLog: AvailabilityMovementLog = {
        id: `mov-${Date.now()}`,
        teacherId: id,
        teacherName: pendingItem.teacherName,
        avatar: pendingItem.avatar,
        previousStatus: '2 Weeks Notice',
        newStatus: 'Immediate',
        changedBy: 'Miss Nancie (Admin)',
        reason: 'Application approved and verified by Miss Nancie.',
        timestamp: 'Just Now'
      };
      setMovementLogs(prevLogs => [newLog, ...prevLogs]);
    }
    triggerToast('Teacher approved and verified!');
  };

  const handleRejectTeacher = (id: string) => {
    setPendingList(prev => prev.map(item => item.id === id ? { ...item, status: 'Rejected' } : item));
    triggerToast('Teacher application marked as rejected.');
  };

  const handleConfirmConsultation = (id: string) => {
    setConsultationsList(prev => prev.map(item => item.id === id ? { ...item, status: 'Confirmed' } : item));
    triggerToast('Consultation request confirmed and added to calendar!');
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApt.title || !newApt.clientName) {
      triggerToast('Please enter an appointment title and client name.');
      return;
    }
    const created: CalendarAppointment = {
      id: `apt-${Date.now()}`,
      title: newApt.title || 'Advisory Session',
      clientName: newApt.clientName || 'Client',
      schoolName: newApt.schoolName || 'School',
      date: newApt.date || selectedCalendarDate,
      time: newApt.time || '10:00 AM - 11:00 AM',
      type: newApt.type || 'Proprietor Consultation',
      format: newApt.format || 'Google Meet / Zoom',
      meetingLink: newApt.meetingLink || 'https://meet.google.com/cec-advisory',
      status: 'Confirmed',
      notes: newApt.notes || ''
    };
    setAppointments([created, ...appointments]);
    setShowNewAptModal(false);
    setNewApt({
      title: '',
      clientName: '',
      schoolName: '',
      date: selectedCalendarDate,
      time: '10:00 AM - 11:00 AM',
      type: 'Proprietor Consultation',
      format: 'Google Meet / Zoom',
      meetingLink: '',
      notes: ''
    });
    triggerToast('New appointment scheduled and added to calendar!');
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
    triggerToast('Appointment removed from calendar.');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBroadcastTitle.trim() || !newBroadcastBody.trim()) {
      triggerToast('Please fill out both broadcast title and message body.');
      return;
    }
    const msg: BroadcastMessage = {
      id: `bc-${Date.now()}`,
      target: newBroadcastTarget,
      title: newBroadcastTitle,
      body: newBroadcastBody,
      date: 'Just Now',
      status: 'Sent',
      readsCount: 0
    };
    setBroadcasts([msg, ...broadcasts]);
    setNewBroadcastTitle('');
    setNewBroadcastBody('');
    triggerToast(`Message sent to ${newBroadcastTarget}!`);
  };

  const handleRecordManualMovement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualLogReason.trim()) {
      triggerToast('Please provide a reason for this movement.');
      return;
    }
    const created: AvailabilityMovementLog = {
      id: `mov-${Date.now()}`,
      teacherId: `t-manual`,
      teacherName: manualLogTeacherName,
      previousStatus: manualLogPrevStatus,
      newStatus: manualLogNewStatus,
      changedBy: 'Miss Nancie (Admin)',
      reason: manualLogReason,
      schoolInvolved: manualLogSchool || 'Partner School Network',
      timestamp: 'Just Now'
    };
    setMovementLogs([created, ...movementLogs]);
    setShowLogMovementModal(false);
    setManualLogReason('');
    setManualLogSchool('');
    triggerToast('Teacher status change recorded successfully!');
  };

  // Computed availability counts
  const countImmediate = teachersList.filter(t => t.availability === 'Immediate').length + 38;
  const countTwoWeeks = teachersList.filter(t => t.availability === '2 Weeks Notice').length + 19;
  const countNextTerm = teachersList.filter(t => t.availability === 'Next Academic Term').length + 42;
  const countPlaced = 284;
  const countVerified = teachersList.filter(t => t.isVerified).length + 1100;
  const countPendingReview = pendingList.filter(p => p.status === 'Pending Review').length;

  // Filtered candidate list
  const filteredCandidates = teachersList.filter(t => {
    const matchesSearch = 
      t.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      t.title.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      t.location.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      t.qualification.toLowerCase().includes(candidateSearch.toLowerCase());
    
    const matchesAvailability = 
      candidateAvailabilityFilter === 'All' || t.availability === candidateAvailabilityFilter;

    const matchesVerified = 
      candidateVerifiedFilter === 'All' || 
      (candidateVerifiedFilter === 'Verified' && t.isVerified) ||
      (candidateVerifiedFilter === 'Unverified' && !t.isVerified);

    return matchesSearch && matchesAvailability && matchesVerified;
  });

  const filteredMovements = movementLogs.filter(log => {
    if (movementFilter === 'All') return true;
    return log.newStatus === movementFilter || log.previousStatus === movementFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Dynamic Toast Feedback */}
      {toastMessage && (
        <div className="bg-[#2ac0db]/15 border border-[#2ac0db] text-[#126373] px-4 py-3 rounded-2xl flex items-center gap-2 font-bold text-xs shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean, Welcoming Admin Header */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0d3842] to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-[#2ac0db]/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#2ac0db] flex items-center justify-center text-slate-950 font-heading font-extrabold text-2xl sm:text-3xl shadow-lg border-2 border-white/20">
            MN
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Miss Nancie's Admin Center
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              CEC Educational Consult — Early years educator recruitment, school audits, and workshop management
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setActiveTab('movements');
              setShowLogMovementModal(true);
            }}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Activity className="w-4 h-4" />
            <span>Log Movement</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('calendar');
              setShowNewAptModal(true);
            }}
            className="px-4 py-2.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Session</span>
          </button>
          <button
            onClick={() => onNavigate('directory')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all cursor-pointer"
          >
            Public Site View
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Admin Navigation */}
        <aside className="lg:col-span-3 space-y-2 bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            Admin Menu
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#2ac0db]" />
            <span>Dashboard & Overview</span>
          </button>

          {/* Tab: Live Teacher Movement Tracker */}
          <button
            onClick={() => setActiveTab('movements')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'movements'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Live Movements</span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full">
              Live
            </span>
          </button>

          {/* Tab: Teacher Talent Pool & Profiles */}
          <button
            onClick={() => setActiveTab('candidates')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'candidates'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#2ac0db]" />
              <span>Teacher Talent Pool</span>
            </div>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-bold rounded-full">
              {teachersList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('approvals')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'approvals'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-[#2ac0db]" />
              <span>Teacher Approvals</span>
            </div>
            <span className="px-2 py-0.5 bg-[#2ac0db] text-slate-950 text-[10px] font-extrabold rounded-full">
              {countPendingReview}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#2ac0db]" />
              <span>Schedule & Calendar</span>
            </div>
            <span className="px-2 py-0.5 bg-[#fa7b2d] text-white text-[10px] font-bold rounded-full">
              {appointments.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('placements')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'placements'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-[#2ac0db]" />
              <span>School Placement Pipeline</span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
              {pipelineLeads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'consultations'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpenCheck className="w-4 h-4 text-[#2ac0db]" />
              <span>Consultation Inquiries</span>
            </div>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full">
              {consultationsList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('workshops')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'workshops'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Ticket className="w-4 h-4 text-[#2ac0db]" />
              <span>Workshops & CPD</span>
            </div>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full">
              {MOCK_WORKSHOPS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'store'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#2ac0db]" />
              <span>Store Orders & Stock</span>
            </div>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full">
              {MOCK_LEARNING_PRODUCTS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('broadcasts')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'broadcasts'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Send className="w-4 h-4 text-[#2ac0db]" />
              <span>Broadcasts & Alerts</span>
            </div>
            <span className="px-2 py-0.5 bg-sky-100 text-sky-800 text-[10px] font-bold rounded-full">
              {broadcasts.length}
            </span>
          </button>
        </aside>

        {/* Right Super Admin Workspace Body */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: DASHBOARD & KPIS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Detailed Live Teacher Availability Breakdown Card Strip */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#2ac0db]" />
                      Live Teacher Availability & Approval Roster
                    </h3>
                    <p className="text-xs text-slate-400">Exact live movement and deployment status across 1,248 registered educators</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('movements')}
                    className="text-xs font-bold text-[#2ac0db] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View Movement Stream <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
                  
                  {/* Immediate */}
                  <div 
                    onClick={() => {
                      setActiveTab('candidates');
                      setCandidateAvailabilityFilter('Immediate');
                    }}
                    className="bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-emerald-500/30 transition-all cursor-pointer space-y-1 group"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mx-auto shadow-xs group-hover:scale-125 transition-transform" />
                    <div className="text-2xl font-extrabold text-emerald-400">{countImmediate}</div>
                    <div className="text-[11px] font-bold text-slate-200">Immediate</div>
                    <div className="text-[9px] text-slate-400">Ready to deploy</div>
                  </div>

                  {/* 2 Weeks Notice */}
                  <div 
                    onClick={() => {
                      setActiveTab('candidates');
                      setCandidateAvailabilityFilter('2 Weeks Notice');
                    }}
                    className="bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-amber-500/30 transition-all cursor-pointer space-y-1 group"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 mx-auto shadow-xs group-hover:scale-125 transition-transform" />
                    <div className="text-2xl font-extrabold text-amber-400">{countTwoWeeks}</div>
                    <div className="text-[11px] font-bold text-slate-200">2 Wks Notice</div>
                    <div className="text-[9px] text-slate-400">Concluding notice</div>
                  </div>

                  {/* Next Term */}
                  <div 
                    onClick={() => {
                      setActiveTab('candidates');
                      setCandidateAvailabilityFilter('Next Academic Term');
                    }}
                    className="bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-sky-500/30 transition-all cursor-pointer space-y-1 group"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mx-auto shadow-xs group-hover:scale-125 transition-transform" />
                    <div className="text-2xl font-extrabold text-sky-400">{countNextTerm}</div>
                    <div className="text-[11px] font-bold text-slate-200">Next Term</div>
                    <div className="text-[9px] text-slate-400">Sept / Jan Matching</div>
                  </div>

                  {/* Placed / Employed */}
                  <div 
                    onClick={() => {
                      setActiveTab('candidates');
                      setCandidateAvailabilityFilter('Placed / Employed');
                    }}
                    className="bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-purple-500/30 transition-all cursor-pointer space-y-1 group"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400 mx-auto shadow-xs group-hover:scale-125 transition-transform" />
                    <div className="text-2xl font-extrabold text-purple-400">{countPlaced}</div>
                    <div className="text-[11px] font-bold text-slate-200">Placed / Working</div>
                    <div className="text-[9px] text-slate-400">In Partner Schools</div>
                  </div>

                  {/* Verified Badge */}
                  <div 
                    onClick={() => {
                      setActiveTab('candidates');
                      setCandidateVerifiedFilter('Verified');
                    }}
                    className="bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-[#2ac0db]/30 transition-all cursor-pointer space-y-1 group"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2ac0db] mx-auto shadow-xs group-hover:scale-125 transition-transform" />
                    <div className="text-2xl font-extrabold text-[#2ac0db]">{countVerified}</div>
                    <div className="text-[11px] font-bold text-slate-200">Verified</div>
                    <div className="text-[9px] text-slate-400">Vetted by Nancie</div>
                  </div>

                  {/* Pending Audits */}
                  <div 
                    onClick={() => setActiveTab('approvals')}
                    className="bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-rose-500/30 transition-all cursor-pointer space-y-1 group"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400 mx-auto shadow-xs group-hover:scale-125 transition-transform" />
                    <div className="text-2xl font-extrabold text-rose-400">{countPendingReview}</div>
                    <div className="text-[11px] font-bold text-slate-200">Pending Review</div>
                    <div className="text-[9px] text-slate-400">Requires audit</div>
                  </div>

                </div>
              </div>

              {/* General Metric Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold text-slate-700">Verified Teachers</span>
                    <Award className="w-4 h-4 text-[#126373]" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">1,248</div>
                  <p className="text-[11px] text-[#126373] font-bold">+18 approved this week</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold text-slate-700">School Placements</span>
                    <Building2 className="w-4 h-4 text-[#fa7b2d]" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">284</div>
                  <p className="text-[11px] text-[#fa7b2d] font-bold">98.4% retention rate</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold text-slate-700">Advisory Sessions</span>
                    <Calendar className="w-4 h-4 text-[#2ac0db]" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">92</div>
                  <p className="text-[11px] text-[#126373] font-bold">{appointments.length} scheduled this month</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold text-slate-700">Est. Total Revenue</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-700">$48,250</div>
                  <p className="text-[11px] text-slate-500 font-medium">Recruitment & Audits</p>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Placements Chart */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-sm">Monthly Teacher Placements</h3>
                      <p className="text-xs text-slate-500">Teachers placed in private preschools</p>
                    </div>
                    <span className="text-xs text-slate-400 font-semibold">2026 YTD</span>
                  </div>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MOCK_ADMIN_ANALYTICS.monthlyPlacements}>
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                        <YAxis stroke="#94a3b8" fontSize={11} />
                        <Tooltip />
                        <Bar dataKey="teachers" fill="#126373" radius={[4, 4, 0, 0]} name="Placed Teachers" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Level Distribution Pie */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-sm">Teacher Specialization Breakdown</h3>
                      <p className="text-xs text-slate-500">Candidates by early learning stage</p>
                    </div>
                  </div>
                  <div className="h-56 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={MOCK_ADMIN_ANALYTICS.levelDistribution}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={75}
                          innerRadius={45}
                          paddingAngle={3}
                        >
                          {MOCK_ADMIN_ANALYTICS.levelDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600">
                    {MOCK_ADMIN_ANALYTICS.levelDistribution.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span>{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Quick Action Hub */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
                <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2ac0db]" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <button
                    onClick={() => { setActiveTab('candidates'); }}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-left border border-white/10 transition-colors cursor-pointer space-y-1"
                  >
                    <Users className="w-4 h-4 text-[#2ac0db]" />
                    <div className="font-bold text-white">Teacher Profiles</div>
                    <div className="text-[10px] text-slate-300">View teacher details</div>
                  </button>

                  <button
                    onClick={() => { setActiveTab('movements'); setShowLogMovementModal(true); }}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-left border border-white/10 transition-colors cursor-pointer space-y-1"
                  >
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <div className="font-bold text-white">Record Status Move</div>
                    <div className="text-[10px] text-slate-300">Update availability log</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('approvals')}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-left border border-white/10 transition-colors cursor-pointer space-y-1"
                  >
                    <UserCheck className="w-4 h-4 text-[#fa7b2d]" />
                    <div className="font-bold text-white">Review New Teachers</div>
                    <div className="text-[10px] text-slate-300">Approve applications</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('broadcasts')}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-left border border-white/10 transition-colors cursor-pointer space-y-1"
                  >
                    <Send className="w-4 h-4 text-[#2ac0db]" />
                    <div className="font-bold text-white">Send Broadcast</div>
                    <div className="text-[10px] text-slate-300">Message all teachers</div>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB: LIVE MOVEMENTS (Exact Tracker of who is available and who is not) */}
          {activeTab === 'movements' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    Live Teacher Availability Movement Stream
                  </h3>
                  <p className="text-xs text-slate-500">Real-time audit log tracking who is currently available, who signed contracts, and status shifts</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowLogMovementModal(true)}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Record Manual Move</span>
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
                <span className="text-slate-400 mr-1">Filter Stream:</span>
                {(['All', 'Immediate', '2 Weeks Notice', 'Placed / Employed'] as const).map((filterOpt) => (
                  <button
                    key={filterOpt}
                    onClick={() => setMovementFilter(filterOpt)}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      movementFilter === filterOpt
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {filterOpt}
                  </button>
                ))}
              </div>

              {/* Movement Timeline Stream */}
              <div className="space-y-3">
                {filteredMovements.map((log) => (
                  <div 
                    key={log.id} 
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#2ac0db] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {log.avatar ? (
                        <img src={log.avatar} alt={log.teacherName} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0b2228] to-[#114c5a] text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {log.teacherName.substring(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-heading font-extrabold text-slate-900 text-sm">{log.teacherName}</h4>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-[11px] font-bold text-slate-400">{log.timestamp}</span>
                        </div>

                        {/* Status Transition Pill */}
                        <div className="flex items-center gap-2 text-xs flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold text-[11px]">
                            {log.previousStatus}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                          <span className={`px-2.5 py-0.5 rounded-md font-extrabold text-[11px] ${
                            log.newStatus === 'Immediate' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                            log.newStatus === 'Placed / Employed' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                            log.newStatus === '2 Weeks Notice' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                            'bg-sky-100 text-sky-800 border border-sky-300'
                          }`}>
                            {log.newStatus}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 pt-0.5">{log.reason}</p>
                        
                        {log.schoolInvolved && (
                          <p className="text-[11px] text-[#126373] font-bold flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" />
                            School Involved: {log.schoolInvolved}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Logged By</span>
                      <span className="text-xs font-extrabold text-slate-800">{log.changedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CANDIDATES TALENT POOL & TEACHER PROFILES */}
          {activeTab === 'candidates' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#2ac0db]" />
                    Teacher Directory & Profiles
                  </h3>
                  <p className="text-xs text-slate-500">View teacher qualifications, demo lessons, references, and manage availability</p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                  Showing {filteredCandidates.length} of {teachersList.length} Teachers
                </span>
              </div>

              {/* Filters Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search candidate name, qualification, location..."
                    value={candidateSearch}
                    onChange={(e) => setCandidateSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                  />
                </div>

                <div>
                  <select
                    value={candidateAvailabilityFilter}
                    onChange={(e) => setCandidateAvailabilityFilter(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                  >
                    <option value="All">All Availability States</option>
                    <option value="Immediate">🟢 Ready Immediately</option>
                    <option value="2 Weeks Notice">🟡 2 Weeks Notice</option>
                    <option value="Next Academic Term">🔵 Next Academic Term</option>
                    <option value="Placed / Employed">🟣 Placed / Employed</option>
                  </select>
                </div>

                <div>
                  <select
                    value={candidateVerifiedFilter}
                    onChange={(e) => setCandidateVerifiedFilter(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#2ac0db]"
                  >
                    <option value="All">All Verification Statuses</option>
                    <option value="Verified">Verified by Miss Nancie</option>
                    <option value="Unverified">Pending Verification</option>
                  </select>
                </div>
              </div>

              {/* Candidate Table */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Teacher & Level</th>
                        <th className="py-3 px-4">Qualification</th>
                        <th className="py-3 px-4">Availability</th>
                        <th className="py-3 px-4">Verification</th>
                        <th className="py-3 px-4">Salary Expectation</th>
                        <th className="py-3 px-4 text-right">Profile</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {filteredCandidates.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
                              <div>
                                <div className="font-extrabold text-slate-900">{t.name}</div>
                                <div className="text-[11px] text-[#126373]">{t.teachingLevel}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-slate-700">
                            <div>{t.qualification}</div>
                            <div className="text-[10px] text-slate-400">{t.experienceYears}+ Yrs Exp • {t.location}</div>
                          </td>

                          <td className="py-3 px-4">
                            <select
                              value={t.availability}
                              onChange={(e) => handleQuickAvailabilityChange(t.id, e.target.value as AvailabilityStatus)}
                              className={`p-1.5 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
                                t.availability === 'Immediate' ? 'bg-emerald-50 text-emerald-900 border-emerald-200' :
                                t.availability === 'Placed / Employed' ? 'bg-purple-50 text-purple-900 border-purple-200' :
                                t.availability === '2 Weeks Notice' ? 'bg-amber-50 text-amber-900 border-amber-200' :
                                'bg-sky-50 text-sky-900 border-sky-200'
                              }`}
                            >
                              <option value="Immediate">🟢 Immediate</option>
                              <option value="2 Weeks Notice">🟡 2 Weeks</option>
                              <option value="Next Academic Term">🔵 Next Term</option>
                              <option value="Placed / Employed">🟣 Placed</option>
                            </select>
                          </td>

                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => handleQuickVerifyToggle(t.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 cursor-pointer transition-all ${
                                t.isVerified 
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' 
                                  : 'bg-amber-100 text-amber-900 border border-amber-200'
                              }`}
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              {t.isVerified ? 'Verified' : 'Pending Check'}
                            </button>
                          </td>

                          <td className="py-3 px-4 text-slate-900 font-bold">
                            {t.salaryExpectation}
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleOpenTeacherProfile(t)}
                              className="px-3.5 py-1.5 bg-slate-900 hover:bg-[#126373] text-white font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1 ml-auto cursor-pointer transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#2ac0db]" />
                              <span>View Profile</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEACHER APPROVALS & VETTING */}
          {activeTab === 'approvals' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#2ac0db]" />
                    Candidate Verification Queue
                  </h3>
                  <p className="text-xs text-slate-500">Audit applicant credentials, certifications, and approve verified badges</p>
                </div>
                <span className="text-xs font-bold text-[#126373] bg-[#2ac0db]/15 px-3 py-1 rounded-full border border-[#2ac0db]/30">
                  {pendingList.filter(p => p.status === 'Pending Review').length} Pending Audits
                </span>
              </div>

              <div className="space-y-4">
                {pendingList.map((item) => (
                  <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={item.avatar} alt={item.teacherName} className="w-14 h-14 rounded-2xl object-cover border border-slate-200" />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{item.teacherName}</h4>
                          <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                            item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                            item.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#126373] font-semibold">{item.qualification} • {item.level}</p>
                        <p className="text-[11px] text-slate-400">Applied: {item.appliedDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.status !== 'Approved' && (
                        <button
                          onClick={() => handleApproveTeacher(item.id)}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve & Verify</span>
                        </button>
                      )}
                      {item.status !== 'Rejected' && (
                        <button
                          onClick={() => handleRejectTeacher(item.id)}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#2ac0db]" />
                    Miss Nancie's Master Calendar & Appointments
                  </h3>
                  <p className="text-xs text-slate-500">Manage client consultations, EYFS school audits, and candidate screening interviews</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowNewAptModal(true)}
                    className="px-4 py-2.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Appointment</span>
                  </button>
                </div>
              </div>

              {/* Interactive Date Picker Strip */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
                  <span>August 2026 Scheduled Days</span>
                  <span className="text-[#126373]">Selected: {selectedCalendarDate}</span>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold">
                  {['Mon 17', 'Tue 18', 'Wed 19', 'Thu 20', 'Fri 21', 'Sat 22', 'Sun 23'].map((day, idx) => {
                    const dateVal = `2026-08-${17 + idx}`;
                    const hasAppointments = appointments.filter(a => a.date === dateVal).length;
                    const isSelected = selectedCalendarDate === dateVal;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedCalendarDate(dateVal)}
                        className={`p-3 rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span className="text-[11px] opacity-75">{day.split(' ')[0]}</span>
                        <span className="text-base font-extrabold">{day.split(' ')[1]}</span>
                        {hasAppointments > 0 && (
                          <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${isSelected ? 'bg-[#2ac0db] text-slate-950' : 'bg-[#fa7b2d] text-white'}`}>
                            {hasAppointments} {hasAppointments === 1 ? 'Slot' : 'Slots'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scheduled Appointments for Selected Date & All Upcoming */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-slate-900 text-sm">
                    Appointments for {selectedCalendarDate} ({appointments.filter(a => a.date === selectedCalendarDate).length})
                  </h4>
                  <span className="text-xs text-slate-500">{appointments.length} total scheduled</span>
                </div>

                {appointments.filter(a => a.date === selectedCalendarDate).length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
                    <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs font-bold text-slate-600">No scheduled sessions for this date.</p>
                    <button
                      onClick={() => setShowNewAptModal(true)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Book Session for this Date
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {appointments.filter(a => a.date === selectedCalendarDate).map((apt) => (
                      <div key={apt.id} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2ac0db]/15 text-[#126373] border border-[#2ac0db]/30">
                              {apt.type}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {apt.status}
                            </span>
                            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" /> {apt.time}
                            </span>
                          </div>

                          <h5 className="font-heading font-bold text-slate-900 text-base">{apt.title}</h5>
                          <p className="text-xs font-semibold text-slate-700">{apt.clientName} • <span className="text-slate-500">{apt.schoolName}</span></p>
                          
                          <div className="flex items-center gap-3 text-xs text-slate-500 pt-0.5">
                            <span className="flex items-center gap-1 font-medium"><MapPin className="w-3.5 h-3.5 text-[#fa7b2d]" /> {apt.format}</span>
                            {apt.meetingLink && (
                              <a href={apt.meetingLink} target="_blank" rel="noopener noreferrer" className="text-[#126373] hover:underline flex items-center gap-1 font-bold">
                                <Video className="w-3.5 h-3.5" /> Meeting Link
                              </a>
                            )}
                          </div>

                          {apt.notes && (
                            <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-xl mt-1 max-w-xl">
                              “{apt.notes}”
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => triggerToast(`Copied meeting invite link for ${apt.clientName}`)}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                            title="Copy Meeting Invite"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAppointment(apt.id)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                            title="Cancel / Delete Appointment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: PLACEMENTS */}
          {activeTab === 'placements' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#2ac0db]" />
                    School Placement Pipeline
                  </h3>
                  <p className="text-xs text-slate-500">Track client school requests through matching, interviewing, and 90-day guarantee</p>
                </div>
                <button
                  onClick={() => triggerToast('New vacancy lead registered into placement tracker.')}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-[#126373] text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  + Add School Request
                </button>
              </div>

              <div className="space-y-3">
                {pipelineLeads.map((lead) => (
                  <div key={lead.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-slate-900 text-sm">{lead.schoolName}</h4>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          lead.stage === 'Placed' ? 'bg-emerald-100 text-emerald-800' :
                          lead.stage === 'Interviews' ? 'bg-[#2ac0db]/20 text-[#126373]' :
                          lead.stage === 'Shortlisting' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          Stage: {lead.stage}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#126373]">{lead.requestedRole} • {lead.location}</p>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                        <span>Contact: <strong>{lead.contactPerson}</strong> ({lead.contactPhone})</span>
                        <span>•</span>
                        <span>Budget: <strong>{lead.budget}</strong></span>
                        {lead.assignedTeacher && (
                          <>
                            <span>•</span>
                            <span className="text-[#126373] font-bold">Assigned: {lead.assignedTeacher}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => triggerToast(`Opened candidate matching modal for ${lead.schoolName}`)}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
                      >
                        Match Candidate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONSULTATIONS */}
          {activeTab === 'consultations' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
                <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
                  <BookOpenCheck className="w-5 h-5 text-[#2ac0db]" />
                  Proprietor & School Inquiries
                </h3>
                <p className="text-xs text-slate-500">Incoming school requests for recruitment, classroom design, and EYFS audits</p>
              </div>

              <div className="space-y-4">
                {consultationsList.map((item) => (
                  <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{item.clientName}</h4>
                        <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                          item.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#126373] font-semibold">{item.schoolName}</p>
                      <p className="text-xs text-slate-600">Service: <strong>{item.serviceName}</strong></p>
                      <p className="text-[11px] text-slate-500">Requested: {item.requestedDate} • Phone: {item.phone}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.status !== 'Confirmed' ? (
                        <button
                          onClick={() => handleConfirmConsultation(item.id)}
                          className="px-4 py-2 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                        >
                          Confirm & Book
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Booked
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: WORKSHOPS */}
          {activeTab === 'workshops' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-[#2ac0db]" />
                    Workshops & Teacher Training Master
                  </h3>
                  <p className="text-xs text-slate-500">Schedule certified training, download attendee rosters, and track CPD credentials</p>
                </div>
                <button
                  onClick={() => triggerToast('New workshop created and listed on public site.')}
                  className="px-4 py-2.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  + Create Workshop
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_WORKSHOPS.map((ws) => (
                  <div key={ws.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2ac0db]/15 text-[#126373]">
                          {ws.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">{ws.title}</h4>
                      </div>
                      <span className="text-sm font-extrabold text-slate-900">{ws.price}</span>
                    </div>

                    <div className="text-xs text-slate-500 space-y-1">
                      <p><Clock className="w-3.5 h-3.5 inline mr-1 text-slate-400" /> {ws.date} • {ws.time}</p>
                      <p><MapPin className="w-3.5 h-3.5 inline mr-1 text-slate-400" /> {ws.venue}</p>
                      <p className="text-[11px] font-semibold text-emerald-700">Enrolled: {ws.totalSeats - ws.availableSeats} of {ws.totalSeats} seats booked ({ws.availableSeats} remaining)</p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => triggerToast(`Exported registered attendees roster for ${ws.title}`)}
                        className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Roster CSV</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: STORE */}
          {activeTab === 'store' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#2ac0db]" />
                    Learning Essentials & Orders Manager
                  </h3>
                  <p className="text-xs text-slate-500">Manage physical shipments of Curated Book Boxes, Jolly Phonics kits, and sensory resources</p>
                </div>
                <button
                  onClick={() => triggerToast('New store product added to catalog.')}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-[#126373] text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  + Add Product Item
                </button>
              </div>

              <div className="space-y-3">
                {MOCK_LEARNING_PRODUCTS.map((prod) => (
                  <div key={prod.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{prod.name}</h4>
                        <p className="text-[11px] text-[#126373] font-semibold">{prod.category} • {prod.ageGroup}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <span className="font-extrabold text-slate-900 text-sm">${prod.price}</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded border border-emerald-200">
                        In Stock
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: BROADCASTS */}
          {activeTab === 'broadcasts' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
                <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Send className="w-5 h-5 text-[#2ac0db]" />
                  System Announcements & Broadcasts
                </h3>
                <p className="text-xs text-slate-500">Dispatch platform notifications, job alerts, and policy updates to teachers & school proprietors</p>
              </div>

              {/* Compose New Broadcast Form */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
                <h4 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#fa7b2d]" />
                  Compose New Broadcast
                </h4>

                <form onSubmit={handleSendBroadcast} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Audience</label>
                    <select
                      value={newBroadcastTarget}
                      onChange={(e) => setNewBroadcastTarget(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                    >
                      <option value="All Teachers">All Verified Teachers (1,248 Recipients)</option>
                      <option value="School Owners">Registered School Proprietors (284 Schools)</option>
                      <option value="All Platform Users">Entire Network (1,500+ Users)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Announcement Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Urgent Notice: New Term Recruitment Matching Cycle"
                      value={newBroadcastTitle}
                      onChange={(e) => setNewBroadcastTitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Message Content</label>
                    <textarea
                      rows={3}
                      placeholder="Type your official announcement here..."
                      value={newBroadcastBody}
                      onChange={(e) => setNewBroadcastBody(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Announcement</span>
                  </button>
                </form>
              </div>

              {/* Past Broadcasts List */}
              <div className="space-y-3">
                <h4 className="font-heading font-bold text-slate-900 text-sm">Dispatched Broadcasts History</h4>
                {broadcasts.map((bc) => (
                  <div key={bc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#126373] text-white text-[10px] font-bold rounded">
                          {bc.target}
                        </span>
                        <span className="text-[11px] text-slate-400">{bc.date}</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> {bc.readsCount} reads
                      </span>
                    </div>

                    <h5 className="font-heading font-bold text-slate-900 text-sm">{bc.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{bc.body}</p>
                  </div>
                ))}
              </div>

            </div>
          )}

        </main>

      </div>

      {/* Teacher Profile Modal (Slides up from bottom) */}
      <TeacherDetailDrawer
        teacher={selectedTeacherForDrawer}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedTeacherForDrawer(null);
        }}
        onUpdateStatus={handleUpdateTeacherFromDrawer}
      />

      {/* Manual Movement Logger Modal */}
      {showLogMovementModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                Record Teacher Movement
              </h3>
              <button
                onClick={() => setShowLogMovementModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleRecordManualMovement} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Teacher Name</label>
                <input
                  type="text"
                  placeholder="e.g. Amina Bello"
                  value={manualLogTeacherName}
                  onChange={(e) => setManualLogTeacherName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Previous Status</label>
                  <select
                    value={manualLogPrevStatus}
                    onChange={(e) => setManualLogPrevStatus(e.target.value as AvailabilityStatus)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="2 Weeks Notice">2 Weeks Notice</option>
                    <option value="Next Academic Term">Next Academic Term</option>
                    <option value="Placed / Employed">Placed / Employed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">New Status</label>
                  <select
                    value={manualLogNewStatus}
                    onChange={(e) => setManualLogNewStatus(e.target.value as AvailabilityStatus)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="2 Weeks Notice">2 Weeks Notice</option>
                    <option value="Next Academic Term">Next Academic Term</option>
                    <option value="Placed / Employed">Placed / Employed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">School / Employer Involved (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Grange School Early Years, Ikeja GRA"
                  value={manualLogSchool}
                  onChange={(e) => setManualLogSchool(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Reason / Note</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Completed notice period; ready for immediate deployment."
                  value={manualLogReason}
                  onChange={(e) => setManualLogReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowLogMovementModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Log Movement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Appointment Modal Form */}
      {showNewAptModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#2ac0db]" />
                Schedule Miss Nancie Session
              </h3>
              <button
                onClick={() => setShowNewAptModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddAppointment} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Session Title</label>
                <input
                  type="text"
                  placeholder="e.g. EYFS Curriculum Audit & Staff Alignment"
                  value={newApt.title || ''}
                  onChange={(e) => setNewApt({ ...newApt, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Mrs. Folashade"
                    value={newApt.clientName || ''}
                    onChange={(e) => setNewApt({ ...newApt, clientName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">School / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Corona Early Years"
                    value={newApt.schoolName || ''}
                    onChange={(e) => setNewApt({ ...newApt, schoolName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newApt.date || selectedCalendarDate}
                    onChange={(e) => setNewApt({ ...newApt, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time Slot</label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM - 11:30 AM"
                    value={newApt.time || ''}
                    onChange={(e) => setNewApt({ ...newApt, time: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Service Type</label>
                  <select
                    value={newApt.type}
                    onChange={(e) => setNewApt({ ...newApt, type: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                  >
                    <option value="Proprietor Consultation">Proprietor Consultation</option>
                    <option value="EYFS Audit">EYFS Curriculum Audit</option>
                    <option value="Teacher Screening">Teacher Screening</option>
                    <option value="CEC Space Walkthrough">CEC Space Walkthrough</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Session Format</label>
                  <select
                    value={newApt.format}
                    onChange={(e) => setNewApt({ ...newApt, format: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                  >
                    <option value="Google Meet / Zoom">Google Meet / Zoom</option>
                    <option value="In-Person (Lekki Office)">In-Person (Lekki Office)</option>
                    <option value="On-Site School Visit">On-Site School Visit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Meeting Link or Address</label>
                <input
                  type="text"
                  placeholder="https://meet.google.com/cec-session"
                  value={newApt.meetingLink || ''}
                  onChange={(e) => setNewApt({ ...newApt, meetingLink: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes & Objective</label>
                <textarea
                  rows={2}
                  placeholder="Key focal areas for this session..."
                  value={newApt.notes || ''}
                  onChange={(e) => setNewApt({ ...newApt, notes: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2ac0db]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewAptModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Add to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
