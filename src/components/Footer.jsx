import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { navigation, selectService } from '../data/site.js';
import { services } from '../data/services.js';
import Brand from './Brand.jsx';
import SocialLinks from './SocialLinks.jsx';
import DetailDialog from './DetailDialog.jsx';
import './Footer.css';

const policies = {
  'Privacy Policy': 'When the contact form is connected, Web3Forms processes the information you enter and forwards it to the studio’s configured email address so the studio can reply.',
  'Terms & Conditions': 'The projects displayed on this site are design concepts. Project scope, fees and delivery terms are agreed separately when booking work.',
};

export default function Footer() {
  const [policy, setPolicy] = useState('');

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Brand />
          <p>Creative Websites. Thoughtfully Built.</p>
          <SocialLinks />
        </div>
        <nav aria-label="Quick links">
          <h2>Quick Links</h2>
          {navigation.map(([name, href]) => <a key={href} href={href}>{name}</a>)}
        </nav>
        <nav aria-label="Footer services">
          <h2>Our Services</h2>
          {services.map(({ name }) => <a key={name} href="#contact" onClick={() => selectService(name)}>{name}</a>)}
        </nav>
        <div>
          <h2>Let's Build Together</h2>
          <p>Have a project in mind? Get in touch with us today!</p>
          <a className="button button--solid" href="#project-form">Get a Free Quote <ArrowUpRight /></a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>© 2026 PageOrgin. All rights reserved.</p>
        <div>{Object.keys(policies).map((name) => <button key={name} type="button" onClick={() => setPolicy(name)}>{name}</button>)}</div>
      </div>
      {policy && <DetailDialog title={policy} onClose={() => setPolicy('')}><p>{policies[policy]}</p></DetailDialog>}
    </footer>
  );
}
