import React from 'react';
import { MOCK_CEC_SPACES } from '../data/mockData';
import {
  Quote,
  MapPin,
  CheckCircle2,
  MessageCircle,
  Ruler,
  Palette,
  ShieldCheck,
  BookOpen,
  Blocks,
  FlaskConical,
  ClipboardList,
  Compass,
  PackageCheck,
  ArrowRight,
  Frame,
  Globe2
} from 'lucide-react';

interface CecSpacesViewProps {
  onOpenConsultationModal: () => void;
}

const zones = [
  { name: 'Reading & Literacy Haven', desc: 'Low-profile bookshelves with cozy ergonomic floor cushions for quiet reading time.', icon: BookOpen },
  { name: 'Practical Life & Independence', desc: 'Self-accessible wooden trays, pouring stations and sensory sorting racks.', icon: Blocks },
  { name: 'Sensory & STEM Discovery', desc: 'Water play basins, kinetic sand trays and natural-light magnifying tables.', icon: FlaskConical },
  { name: 'Circle Time & Expressive Arts', desc: 'High-contrast perimeter lines, acoustic wall art and a dedicated easel bay.', icon: Palette }
];

const process = [
  { step: '01', title: 'Consult & Assess', desc: 'We visit or review your space virtually to understand your goals, budget and constraints.', icon: ClipboardList },
  { step: '02', title: 'Design & Plan', desc: 'A themed layout and zoning plan tailored to your learners\' ages and curriculum.', icon: Compass },
  { step: '03', title: 'Source & Build', desc: 'Ergonomic furniture, sensory materials and decor sourced and prepared for install.', icon: PackageCheck },
  { step: '04', title: 'Install & Audit', desc: 'Full setup on-site, finished with a child-safety and sanitation audit.', icon: ShieldCheck }
];

const stats = [
  { value: '12+', label: 'Classrooms Transformed' },
  { value: '4', label: 'Signature Zones per Room' },
  { value: '100%', label: 'Safety & Sanitation Audited' },
  { value: '2+', label: 'Countries Served' }
];

