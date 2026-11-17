import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cx } from '../lib';

/** Rounded tag. tone: plain | butter | lilac | mint | coral | sky */
export function Pill({ tone = 'plain', className, children, ...rest }) {
  return <span className={cx('pill', tone, className)} {...rest}>{children}</span>;
}

export function StackList({ items }) {
  return <div className="stackList">{items.map((s) => <span key={s}>{s}</span>)}</div>;
}

/** Pill-shaped link with the round arrow chip. */
export function ArrowButton({ ghost, arrow = '↗', children, ...rest }) {
  return (
    <a className={cx('btn', ghost && 'ghost')} {...rest}>
      {children} <span className="ic" aria-hidden="true">{arrow}</span>
    </a>
  );
}

const REVEAL_VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -40px 0px' };
const REVEAL_EASE = [0.22, 1, 0.36, 1];
const REVEAL_DELAY = { 1: 0.08, 2: 0.16, 3: 0.24 };

/** Fades/blurs its content in the first time it scrolls into view. delay: 1–3 staggers it. */
export function Reveal({ as: Tag = 'div', className, delay, children, ...rest }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <Tag className={className} {...rest}>{children}</Tag>;
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.9, ease: REVEAL_EASE, delay: REVEAL_DELAY[delay] || 0 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Same entrance as Reveal, for a className built from other state (eg. cx with extra flags). */
export function useReveal() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return { initial: false, animate: false, whileInView: undefined, viewport: undefined, transition: undefined };
  }
  return {
    initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: REVEAL_VIEWPORT,
    transition: { duration: 0.9, ease: REVEAL_EASE },
  };
}
