import { useRef } from 'react';
import { usePlaybackLoop } from '../hooks/usePlaybackLoop';
import { useScaleToFit } from '../hooks/useScaleToFit';
import { createQanoonRenderer, QANOON_LENGTH, QANOON_STILL } from '../animations/qanoonTimeline';

const Q = 'assets/qanoon/';
const PLAYBACK = {
  length: QANOON_LENGTH, reducedAt: QANOON_STILL, threshold: [0, 0.2, 0.5],
  isActive: (e) => e.isIntersecting && e.intersectionRatio >= 0.2,
};

// Screen layouts. A screen is either a single image, or a base image plus
// slices of the full export that animate in: [top, height].
const SCREENS = {
  splash: { img: 'splash' },
  forum: { img: 'forum' },
  lforum: { img: 'lforum' },
  profile: { img: 'profile' },
  cpost: { base: 'cpost', slices: [[338, 90]] },
  lpost: { base: 'lpost', slices: [[342, 90]] },
  chats: { base: 'chats', slices: [[252, 50], [312, 60], [386, 60]] },
  clients: { base: 'clients', slices: [[252, 50], [314, 60], [388, 60], [462, 62]] },
  lawyers: { base: 'lawyers', slices: [[266, 90], [356, 88], [444, 88], [532, 88], [620, 88], [708, 88]] },
  cautions: { base: 'cautions', slices: [[252, 60], [334, 74], [429, 74], [524, 74]] },
  chat: { base: 'chat', slices: [[140, 60], [200, 82]], typingDots: [782, 64, 130] },
};

// Order the screens play in (must match the timeline in qanoonTimeline.js).
const FLOW = ['splash', 'forum', 'cpost', 'forum', 'chats', 'lawyers', 'chat', 'lawyers', 'cautions',
  'splash', 'lforum', 'lpost', 'lforum', 'clients', 'profile'];

function Screen({ name }) {
  const s = SCREENS[name];
  if (s.img) return <div className="qS" data-n={name}><img src={`${Q}${s.img}.webp`} alt="" /></div>;
  const full = `url(${Q}${s.base}.webp)`;
  return (
    <div className="qS" data-n={name}>
      <img src={`${Q}${s.base}-base.webp`} alt="" />
      {s.slices.map(([top, height]) => (
        <i key={top} className="qP" style={{ top, height, backgroundImage: full, backgroundPosition: `0 -${top}px` }} />
      ))}
      {s.typingDots && (
        <i className="qP qDots" style={{ top: s.typingDots[0], height: s.typingDots[1], width: s.typingDots[2], backgroundImage: full, backgroundPosition: `0 -${s.typingDots[0]}px` }} />
      )}
    </div>
  );
}

export default function QanoonPrototype() {
  const phoneRef = useRef(null);
  const screenRef = useRef(null);
  useScaleToFit(phoneRef, screenRef, 430);
  usePlaybackLoop(phoneRef, createQanoonRenderer, PLAYBACK);

  return (
    <div className="qStage">
      <div
        className="qPhone" id="qPhone" ref={phoneRef} role="img"
        aria-label="Animated Qanoon Connect prototype: a client picks her role, reads the legal advice forum and a post's comments, finds a lawyer and starts a chat, then opens the cautions guide; a lawyer then opens the discussion forum, a post, her client chats and her profile."
      >
        <div className="qScr" ref={screenRef}>
          {FLOW.map((name, i) => <Screen key={i} name={name} />)}
          <span className="kTouch qTouch"></span>
        </div>
      </div>
    </div>
  );
}
