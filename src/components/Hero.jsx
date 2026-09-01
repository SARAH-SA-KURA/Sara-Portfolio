import React, { useState } from 'react';
import useTilt from '../hooks/useTilt';

const REAL_ROLE = 'Fullstack Developer';

const NAME = 'SARAH';

// The word that runs edge to edge behind the portrait. Decoration only - the
// accessible name of the <h1> comes from the .sr-only span beside it.
const DISPLAY_WORD = 'DEVELOPER';

// Real, checkable figures. Projects and technologies are counted from the
// Projects and Skills sections; nothing here is invented.
const STATS = [
  { value: '4', label: 'Projects built' },
  { value: '19', label: 'Technologies' },
  { value: 'Bac+2', label: 'OFPPT diploma' },
];

export default function Hero() {
  const tiltRef = useTilt(11);

  // Prefer the transparent cutout, which is what lets the portrait overlap the
  // letters. Until that file exists the framed photo stands in, and swapping it
  // back is a matter of dropping the PNG into public/ - no code change.
  const [cutoutMissing, setCutoutMissing] = useState(false);

  return (
    <section id="home" className="main" ref={tiltRef}>
      <div className="hero-stage">
        {/* Pool of light behind the figure. Purely a contrast device: the
            cutout is black clothing on a near-black page. */}
        <div className="hero-glow" aria-hidden="true" />

        <h1 className="hero-display">
          {/* Screen readers get the real title; the big word is decoration. */}
          <span className="sr-only">{REAL_ROLE}</span>
          <span className="display-word" aria-hidden="true">{DISPLAY_WORD}</span>
        </h1>

        <div
          className={`hero-figure${cutoutMissing ? ' is-framed' : ''}`}
          data-tilt
        >
          <img
            src={cutoutMissing ? '/sarah-portrait.jpg' : '/sarah-cutout.png'}
            onError={() => setCutoutMissing(true)}
            alt="Sarah"
          />
        </div>

        <div className="hero-card">
          <p className="hero-hello">
            Hello! I&apos;m{' '}
            <span className="name-word" aria-label={NAME}>
              {NAME.split('').map((letter, i) => (
                <span className="name-letter" key={`${letter}-${i}`} style={{ '--l': i }} aria-hidden="true">
                  <span className="name-glyph">{letter}</span>
                </span>
              ))}
            </span>
          </p>

          {/* One fixed title. Not a heading - the page's only h1 is the display
              word above, whose accessible name is already this string. */}
          <p className="hero-roll">{REAL_ROLE}</p>

          <div className="btn">
            <a href="/Sarah-CV.pdf" download="Sarah_CV.pdf"><button className="btn1">Download CV</button></a>
            <a href="#contact"><button className="btn2">Let&apos;s talk</button></a>
          </div>

          <div className="social-links">
            {/* Your exact links */}
            <a href="https://github.com/SARAH-SA-KURA" target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/sara-abdelwahid-937a50278" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        <ul className="hero-stats">
          {STATS.map((stat, i) => (
            <li className="stat-card" key={stat.label} style={{ '--s': i }}>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
