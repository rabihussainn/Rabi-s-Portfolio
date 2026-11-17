import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { RESUME_URL } from '../data/site';
import Icon from './Icon';
import { ArrowButton, Reveal } from './ui';

const VERBS = ['build', 'ship', 'integrate', 'deploy', 'build']; // last repeats the first for a seamless loop
const TINTS = ['var(--butter)', 'var(--lilac)', 'var(--mint)', 'var(--sky)'];

/** Word that slides up from a mask on load. i sets its place in the stagger. */
function SlideIn({ i, soft, children }) {
  return (
    <span className="sw">
      <span className={soft ? 'soft' : undefined} style={{ transitionDelay: (0.15 + i * 0.07) + 's' }}>{children}</span>
    </span>
  );
}

/** The colour pill that cycles build → ship → integrate → deploy. */
function RotatingVerb() {
  const rotRef = useRef(null);
  const trackRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const rot = rotRef.current, track = trackRef.current, words = [...track.children];
    let wi = 0, alive = true, timer, resetTimer;

    const setRot = (i) => {
      track.style.transform = `translateY(${-i * words[0].getBoundingClientRect().height}px)`;
      rot.style.backgroundColor = TINTS[i % TINTS.length];
      rot.style.width = (words[i].getBoundingClientRect().width + parseFloat(getComputedStyle(rot).paddingLeft) * 2) + 'px';
    };
    const onResize = () => setRot(wi);

    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => alive && setRot(wi));
    addEventListener('resize', onResize);
    if (!reduce) {
      timer = setInterval(() => {
        wi += 1; setRot(wi);
        if (wi === words.length - 1) {
          resetTimer = setTimeout(() => { // jump back to the first word unseen
            track.style.transition = 'none'; wi = 0; setRot(0); track.getBoundingClientRect(); track.style.transition = '';
          }, 800);
        }
      }, 2200);
    }
    return () => { alive = false; removeEventListener('resize', onResize); clearInterval(timer); clearTimeout(resetTimer); };
  }, [reduce]);

  return (
    <span className="rot" id="rot" ref={rotRef} aria-hidden="true">
      <span className="rot-track" ref={trackRef}>{VERBS.map((v, i) => <span key={i}>{v}</span>)}</span>
    </span>
  );
}

export default function Hero() {
  // Kick off the load-in choreography (stickers, photo, sliding words) after first paint.
  useEffect(() => {
    let inner;
    const outer = requestAnimationFrame(() => { inner = requestAnimationFrame(() => document.body.classList.add('loaded')); });
    return () => { cancelAnimationFrame(outer); cancelAnimationFrame(inner); };
  }, []);

  return (
    <section className="hero">
      <div className="wrap heroWrap">
        <figure className="mePhoto" aria-hidden="false">
          <svg className="ring" viewBox="0 0 200 200" aria-hidden="true">
            <defs><path id="ringPath" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" /></defs>
            <text><textPath href="#ringPath">full-stack ✳ cloud ✳ remote ✳ full-stack ✳ cloud ✳ remote ✳ </textPath></text>
          </svg>
          <img src="assets/rabi.jpg" width="640" height="640" decoding="async" alt="Rabi Hussain" />
          <span className="wave" aria-hidden="true">👋</span>
        </figure>

        <h1 className="hello">
          <SlideIn i={0}>Hello!</SlideIn>
          <span className="stickers" aria-hidden="true">
            <span className="stk s1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" /></svg>
            </span>
            <span className="stk s2"><Icon name="cloud" /></span>
            <span className="stk s3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="6" cy="5" r="2.2" /><circle cx="6" cy="19" r="2.2" /><circle cx="18" cy="8" r="2.2" /><path d="M6 7.2v9.6M18 10.2c0 4-6 3-11 7" /></svg>
            </span>
          </span>
        </h1>

        <p className="claim" aria-label="I’m Rabi. I build, ship, integrate and deploy products people use.">
          <SlideIn i={1}>I’m Rabi.</SlideIn> <SlideIn i={2}>I</SlideIn>{' '}
          <RotatingVerb />
          <br />
          <SlideIn i={3} soft>products</SlideIn> <SlideIn i={4} soft>people</SlideIn> <SlideIn i={5} soft>use.</SlideIn>
        </p>

        <div className="heroRow">
          <Reveal>
            <p className="lede">I like understanding how things work and figuring out how to make them work better. As a <b>full-stack software engineer</b>, I work across interfaces, APIs and the systems that bring products together. I'm drawn to thoughtful user experiences, solving practical problems and building technology that works just as well behind the scenes as it does on the surface.</p>
            <div className="heroActions">
              <ArrowButton href="#work" arrow="↘">See my work</ArrowButton>
              <ArrowButton ghost href={RESUME_URL} target="_blank" rel="noopener">Resume (PDF)</ArrowButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
