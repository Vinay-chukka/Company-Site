import React, { useState } from 'react';
import { ArrowUpRight, UsersRound } from 'lucide-react';
import { art } from '../data/site.js';
import DetailDialog from './DetailDialog.jsx';
import './About.css';

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="about">
      <div className="wrap about-grid">
        <img src={art('about')} width="872" height="843" alt="Sculptural ivory arch, orange spheres and plum leaves" loading="lazy" />
        <div>
          <p className="eyebrow">About Us</p>
          <h2 className="section-title">Creative Minds.<br />Digital <em>Ideas.</em></h2>
          <p className="about-intro">At PageOrigin, we turn creative ideas into modern, engaging, and functional websites that reflect your brand’s identity.
</p><p className="about-intro">With a blend of creativity, thoughtful design, and reliable development, we build digital experiences tailored to your vision and goals.
</p>
          <div className="about-client-count">
            <UsersRound aria-hidden="true" />
            <div>
              <p className="about-client-total">10+ Clients</p>
              <p className="about-client-caption">Trusted us with their ideas</p>
            </div>
          </div>
          <button type="button" className="text-link about-link" onClick={() => setExpanded(true)}>More About Us <ArrowUpRight /></button>
        </div>
      </div>
      {expanded && <DetailDialog title="About PageOrgin" onClose={() => setExpanded(false)}>
        <p>PageOrgin is a creative web studio for businesses, professionals and special occasions. We design around your content and build layouts that work across phones, tablets and desktops.</p>
        <a className="button button--solid" href="#contact" onClick={(event) => event.currentTarget.closest('dialog').close()}>Get in Touch <ArrowUpRight /></a>
      </DetailDialog>}
    </section>
  );
}
