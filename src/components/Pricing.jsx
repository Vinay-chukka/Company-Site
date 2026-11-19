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
        <p className="eyebrow">Custom Pricing</p>
        <h2 className="section-title" id="pricing-title">
          Your Idea. Your Needs. <em>Your Quote.</em>
        </h2>
        <p className="pricing-intro">
          Explore our starting prices. Final quotes depend on your project requirements.
        </p>

        <div className="pricing-grid">
          {plans.map(({ name, icon: Icon, description, features, action, featured, startingPrice, originalPrice }) => {
            const validDiscount = Number.isFinite(originalPrice) && originalPrice > startingPrice;
            const discountPercent = validDiscount
              ? Math.round(((originalPrice - startingPrice) / originalPrice) * 100)
              : 0;

            return (
              <article key={name} className={featured ? 'price-card price-card--featured' : 'price-card'}>
                {featured && (
                  <p className="price-badge">
                    <Crown aria-hidden="true" /> Most Popular
                  </p>
                )}

                <div className="price-card-heading">
                  <span className="price-icon"><Icon aria-hidden="true" /></span>
                  <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                  </div>
                </div>

                <ul className="price-features">
                  {features.map(feature => (
                    <li key={feature}><Check aria-hidden="true" />{feature}</li>
                  ))}
                </ul>

                <div className="price-action">
                  <div className="price-offer">
                    {validDiscount && (
                      <div className="price-offer-compare">
                        <span className="price-old-label">Regular price</span>
                        <span className="price-old"><del>{formatPrice.format(originalPrice)}</del></span>
                        <span className="price-discount">{discountPercent}% OFF</span>
                      </div>
                    )}
                    <div className="price-offer-current">
                      <span className="price-label">Starting at</span>
                      <strong className="price-current">{formatPrice.format(startingPrice)}</strong>
                    </div>
                  </div>
                  <a
                    className={'button ' + (featured ? 'button--solid' : 'button--outline')}
                    href="#contact"
                    aria-label={`${action} · ${name}`}
                    onClick={() => selectPlan(name)}
                  >
                    {action} <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="pricing-disclaimer">
          Prices shown are starting estimates. Final pricing and inclusions will be confirmed in your quotation.
        </p>
        <ul className="pricing-benefits">
          {benefits.map(({ icon: Icon, label }) => (
            <li key={label}><Icon aria-hidden="true" />{label}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
