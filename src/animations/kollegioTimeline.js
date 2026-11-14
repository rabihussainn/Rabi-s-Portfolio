import { cl, seg, lerp, eo, ei, eio, eob } from './easing';

export const KOLLEGIO_LENGTH = 23; // seconds per loop
export const KOLLEGIO_STILL = 11.4; // frame shown when motion is reduced

// Fingertip path: [time, x, y]
const TOUCH = [[0, 260, 520], [1.3, 120, 250], [2.0, 200, 420], [3.7, 240, 420], [4.15, 290, 278], [4.6, 260, 420], [5.8, 230, 420], [6.35, 196, 299], [6.9, 220, 420], [7.9, 240, 700],
  [8.35, 196, 807], [8.9, 220, 700], [12.7, 230, 520], [13.2, 196, 430], [14.1, 346, 406], [14.5, 380, 420], [15.0, 230, 470], [15.5, 196, 430], [16.4, 56, 412], [16.9, 140, 560], [17.4, 198, 689], [18.0, 230, 760]];
const TAPS = [1.35, 4.2, 6.4, 8.4, 17.45];
const SHOWN = [[0.6, 1.7], [3.5, 4.55], [5.7, 6.8], [7.8, 8.8], [12.8, 14.3], [15.1, 16.6], [16.9, 17.9]];

/** Builds render(t) for the Kollegio phone. Layers are found by their data-k attribute. */
export function createKollegioRenderer(phone) {
  const E = {};
  phone.querySelectorAll('[data-k]').forEach((e) => { E[e.dataset.k] = e; });

  const win = (t, a, b, f = 0.3) => Math.min(eo(seg(t, a, a + f)), 1 - ei(seg(t, b - f, b)));
  const op = (k, v) => { E[k].style.opacity = v.toFixed(3); };
  const tf = (k, v) => { E[k].style.transform = v; };
  const rise = (k, t, a, dy = 12) => { const p = eo(seg(t, a, a + 0.4)); op(k, p); tf(k, 'translateY(' + lerp(dy, 0, p) + 'px)'); };

  return (t) => {
    // screens
    op('home', Math.max(1 - eo(seg(t, 1.6, 1.9)), eo(seg(t, 22.5, 23))));
    op('chat', win(t, 1.6, 4.95));
    const cw = win(t, 1.6, 4.95);
    const b = eo(seg(t, 1.85, 2.3)); op('c-bub', b * cw); tf('c-bub', 'translateX(' + lerp(26, 0, b) + 'px)');
    rise('c-q', t, 2.45); E['c-q'].style.opacity *= cw;
    ['c-o1', 'c-o2'].forEach((k, i) => {
      const p = seg(t, 2.95 + i * 0.15, 3.4 + i * 0.15);
      op(k, cl(eo(p) * 1.4) * cw);
      tf(k, 'translateY(' + lerp(16, 0, eob(p)) + 'px) scale(' + (t > 4.15 && t < 4.3 && i ? 0.97 : 1) + ')');
    });
    op('quiz', win(t, 4.6, 7.4));
    const qw = win(t, 4.6, 7.4);
    ['q-prog', 'q-q', 'q-ch', 'q-o1', 'q-o2', 'q-o3', 'q-o4'].forEach((k, i) => { rise(k, t, 4.85 + i * 0.12); E[k].style.opacity *= qw; });
    E['q-prog'].style.clipPath = 'inset(0 ' + lerp(60, 0, eo(seg(t, 5.0, 5.8))) + '% 0 0)';
    op('q-o1on', eo(seg(t, 6.45, 6.65)) * qw);

    // deck
    const dw = win(t, 7.0, 19.2, 0.35);
    op('deck', dw);
    const ent = seg(t, 7.1, 7.65);
    // card A: Cal Poly, right swipe
    const d1 = eio(seg(t, 13.2, 14.1)), f1 = ei(seg(t, 14.1, 14.55));
    tf('cardA', 'translate(' + (lerp(0, 150, d1) + 520 * f1).toFixed(1) + 'px,' + (lerp(30, 0, eo(ent)) - 24 * d1).toFixed(1) + 'px) rotate(' + (9 * d1 + 12 * f1).toFixed(2) + 'deg) scale(' + lerp(0.94, 1, eob(ent)).toFixed(3) + ')');
    op('cardA', Math.min(dw, cl(ent * 1.6), 1 - seg(t, 14.4, 14.55)));
    E.cardA.querySelector('.kYes').style.opacity = eo(seg(t, 13.4, 14.0)).toFixed(3);
    // card B: San Jose State, left swipe then undo
    const d2 = eio(seg(t, 15.5, 16.4)), f2 = ei(seg(t, 16.4, 16.85)), back = eo(seg(t, 17.5, 18.1));
    const x2 = lerp(-140 * d2 - 520 * f2, 0, back), r2 = lerp(-8 * d2 - 12 * f2, 0, back), y2 = lerp(-18 * d2, 0, back);
    tf('cardB', 'translate(' + x2.toFixed(1) + 'px,' + (y2 + lerp(30, 0, eo(ent))).toFixed(1) + 'px) rotate(' + r2.toFixed(2) + 'deg)');
    op('cardB', Math.min(dw, cl(ent * 1.6), t < 17.4 ? 1 - seg(t, 16.7, 16.85) : seg(t, 17.5, 17.65)));
    E.cardB.querySelector('.kNo').style.opacity = (eo(seg(t, 15.7, 16.2)) * (1 - eo(seg(t, 17.6, 18.0)))).toFixed(3);
    const u = eob(seg(t, 14.7, 15.1)) * (1 - eo(seg(t, 17.5, 17.75)));
    op('undo', cl(u) * dw); tf('undo', 'translateY(' + lerp(10, 0, cl(u)) + 'px) scale(' + (t > 17.4 && t < 17.55 ? 0.92 : 1) + ')');

    // "Ask Reka" sheet
    const sh = eo(seg(t, 8.5, 9.0)) * (1 - ei(seg(t, 12.0, 12.4)));
    op('dim', sh); tf('sheet', 'translateY(' + lerp(530, 0, sh).toFixed(1) + 'px)');
    E.sheet.querySelectorAll('.kLine').forEach((e, i) => { e.style.transform = 'scaleX(' + (1 - eio(seg(t, 9.1 + i * 0.38, 9.55 + i * 0.38))).toFixed(3) + ')'; });
    E.sheet.querySelectorAll('.kRow').forEach((e, i) => { e.style.opacity = (1 - eo(seg(t, 10.8 + i * 0.2, 11.2 + i * 0.2))).toFixed(3); });
    op('hero', win(t, 18.8, 23, 0.4));

    // fingertip
    let x = TOUCH[0][1], y = TOUCH[0][2];
    for (let i = 1; i < TOUCH.length; i++) {
      if (t >= TOUCH[i - 1][0]) {
        const p = eio(seg(t, TOUCH[i - 1][0], TOUCH[i][0]));
        x = lerp(TOUCH[i - 1][1], TOUCH[i][1], p); y = lerp(TOUCH[i - 1][2], TOUCH[i][2], p);
      }
    }
    let v = 0;
    SHOWN.forEach((r) => { v = Math.max(v, Math.min(eo(seg(t, r[0], r[0] + 0.25)), 1 - ei(seg(t, r[1] - 0.25, r[1])))); });
    const press = TAPS.some((c) => t > c - 0.06 && t < c + 0.16) || (t > 13.15 && t < 14.15) || (t > 15.45 && t < 16.45) ? 0.8 : 1;
    E.touch.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) scale(' + press + ')';
    op('touch', v);
  };
}
