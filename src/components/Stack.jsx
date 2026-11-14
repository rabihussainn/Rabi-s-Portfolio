import { useEffect, useState } from 'react';
import { STACK } from '../data/stack';
import { useInView } from '../hooks/useInView';
import { cx } from '../lib';
import Icon from './Icon';
import { Reveal } from './ui';

const STAGGER = 0.045; // seconds between icons popping in

function ToolGroup({ group }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  // The stagger only applies to the entrance; drop it afterwards so hovers feel instant.
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setSettled(true), 1400);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <div ref={ref} className={cx('grp', group.id, inView && 'in')}>
      <h3>{group.title}</h3>
      <div className="icons">
        {group.items.map(([icon, label], i) => (
          <div key={label} className="ico" style={settled ? undefined : { transitionDelay: `${i * STAGGER}s, ${i * STAGGER}s, 0s, 0s` }}>
            <span className="g"><Icon name={icon} /></span>{label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  return (
    <section className="section" id="stack">
      <div className="wrap">
        <div className="stackHead">
          <Reveal as="h2">Tools I’ve built with.</Reveal>
          <Reveal as="p" className="lede" delay="1" style={{ justifySelf: 'end' }}>Grouped by where they sit in a product, from the infrastructure it runs on to the screens people use.</Reveal>
        </div>
        {STACK.map((g) => <ToolGroup key={g.id} group={g} />)}
      </div>
    </section>
  );
}
