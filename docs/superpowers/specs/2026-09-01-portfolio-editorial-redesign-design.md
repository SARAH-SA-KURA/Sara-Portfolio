# Portfolio — bold editorial redesign

**Date:** 2026-09-01
**Status:** implemented across all six sections
**Reference:** https://shan-portfolioo.netlify.app/ ("Shan — Digital Agency & Creative Portfolio")

## Goal

Give Sarah's portfolio the structural boldness of the reference site while
keeping her own visual identity. The reference is a light editorial agency
template; we take its *layout language*, not its palette and not its content.

## Decisions

| Question | Decision |
|---|---|
| Palette | Keep. Dark plum `--ink`, hot pink `--pink` family. No new colours. |
| Display font | Phudu (exact match to reference). Poppins stays for body copy. |
| Hero photo | Transparent cutout PNG at `public/sarah-cutout.png`, supplied by Sarah. Current framed portrait is the fallback until it lands. |
| Scope | All six sections. |
| Sequencing | Primitives layer + hero first, reviewed live, then section-by-section. |

## Explicitly rejected

- **Inventing credentials.** The reference is full of agency fiction: Awwwards
  wins, "70+ clients", client testimonials. Sarah is a first-year Digital
  Development student. Stat cards use real figures only (projects built,
  technologies used, year started). No awards section, no testimonials.
- Light theme, orange/lime accents, custom cursor library, smooth-scroll
  library, carousels.

## Device mapping

| Reference device | Our version |
|---|---|
| `DEVELOPER` set edge-to-edge, photo overlapping | Phudu, pink, bleeding past the viewport; cutout overlaps the letters |
| Floating white stat cards | Plum cards, pink numerals, real figures |
| `SERVICES —` marquee band | Existing skills marquee promoted to a full-bleed band |
| Stadium-shaped service rows | Project rows in stadium containers, numbered 01/02/03 |
| Boxed header, logo card + solid CTA | Existing floating icon pill restyled to match; pink CTA |
| Bordered awards table | Education timeline as a bordered table, real OFPPT entries |

## Primitives layer

Built once in `App.css`, consumed by every section:

1. **Display type scale** — `--display` font stack, fluid `clamp()` sizing for
   the edge-to-edge word, tight tracking and leading.
2. **Marquee band** — full-bleed scrolling strip, alternating solid/outline
   text, `prefers-reduced-motion` aware.
3. **Stat card** — plum surface, pink numeral, label beneath.
4. **Stadium row** — pill container holding number, arrow, title, tag chips.
5. **Section header** — pink eyebrow chip above a large display heading.

## Constraints that must hold

- **`h1` accessible name stays "Fullstack Developer".** The giant word is
  decoration and must be `aria-hidden`; the real title stays in an `.sr-only`
  span inside the `h1`. Two existing tests pin this.
- **Exactly one `h1` on the page.**
- Section ids `home / about / education / skills / project / contact` keep
  their one-to-one match with the navbar links. One test pins this.
- Only TaskFlow claims a live demo. One test pins this.
- All 12 existing tests stay green.
- No horizontal page scroll at any width — the edge-to-edge headline must
  overflow its own clipped container, never `body`.
- Keep: falling petals, tilt hook, scroll reveals, all real content.

## Verification

Tests green, plus headless-Chrome screenshots of every section at 1440px and
390px widths, inspected before any section is called done.

## Implementation notes

Three bugs surfaced during the build, all worth remembering:

1. **Grid track sized to the overflowing word.** `.hero-stage`'s implicit
   `auto` column sized to the display word's max-content (~1489px at a 1440px
   viewport), so `justify-self: end` aligned the stat cards to that phantom
   edge - 15px from the right instead of 64px. Fixed with
   `grid-template-columns: minmax(0, 1fr)`.
2. **Shared section padding clipped the display word.** The hero opts out with
   `padding-inline: 0`; the card and stats carry their own insets.
3. **`width: 100vw` is not full-bleed.** 100vw includes the scrollbar, so the
   marquee band came out 15px wider than the content area and sat 7px
   off-centre, overhanging both edges - hidden, not fixed, by body's
   `overflow-x: hidden`. The band now uses `align-self: stretch` plus a
   negative inline margin equal to the section's own padding clamp, so the two
   cancel exactly whatever the clamp resolves to.

## Entrance (added after review)

The reference opens with a full-screen dark curtain showing widely-tracked
`LOADING`, which then lifts. `Preloader.jsx` reproduces it: three phases
(holding / leaving / gone) so the lift transition is never cut short by React
unmounting the node mid-animation, scroll locked only while the curtain is up,
and the hero elements staggered in behind it with `animation-fill-mode:
backwards` - never `both`, which would freeze the end transform and permanently
kill the pointer parallax.

## Hero, second pass

The first pass was not the reference composition. Corrected: the figure is much
larger, anchored to the floor of the stage so the cutout's own straight bottom
crop falls outside the stage, and the head crosses the word.

The cutout is black clothing on a near-black page, which the reference never has
to deal with - its subject is light on off-white. Two devices carry the
silhouette: a pink rather than black drop-shadow, and `.hero-glow`, a pool of
light behind the figure.

## Further bugs found

4. **`window.matchMedia` is absent in jsdom.** The reduced-motion check threw on
   mount and took all 12 tests down. Guarded in the component rather than
   polyfilled in test setup, so it also degrades safely under server rendering.
5. **A grid child left on an undefined area.** `.hero-glow` inherited
   `grid-area: stack` from the base rule, which the mobile template does not
   define; the implicit track it created dragged the whole hero off the left
   edge at 390px. The glow is now absolutely positioned with `grid-area: auto`,
   so it is out of flow at every width and cannot inflate a row either.

## Still outstanding

Nothing. `public/sarah-cutout.png` is in place.
