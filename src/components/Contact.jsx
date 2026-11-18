
import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  UserRound,
  Layers,
  MessagesSquare,
  ChevronDown,
} from 'lucide-react';

import {
  ContactSubmissionError,
  submitContact,
} from '../api/web3forms.js';

import {
  art,
  contactEmail,
  whatsappNumber,
} from '../data/site.js';

import { services } from '../data/services.js';
import SocialLinks from './SocialLinks.jsx';
import './Contact.css';

const contacts = [
  {
    title: 'WhatsApp',
    detail: whatsappNumber ? '+' + whatsappNumber : 'Open WhatsApp',
    icon: MessageCircle,
    href: whatsappNumber
      ? 'https://wa.me/' + whatsappNumber
      : 'whatsapp://send',
  },
  {
    title: 'Email',
    detail: contactEmail,
    icon: Mail,
    href: 'mailto:' + contactEmail,
  },
  {
    title: 'Location',
    detail: 'Hyderabad, India',
    icon: MapPin,
    newTab: true,
    href: 'https://www.google.com/maps/search/?api=1&query=Hyderabad%2C+India',
  },
];

export default function Contact() {
  const [projectType, setProjectType] = useState(() => {
    const requestedType = new URLSearchParams(
      window.location.search
    ).get('project');

    return services.find(
      ({ name }) => name === requestedType
    )?.name ?? '';
  });

  const [pricingPlan, setPricingPlan] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactError, setContactError] = useState('');

  const [status, setStatus] = useState({
    type: 'idle',
    message: '',
  });

  const pending = useRef(false);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    const handleProjectType = (event) => {
      setProjectType(event.detail);
    };

    const handlePricingPlan = (event) => {
      setPricingPlan(event.detail);
    };

    window.addEventListener(
      'pageorgin:project-type',
      handleProjectType
    );

    window.addEventListener(
      'pageorgin:pricing-plan',
      handlePricingPlan
    );

    return () => {
      window.removeEventListener(
        'pageorgin:project-type',
        handleProjectType
      );

      window.removeEventListener(
        'pageorgin:pricing-plan',
        handlePricingPlan
      );
    };
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setContactError('');
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setContactError('');
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (pending.current) return;

    const form = event.currentTarget;
    const emailValue = email.trim();
    const phoneValue = phone.trim();

    // Email or Phone: minimum one is required
    if (!emailValue && !phoneValue) {
      const message =
        'Please provide either an email address or a phone number.';

      setContactError(message);
      setStatus({ type: 'idle', message: '' });

      emailRef.current?.focus();
      return;
    }

    // Validate phone only when provided
    if (phoneValue) {
      const digits = phoneValue.replace(/\D/g, '');

      if (digits.length < 10 || digits.length > 15) {
        setContactError(
          'Please enter a valid phone number (10–15 digits).'
        );

        setStatus({ type: 'idle', message: '' });

        phoneRef.current?.focus();
        return;
      }
    }

    // Email format is validated by native HTML input type="email"
    setContactError('');

    pending.current = true;

    setStatus({
      type: 'sending',
      message: 'Sending your message…',
    });

    try {
      const formData = new FormData(form);

      // Remove blank optional contact fields
      if (!emailValue) {
        formData.delete('email');
      } else {
        formData.set('email', emailValue);
      }

      if (!phoneValue) {
        formData.delete('phone');
      } else {
        formData.set('phone', phoneValue);
      }

      const { sent } = await submitContact(formData);

      if (sent) {
        form.reset();

        setProjectType('');
        setPricingPlan('');
        setEmail('');
        setPhone('');
        setContactError('');

        setStatus({
          type: 'success',
          message:
            'Message sent successfully! We’ll get back to you soon.',
        });
      } else {
        setStatus({
          type: 'demo',
          message:
            'Our contact form is currently under development. In the meantime, please reach out to us at hello@pageorigin.in. We would be happy to assist you!',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof ContactSubmissionError
            ? error.message
            : 'Your message could not be sent. Please try again.',
      });
    } finally {
      pending.current = false;
    }
  }

  const bothContactsEmpty =
    Boolean(contactError) &&
    !email.trim() &&
    !phone.trim();

  const phoneInvalid =
    Boolean(contactError) &&
    contactError.includes('phone number') &&
    Boolean(phone.trim());

  return (
    <section id="contact" className="contact">
      <div className="wrap contact-inner">

        {/* SECTION HEADING */}
        <div className="contact-heading">
          <div>
            <p className="eyebrow">Contact Us</p>

            <h2 className="section-title">
              Let’s <em>Talk!</em>
            </h2>

            <p>
              Have a project in mind? We'd love to hear about it.
              <br className="desktop-break" />
              {' '}Reach out to us for a quote, collaboration or any questions.
            </p>
          </div>

          <img
            src={art('contact')}
            width="720"
            height="241"
            alt=""
            loading="lazy"
          />
        </div>

        <div className="contact-grid">

          {/* CONTACT INFORMATION */}
          <aside className="contact-info">
            <p className="eyebrow">Get in Touch</p>

            <h3>Contact Information</h3>

            <p>
              Choose the easiest way to reach us.
              <br />
              We usually respond within a few hours.
            </p>

            <div className="contact-methods">
              {contacts.map(({
                title,
                detail,
                icon: Icon,
                href,
                newTab,
              }) => (
                <a
                  key={title}
                  className="contact-method"
                  href={href}
                  target={newTab ? '_blank' : undefined}
                  rel={newTab ? 'noopener noreferrer' : undefined}
                >
                  <span className="contact-icon">
                    <Icon aria-hidden="true" />
                  </span>

                  <span className="contact-method-label">
                    <strong>{title}</strong>
                    {detail}
                  </span>

                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>

            <div className="contact-social">
              <strong>Follow Us</strong>
              <SocialLinks />
            </div>
          </aside>

          {/* CONTACT FORM */}
          <div
            className="contact-form-panel"
            id="project-form"
            tabIndex={-1}
          >
            <p className="eyebrow">Send a Message</p>

            <h3>Start a Conversation</h3>

            <p>
              Tell us a bit about your project and
              we’ll get back to you soon.
            </p>

            <form
              onSubmit={handleSubmit}
              aria-busy={status.type === 'sending'}
            >

              {/* SELECTED PRICING PLAN */}
              {pricingPlan && (
                <p className="contact-plan">
                  <input
                    type="hidden"
                    name="pricing_plan"
                    value={pricingPlan}
                  />

                  <span>
                    Quote for <strong>{pricingPlan}</strong>
                  </span>

                  <button
                    type="button"
                    className="text-link"
                    onClick={() => setPricingPlan('')}
                  >
                    Remove
                  </button>
                </p>
              )}

              <div className="contact-fields">

                {/* NAME */}
                <label className="contact-field">
                  <UserRound aria-hidden="true" />

                  <span className="sr-only">
                    Name
                  </span>

                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Name *"
                    required
                    maxLength="120"
                  />
                </label>

                {/* EMAIL */}
                <label className="contact-field">
                  <Mail aria-hidden="true" />

                  <span className="sr-only">
                    Email address
                  </span>

                  <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    maxLength="254"
                    aria-invalid={bothContactsEmpty}
                    aria-describedby="contact-method-note"
                  />
                </label>

                {/* PHONE */}
                <label className="contact-field">
                  <Phone aria-hidden="true" />

                  <span className="sr-only">
                    Phone number
                  </span>

                  <input
                    ref={phoneRef}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength="35"
                    aria-invalid={bothContactsEmpty || phoneInvalid}
                    aria-describedby="contact-method-note"
                  />
                </label>

                {/* PROJECT TYPE */}
                <label className="contact-field contact-select">
                  <Layers aria-hidden="true" />

                  <span className="sr-only">
                    Project Type
                  </span>

                  <select
                    name="project_type"
                    required
                    value={projectType}
                    onChange={(event) =>
                      setProjectType(event.target.value)
                    }
                  >
                    <option value="" disabled>
                      Project Type *
                    </option>

                    {services.map(({ name }) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}

                    <option value="Other">
                      Other
                    </option>
                  </select>

                  <ChevronDown aria-hidden="true" />
                </label>

                {/* PROJECT DETAILS */}
                <label className="contact-field details-field">
                  <MessagesSquare aria-hidden="true" />

                  <span>
                    Project Details <b>*</b>
                  </span>

                  <textarea
                    name="message"
                    rows="3"
                    required
                    maxLength="4000"
                    placeholder="Share your idea, requirements or any specific details…"
                  />
                </label>
              </div>

              {/* CONTACT METHOD INFORMATION
              <p
                className="contact-requirement"
                id="contact-method-note"
              >
                * Please provide at least one contact method:
                Email or Phone.
              </p> */}

              {/* VALIDATION ERROR */}
              {contactError && (
                <p
                  className="contact-validation-error"
                  role="alert"
                >
                  {contactError}
                </p>
              )}

              {/* SPAM PROTECTION */}
              <input
                type="checkbox"
                name="botcheck"
                hidden
                tabIndex={-1}
                autoComplete="off"
              />

              {/* SUBMIT BUTTON */}
              <button
                className="button button--solid"
                type="submit"
                disabled={status.type === 'sending'}
              >
                {status.type === 'sending'
                  ? 'Sending…'
                  : 'Send Message'}

                <ArrowUpRight aria-hidden="true" />
              </button>

              {/* FORM STATUS */}
              <p
                className={'form-status ' + status.type}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
