import React, { useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import About from './components/About.jsx';
import Pricing from './components/Pricing.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useEffect(() => {
    // React mounts the sections after the browser first processes a deep link.
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'instant' });
  }, []);

  return (
    <>
      <a className="skip-link" href="#home">Skip to content</a>
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
