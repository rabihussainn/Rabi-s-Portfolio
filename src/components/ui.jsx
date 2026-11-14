import { useInView } from '../hooks/useInView';
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

const REVEAL = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

/** Fades/blurs its content in the first time it scrolls into view. delay: 1–3 staggers it. */
export function Reveal({ as: Tag = 'div', className, delay, children, ...rest }) {
  const [ref, inView] = useInView(REVEAL);
  return (
    <Tag ref={ref} className={cx(className, 'rv', inView && 'in')} data-d={delay} {...rest}>
      {children}
    </Tag>
  );
}

export function useReveal() {
  return useInView(REVEAL);
}
