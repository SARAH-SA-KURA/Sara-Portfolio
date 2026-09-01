import { useEffect, useRef } from 'react';

/**
 * Makes every [data-tilt] element inside the returned container lean toward the
 * pointer. Writes --tilt-x / --tilt-y onto each element; the CSS decides what to
 * do with them, so nothing here knows about the design.
 *
 * Opts out entirely on touch devices (there is no pointer to lean toward) and
 * when the visitor has asked for reduced motion.
 */
export default function useTilt(max = 9) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof window.matchMedia !== 'function') return undefined;

    const canHover = window.matchMedia('(hover: hover)').matches;
    const stillPlease = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || stillPlease) return undefined;

    const cards = [...root.querySelectorAll('[data-tilt]')];
    if (!cards.length) return undefined;

    let frame = 0;
    let pending = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      // Pointer above centre should tip the top away, hence the negated y.
      el.style.setProperty('--tilt-x', `${(-y * max).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${(x * max).toFixed(2)}deg`);
    };

    const onMove = (event) => {
      const el = event.currentTarget;
      const box = el.getBoundingClientRect();
      pending = {
        el,
        x: (event.clientX - box.left) / box.width - 0.5,
        y: (event.clientY - box.top) / box.height - 0.5,
      };
      // One write per frame, however many pointer events arrive.
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = (event) => {
      const el = event.currentTarget;
      if (pending && pending.el === el) pending = null;
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    };

    cards.forEach((card) => {
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerleave', onLeave);
      });
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max]);

  return ref;
}
