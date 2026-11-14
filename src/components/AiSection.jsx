import { useEffect, useRef, useState } from 'react';
import { AI_SPLIT, TERMINAL_LINES } from '../data/about';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cx } from '../lib';
import { Reveal } from './ui';

/** Fake terminal that types out an AI-assisted session once it scrolls into view. */
function Terminal() {
  const bodyRef = useRef(null);
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const total = TERMINAL_LINES.length + 1; // + the blinking caret line

  useEffect(() => {
    const timers = [];
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      for (let i = 0; i < total; i++) {
        timers.push(setTimeout(() => setShown((n) => Math.max(n, i + 1)), reduce ? 0 : 300 + i * 650));
      }
    }), { threshold: 0.35 });
    io.observe(bodyRef.current);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [reduce, total]);

  return (
    <Reveal className="term" delay="1" aria-label="Example of an AI-assisted coding session">
      <div className="termBar"><span className="lights"><i></i><i></i><i></i></span><span>a normal tuesday</span><span></span></div>
      <div className="termBody" id="termBody" ref={bodyRef}>
        {TERMINAL_LINES.map(([kind, text], i) => (
          <span key={i} className={cx('tl', kind, i < shown && 'show')}>{text}</span>
        ))}
        <span className={cx('tl', shown >= total && 'show')}><span className="caret"></span></span>
      </div>
    </Reveal>
  );
}

export default function AiSection() {
  return (
    <section className="section" id="ai">
      <div className="wrap ai">
        <Reveal>
          <h2>Where AI fits in how I code.</h2>
          <p className="lede">I use Claude and Cursor every day. They help me move faster through unfamiliar code and repetitive work. I still read every change, check it against the codebase and test it before it ships.</p>
          <div className="split">
            {AI_SPLIT.map((col) => (
              <div key={col.title} className="splitCol"><h3>{col.title}</h3><ul>{col.items.map((it) => <li key={it}>{it}</li>)}</ul></div>
            ))}
          </div>
        </Reveal>
        <Terminal />
      </div>
    </section>
  );
}
