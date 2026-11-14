import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '../data/site';
import { ArrowButton, Reveal } from './ui';

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <Reveal className="cBox">
          <div className="badge" aria-hidden="true">
            <svg viewBox="0 0 150 150">
              <defs><path id="circ" d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" /></defs>
              <text><textPath href="#circ">AVAILABLE FOR WORK · AVAILABLE FOR WORK · </textPath></text>
            </svg>
            <span className="core">✳</span>
          </div>
          <h2>Let’s make something useful.</h2>
          <p>Have a product to build, a system to connect, or something to get into the cloud? I’d love to hear what you’re working on.</p>
          <div className="cLinks">
            <ArrowButton href={`mailto:${EMAIL}`}>Email me</ArrowButton>
            <ArrowButton ghost href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</ArrowButton>
            <ArrowButton ghost href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</ArrowButton>
            <ArrowButton ghost href={RESUME_URL} target="_blank" rel="noopener">Resume (PDF)</ArrowButton>
          </div>
          <p className="mail">{EMAIL}</p>
        </Reveal>
        <footer>
          <span>© <span id="yr">{new Date().getFullYear()}</span> Rabi Hussain · Working remotely · PKT (UTC+5)</span>
          <span className="kHint">Jump anywhere <kbd>⌘</kbd><kbd>K</kbd></span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
