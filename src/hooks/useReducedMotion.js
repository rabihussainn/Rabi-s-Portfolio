import { useState } from 'react';

// Read once on load, same as the original script.
export function useReducedMotion() {
  const [reduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduce;
}
