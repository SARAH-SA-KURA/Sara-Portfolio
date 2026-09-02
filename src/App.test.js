import { render, screen, within } from '@testing-library/react';
import App from './App';

test('renders the hero heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /fullstack developer/i })).toBeInTheDocument();
});

test('has exactly one h1 on the page', () => {
  const { container } = render(<App />);
  expect(container.querySelectorAll('h1')).toHaveLength(1);
});

test('renders every section the navbar links to, exactly once each', () => {
  const { container } = render(<App />);
  ['home', 'about', 'education', 'experience', 'skills', 'project', 'contact'].forEach((id) => {
    expect(container.querySelectorAll(`#${id}`)).toHaveLength(1);
  });
});

describe('projects section', () => {
  const projectNames = [
    'TaskFlow', 'Focus Timer', 'OFPPT Study Platform', 'School Management', 'Medicines Website',
  ];

  test.each(projectNames)('%s has a card with a working code link', (name) => {
    const { container } = render(<App />);
    const card = within(container.querySelector('#project'))
      .getByRole('heading', { name }).closest('.build-row');

    const code = within(card).getByRole('link', { name: /view code/i });
    expect(code).toHaveAttribute('href', expect.stringContaining('github.com/SARAH-SA-KURA'));
    expect(code).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
  });

  // Still the same rule - a live demo is only claimed where something is
  // actually deployed. Focus Timer went live, so the deployed set grew to two.
  test('only the deployed projects claim a live demo', () => {
    const { container } = render(<App />);
    const demos = within(container.querySelector('#project'))
      .getAllByRole('link', { name: /live demo/i });

    expect(demos.map((a) => a.getAttribute('href'))).toEqual([
      'https://taskflow-web-topaz.vercel.app',
      'https://focus-timer-delta-six.vercel.app',
      'https://learnexapp.netlify.app',
    ]);
  });

  test('every project lists the tech it was built with', () => {
    const { container } = render(<App />);
    container.querySelectorAll('.build-row').forEach((card) => {
      expect(card.querySelectorAll('.tag').length).toBeGreaterThan(0);
    });
  });
});

test('the navbar links to every section that exists, and no others', () => {
  const { container } = render(<App />);
  const hrefs = [...container.querySelectorAll('.nav a')].map((a) => a.getAttribute('href'));
  const ids = [...container.querySelectorAll('section[id]')].map((s) => `#${s.id}`);
  expect(hrefs).toEqual(ids);
});

test('education lists each qualification with its period', () => {
  const { container } = render(<App />);
  const edu = within(container.querySelector('#education'));

  expect(edu.getByRole('heading', { name: /digital development/i })).toBeInTheDocument();
  expect(edu.getByRole('heading', { name: /audiovisual/i })).toBeInTheDocument();
  expect(edu.getByRole('heading', { name: /baccalaureate/i })).toBeInTheDocument();
  expect(container.querySelectorAll('#education .edu-entry')).toHaveLength(3);
  // The Digital Development course is finished and earned a Bac+2; nothing is
  // in progress, so the badge now marks the qualification rather than "Now".
  expect(container.querySelectorAll('#education .edu-entry.current')).toHaveLength(0);
  expect(container.querySelectorAll('#education .edu-entry.graduated')).toHaveLength(1);
  expect(within(container.querySelector('#education')).getByText('Bac+2')).toBeInTheDocument();
});

test('skills are grouped, not scored with percentages', () => {
  const { container } = render(<App />);
  const skills = container.querySelector('#skills');

  expect(skills.textContent).not.toMatch(/\d+%/);
  ['Languages', 'Frontend', 'Backend & Data', 'Tools'].forEach((group) => {
    expect(within(skills).getByRole('heading', { name: group })).toBeInTheDocument();
  });
});

test('the send button submits the contact form', () => {
  const { container } = render(<App />);
  const button = screen.getByRole('button', { name: /send message/i });
  expect(button).toHaveAttribute('type', 'submit');
  expect(button.closest('form')).toBe(container.querySelector('#contact-form'));
});

test('experience lists the internship with what it involved', () => {
  const { container } = render(<App />);
  const work = within(container.querySelector('#experience'));

  expect(work.getByRole('heading', { name: /full-stack developer/i })).toBeInTheDocument();
  expect(work.getByText(/AdSpace/)).toBeInTheDocument();
  // The responsibilities are the substance of the entry; a role with no
  // bullets would render as an empty card without failing anything else.
  expect(container.querySelectorAll('#experience .work-points li').length).toBeGreaterThan(0);
});
