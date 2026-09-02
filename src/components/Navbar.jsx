import React from 'react';

export default function Navbar({ activeSection }) {
  return (
    <nav className="nav">
      <a href="#home" className={activeSection === 'home' ? 'active' : ''} aria-label="Home">
        <i className="fas fa-home"></i>
      </a>
      <a href="#about" className={activeSection === 'about' ? 'active' : ''} aria-label="About">
        <i className="fas fa-user"></i>
      </a>
      <a href="#education" className={activeSection === 'education' ? 'active' : ''} aria-label="Education">
        <i className="fas fa-graduation-cap"></i>
      </a>
      <a href="#experience" className={activeSection === 'experience' ? 'active' : ''} aria-label="Experience">
        <i className="fas fa-briefcase"></i>
      </a>
      <a href="#skills" className={activeSection === 'skills' ? 'active' : ''} aria-label="Skills">
        <i className="fas fa-check-circle"></i>
      </a>
      <a href="#project" className={activeSection === 'project' ? 'active' : ''} aria-label="Projects">
        <i className="fas fa-rocket"></i>
      </a>
      <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} aria-label="Contact">
        <i className="fas fa-comment-dots"></i>
      </a>
    </nav>
  );
}