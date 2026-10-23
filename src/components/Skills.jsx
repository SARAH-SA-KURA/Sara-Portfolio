import React from 'react';
import MarqueeBand from './MarqueeBand';

// Grouped rather than scored: a self-assigned "React 58%" invites doubt,
// and it reads oddly next to a hero that says Fullstack Developer.
// Each row scrolls on its own, alternating direction, at its own speed.
const skillGroups = [
  { title: 'Languages', speed: 30, items: ['JavaScript', 'TypeScript', 'PHP', 'Python', 'SQL'] },
  { title: 'Frontend', speed: 24, items: ['React', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS', 'Vite', 'Electron'] },
  { title: 'Backend & Data', speed: 34, items: ['Node.js', 'Express', 'NestJS', 'Laravel', 'MySQL', 'PostgreSQL (pgAdmin)', 'Drizzle ORM', 'REST APIs'] },
  { title: 'Tools', speed: 27, items: ['Git & GitHub', 'Figma', 'Vercel', 'Render', 'Clerk', 'Claude API'] },
];

// Identical runs scrolled by exactly one run's width, so the loop is seamless.
// Six rather than four: the shortest group is only three chips, and four runs of
// it don't span the viewport at full translation, which opens a gap mid-loop.
const RUN_COUNT = 6;
const RUNS = Array.from({ length: RUN_COUNT }, (_, i) => i);

export default function Skills() {
  return (
    <section id="skills">
      <p className="section-eyebrow">Skills</p>
      <h2 className="section-title">Tech Stack</h2>

      <MarqueeBand word="Skills" />

      <div className="stack">
        {skillGroups.map((group, row) => (
          <div className="stack-row" key={group.title}>
            <h3 className="stack-label">{group.title}</h3>

            <div className="stack-viewport">
              <div
                className={`stack-marquee${row % 2 ? ' reverse' : ''}`}
                style={{ '--speed': `${group.speed}s`, '--runs': RUN_COUNT }}
              >
                {RUNS.map((run) => (
                  <ul className="stack-run" key={run} aria-hidden={run > 0}>
                    {group.items.map((item) => (
                      <li className="chip" key={item}>{item}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
