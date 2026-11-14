import { useEffect, useRef, useState } from 'react';

/**
 * Flips to true the first time the element scrolls into view, then stops watching.
 * Pass only primitive options so the effect doesn't re-subscribe on every render.
 */
export function useInView({ threshold = 0, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setInView(true); io.disconnect(); }
      }),
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, inView]);

  return [ref, inView];
}
