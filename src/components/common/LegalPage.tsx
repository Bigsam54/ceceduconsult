import React from 'react';
import { ShieldCheck } from 'lucide-react';

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  intro: React.ReactNode;
  lastUpdated: string;
  sections: LegalSection[];
}

// CEC's real, monitored contact details for legal and privacy questions
export const LEGAL_CONTACT = {
  email: 'contact@ceceducationalconsult.org',
  phone: '+233 54 039 0029',
  location: 'Accra, Ghana'
};

/** Shared layout for the Privacy Policy and Terms of Service pages */
export const LegalPage: React.FC<LegalPageProps> = ({ title, intro, lastUpdated, sections }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <header className="space-y-3 max-w-3xl pb-8 border-b border-slate-200">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#126373]/10 text-[#126373] text-[11px] font-bold uppercase tracking-widest">
        <ShieldCheck className="w-3.5 h-3.5" /> CEC Educational Consult
      </span>
      <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900">{title}</h1>
      <p className="text-xs text-slate-500 font-semibold">Last updated: {lastUpdated}</p>
      <div className="text-sm sm:text-base text-slate-600 leading-relaxed">{intro}</div>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
      {/* Contents */}
      <nav className="hidden lg:block lg:col-span-3">
        <div className="sticky top-32 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">On this page</p>
          {sections.map((section, idx) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#126373] hover:bg-slate-50"
            >
              {idx + 1}. {section.title}
            </a>
          ))}
        </div>
      </nav>

      <article className="lg:col-span-9 space-y-8 max-w-3xl">
        {sections.map((section, idx) => (
          <section key={section.id} id={section.id} className="scroll-mt-32 space-y-3">
            <h2 className="text-lg sm:text-xl font-heading font-bold text-slate-900">
              {idx + 1}. {section.title}
            </h2>
            <div className="text-sm text-slate-700 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-slate-900">
              {section.body}
            </div>
          </section>
        ))}

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 space-y-1">
          <p className="font-bold text-slate-900">Questions?</p>
          <p>
            Email <a href={`mailto:${LEGAL_CONTACT.email}`} className="text-[#126373] font-semibold hover:underline">{LEGAL_CONTACT.email}</a> or call{' '}
            <a href={`tel:${LEGAL_CONTACT.phone.replace(/\s/g, '')}`} className="text-[#126373] font-semibold hover:underline">{LEGAL_CONTACT.phone}</a>.
          </p>
        </div>
      </article>
    </div>
  </div>
);
