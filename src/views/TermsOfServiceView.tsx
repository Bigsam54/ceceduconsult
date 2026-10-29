import React from 'react';
import { LegalPage, LegalSection, LEGAL_CONTACT } from '../components/common/LegalPage';

const sections: LegalSection[] = [
  {
    id: 'agreement',
    title: 'About these terms',
    body: (
      <p>
        These terms apply to your use of ceceducationalconsult.org (the "website") and the services offered through it by CEC Educational
        Consult ("CEC", "we", "us"). By using the website or creating an account, you agree to these terms. If you do not agree, please do not
        use the website.
      </p>
    )
  },
  {
    id: 'services',
    title: 'Our services',
    body: (
      <p>
        CEC provides teacher recruitment and placement, educational consultancy, professional development workshops, the Reading Lounge,
        CEC Inspire Spaces classroom setup, and the Learning Essentials store. Specific services, fees and timelines are confirmed with you
        directly before any work begins. Information on the website is a general description and does not by itself form a contract.
      </p>
    )
  },
  {
    id: 'accounts',
    title: 'Accounts',
    body: (
      <ul>
        <li>You must be at least 18 years old to create an account.</li>
        <li>You must give accurate, current information and keep it up to date.</li>
        <li>You are responsible for keeping your password safe and for activity on your account. Tell us straight away if you think your account has been misused.</li>
        <li>We may suspend or close accounts that break these terms or contain false information.</li>
      </ul>
    )
  },
  {
    id: 'teachers',
    title: 'Teachers',
    body: (
      <ul>
        <li>Registering does not guarantee approval, a listing in the directory, or a placement.</li>
        <li>CEC reviews each application, including your Ghana Card and credentials, and decides whether to approve it.</li>
        <li>All information you provide, including qualifications and experience, must be true. Providing false or forged documents will lead to your account being closed and may be reported to the relevant authorities.</li>
        <li>Please keep your availability up to date so schools see accurate information.</li>
        <li>Employment terms are agreed between you and the school. Unless agreed otherwise in writing, CEC is not your employer.</li>
      </ul>
    )
  },
  {
    id: 'schools',
    title: 'Schools and clients',
    body: (
      <ul>
        <li>Teacher requests, consultation bookings and other enquiries are requests, not confirmed bookings, until CEC confirms them with you.</li>
        <li>Teacher information you receive from CEC must be used only to consider that teacher for a role, and must not be shared with others.</li>
        <li>Recruitment, consultancy and setup fees, and any placement guarantees, are set out in a separate agreement with CEC.</li>
        <li>You remain responsible for your own hiring decisions and for meeting your obligations as an employer.</li>
      </ul>
    )
  },
  {
    id: 'workshops-store',
    title: 'Workshops and the Learning Essentials store',
    body: (
      <ul>
        <li>Workshop registrations reserve a seat. CEC will contact you to confirm your place and any payment required.</li>
        <li>Store prices and availability are shown as a guide and are confirmed when you contact us to order. Delivery details and costs are agreed at that time.</li>
        <li>Product images are for illustration. Actual items may vary slightly in colour or design.</li>
      </ul>
    )
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the website for anything unlawful, misleading or harmful.</li>
          <li>Impersonate another person or upload someone else's documents.</li>
          <li>Copy, scrape or misuse teacher profiles or other people's information.</li>
          <li>Attempt to access accounts, data or areas of the website you are not authorised to use.</li>
        </ul>
      </>
    )
  },
  {
    id: 'content',
    title: 'Content and intellectual property',
    body: (
      <p>
        The website, including the CEC name, logo, text, designs and images, belongs to CEC or is used with permission, and may not be copied
        without our consent. When you upload content such as a profile photo or bio, you confirm you have the right to do so and allow CEC to
        display it on the website as part of our services.
      </p>
    )
  },
  {
    id: 'liability',
    title: 'Our responsibility to you',
    body: (
      <>
        <p>
          We verify teachers carefully, but we cannot guarantee any individual's future performance or conduct. Schools should carry out their
          own interviews and checks before hiring.
        </p>
        <p>
          We work to keep the website available and accurate, but it is provided "as is" and may occasionally be unavailable or contain errors.
          To the extent the law allows, CEC is not liable for indirect losses arising from use of the website. Nothing in these terms limits
          any rights you have under Ghanaian law that cannot be excluded.
        </p>
      </>
    )
  },
  {
    id: 'privacy',
    title: 'Privacy',
    body: (
      <p>
        How we collect and use personal information is explained in our{' '}
        <a href="/privacy" className="text-[#126373] font-semibold hover:underline">Privacy Policy</a>.
      </p>
    )
  },
  {
    id: 'changes-law',
    title: 'Changes and governing law',
    body: (
      <>
        <p>
          We may update these terms from time to time. The "Last updated" date shows when they last changed, and continuing to use the website
          means you accept the updated terms.
        </p>
        <p>These terms are governed by the laws of the Republic of Ghana.</p>
        <p>Questions about these terms can be sent to {LEGAL_CONTACT.email}.</p>
      </>
    )
  }
];

export const TermsOfServiceView: React.FC = () => (
  <LegalPage
    title="Terms of Service"
    lastUpdated="29 October 2026"
    intro={<p>Please read these terms carefully. They explain the rules for using the CEC Educational Consult website and services.</p>}
    sections={sections}
  />
);
