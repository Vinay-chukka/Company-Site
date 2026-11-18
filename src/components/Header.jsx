import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import Brand from './Brand.jsx';
import { navigation, selectService } from '../data/site.js';
import { services } from '../data/services.js';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [active, setActive] = useState(() => window.location.hash || '#home');

  function closeMenus() {
    setMenuOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    function updateActive() {
      const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom;
      const current = navigation.findLast(([, link]) => {
        const section = document.querySelector(link);
        return section && section.getBoundingClientRect().top <= headerBottom + 22;
      });
      if (current) setActive(current[1]);
    }
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    updateActive();
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  return (
    <header className="site-header wrap" onKeyDown={(event) => {
      if (event.key === 'Escape' && (menuOpen || servicesOpen)) {
        event.currentTarget.querySelector(servicesOpen ? '.services-toggle' : '.menu-toggle')?.focus();
        closeMenus();
      }
    }}>
      <Brand />
      <button type="button" className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => {
        setMenuOpen(!menuOpen);
        setServicesOpen(false);
      }}>{menuOpen ? <X /> : <Menu />}</button>
      <nav id="site-nav" aria-label="Main navigation" className={menuOpen ? 'open' : ''}>
        {navigation.map(([name, href]) => (
          <div key={href} className={'nav-item' + (active === href ? ' current' : '')}>
            <a href={href} aria-current={active === href ? 'location' : undefined} onClick={closeMenus}>{name}</a>
            {/* {name === 'Services' && <>
              <button type="button" className="services-toggle" aria-label="Service options" aria-expanded={servicesOpen} aria-controls="services-menu" onClick={() => setServicesOpen(!servicesOpen)}><ChevronDown size={18} /></button>
              <div className="services-menu" id="services-menu" hidden={!servicesOpen}>
                {services.map(({ name }) => <a key={name} href="#contact" onClick={() => { selectService(name); closeMenus(); }}>{name}</a>)}
              </div>
            </>} */}
          </div>
        ))}
        <a className="button button--solid nav-quote" href="#contact" onClick={closeMenus}>Get a Free Quote <ArrowUpRight /></a>
      </nav>
    </header>
  );
}
