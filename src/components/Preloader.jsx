import React, { useState, useEffect } from 'react';

const WORD = 'LOADING';

// The curtain that covers the page on entry, then lifts to reveal the hero.
// Three states rather than two: `leaving` runs the lift, and only once that has
// finished does the element unmount, so the transition is never cut short by
// React removing the node mid-animation.
export default function Preloader() {
  const [phase, setPhase] = useState('holding');

  useEffect(() => {
    // A curtain nobody asked for is worse than no curtain, so honour the OS
    // setting by skipping straight to the page. Guarded because matchMedia is
    // absent in jsdom and in server rendering - without the guard this throws
    // on mount and takes the whole page down with it, not just the curtain.
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setPhase('gone');
      return undefined;
    }

    // Scroll is locked for exactly as long as the curtain is up. Restoring it
    // in the cleanup means an unmount at any point can't strand the page in an
    // unscrollable state.
    document.body.classList.add('is-loading');

    const lift = setTimeout(() => setPhase('leaving'), 1400);
    const done = setTimeout(() => setPhase('gone'), 2250);

    return () => {
      clearTimeout(lift);
      clearTimeout(done);
      document.body.classList.remove('is-loading');
    };
  }, []);

  useEffect(() => {
    if (phase === 'gone') document.body.classList.remove('is-loading');
  }, [phase]);

  if (phase === 'gone') return null;

  return (
    <div className={`preloader${phase === 'leaving' ? ' is-leaving' : ''}`} aria-hidden="true">
      <p className="preloader-word">
        {WORD.split('').map((letter, i) => (
          <span className="preloader-letter" key={`${letter}-${i}`} style={{ '--l': i }}>
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
}
