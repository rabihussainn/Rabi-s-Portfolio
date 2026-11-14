import { useRef } from 'react';
import { usePlaybackLoop } from '../hooks/usePlaybackLoop';
import { useScaleToFit } from '../hooks/useScaleToFit';
import { createKollegioRenderer, KOLLEGIO_LENGTH, KOLLEGIO_STILL } from '../animations/kollegioTimeline';

const K = 'assets/kollegio/';
const PLAYBACK = { length: KOLLEGIO_LENGTH, reducedAt: KOLLEGIO_STILL, threshold: 0.2, isActive: (e) => e.isIntersecting };

/** A slice of a full-screen Figma export, revealed piece by piece. */
function Slice({ k, top, left = 0, width, height, src }) {
  return (
    <div className="kP" data-k={k} style={{ top, left, width, height, backgroundImage: `url(${K}${src})`, backgroundPosition: `-${left}px -${top}px` }} />
  );
}

const CHAT_SLICES = [['c-bub', 114, 0, 393, 54], ['c-q', 178, 0, 393, 46], ['c-o1', 228, 0, 196, 100], ['c-o2', 228, 196, 197, 100]];
const QUIZ_SLICES_TOP = [['q-prog', 110, 0, 393, 30], ['q-q', 150, 0, 393, 70], ['q-ch', 236, 0, 393, 26]];
const QUIZ_SLICES_BOTTOM = [['q-o1on', 266, 0, 393, 66], ['q-o2', 336, 0, 393, 66], ['q-o3', 406, 0, 393, 66], ['q-o4', 476, 0, 393, 66]];
const SHEET_LINES = [152, 174, 196, 218];
const SHEET_ROWS = [[250, 68], [326, 82]];

export default function KollegioPrototype() {
  const phoneRef = useRef(null);
  const screenRef = useRef(null);
  useScaleToFit(phoneRef, screenRef, 393);
  usePlaybackLoop(phoneRef, createKollegioRenderer, PLAYBACK);

  return (
    <div className="kStage">
      <div
        className="kPhone" id="kPhone" ref={phoneRef} role="img"
        aria-label="Animated Kollegio prototype: from the home screen the student picks deciding where to study, answers Reka in chat, then swipes through college cards, asks Reka why a college fits, saves one with a right swipe, passes on another with a left swipe and undoes it."
      >
        <div className="kScr" ref={screenRef}>
          <img className="kL" data-k="home" src={K + 'home.webp'} alt="" />
          <img className="kL" data-k="chat" src={K + 'chat-base.webp'} alt="" />
          {CHAT_SLICES.map(([k, top, left, w, h]) => <Slice key={k} k={k} top={top} left={left} width={w} height={h} src="chat-full.webp" />)}

          <img className="kL" data-k="quiz" src={K + 'quiz-base.webp'} alt="" />
          {QUIZ_SLICES_TOP.map(([k, top, left, w, h]) => <Slice key={k} k={k} top={top} left={left} width={w} height={h} src="quiz-full.webp" />)}
          <div className="kP" data-k="q-o1" style={{ top: 270, left: 0, width: 393, height: 58, backgroundImage: `url(${K}quiz-o1-off.png)`, backgroundSize: '393px 58px' }} />
          {QUIZ_SLICES_BOTTOM.map(([k, top, left, w, h]) => <Slice key={k} k={k} top={top} left={left} width={w} height={h} src="quiz-full.webp" />)}

          <img className="kL" data-k="deck" src={K + 'deck-base.webp'} alt="" />
          <div className="kCard" data-k="cardB">
            <img src={K + 'card-sjsu.webp'} alt="" />
            <div className="kNo"><b>Not for you</b><span>We’ll show you fewer like this</span></div>
          </div>
          <div className="kCard" data-k="cardA">
            <img src={K + 'card-calpoly.webp'} alt="" />
            <div className="kYes">
              <i><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></i>
              <b>Added to your Discover page</b>
            </div>
          </div>
          <img className="kUndo" data-k="undo" src={K + 'undo.webp'} alt="" />
          <img className="kL" data-k="dim" src={K + 'deck-dim.webp'} alt="" />
          <div className="kSheet" data-k="sheet">
            <img src={K + 'sheet.webp'} alt="" />
            {SHEET_LINES.map((top) => <i key={top} className="kLine" style={{ top, height: 18 }} />)}
            {SHEET_ROWS.map(([top, height]) => <i key={top} className="kRow" style={{ top, height }} />)}
          </div>
          <img className="kL" data-k="hero" src={K + 'hero.webp'} alt="" />
          <span className="kTouch" data-k="touch"></span>
        </div>
      </div>
    </div>
  );
}
