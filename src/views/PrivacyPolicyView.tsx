import React from 'react';
import { LegalPage, LegalSection, LEGAL_CONTACT } from '../components/common/LegalPage';

const sections: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <p>
        CEC Educational Consult ("CEC", "we", "us") is an educational consultancy based in {LEGAL_CONTACT.location}. We connect schools and
        families with vetted educators, and provide consultancy, workshops, reading programmes, classroom setup and learning resources through
        ceceducationalconsult.org (the "website"). We are responsible for the personal information described in this policy.
      </p>
    )
  },
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    body: (
      <>
        <p><strong>Teachers who register with us:</strong></p>
        <ul>
          <li>Your name, email address, phone or WhatsApp number and password (passwords are stored securely and we cannot see them).</li>
          <li>Your location, teaching level, qualifications, years of experience, salary expectation, skills and a short bio.</li>
          <li>A profile photo, if you choose to add one.</li>
          <li>Photos or scans of the <strong>front and back of your Ghana Card</strong>, which we use only to verify your identity.</li>
          <li>Your availability status and any changes you make to it.</li>
        </ul>
        <p><strong>Schools, parents and visitors who contact us:</strong></p>
        <ul>
          <li>The details you enter in our forms, such as your name, school or organisation, email, phone number, preferred dates and your message, when you book a consultation, request a teacher, register for a workshop or send us a message.</li>
          <li>Which products or books you enquire about and in what quantity.</li>
        </ul>
        <p><strong>If you sign in with Google:</strong> your name, email address and profile picture from your Google account. We do not receive your Google password or access to anything else in your account.</p>
        <p><strong>Usage information:</strong> we count how many times a teacher's public profile is viewed, so teachers can see their profile views. We do not use advertising trackers.</p>
      </>
    )
  },
  {
    id: 'how-we-use',
    title: 'How we use your information',
    body: (
      <ul>
        <li>To create and manage your account and teacher profile.</li>
        <li>To verify teachers' identity and credentials before they are approved and shown to schools.</li>
        <li>To show approved teachers on our public "Find a Teacher" directory.</li>
        <li>To match teachers with schools and arrange interviews and placements.</li>
        <li>To respond to consultation bookings, workshop registrations, enquiries and orders.</li>
        <li>To send you service updates and announcements related to your account.</li>
        <li>To keep the website secure and prevent fraud or misuse.</li>
      </ul>
    )
  },
  {
    id: 'what-schools-see',
    title: 'What schools and the public can see',
    body: (
      <>
        <p>
          Once CEC approves a teacher, the following appears publicly on our directory: name, photo, professional title, teaching level,
          location, qualification, years of experience, salary expectation, skills, bio and availability.
        </p>
        <p>
          <strong>We never publish your email address, phone number or Ghana Card.</strong> Schools contact CEC, and we share your contact
          details with a school only when arranging an interview or placement you are being considered for.
        </p>
      </>
    )
  },
  {
    id: 'sharing',
    title: 'Who we share information with',
    body: (
      <>
        <p>We do not sell your personal information. We share it only with:</p>
        <ul>
          <li><strong>Schools</strong> considering a teacher for a role, as described above.</li>
          <li><strong>Service providers</strong> that run the website on our behalf: Supabase (account and database hosting), Cloudinary (secure image storage for photos and Ghana Card images), Vercel (website hosting) and Google (optional sign-in).</li>
          <li><strong>WhatsApp</strong>, only when you choose to continue a conversation with us there.</li>
          <li><strong>Authorities</strong>, if we are required to by law.</li>
        </ul>
        <p>Some of these providers store data on servers outside Ghana. We use reputable providers that protect data with industry-standard security.</p>
      </>
    )
  },
  {
    id: 'ghana-card',
    title: 'Your Ghana Card',
    body: (
      <ul>
        <li>We collect your Ghana Card only to confirm that you are who you say you are.</li>
        <li>It is visible only to authorised CEC administrators and is never shown to schools or on the website.</li>
        <li>You can replace it at any time from your teacher dashboard.</li>
        <li>We delete it when you ask us to close your account, unless we are required by law to keep it.</li>
      </ul>
    )
  },
  {
    id: 'retention',
    title: 'How long we keep information',
    body: (
      <p>
        We keep teacher profiles for as long as your account is active. We keep enquiries and booking records for as long as needed to provide
        the service and for our business records. When information is no longer needed, we delete or anonymise it.
      </p>
    )
  },
  {
    id: 'security',
    title: 'How we protect your information',
    body: (
      <p>
        Information is sent over encrypted connections (HTTPS). Access to teacher records, Ghana Cards and enquiries is restricted to authorised
        CEC administrators through secured accounts. No system is completely secure, but we take reasonable steps to protect your information
        and will act promptly if a problem occurs.
      </p>
    )
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <>
        <p>Under Ghana's Data Protection Act, 2012 (Act 843), you can:</p>
        <ul>
          <li>Ask what personal information we hold about you and request a copy.</li>
          <li>Correct information that is wrong (teachers can edit most details directly from their dashboard).</li>
          <li>Ask us to delete your account and personal information.</li>
          <li>Object to us using your information, or withdraw consent you have given.</li>
        </ul>
        <p>
          To make a request, email {LEGAL_CONTACT.email}. If you are not satisfied with our response, you may contact Ghana's Data Protection
          Commission.
        </p>
      </>
    )
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        Our accounts are for adults: teachers, school leaders and parents. Children do not create accounts on our website. Where our programmes,
        such as the Reading Lounge, involve children, a parent or guardian provides any details we need.
      </p>
    )
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy as our services change. The "Last updated" date at the top shows when it last changed. If we make significant
        changes, we will let registered users know.
      </p>
    )
  }
];

export const PrivacyPolicyView: React.FC = () => (
  <LegalPage
    title="Privacy Policy"
    lastUpdated="29 October 2026"
    intro={
      <p>
        This policy explains what personal information CEC Educational Consult collects through our website, why we collect it, who we share it
        with, and the choices and rights you have.
      </p>
    }
    sections={sections}
  />
);
