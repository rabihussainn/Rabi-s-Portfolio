import { useLayoutEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Drives a time-based animation with requestAnimationFrame.
 * It only runs while the element is on screen and resumes where it left off.
 *
 * makeRender(el) must return render(seconds). Keep makeRender and isActive
 * defined at module level so they stay stable between renders.
 */
export function usePlaybackLoop(ref, makeRender, { length, reducedAt, threshold, isActive }) {
  const reduce = useReducedMotion();

  // Layout effect: the first frame is drawn before paint, so stacked screens never flash.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const render = makeRender(el);
    if (reduce) { render(reducedAt); return; }

    let t0 = null, acc = 0, raf = null;
    const loop = (now) => {
      if (t0 === null) t0 = now;
      render((acc + (now - t0) / 1000) % length);
      raf = requestAnimationFrame(loop);
    };
    render(0);

    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const on = isActive(e);
      if (on && !raf) { t0 = null; raf = requestAnimationFrame(loop); }
      else if (!on && raf) {
        cancelAnimationFrame(raf); raf = null;
        acc = (acc + (performance.now() - (t0 || performance.now())) / 1000) % length;
      }
    }), { threshold });
    io.observe(el);

    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [ref, makeRender, length, reducedAt, threshold, isActive, reduce]);
}
