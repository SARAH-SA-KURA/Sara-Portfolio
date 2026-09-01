import React from 'react';
import useTilt from '../hooks/useTilt';

// Newest first. `credential` marks a finished course that earned a
// qualification; nothing is in progress any more.
const education = [
  {
    qualification: 'Digital Development',
    place: 'OFPPT',
    period: '2024 — 2026',
    credential: 'Bac+2',
    detail:
      'Completed. Fullstack web development: JavaScript and TypeScript, PHP and Laravel, ' +
      'React, and relational databases. Coursework was project-led, built to written specifications.',
  },
  {
    qualification: 'Audiovisual Studies',
    place: 'Prior training',
    period: '2021 — 2023',
    detail:
      'Two years in visual production — composition, editing and visual storytelling. ' +
      'It is where the design side of how I build interfaces comes from.',
  },
];

export default function Education() {
  const tiltRef = useTilt();

  return (
    <section id="education">
      <p className="section-eyebrow">Education</p>
      <h2 className="section-title">Where I Learned It</h2>

      {/* A bordered index rather than a card stack: rules between rows, the
          number and period on the left, the detail hanging under the title. */}
      <ol className="edu-timeline" ref={tiltRef}>
        {education.map((entry, index) => (
          <li className={`edu-entry${entry.credential ? ' graduated' : ''}`} key={entry.qualification}>
            <div className="edu-card" data-tilt>
              <span className="edu-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>

              <p className="edu-period">
                {entry.period}
                {entry.credential && <span className="edu-now">{entry.credential}</span>}
              </p>

              <div className="edu-body">
                <h3>{entry.qualification}</h3>
                <p className="edu-place">{entry.place}</p>
                <p className="edu-detail">{entry.detail}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
