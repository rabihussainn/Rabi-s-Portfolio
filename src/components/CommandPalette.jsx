import { useEffect, useRef, useState } from 'react';
import { PALETTE_LINKS } from '../data/site';
import { cx } from '../lib';

/** ⌘K / Ctrl+K jump menu with type-to-filter and arrow-key selection. */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(null);
  const inputRef = useRef(null);
  const linkRefs = useRef([]);

  const q = query.toLowerCase();
  const visible = PALETTE_LINKS.map((l, i) => i).filter((i) => `${PALETTE_LINKS[i].label} ${PALETTE_LINKS[i].kbd}`.toLowerCase().includes(q));

  const close = () => setOpen(false);
  const openPalette = () => {
    setOpen(true); setQuery(''); setSel(0);
    setTimeout(() => inputRef.current.focus(), 50);
  };

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); }
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, visible.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && visible[sel] !== undefined) linkRefs.current[visible[sel]].click();
  };

  return (
    <div className={cx('overlay', open && 'open')} id="pal" aria-hidden={!open} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label="Jump to a section">
        <input
          id="palIn" ref={inputRef} placeholder="Where do you want to go?" autoComplete="off"
          value={query} onChange={(e) => { setQuery(e.target.value); setSel(0); }} onKeyDown={onInputKey}
        />
        <nav id="palNav">
          {PALETTE_LINKS.map((l, i) => (
            <a
              key={l.href} href={l.href} ref={(el) => { linkRefs.current[i] = el; }}
              className={visible[sel] === i ? 'sel' : undefined}
              style={visible.includes(i) ? undefined : { display: 'none' }}
              onClick={close}
              {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
            >
              {l.label} <kbd>{l.kbd}</kbd>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
