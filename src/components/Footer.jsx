
import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { navigation, selectService } from '../data/site.js';
import { services } from '../data/services.js';
import Brand from './Brand.jsx';
import SocialLinks from './SocialLinks.jsx';
import DetailDialog from './DetailDialog.jsx';
import './Footer.css';

const policies = {
  'Privacy Policy': {
    introduction:
      'At PageOrigin, we respect your privacy and are committed to handling your personal information responsibly and transparently.',
    sections: [
      {
        title: 'Information We Collect',
        description:
          'When you contact us or request our services, we may collect your name, email address, phone number, business details, and project requirements.',
      },
      {
        title: 'How We Use Information',
        description:
          'We use the information you provide to respond to enquiries, prepare quotations, communicate project updates, deliver services, and provide customer support.',
      },
      {
        title: 'Consent & Transparency',
        description:
          'Where required, we obtain appropriate consent before collecting or processing personal information and explain the purposes for which it will be used.',
      },
      {
        title: 'Information Sharing',
        description:
          'We do not sell your personal information. We may share necessary details with trusted service providers for website operations, communication, or project delivery, subject to applicable legal requirements.',
      },
      {
        title: 'Data Security',
        description:
          'We implement reasonable technical and organizational safeguards to protect personal information from unauthorized access, misuse, alteration, or disclosure.',
      },
      {
        title: 'Cookies & Analytics',
        description:
          'Our website may use cookies or analytics technologies to improve performance and user experience. Where applicable, visitors will be informed about these technologies and their available choices.',
      },
      {
        title: 'Third-Party Services',
        description:
          'Our website may integrate third-party services such as Web3Forms, hosting platforms, email providers, and external links. These services may operate under their own privacy policies.',
      },
      {
        title: 'Data Retention',
        description:
          'We retain personal information only for as long as reasonably necessary for legitimate business purposes or applicable legal obligations, following our documented retention practices.',
      },
      {
        title: 'Your Privacy Rights',
        description:
          'Subject to applicable law, you may request access to, correction of, or deletion of your personal information, or withdraw consent where relevant, by contacting us.',
      },
      {
        title: 'Policy Updates & Contact',
        description:
          'We may update this Privacy Policy to reflect changes in our services or applicable regulations. For privacy-related enquiries, contact support@pageorigin.in.',
      },
    ],
  },

  'Terms & Conditions': {
    introduction:
      'Welcome to PageOrigin. By accessing our website or using our services, you agree to the following Terms & Conditions.',
    sections: [
      {
        title: 'Services',
        description:
          'PageOrigin provides website design, web development, portfolio websites, landing pages, event websites, and customized digital solutions based on client requirements.',
      },
      {
        title: 'Pricing & Quotations',
        description:
          'All prices displayed on our website are starting prices. Final quotations depend on project scope, design complexity, features, and specific requirements.',
      },
      {
        title: 'Payment Terms',
        description:
          'An agreed advance payment may be required before project initiation. Remaining payments must be completed according to the approved quotation or payment schedule.',
      },
      {
        title: 'Project Timeline',
        description:
          'Estimated delivery timelines will be communicated before development begins. Delays in content submission, feedback, approvals, or additional requirements may affect delivery dates.',
      },
      {
        title: 'Revisions & Modifications',
        description:
          'Revisions are provided according to the agreed project scope. Additional features, major design changes, or requests outside the approved scope may incur extra charges.',
      },
      {
        title: 'Domain & Hosting',
        description:
          'Domain registration, website hosting, premium tools, and third-party subscriptions are not included unless explicitly mentioned in the quotation. Applicable renewal charges remain the client’s responsibility as agreed.',
      },
      {
        title: 'Client Responsibilities',
        description:
          'Clients must provide accurate information, necessary content, and materials they have permission to use. PageOrigin is not responsible for unauthorized content supplied by clients.',
      },
      {
        title: 'Ownership & Intellectual Property',
        description:
          'Website ownership, source code access, and usage rights will be defined in the project agreement. Third-party assets and software remain subject to their respective licenses.',
      },
      {
        title: 'Cancellation, Refunds & Support',
        description:
          'Project cancellations, applicable refunds, and post-delivery support will follow the agreed project terms and applicable laws. Support or maintenance outside the agreed scope may involve additional charges.',
      },
      {
        title: 'Changes & Contact',
        description:
          'PageOrigin may update these website terms periodically. Existing project agreements will remain subject to their agreed conditions unless appropriately amended. For enquiries, contact hello@pageorigin.in.',
      },
    ],
  },
};

export default function Footer() {
  const [policy, setPolicy] = useState('');

  const selectedPolicy = policy ? policies[policy] : null;

  const closePolicy = () => setPolicy('');

  return (
    <footer className="footer">
      <div className="wrap footer-grid">

        {/* Brand & Social Links */}
        <div>
          <Brand />
          <p>Creative Websites. Thoughtfully Built.</p>
          <SocialLinks />
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick links">
          <h2>Quick Links</h2>
          {navigation.map(([name, href]) => (
            <a key={href} href={href}>
              {name}
            </a>
          ))}
        </nav>

        {/* Services */}
        <nav aria-label="Footer services">
          <h2>Our Services</h2>
          {services.map(({ name }) => (
            <a
              key={name}
              href="#contact"
              onClick={() => selectService(name)}
            >
              {name}
            </a>
          ))}
        </nav>

        {/* Contact CTA */}
        <div>
          <h2>Let's Build Together</h2>
          <p>Have a project in mind? Get in touch with us today!</p>

          <a
  className="button button--solid"
  href="mailto:support@pageorigin.in"
>
  Support Us
  <ArrowUpRight />
</a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="wrap footer-bottom">
        <p>© 2026 PageOrigin. All rights reserved.</p>

        <div className="footer-policy-links">
          {Object.keys(policies).map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setPolicy(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Policy Popup */}
      {selectedPolicy && (
        <DetailDialog
          title={policy}
          onClose={closePolicy}
        >
          <div className="policy-content">

            <p className="policy-intro">
              {selectedPolicy.introduction}
            </p>

            <div className="policy-list">
              {selectedPolicy.sections.map((item, index) => (
                <section
                  className="policy-section"
                  key={item.title}
                >
                  <div className="policy-section-header">
                    <span className="policy-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3>{item.title}</h3>
                  </div>

                  <p>{item.description}</p>
                </section>
              ))}
            </div>

            <div className="policy-contact">
              <p>
                Have questions about our policies?
              </p>

              <a
                href={
                  policy === 'Privacy Policy'
                    ? 'mailto:support@pageorigin.in'
                    : 'mailto:hello@pageorigin.in'
                }
              >
                {policy === 'Privacy Policy'
                  ? 'support@pageorigin.in'
                  : 'hello@pageorigin.in'}
                <ArrowUpRight size={16} />
              </a>
            </div>

          </div>
        </DetailDialog>
      )}

    </footer>
  );
}
