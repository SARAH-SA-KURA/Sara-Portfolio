import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const SECTION_IDS = ['home', 'about', 'education', 'experience', 'skills', 'project', 'contact'];

function App() {
  const cursorRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let frame = 0;
    let pointer = null;

    // 1. Mouse Move Logic.
    // The dot is written straight to the DOM instead of through state: routing it
    // through setState re-rendered every section on every mouse event. Batching to
    // one write per animation frame also collapses the several events a frame brings.
    const moveCursor = (e) => {
      pointer = { x: e.clientX, y: e.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (cursorRef.current) {
          cursorRef.current.style.transform =
            `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
        }
        // Publish the pointer as -1..1 on :root so the stylesheet can drive the
        // parallax depth without any of this code knowing what moves.
        const root = document.documentElement;
        root.style.setProperty('--px', (pointer.x / window.innerWidth * 2 - 1).toFixed(3));
        root.style.setProperty('--py', (pointer.y / window.innerHeight * 2 - 1).toFixed(3));
      });
    };

    // 2. Scroll Logic to detect active section.
    // Measured against the viewport rather than window.scrollY, so it keeps
    // working whichever element ends up being the scroll container.
    let scrollFrame = 0;
    const measureSections = () => {
      scrollFrame = 0;
      const offset = 200; // Trigger a little before the section reaches the top
      const current = SECTION_IDS.find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const { top, bottom } = element.getBoundingClientRect();
        return top <= offset && bottom > offset;
      });
      if (current) setActiveSection(current);
    };
    // Measuring five elements forces a layout, so do it once per frame at most.
    const handleScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(measureSections);
    };

    window.addEventListener('mousemove', moveCursor);
    // Capture phase: scroll events don't bubble, so this catches them
    // even if a nested element is the one scrolling.
    document.addEventListener('scroll', handleScroll, true);
    measureSections();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('scroll', handleScroll, true);
      if (frame) cancelAnimationFrame(frame);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return (
    <div className="App">
      {/* Covers the page on entry, then lifts. Unmounts itself when done. */}
      <Preloader />

      {/* Pass activeSection to Navbar */}
      <Navbar activeSection={activeSection} />

      <div className="cursor" ref={cursorRef}></div>

      <video autoPlay muted loop playsInline poster="/video-poster.jpg" className="bg-video">
        <source src="/138553-769988105.mp4" type="video/mp4" />
      </video>

      {/* Each component renders its own <section> carrying the id the Navbar links to.
          Don't wrap them in another <section id="...">: that duplicates the id and
          stacks two min-height:100vh boxes, leaving a blank screen above every section. */}
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Contact />

      <Footer />
    </div>
  );
}

export default App;
