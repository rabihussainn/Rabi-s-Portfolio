import { useLayoutEffect } from 'react';

// Scales a fixed-size design frame (e.g. a 393px-wide Figma screen) to fit its phone container.
export function useScaleToFit(containerRef, frameRef, designWidth) {
  useLayoutEffect(() => {
    const box = containerRef.current, frame = frameRef.current;
    if (!box || !frame) return;
    const fit = () => { frame.style.transform = 'scale(' + box.clientWidth / designWidth + ')'; };
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    fit();
    return () => ro.disconnect();
  }, [containerRef, frameRef, designWidth]);
}
