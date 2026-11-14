import { seg, lerp, eo, ei, eio } from './easing';

export const QANOON_LENGTH = 32; // seconds per loop
export const QANOON_STILL = 13.5; // frame shown when motion is reduced
const D = 0.45; // screen transition duration

// One entry per screen, in DOM order: [start, how it arrives, tap x, tap y, tap time]
const T = [[0, 'fade', 215, 666, 1.75], [2.2, 'push', 350, 632, 4.35], [4.8, 'push', 36, 43, 6.55], [7.0, 'pop', 172, 888, 8.15], [8.6, 'fade', 368, 798, 9.95],
  [10.4, 'push', 215, 312, 12.35], [12.8, 'push', 36, 43, 15.15], [15.6, 'pop', 346, 888, 16.55], [17.0, 'fade'], [19.0, 'fade', 215, 602, 20.55],
  [21.0, 'push', 200, 712, 22.95], [23.4, 'push', 36, 43, 25.15], [25.6, 'pop', 172, 888, 26.55], [27.0, 'fade', 86, 888, 28.55], [29.0, 'fade']];

/** Builds render(t) for the Qanoon Connect phone. */
export function createQanoonRenderer(phone) {
  const L = QANOON_LENGTH;
  const scr = phone.querySelector('.qScr');
  const sc = [...scr.querySelectorAll('.qS')];
  const touchEl = scr.querySelector('.qTouch');

  return (t) => {
    sc.forEach((el, i) => {
      const [a, how] = T[i], b = i + 1 < T.length ? T[i + 1][0] : L, nextHow = i + 1 < T.length ? T[i + 1][1] : 'fade';
      const pin = eo(seg(t, a, a + D)), pout = eo(seg(t, b, b + D));
      let vis = t >= a && t < b + D, x = 0, o = 1, z = 1;
      if (i === 0 && t >= L - 0.5) { vis = true; z = 0; }
      if (!vis) { el.style.visibility = 'hidden'; return; }
      el.style.visibility = 'visible';
      if (t < a + D && i > 0) {
        if (how === 'push') { x = lerp(100, 0, pin); z = 3; }
        else if (how === 'pop') { x = lerp(-30, 0, pin); z = 1; }
        else { o = pin; z = 3; }
      }
      if (t >= b) {
        if (nextHow === 'push') { x = lerp(0, -30, pout); z = 1; }
        else if (nextHow === 'pop') { x = lerp(0, 100, pout); z = 3; }
        else { z = 1; }
      }
      if (i === T.length - 1) o = Math.min(o, 1 - eo(seg(t, L - 0.5, L)));
      el.style.transform = 'translateX(' + x.toFixed(2) + '%)'; el.style.opacity = o.toFixed(3); el.style.zIndex = z;
      el.style.filter = x < -0.5 ? 'brightness(' + (1 - 0.08 * (-x / 30)).toFixed(3) + ')' : 'none';
      el.querySelectorAll('.qP').forEach((p, j) => {
        if (p.classList.contains('qDots')) {
          const q = eo(seg(t, a + 1.3, a + 1.6));
          p.style.opacity = (q * (0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 7)))).toFixed(3);
          return;
        }
        const q = how === 'pop' ? 1 : eo(seg(t, a + 0.35 + j * 0.14, a + 0.75 + j * 0.14));
        p.style.opacity = q.toFixed(3); p.style.transform = 'translateY(' + lerp(14, 0, q).toFixed(1) + 'px)';
      });
    });

    // fingertip: comes in, taps, leaves
    let v = 0, x = 215, y = 600, press = 1;
    T.forEach(([, , tx, ty, tt]) => {
      if (tt === undefined) return;
      const k = eo(seg(t, tt - 0.7, tt - 0.5)) * (1 - ei(seg(t, tt + 0.2, tt + 0.45)));
      if (k > v) { v = k; const m = eio(seg(t, tt - 0.7, tt - 0.05)); x = lerp(tx + 50, tx, m); y = lerp(ty + 90, ty, m); }
      if (t > tt - 0.05 && t < tt + 0.14) press = 0.8;
    });
    touchEl.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) scale(' + press + ')';
    touchEl.style.opacity = v.toFixed(3);
  };
}
