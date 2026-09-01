import React from 'react';

// A full-bleed strip of one repeating word, alternating solid and outline.
// Purely decorative: the word is already the section's heading, so the whole
// band is hidden from assistive tech rather than read out eight times.
//
// Six runs, not two: the track translates by exactly one run's width, and with
// only a couple of runs a short word doesn't span a wide viewport, which opens
// a visible gap mid-loop.
const RUN_COUNT = 6;
const RUNS = Array.from({ length: RUN_COUNT }, (_, i) => i);

export default function MarqueeBand({ word }) {
  return (
    <div className="marquee-band" aria-hidden="true">
      <div className="marquee-track" style={{ '--runs': RUN_COUNT }}>
        {RUNS.map((run) => (
          <React.Fragment key={run}>
            <span className={`marquee-word${run % 2 ? ' ghost' : ''}`}>{word}</span>
            <span className="marquee-dash">—</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
