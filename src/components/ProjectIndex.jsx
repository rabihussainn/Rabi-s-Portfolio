import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cx } from '../lib';
import Icon from './Icon';
import QanoonPrototype from './QanoonPrototype';
import ZaaminLogo from './ZaaminLogo';
import { Pill, Reveal, StackList, useReveal } from './ui';

const AWS_TILES = ['ec2', 's3', 'rds', 'lambda', 'cognito', 'terraform'];

// Little visuals reused by the open rows and the hover preview.
const AwsTiles = () => <div className="tiles3">{AWS_TILES.map((n) => <i key={n}><Icon name={n} /></i>)}</div>;
const MiniPhone = () => <div className="mPhone"><i></i><i></i><i></i></div>;
const Urdu = () => <div className="mUrdu">کہانی</div>;
const ChatLogo = () => <Icon name="chat" className="logo" />;

/** Visual shown inside an opened row. */
function Thumb({ kind }) {
  switch (kind) {
    case 'aws': return <div className="thumb" style={{ background: 'var(--sky)' }}><AwsTiles /></div>;
    case 'phone': return <div className="thumb" style={{ background: 'var(--coral)' }}><MiniPhone /></div>;
    case 'zaamin': return <div className="thumb" style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}><ZaaminLogo idPrefix="zT" /></div>;
    case 'chat': return <div className="thumb" style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}><ChatLogo /></div>;
    case 'qanoon': return <QanoonPrototype />;
    case 'urdu': return <div className="thumb" style={{ background: 'var(--bg)', border: '1px solid var(--line)' }}><Urdu /></div>;
    default: return null;
  }
}

// Hover previews, one per project, in the same order as PROJECTS.
const PEEKS = [
  { bg: 'var(--sky)', content: <AwsTiles /> },
  { bg: 'var(--coral)', content: <MiniPhone /> },
  { bg: 'var(--surface)', content: <ZaaminLogo idPrefix="zP" /> },
  { bg: 'var(--surface)', content: <ChatLogo /> },
  { bg: '#fff', content: <img src="assets/qanoon/logo-card.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> },
  { bg: 'var(--surface)', content: <Urdu /> },
];

const PlusIcon = () => (
  <span className="plus" aria-hidden="true">
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 2v12M2 8h12" /></svg>
  </span>
);

function ProjectRow({ project: p, index, open, onToggle, hover }) {
  const reveal = useReveal();
  return (
    <motion.div className={cx('row', open && 'open')} data-peek={index} {...reveal}>
      <button className="rowBtn" aria-expanded={open} onClick={onToggle} {...hover}>
        <span className="rowYear">{p.year}</span>
        <span className="rowName">{p.name}<small>{p.blurb}</small></span>
        <span className="rowTags">{p.tags.map((t) => <Pill key={t.label} tone={t.tone}>{t.label}</Pill>)}</span>
        <PlusIcon />
      </button>
      <div className="rowBody">
        <div className="rowInner">
          <div className="rowGrid">
            <div className="txt">
              <ul>{p.bullets.map(([b, rest]) => <li key={b}><b>{b}</b>{rest}</li>)}</ul>
              <StackList items={p.stack} />
            </div>
            <Thumb kind={p.thumb} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Follows the cursor with a small eased lag. Only on devices with a precise pointer. */
function usePeek(openIndex) {
  const reduce = useReducedMotion();
  const [enabled] = useState(() => matchMedia('(pointer:fine)').matches && !reduce);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(null);
  const peekRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: null });

  useEffect(() => () => cancelAnimationFrame(pos.current.raf), []);

  const step = () => {
    const p = pos.current;
    p.x += (p.tx - p.x) * 0.18; p.y += (p.ty - p.y) * 0.18;
    peekRef.current.style.left = p.x + 'px'; peekRef.current.style.top = p.y + 'px';
    p.raf = requestAnimationFrame(step);
  };

  const handlersFor = (i) => !enabled ? {} : {
    onMouseEnter: (e) => {
      if (openIndex === i) return;
      const p = pos.current;
      p.tx = p.x = e.clientX + 150; p.ty = p.y = e.clientY;
      setActive(i); setVisible(true);
      if (!p.raf) step();
    },
    onMouseMove: (e) => { pos.current.tx = e.clientX + 150; pos.current.ty = e.clientY; },
    onMouseLeave: () => { setVisible(false); cancelAnimationFrame(pos.current.raf); pos.current.raf = null; },
  };

  return { peekRef, visible, active, hide: () => setVisible(false), handlersFor };
}

/** State shared by the project list and its hover preview (they render in different places). */
export function useProjectIndex() {
  const [openIndex, setOpenIndex] = useState(null);
  const peek = usePeek(openIndex);
  const toggle = (i) => {
    setOpenIndex((cur) => (cur === i ? null : i));
    peek.hide();
  };
  return { openIndex, toggle, peek };
}

export function ProjectList({ index: { openIndex, toggle, peek } }) {
  return (
    <div className="more2">
      <Reveal className="more2Head"><h3>Projects and research</h3><p>Tap a row for the details.</p></Reveal>
      <div className="idx" id="idx">
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.name} project={p} index={i} open={openIndex === i} onToggle={() => toggle(i)} hover={peek.handlersFor(i)} />
        ))}
      </div>
    </div>
  );
}

/** Floating preview that trails the cursor over a row. */
export function ProjectPeek({ index: { peek } }) {
  return (
    <div className={cx('peek', peek.visible && 'on')} id="peek" ref={peek.peekRef} aria-hidden="true">
      {PEEKS.map((p, i) => (
        <div key={i} className={peek.active === i ? 'on' : undefined} style={{ background: p.bg }}>{p.content}</div>
      ))}
    </div>
  );
}
