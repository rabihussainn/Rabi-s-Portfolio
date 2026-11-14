import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS, MOBILE_LINKS, RESUME_URL } from '../data/site';
import { cx } from '../lib';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) { setOpen(false); btnRef.current.focus(); }
    };
    const onClick = (e) => { if (!navRef.current.contains(e.target)) setOpen(false); };
    addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header ref={navRef} className={cx('nav', open && 'open')} aria-label="Main">
      <a href="#top" className="logo" aria-label="Rabi Hussain, home">rabi<i></i></a>
      <ul>
        {NAV_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        <li><a href={RESUME_URL} target="_blank" rel="noopener">Resume</a></li>
      </ul>
      <div className="navEnd">
        <a className="btn" href="#contact">Let’s talk</a>
        <button
          ref={btnRef}
          className="menuBtn"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mMenu"
          onClick={() => setOpen((o) => !o)}
        >
          <i></i><i></i>
        </button>
      </div>
      <nav className="mMenu" id="mMenu" aria-label="Sections">
        {MOBILE_LINKS.map((l) => <a key={l.href} href={l.href} onClick={close}>{l.label}</a>)}
        <a className="mRes" href={RESUME_URL} target="_blank" rel="noopener" onClick={close}>Resume (PDF) ↗</a>
      </nav>
    </header>
  );
}
