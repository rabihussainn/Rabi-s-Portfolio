import { useLayoutEffect, useRef, useState } from 'react';
import { JOURNEY } from '../data/journey';
import { cx } from '../lib';
import { Pill, Reveal } from './ui';

/** Timeline whose rail fills in, and whose markers light up, as you scroll. */
export default function Journey() {
  const listRef = useRef(null);
  const fillRef = useRef(null);
  const itemRefs = useRef([]);
  const [reached, setReached] = useState(() => JOURNEY.map(() => false));

  useLayoutEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = listRef.current.getBoundingClientRect(), mid = innerHeight * 0.6;
      fillRef.current.style.height = (Math.min(Math.max((mid - r.top) / r.height, 0), 1) * 100) + '%';
      const next = itemRefs.current.map((el) => el.getBoundingClientRect().top < mid);
      setReached((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="section" id="journey">
      <div className="wrap journey">
        <Reveal className="jAside">
          <h2>My journey so far.</h2>
          <p className="lede">From research labs and teaching at LUMS to owning production systems end to end. Each step pulled me a little further toward the backend, and into the cloud setup underneath it.</p>
        </Reveal>
        <div className="jList" id="jList" ref={listRef}>
          <div className="jRail"><div className="jFill" id="jFill" ref={fillRef}></div></div>
          {JOURNEY.map((j, i) => (
            <div key={i} ref={(el) => { itemRefs.current[i] = el; }} className={cx('jItem', reached[i] && 'on')} style={{ '--c': j.color }}>
              <div className="jTop"><h3>{j.title}</h3><span className="jWhen">{j.when}</span></div>
              <Pill tone={j.tone} className="jWhere">{j.where}</Pill>
              <p>{j.text}{j.caseStudy && <> <a className="jLink" href="#work">See the case study ↑</a></>}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
