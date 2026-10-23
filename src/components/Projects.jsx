import React from 'react';
import useTilt from '../hooks/useTilt';

const GITHUB = 'https://github.com/SARAH-SA-KURA';

// Adding a project is a matter of appending one entry here.
// `live` is optional - only set it when there is a real deployed app behind it.
// `code` is optional too - leave it out for private repos and a label shows instead.
const projects = [
  {
    name: 'CenterNest',
    kind: 'Web app + Electron desktop app',
    summary:
      'Management software for tutoring and training centres: enrolments, monthly fees, ' +
      'arrears, attendance, timetables and teacher pay in one system. It started as an ' +
      'Electron desktop app, then became a web app with its own landing page. Both editions ' +
      'build from one React codebase on top of a Laravel API.',
    tags: ['React', 'TypeScript', 'Laravel', 'Electron', 'Tailwind CSS', 'REST API'],
    live: 'https://getcenternest.com',
  },
  {
    name: 'Nimbly',
    kind: 'Fullstack SaaS CV builder',
    summary:
      'A CV builder with Free and Pro plans, in English and French. Users write CVs in a live ' +
      'editor, export them to PDF, import an existing CV, fix them with AI and generate cover ' +
      'letters. Accounts, CVs and plan limits are handled on the server.',
    tags: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Drizzle', 'Clerk', 'Claude API'],
    live: 'https://nimbly-90jd.onrender.com',
  },
  {
    name: 'TaskFlow',
    kind: 'Fullstack web app',
    summary:
      'A personal productivity app with its own API. React and Vite on the front end, ' +
      'an Express server behind it handling authentication and per-user data, and feature ' +
      'modules for habits, focus sessions, sleep, calendar and reports.',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'REST API'],
    live: 'https://taskflow-web-topaz.vercel.app',
    code: `${GITHUB}/taskflow-web`,
  },
  {
    name: 'Focus Timer',
    kind: 'React 19 + Vite focus app',
    summary:
      'A stopwatch and countdown in one window, with a floating mini timer that stays above ' +
      'every other application - a real always-on-top OS window opened straight from the page ' +
      'via the Document Picture-in-Picture API, with a graceful fallback where the browser has ' +
      'no equivalent. Thirteen themes that re-tint the whole interface, and a daily total that ' +
      'survives restarts.',
    tags: ['React 19', 'Vite', 'JavaScript', 'CSS', 'Picture-in-Picture API'],
    live: 'https://focus-timer-delta-six.vercel.app',
    code: `${GITHUB}/Focus-Timer`,
  },
  {
    name: 'OFPPT Study Platform',
    kind: 'React + Vite study resource site',
    summary:
      'A study site for OFPPT students: free EFM exam papers as PDFs, the filieres listing, ' +
      'and a module browser with a detail page per module. React Router drives dedicated ' +
      'routes for the React and Laravel exam archives, and each one publishes its own French ' +
      'title and description through react-helmet-async so the pages surface in search.',
    tags: ['React', 'Vite', 'React Router', 'react-helmet-async', 'Netlify'],
    live: 'https://learnexapp.netlify.app',
    code: `${GITHUB}/Study-app-sara-abdelwahid`,
  },
  {
    name: 'School Management',
    kind: 'Laravel REST API + TypeScript client',
    summary:
      'A school administration system built against a written specification. Covers students, ' +
      'trainers, groups, modules, timetables, exams, grades, absences and rooms, with an ' +
      'activity log across the whole system.',
    tags: ['Laravel', 'PHP', 'TypeScript', 'MySQL', 'REST API'],
    code: `${GITHUB}/school-management`,
  },
  {
    name: 'Medicines Website',
    kind: 'PHP & MySQL records manager',
    summary:
      'A medical records manager with registration and login, plus search, add, edit and delete ' +
      'across patient and medicine records. Database access goes through PDO prepared statements.',
    tags: ['PHP', 'MySQL', 'PDO', 'HTML', 'CSS'],
    code: `${GITHUB}/Medicines-website`,
  },
];

const ArrowIcon = () => (
  <svg className="link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export default function Projects() {
  const tiltRef = useTilt();

  return (
    <section id="project">
      <p className="section-eyebrow">Projects</p>
      <h2 className="section-title">Things I&apos;ve Built</h2>

      <ol className="build-list" ref={tiltRef}>
        {projects.map((project, index) => (
          <li className="build-row" data-tilt key={project.name} style={{ '--i': index }}>
            <span className="build-index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>

            <span className="build-arrow" aria-hidden="true" />

            <div className="build-body">
              <div className="build-head">
                <h3>{project.name}</h3>
                <p className="build-kind">{project.kind}</p>
              </div>

              <p className="build-summary">{project.summary}</p>

              <ul className="tags" aria-label={`Built with: ${project.tags.join(', ')}`}>
                {project.tags.map((tag) => (
                  <li className="tag" key={tag}>{tag}</li>
                ))}
              </ul>
            </div>

            <div className="build-links">
              {project.live && (
                <a className="project-link primary" href={project.live}
                   target="_blank" rel="noreferrer">
                  Live demo <ArrowIcon />
                </a>
              )}
              {project.code ? (
                <a className="project-link" href={project.code}
                   target="_blank" rel="noreferrer">
                  View code <ArrowIcon />
                </a>
              ) : (
                <span className="project-link private">Private repo</span>
              )}
            </div>
          </li>
        ))}
      </ol>

      <a className="project-more" href={GITHUB} target="_blank" rel="noreferrer">
        More on GitHub <ArrowIcon />
      </a>
    </section>
  );
}
