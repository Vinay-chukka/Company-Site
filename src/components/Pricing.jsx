import React from 'react';
import { ArrowUpRight, Check, Crown, Handshake, Headset, Zap } from 'lucide-react';
import { plans } from '../data/pricing.js';
import { selectPlan } from '../data/site.js';
import './Pricing.css';

const formatPrice = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const benefits = [
  { icon: Zap, label: 'Flexible & Transparent' },
  { icon: Handshake, label: 'Based on Your Requirements' },
  { icon: Headset, label: 'Support at Every Step' },
];

export default function Pricing() {
  return (
    <section id="pricing" className="pricing" aria-labelledby="pricing-title">
      <div className="wrap pricing-inner">
        <p className="eyebrow">06 / Custom Pricing</p>
        <h2 className="section-title" id="pricing-title">Your Idea. Your Needs. <em>Your Quote.</em></h2>
        <p className="pricing-intro">Compare starting prices below. Your final quote depends on your project requirements.</p>
        <div className="pricing-grid">
          {plans.map(({ name, icon: Icon, description, features, action, featured, startingPrice }) => (
            <article key={name} className={featured ? 'price-card price-card--featured' : 'price-card'}>
              {featured && <p className="price-badge"><Crown aria-hidden="true" />Most Popular</p>}
              <div className="price-card-heading">
                <span className="price-icon"><Icon aria-hidden="true" /></span>
                <div>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              </div>
              <ul className="price-features">
                {features.map(feature => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}
              </ul>
              <div className="price-action">
                <p><span className="price-label">Starting at</span> {formatPrice.format(startingPrice)}</p>
                <a className={'button ' + (featured ? 'button--solid' : 'button--outline')} href="#contact" aria-label={action + ' · ' + name} onClick={() => selectPlan(name)}>
                  {action} <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <ul className="pricing-benefits">
          {benefits.map(({ icon: Icon, label }) => <li key={label}><Icon aria-hidden="true" />{label}</li>)}
        </ul>
      </div>
    </section>
  );
}
