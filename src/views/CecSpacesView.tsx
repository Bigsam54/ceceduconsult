import React, { useState } from 'react';
import { MOCK_CEC_SPACES } from '../data/mockData';
import { 
  LayoutGrid, 
  Sparkles, 
  CheckCircle2, 
  Ruler, 
  Palette, 
  ShieldCheck,
  MessageCircle,
  Layers,
  Compass,
  Check,
  BookOpen,
  Blocks,
  FlaskConical,
  Camera,
  Eye
} from 'lucide-react';

interface CecSpacesViewProps {
  onOpenConsultationModal: () => void;
}

export const CecSpacesView: React.FC<CecSpacesViewProps> = ({ onOpenConsultationModal }) => {
  const [activeProject, setActiveProject] = useState(MOCK_CEC_SPACES[0]);
  const [selectedZone, setSelectedZone] = useState<string>('reading');
  const [viewMode, setViewMode] = useState<'photo' | 'blueprint'>('photo');

  const zones = [
    { id: 'reading', name: 'Reading & Literacy Haven', size: '20%', desc: 'Low-profile forward-facing bookshelves with cozy ergonomic floor cushions.', icon: BookOpen },
    { id: 'montessori', name: 'Montessori Practical Life', size: '30%', desc: 'Self-accessible wooden trays, pouring stations, and sensory sorting racks.', icon: Blocks },
    { id: 'sensory', name: 'Sensory & STEM Discovery', size: '25%', desc: 'Water play basin, kinetic sand tray, and natural magnifying light table.', icon: FlaskConical },
    { id: 'circle', name: 'Circle Time & Expressive Arts', size: '25%', desc: 'High-contrast perimeter line, acoustic dampening wall art, and easel bay.', icon: Palette },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12 sm:space-y-16">
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0d3842] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2ac0db]/20 shadow-2xl space-y-3.5 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
          Transform Rooms into Inspiring Learning Sanctuaries
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
          We design ergonomic, Montessori-aligned, safety-audited preschool environments that ignite children's natural curiosity.
        </p>
        <button
          onClick={() => onOpenConsultationModal()}
          className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-bold rounded-xl shadow-xl transition-all text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Book School Setup Consultation</span>
        </button>
      </div>

      {/* Interactive Blueprint & Modern Classroom Showcase */}
      <section className="bg-white p-5 sm:p-8 lg:p-10 rounded-3xl border border-slate-200/90 shadow-lg space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">{activeProject.title}</h2>
            <p className="text-xs text-slate-500">{activeProject.schoolName} • {activeProject.location}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('photo')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'photo'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-[#126373]" />
                <span>Classroom Photo</span>
              </button>
              <button
                onClick={() => setViewMode('blueprint')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'blueprint'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#2ac0db]" />
                <span>3D Blueprint</span>
              </button>
            </div>

            <span className="px-3 py-1.5 bg-[#2ac0db]/15 text-[#126373] text-xs font-bold rounded-xl border border-[#2ac0db]/30 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#2ac0db]" /> EYFS Standard
            </span>
          </div>
        </div>

        {/* Showcase Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Main Visual Display (Photo or Blueprint) */}
          <div className="lg:col-span-7">
            {viewMode === 'photo' ? (
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-xl bg-slate-950 aspect-4/3 sm:aspect-16/10 group">
                <img
                  src={activeProject.afterImage}
                  alt="Modernized African Elite School Montessori Classroom"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div className="bg-slate-950/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/20 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Completed Montessori Transformation • Accra</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-[#2ac0db] font-mono">
                  <span>// CEC-ARCH-SCALE: 1:50</span>
                  <span>DIMENSIONS: 48m²</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-h-[260px]">
                  {zones.map((zone) => {
                    const IconComponent = zone.icon;
                    return (
                      <div
                        key={zone.id}
                        onClick={() => setSelectedZone(zone.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          selectedZone === zone.id
                            ? 'bg-slate-800/90 border-[#2ac0db] text-white shadow-lg shadow-[#2ac0db]/20'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 rounded-xl bg-slate-700/60 flex items-center justify-center text-[#2ac0db]">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-700/80 text-[#2ac0db]">
                            {zone.size} AREA
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-xs mt-3 text-white">{zone.name}</h4>
                          <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">{zone.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>● Non-Toxic Polish Guarantee</span>
                  <span>● Rounded Edge Certified</span>
                </div>
              </div>
            )}
          </div>

          {/* Details & Key Upgrades */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-[#2ac0db]/10 border border-[#2ac0db]/20">
              <span className="text-[11px] font-bold text-[#126373] uppercase tracking-wider block mb-1">
                {viewMode === 'photo' ? 'Space Architecture' : 'Selected Zone Spotlight'}
              </span>
              <h4 className="font-bold text-sm text-slate-900">
                {viewMode === 'photo' ? 'Natural Beechwood & Montessori Layout' : zones.find(z => z.id === selectedZone)?.name}
              </h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                {viewMode === 'photo' 
                  ? 'Ergonomic, accessible low-shelving, cozy tactile literacy corners, and vibrant child-led discovery stations.'
                  : zones.find(z => z.id === selectedZone)?.desc}
              </p>
            </div>

            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">Key Upgrades Made</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{activeProject.description}</p>

            <div className="space-y-2 pt-1">
              {activeProject.keyUpgrades.map((upg, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#2ac0db] shrink-0" />
                  <span>{upg}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenConsultationModal()}
              className="w-full py-3 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold text-xs rounded-xl shadow-xs transition-all mt-3 cursor-pointer"
            >
              Transform Your Classroom Space
            </button>
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <Ruler className="w-7 h-7 sm:w-8 sm:h-8 text-[#2ac0db]" />
          <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">3D Spatial & Zoning Layout</h3>
          <p className="text-xs text-slate-600">Custom floorplan mapping for sensory play, reading nooks, and practical life centers.</p>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <Palette className="w-7 h-7 sm:w-8 sm:h-8 text-[#fa7b2d]" />
          <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">Wooden Furniture Sourcing</h3>
          <p className="text-xs text-slate-600">Child-height ergonomic natural beechwood shelves, tables, and low chairs.</p>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 sm:col-span-2 md:col-span-1">
          <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#2ac0db]" />
          <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">Child Safety & Sanitation Audit</h3>
          <p className="text-xs text-slate-600">Corner rounding, non-toxic finishes, impact flooring, and electrical socket child-proofing.</p>
        </div>
      </section>

    </div>
  );
};

