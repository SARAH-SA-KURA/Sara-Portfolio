import React from 'react';

const EMAIL = 'abdelwahidsara@gmail.com';
const PHONE = '0716-241752';
const NAME = 'SARAH';
const ROLE = 'Fullstack Developer';

// Same six targets the navbar uses, spelled out in words here. Kept in this
// order so the footer reads in the same sequence the page is laid out in.
const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Me', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#project' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  // Written from the build date rather than hardcoded, so it stops being wrong
  // in January without anyone having to remember it.
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Contact line */}
      <p className="footer-reach">
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        {/* Braced, not bare: a literal // in JSX children reads as a comment
            and fails the build under CI, where warnings are errors. */}
        <span className="footer-slash" aria-hidden="true">{'//'}</span>
        <a href={`tel:${PHONE.replace(/-/g, '')}`}>{PHONE}</a>
      </p>

      {/* Identity card */}
      <div className="footer-card">
        <img className="footer-avatar" src="/sarah-about-cutout.png" alt="" width="1170" height="854" />

        <div className="footer-ident">
          <p className="footer-name">{NAME}</p>
          <p className="footer-role">{ROLE}</p>

          <div className="footer-social">
            <a href="https://github.com/SARAH-SA-KURA" target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/sara-abdelwahid-937a50278" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Quick links / back to top / copyright */}
      <div className="footer-bar">
        <nav className="footer-links" aria-label="Quick links">
          <h2 className="footer-heading">Quick Links</h2>
          <ul>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* A plain anchor, not a scroll handler: it still works with JS off and
            it inherits the page's own smooth scrolling. */}
        <a className="footer-top" href="#home" aria-label="Back to top">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </a>

        <div className="footer-legal">
          <p className="footer-mark">{NAME} Portfolio</p>
          <p className="footer-copy">© {year} {NAME[0] + NAME.slice(1).toLowerCase()}. All rights reserved.</p>
        </div>
      </div>

      {/* The wordmark. Decoration - the name is already in the card above. */}
      <p className="footer-wordmark" aria-hidden="true">{NAME}</p>
    </footer>
  );
}
