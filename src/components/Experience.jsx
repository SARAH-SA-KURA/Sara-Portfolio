import React from 'react';
import useTilt from '../hooks/useTilt';

// Straight from the CV. Newest first, though there is only one entry so far -
// the shape is here so a second role is a matter of appending to this array.
const roles = [
  {
    title: 'Full-Stack Developer',
    kind: 'Internship',
    company: 'AdSpace',
    context: 'Multi-tenant SaaS platform for social media management',
    period: 'April — May 2026',
    points: [
      'Redesigned the UI of the multi-tenant dashboard, improving readability and the overall user experience.',
      'Integrated the YouTube and TikTok APIs so publication could be managed from a single interface.',
      'Worked in an Agile team on a live production product, taking part in code reviews and sprint tracking.',
    ],
  },
];

export default function Experience() {
  const tiltRef = useTilt();

  return (
    <section id="experience">
      <p className="section-eyebrow">Experience</p>
      <h2 className="section-title">Where I&apos;ve Worked</h2>

      <ol className="work-list" ref={tiltRef}>
        {roles.map((role) => (
          <li className="work-entry" key={`${role.company}-${role.title}`}>
            <div className="work-card" data-tilt>
              <div className="work-head">
                <h3>{role.title}</h3>
                <span className="work-kind">{role.kind}</span>
              </div>

              <p className="work-company">
                {role.company}
                <span className="work-context"> — {role.context}</span>
              </p>

              <p className="work-period">{role.period}</p>

              <ul className="work-points">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
