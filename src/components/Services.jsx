import React, { useState } from 'react';
import { ArrowUpRight, Asterisk } from 'lucide-react';
import { services } from '../data/services.js';
import { selectService } from '../data/site.js';
import DetailDialog from './DetailDialog.jsx';
import './Services.css';

export default function Services() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="services" className="services">
      <Asterisk className="services-spark" aria-hidden="true" />
      <div className="wrap services-inner">
        <p className="eyebrow">Our Services</p>
        <h2 className="section-title">What We <em>Create.</em></h2>
        <p className="services-intro">Thoughtfully designed, responsive and modern websites<br className="desktop-break" /> for businesses, creators and special moments.</p>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.name}>
              <span className="service-icon"><service.icon aria-hidden="true" /></span>
              <h3>{service.name}</h3>
              <button type="button" className="text-link" aria-label={'Explore ' + service.name} onClick={() => setSelected(service)}>Explore <ArrowUpRight /></button>
            </article>
          ))}
        </div>
      </div>
      {selected && <DetailDialog title={selected.name} onClose={() => setSelected(null)}>
        <p>{selected.description}</p>
        <a className="button button--solid" href="#project-form" onClick={(event) => { selectService(selected.name); event.currentTarget.closest('dialog').close(); }}>Request a Quote <ArrowUpRight /></a>
      </DetailDialog>}
    </section>
  );
}
