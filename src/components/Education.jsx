import React from 'react';
import useTilt from '../hooks/useTilt';

// Newest first. `credential` marks a finished course that earned a
// qualification; `ongoing` marks one still being studied.
const education = [
  {
    qualification: 'Licence in Computer Engineering (Génie Informatique)',
    place: 'High-Tech Rabat',
    link: 'https://www.hightech.edu/',
    period: '2026 — 2027',
    ongoing: true,
    detail:
      'One-year licence, studied remotely with evening classes, so my days stay free for an ' +
      'internship or a job. First semester covers Java and Oracle databases.',
  },
  {
    qualification: 'Digital Development',
    place: 'ISTA Ben Guerir (OFPPT)',
    period: '2024 — 2026',
    credential: 'Bac+2',
    detail:
      'Specialized Technician Diploma, Full-Stack track. Agile methodology, database ' +
      'management, front-end with React and back-end with NestJS. Coursework was project-led, ' +
      'built to written specifications.',
  },
  {
    qualification: 'Audiovisual & Film',
    place: 'Centre Multimédia, Ben Guerir',
    period: '2023 — 2024',
    detail:
      'Vocational diploma in visual production — composition, editing and visual storytelling. ' +
      'It is where the design side of how I build interfaces comes from.',
  },
  {
    qualification: 'Baccalaureate',
    place: 'Lycée Technique Rhamna',
    period: '2023',
    detail: 'Physical Sciences track.',
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
                {entry.ongoing && <span className="edu-now ongoing">In progress</span>}
              </p>

              <div className="edu-body">
                <h3>{entry.qualification}</h3>
                <p className="edu-place">
                  {entry.link ? (
                    <a href={entry.link} target="_blank" rel="noreferrer">{entry.place}</a>
                  ) : entry.place}
                </p>
                <p className="edu-detail">{entry.detail}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
