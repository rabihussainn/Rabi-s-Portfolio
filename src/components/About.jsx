import { ABOUT_CHIPS, ABOUT_PARAGRAPHS, QUICK_FACTS } from '../data/about';
import { Pill, Reveal } from './ui';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about">
        <Reveal className="qf">
          <h3>Quick facts</h3>
          <dl>{QUICK_FACTS.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}</dl>
          <a className="pill butter" href="#contact"><span className="dot"></span>Open to remote roles</a>
        </Reveal>
        <Reveal className="aboutCard" delay="1">
          <h2>Engineer by craft, curious by nature.</h2>
          {ABOUT_PARAGRAPHS.map((p) => <p key={p}>{p}</p>)}
          <div className="chips">{ABOUT_CHIPS.map((c) => <Pill key={c.label} tone={c.tone}>{c.label}</Pill>)}</div>
        </Reveal>
      </div>
    </section>
  );
}
