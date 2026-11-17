import { motion } from 'framer-motion';
import { STACK } from '../data/stack';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cx } from '../lib';
import Icon from './Icon';
import { Reveal } from './ui';

const STAGGER = 0.045; // seconds between icons popping in
const SPRING = [0.34, 1.56, 0.64, 1];
const EASE = [0.22, 1, 0.36, 1];
const ICO_VIEWPORT = { once: true, amount: 0.2 };

function ToolGroup({ group }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cx('grp', group.id)}>
      <h3>{group.title}</h3>
      <div className="icons">
        {group.items.map(([icon, label], i) => (
          reduceMotion ? (
            <div key={label} className="ico">
              <span className="g"><Icon name={icon} /></span>{label}
            </div>
          ) : (
            <motion.div
              key={label}
              className="ico"
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={ICO_VIEWPORT}
              transition={{ opacity: { duration: 0.5, ease: EASE, delay: i * STAGGER }, default: { duration: 0.7, ease: SPRING, delay: i * STAGGER } }}
            >
              <span className="g"><Icon name={icon} /></span>{label}
            </motion.div>
          )
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
