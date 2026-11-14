// Small timeline toolkit shared by the two prototype animations.
export const cl = (x) => Math.min(1, Math.max(0, x));
/** Progress 0..1 of t through the window [a, b]. */
export const seg = (t, a, b) => cl((t - a) / (b - a));
export const lerp = (a, b, p) => a + (b - a) * p;

export const eo = (x) => 1 - Math.pow(1 - x, 3); // ease-out cubic
export const ei = (x) => x * x * x; // ease-in cubic
export const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
/** Ease-out with a little overshoot. */
export const eob = (x) => { const c = 1.6; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
