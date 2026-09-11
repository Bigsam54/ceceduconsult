import React, { useState, useMemo } from 'react';
import { ViewMode, Teacher, TeacherFilterState } from '../types';
import { MOCK_TEACHERS } from '../data/mockData';
import { TeacherCard } from '../components/TeacherCard';
import { 
  Search, 
  Filter, 
  X, 
  RotateCcw, 
  Sparkles, 
  SlidersHorizontal,
  MapPin,
  Briefcase,
  DollarSign,
  GraduationCap,
  Clock,
  CheckCircle2,
  Users
} from 'lucide-react';

interface DirectoryViewProps {
  onSelectTeacher: (teacher: Teacher) => void;
  onContactTeacher: (teacher: Teacher) => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  onSelectTeacher,
  onContactTeacher
}) => {
  const [filters, setFilters] = useState<TeacherFilterState>({
    searchQuery: '',
    teachingLevel: 'All',
    qualification: 'All',
    availability: 'All',
    maxSalary: 2500,
    experienceMinYears: 0,
    onlyVerified: false,
    location: 'All'
  });

  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'name'>('rating');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const levelOptions = ['All', 'Early Childhood (EYFS)', 'Nursery', 'Kindergarten', 'Lower Primary', 'JHS (English)', 'Special Needs (SEN)'];
  const qualificationOptions = ['All', 'B.Ed Early Childhood', 'EYFS Certified', 'Early Childhood Diploma', 'PGDE', 'Early Years Specialist'];
  const availabilityOptions = ['All', 'Immediate', '2 Weeks Notice', 'Next Academic Term'];
  const locationOptions = ['All', 'East Legon', 'Airport Residential', 'Cantonments', 'Tema', 'Kumasi', 'Takoradi'];

  // Filter Logic
  const filteredTeachers = useMemo(() => {
    return MOCK_TEACHERS.filter((t) => {
      // Search
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = t.name.toLowerCase().includes(q);
        const matchesTitle = t.title.toLowerCase().includes(q);
        const matchesBio = t.bio.toLowerCase().includes(q);
        const matchesSkills = t.skills.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesTitle && !matchesBio && !matchesSkills) return false;
      }

      // Teaching Level
      if (filters.teachingLevel !== 'All' && t.teachingLevel !== filters.teachingLevel) return false;

      // Qualification
      if (filters.qualification !== 'All' && t.qualification !== filters.qualification) return false;

      // Availability
      if (filters.availability !== 'All' && t.availability !== filters.availability) return false;

      // Location
      if (filters.location !== 'All' && !t.location.toLowerCase().includes(filters.location.toLowerCase())) return false;

      // Experience
      if (t.experienceYears < filters.experienceMinYears) return false;

      // Verified
      if (filters.onlyVerified && !t.isVerified) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return a.name.localeCompare(b.name);
    });
  }, [filters, sortBy]);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      teachingLevel: 'All',
      qualification: 'All',
      availability: 'All',
      maxSalary: 2500,
      experienceMinYears: 0,
      onlyVerified: false,
      location: 'All'
    });
  };

  const hasActiveFilters = 
    filters.searchQuery !== '' ||
    filters.teachingLevel !== 'All' ||
    filters.qualification !== 'All' ||
    filters.availability !== 'All' ||
    filters.location !== 'All' ||
    filters.experienceMinYears > 0 ||
    filters.onlyVerified;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Search Header Banner */}
      <div className="relative bg-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/20 shadow-2xl space-y-3 sm:space-y-4 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1632215861513-130b66fe97f4?auto=format&fit=crop&w=2000&q=80"
            alt="Certified early childhood teacher with a classroom of students"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
          Search Top Educators
        </h1>
        <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed font-medium">
          CEC Educational Consult believes that when the foundation of education is built right, the other levels stand firm.
        </p>

        {/* Search Input Bar */}
        <div className="pt-2 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 sm:left-4 top-3 sm:top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, skill (e.g. Synthetic Phonics), or title..."
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-white text-slate-900 placeholder-slate-400 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2ac0db] shadow-xs"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="absolute right-3 top-3 sm:top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Main Content Layout: Filters Sidebar + Candidates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden col-span-1 flex items-center justify-between bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200">
          <span className="font-bold text-xs sm:text-sm text-slate-800">
            {filteredTeachers.length} Candidates Found
          </span>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Desktop Filter Sidebar */}
        <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6 sticky top-28">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-sky-700" />
                <h3 className="font-heading font-bold text-slate-900 text-sm">Advanced Filters</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Verified Only Toggle */}
            <div className="flex items-center justify-between p-3 bg-sky-50 rounded-2xl border border-sky-200/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-700" />
                <span className="text-xs font-bold text-sky-950">Verified Teachers Only</span>
              </div>
              <input
                type="checkbox"
                checked={filters.onlyVerified}
                onChange={(e) => setFilters({ ...filters, onlyVerified: e.target.checked })}
                className="w-4 h-4 accent-sky-700 rounded cursor-pointer"
              />
            </div>

            {/* Teaching Level */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Teaching Level
              </label>
              <select
                value={filters.teachingLevel}
                onChange={(e) => setFilters({ ...filters, teachingLevel: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
              >
                {levelOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Qualification */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Qualification
              </label>
              <select
                value={filters.qualification}
                onChange={(e) => setFilters({ ...filters, qualification: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
              >
                {qualificationOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
              >
                {availabilityOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
              >
                {locationOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Min Experience Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Min. Experience</span>
                <span className="text-sky-700">{filters.experienceMinYears}+ Years</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={filters.experienceMinYears}
                onChange={(e) => setFilters({ ...filters, experienceMinYears: Number(e.target.value) })}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

          </div>
        </aside>

        {/* Right Candidates List Section */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Controls Bar: Result Count & Sort Dropdown */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-700" />
              <span className="font-heading font-bold text-slate-900 text-sm">
                Showing {filteredTeachers.length} Candidate{filteredTeachers.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold text-slate-800 outline-none cursor-pointer"
              >
                <option value="rating">Highest Rating</option>
                <option value="experience">Years Experience</option>
                <option value="name">Candidate Name</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-bold">Active Filters:</span>
              {filters.teachingLevel !== 'All' && (
                <span className="px-3 py-1 bg-sky-100 text-sky-900 rounded-full text-xs font-bold flex items-center gap-1 border border-sky-200">
                  Level: {filters.teachingLevel}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, teachingLevel: 'All' })} />
                </span>
              )}
              {filters.qualification !== 'All' && (
                <span className="px-3 py-1 bg-sky-100 text-sky-900 rounded-full text-xs font-bold flex items-center gap-1 border border-sky-200">
                  Qual: {filters.qualification}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, qualification: 'All' })} />
                </span>
              )}
              {filters.availability !== 'All' && (
                <span className="px-3 py-1 bg-sky-100 text-sky-900 rounded-full text-xs font-bold flex items-center gap-1 border border-sky-200">
                  Avail: {filters.availability}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, availability: 'All' })} />
                </span>
              )}
              {filters.location !== 'All' && (
                <span className="px-3 py-1 bg-sky-100 text-sky-900 rounded-full text-xs font-bold flex items-center gap-1 border border-sky-200">
                  Loc: {filters.location}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, location: 'All' })} />
                </span>
              )}
              {filters.experienceMinYears > 0 && (
                <span className="px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-xs font-bold flex items-center gap-1">
                  Exp: {filters.experienceMinYears}+ Yrs
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, experienceMinYears: 0 })} />
                </span>
              )}
            </div>
          )}

          {/* Grid of Teachers */}
          {filteredTeachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTeachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  onViewProfile={onSelectTeacher}
                  onContactCEC={onContactTeacher}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900">
                No Teachers Match Your Search Criteria
              </h3>
              <p className="text-slate-500 text-xs max-w-sm mx-auto">
                Try loosening your filters or resetting search parameters to see more available candidates.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-sky-800 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
