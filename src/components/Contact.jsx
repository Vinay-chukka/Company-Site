
import React, {
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

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
  Check,
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

/* ==========================================
   CONTACT INFORMATION
========================================== */

const contacts = [
  {
    title: 'WhatsApp',
    detail: whatsappNumber
      ? '+' + whatsappNumber
      : 'Open WhatsApp',
    icon: MessageCircle,
    href: whatsappNumber
      ? 'https://wa.me/' + whatsappNumber.replace(/\D/g, '')
      : null,
  },
  {
    title: 'Email',
    detail: contactEmail,
    icon: Mail,
    href: contactEmail ? 'mailto:' + contactEmail : null,
  },
  {
    title: 'Location',
    detail: 'Hyderabad, India',
    icon: MapPin,
    newTab: true,
    href:
      'https://www.google.com/maps/search/?api=1&query=Hyderabad%2C+India',
  },
];

/* ==========================================
   CUSTOM PROJECT TYPE DROPDOWN
========================================== */

function ProjectTypeDropdown({
  value,
  onChange,
  invalid = false,
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  const listId = useId();

  const options = [
    ...services.map(({ name }) => name),
    'Other',
  ].filter((option, index, all) =>
    all.indexOf(option) === index
  );

  const selectedIndex = options.indexOf(value);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      'pointerdown',
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        'pointerdown',
        handleOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    if (open) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [open, activeIndex]);

  function openDropdown(index) {
    const nextIndex = Math.max(
      0,
      Math.min(index, options.length - 1)
    );

    setActiveIndex(nextIndex);
    setOpen(true);
  }

  function selectOption(option) {
    onChange(option);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(event) {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp'
    ) {
      event.preventDefault();

      const index =
        selectedIndex >= 0 ? selectedIndex : 0;

      openDropdown(index);
    }

    if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  function handleOptionKeyDown(event, index) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index + 1) % options.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      setActiveIndex(
        (index - 1 + options.length) % options.length
      );
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
    }

    if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }

    if (event.key === 'Tab') {
      setOpen(false);
    }
  }

  return (
    <div
      className={
        'project-dropdown' +
        (open ? ' is-open' : '') +
        (invalid ? ' is-invalid' : '')
      }
      ref={containerRef}
    >
      {/* Included in FormData for Web3Forms */}
      <input
        type="hidden"
        name="project_type"
        value={value}
      />

      <button
        ref={triggerRef}
        type="button"
        className="project-dropdown-trigger"
        aria-label="Project Type"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listId : undefined}
        aria-invalid={invalid}
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            openDropdown(
              selectedIndex >= 0 ? selectedIndex : 0
            );
          }
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        <Layers
          className="project-dropdown-icon"
          aria-hidden="true"
        />

        <span
          className={
            'project-dropdown-value' +
            (!value ? ' is-placeholder' : '')
          }
        >
          {value || 'Project Type *'}
        </span>

        <ChevronDown
          className="project-dropdown-arrow"
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={listId}
          className="project-dropdown-menu"
          role="listbox"
          aria-label="Project Type Options"
        >
          {options.map((option, index) => (
            <button
              key={option}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              type="button"
              role="option"
              aria-selected={value === option}
              tabIndex={
                activeIndex === index ? 0 : -1
              }
              className={
                'project-dropdown-option' +
                (value === option
                  ? ' is-selected'
                  : '')
              }
              onMouseEnter={() => {
                setActiveIndex(index);
              }}
              onKeyDown={(event) =>
                handleOptionKeyDown(event, index)
              }
              onClick={() => selectOption(option)}
            >
              <span>{option}</span>

              {value === option && (
                <Check
                  size={17}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ==========================================
   MAIN CONTACT COMPONENT
========================================== */

export default function Contact() {
  const [projectType, setProjectType] = useState(() => {
    const requestedType =
      new URLSearchParams(
        window.location.search
      ).get('project');

    return services.find(
      ({ name }) => name === requestedType
    )?.name ?? '';
  });

  const [pricingPlan, setPricingPlan] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [contactError, setContactError] =
    useState('');

  const [projectError, setProjectError] =
    useState('');

  const [status, setStatus] = useState({
    type: 'idle',
    message: '',
  });

  const pending = useRef(false);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  /* ========================================
     EXTERNAL SELECTION EVENTS
  ======================================== */

  useEffect(() => {
    const handleProjectType = (event) => {
      setProjectType(event.detail);
      setProjectError('');
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

  /* ========================================
     FORM FIELD HANDLERS
  ======================================== */

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setContactError('');
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
    setContactError('');
  }

  function handleProjectChange(value) {
    setProjectType(value);
    setProjectError('');
  }

  /* ========================================
     FORM SUBMISSION
  ======================================== */

  async function handleSubmit(event) {
    event.preventDefault();

    if (pending.current) return;

    const form = event.currentTarget;

    const emailValue = email.trim();
    const phoneValue = phone.trim();

    setContactError('');
    setProjectError('');
    setStatus({ type: 'idle', message: '' });

    /* Email or Phone required */

    if (!emailValue && !phoneValue) {
      setContactError(
        'Please provide either an email address or a phone number.'
      );

      emailRef.current?.focus();
      return;
    }

    /* Phone validation */

    if (phoneValue) {
      const digits = phoneValue.replace(/\D/g, '');

      if (
        digits.length < 10 ||
        digits.length > 15
      ) {
        setContactError(
          'Please enter a valid phone number (10–15 digits).'
        );

        phoneRef.current?.focus();
        return;
      }
    }

    /* Project Type required */

    if (!projectType) {
      setProjectError(
        'Please select a project type.'
      );
      return;
    }

    /* Start submission */

    pending.current = true;

    setStatus({
      type: 'sending',
      message: 'Sending your message…',
    });

    try {
      const formData = new FormData(form);

      if (emailValue) {
        formData.set('email', emailValue);
      } else {
        formData.delete('email');
      }

      if (phoneValue) {
        formData.set('phone', phoneValue);
      } else {
        formData.delete('phone');
      }

      formData.set('project_type', projectType);

      if (pricingPlan) {
        formData.set('pricing_plan', pricingPlan);
      }

      const { sent } = await submitContact(formData);

      if (sent) {
        form.reset();

        setProjectType('');
        setPricingPlan('');
        setEmail('');
        setPhone('');
        setContactError('');
        setProjectError('');

        setStatus({
          type: 'success',
          message:
            'Message sent successfully! We’ll get back to you soon.',
        });
      } else {
        setStatus({
          type: 'demo',
          message:
            'Our contact form is currently unavailable. Please reach out to us at hello@pageorigin.in.',
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
    contactError.includes('valid phone number') &&
    Boolean(phone.trim());

  /* ========================================
     JSX
  ======================================== */

  return (
    <section
      id="contact"
      className="contact"
    >
      <div className="wrap contact-inner">

        {/* SECTION HEADING */}

        <div className="contact-heading">
          <div>
            <p className="eyebrow">
              Contact Us
            </p>

            <h2 className="section-title">
              Let’s <em>Talk!</em>
            </h2>

            <p>
              Have a project in mind? We'd love to
              hear about it.
              <br className="desktop-break" />
              {' '}Reach out to us for a quote,
              collaboration or any questions.
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
            <p className="eyebrow">
              Get in Touch
            </p>

            <h3>
              Contact Information
            </h3>

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
                href ? (
                  <a
                    key={title}
                    className="contact-method"
                    href={href}
                    target={
                      newTab
                        ? '_blank'
                        : undefined
                    }
                    rel={
                      newTab
                        ? 'noopener noreferrer'
                        : undefined
                    }
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
                ) : (
                  <div
                    key={title}
                    className="contact-method"
                  >
                    <span className="contact-icon">
                      <Icon aria-hidden="true" />
                    </span>

                    <span className="contact-method-label">
                      <strong>{title}</strong>
                      {detail}
                    </span>
                  </div>
                )
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
            <p className="eyebrow">
              Send a Message
            </p>

            <h3>
              Start a Conversation
            </h3>

            <p>
              Tell us a bit about your project
              and we’ll get back to you soon.
            </p>

            <form
              onSubmit={handleSubmit}
              aria-busy={
                status.type === 'sending'
              }
            >

              {/* SELECTED PRICING PLAN */}

              {pricingPlan && (
                <div className="contact-plan">
                  <input
                    type="hidden"
                    name="pricing_plan"
                    value={pricingPlan}
                  />

                  <span>
                    Quote for{' '}
                    <strong>{pricingPlan}</strong>
                  </span>

                  <button
                    type="button"
                    className="text-link"
                    onClick={() =>
                      setPricingPlan('')
                    }
                  >
                    Remove
                  </button>
                </div>
              )}

              <div className="contact-fields">

                {/* NAME */}

                <label className="contact-field">
                  <UserRound
                    aria-hidden="true"
                  />

                  <span className="sr-only">
                    Name
                  </span>

                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Name *"
                    required
                    maxLength={120}
                  />
                </label>

                {/* EMAIL */}

                <label className="contact-field">
                  <Mail
                    aria-hidden="true"
                  />

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
                    maxLength={254}
                    aria-invalid={bothContactsEmpty}
                    aria-describedby="contact-method-note"
                  />
                </label>

                {/* PHONE */}

                <label className="contact-field">
                  <Phone
                    aria-hidden="true"
                  />

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
                    maxLength={35}
                    aria-invalid={
                      bothContactsEmpty ||
                      phoneInvalid
                    }
                    aria-describedby="contact-method-note"
                  />
                </label>

                {/* CUSTOM PROJECT TYPE */}

                <ProjectTypeDropdown
                  value={projectType}
                  onChange={handleProjectChange}
                  invalid={Boolean(projectError)}
                />

                {/* PROJECT DETAILS */}

                <label className="contact-field details-field">
                  <MessagesSquare
                    aria-hidden="true"
                  />

                  <span>
                    Project Details <b>*</b>
                  </span>

                  <textarea
                    name="message"
                    rows={3}
                    required
                    maxLength={4000}
                    placeholder="Share your idea, requirements or any specific details…"
                  />
                </label>
              </div>

              {/* CONTACT REQUIREMENT */}

              <p
                className="contact-requirement"
                id="contact-method-note"
              >
                Please provide at least one
                contact method: Email or Phone.
              </p>

              {/* VALIDATION ERRORS */}

              {contactError && (
                <p
                  className="contact-validation-error"
                  role="alert"
                >
                  {contactError}
                </p>
              )}

              {projectError && (
                <p
                  className="contact-validation-error"
                  role="alert"
                >
                  {projectError}
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
                disabled={
                  status.type === 'sending'
                }
              >
                {status.type === 'sending'
                  ? 'Sending…'
                  : 'Send Message'}

                <ArrowUpRight
                  aria-hidden="true"
                />
              </button>

              {/* FORM STATUS */}

              <p
                className={
                  'form-status ' + status.type
                }
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
