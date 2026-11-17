import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { art } from '../data/site.js';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero wrap">
      <div className="hero-copy">
        <p className="eyebrow">01 / Creative Web Studio</p>
        <h1 className="section-title">Digital.<br /><span>Design That</span><br /><em>Stands Out.</em></h1>
        <p className="hero-intro">We design and develop creative, responsive websites for brands, professionals and special moments.</p>
        <div className="hero-actions">
          <a className="button button--solid" href="#project-form">Start a Project <ArrowUpRight /></a>
          <a className="button button--outline" href="#projects">View Our Work</a>
        </div>
      </div>
      <div className="hero-art">
        <img src={art('hero')} width="972" height="783" alt="PageOrgin browser mockup with an orange and plum architectural design" fetchPriority="high" />
        <span className="hero-address">pageorigin.in</span>
      </div>
    </section>
  );
}