export const CecSpacesView: React.FC<CecSpacesViewProps> = ({ onOpenConsultationModal }) => {
  const spotlight = MOCK_CEC_SPACES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-14 sm:space-y-20">

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden border border-[#2ac0db]/20 shadow-2xl min-h-[280px] sm:min-h-[340px] flex items-center bg-slate-950 text-white">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src={spotlight?.afterImage}
            alt="A CEC-designed classroom space"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4 text-left p-6 sm:p-10 lg:p-12">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            CEC Inspire <span className="text-[#2ac0db]">Spaces</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-medium">
            Themed school design and signature classroom setups that turn ordinary rooms into inspiring, child-friendly learning spaces.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenConsultationModal()}
              className="px-6 py-3.5 bg-[#2ac0db] hover:bg-[#22a8c0] text-slate-950 font-extrabold rounded-xl shadow-xl transition-all text-sm sm:text-base inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book a School Setup Consultation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#126373]">{s.value}</div>
            <div className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Before & After Spotlight */}
      {spotlight && (
        <section className="space-y-6 sm:space-y-8">
          <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900">
              See the Transformation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">{spotlight.title}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg aspect-4/3 bg-slate-950">
              <img
                src={spotlight.beforeImage}
                alt="Before"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[30%]"
              />
              <span className="absolute top-3 left-3 px-3 py-1 bg-slate-950/85 text-white text-xs font-extrabold uppercase rounded-full backdrop-blur-xs">
                Before
              </span>
            </div>
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#2ac0db] shadow-xl aspect-4/3 bg-slate-950">
              <img
                src={spotlight.afterImage}
                alt="After"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 bg-[#2ac0db] text-slate-950 text-xs font-extrabold uppercase rounded-full">
                After
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {spotlight.keyUpgrades.map((upg, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2ac0db]/10 text-[#126373] text-xs font-semibold rounded-lg"
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{upg}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Room Zones We Design */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900">
            Signature Zones We Design
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Every CEC classroom is built around purposeful, child-led zones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {zones.map((zone, i) => {
            const Icon = zone.icon;
            return (
              <div key={i} className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-[#2ac0db]/15 text-[#126373] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">{zone.name}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{zone.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Spaces We've Designed - Testimonial Style Gallery */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900">
            Spaces We've Designed
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            A look at some of the schools and classrooms CEC has transformed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {MOCK_CEC_SPACES.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden flex flex-col"
            >
              <div className="relative aspect-4/3 sm:aspect-16/10 bg-slate-950">
                <img
                  src={project.afterImage}
                  alt={project.schoolName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/95 text-[#126373] text-[10px] font-extrabold uppercase rounded-full shadow-xs backdrop-blur-xs">
                  {project.type}
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-4 text-left">
                <div className="flex items-start gap-2.5">
                  <Quote className="w-5 h-5 text-[#2ac0db] shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed italic">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#fa7b2d]" />
                  <span>{project.schoolName} &bull; {project.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  {project.keyUpgrades.slice(0, 3).map((upg, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#2ac0db]/10 text-[#126373] text-[11px] font-semibold rounded-lg"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{upg}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Design Process */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900">
            Our Design Process
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From first conversation to finished classroom, in four steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {process.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="relative bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
                <span className="text-[11px] font-mono font-bold text-[#2ac0db]/70">{p.step}</span>
                <div className="w-11 h-11 rounded-2xl bg-[#fa7b2d]/15 text-[#fa7b2d] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">{p.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
                {i < process.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-5 h-5 text-slate-300" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* What's Included */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900">
            What's Included
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <Ruler className="w-7 h-7 sm:w-8 sm:h-8 text-[#2ac0db]" />
            <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">3D Spatial & Zoning Layout</h3>
            <p className="text-xs text-slate-600">Custom floorplan mapping for sensory play, reading nooks and practical life centers.</p>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <Palette className="w-7 h-7 sm:w-8 sm:h-8 text-[#fa7b2d]" />
            <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">Wooden Furniture Sourcing</h3>
            <p className="text-xs text-slate-600">Child-height ergonomic natural beechwood shelves, tables and low chairs.</p>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <Frame className="w-7 h-7 sm:w-8 sm:h-8 text-[#2ac0db]" />
            <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">Themed Decor & Branding</h3>
            <p className="text-xs text-slate-600">Cohesive visual themes, wall art and signage that bring each classroom to life.</p>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#fa7b2d]" />
            <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">Child Safety & Sanitation Audit</h3>
            <p className="text-xs text-slate-600">Corner rounding, non-toxic finishes, impact flooring and electrical socket child-proofing.</p>
          </div>
        </div>
      </section>

      {/* Global Reach Note */}
      <section className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3 text-left max-w-3xl mx-auto">
        <Globe2 className="w-6 h-6 text-[#2ac0db] shrink-0" />
        <p className="text-xs sm:text-sm text-slate-600">
          Based in Accra, Ghana, with remote design consultations available for schools worldwide.
        </p>
      </section>

      {/* Closing CTA */}
      <section className="bg-gradient-to-r from-slate-950 via-[#0d3842] to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-[#2ac0db]/20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
            Ready to Transform Your Classroom?
          </h3>
          <p className="text-slate-300 text-sm">
            Book a consultation and let's design a space your learners will love.
          </p>
        </div>
        <button
          onClick={() => onOpenConsultationModal()}
          className="shrink-0 px-6 py-3.5 bg-[#fa7b2d] hover:bg-[#e66b1d] text-white font-bold rounded-xl shadow-xl transition-all text-sm sm:text-base cursor-pointer"
        >
          Book School Setup Consultation
        </button>
      </section>

    </div>
  );
};
