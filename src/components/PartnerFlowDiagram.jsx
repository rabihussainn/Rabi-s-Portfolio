import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const WIRES = [
  'M118 50 C150 50 150 108 178 108', 'M118 108 H178', 'M118 166 C150 166 150 108 178 108', 'M232 135 V214',
  'M182 268 C182 300 105 300 105 336', 'M180 363 H240', 'M302 241 H330', 'M134 241 H162', 'M282 268 C282 300 360 300 360 420',
];

// x, y, w, h, rx, title, textX, titleY, [sub, subY], [fontSize], [dark]
const NODES = [
  { x: 8, y: 31, w: 110, h: 38, rx: 12, title: 'Partner A', tx: 22, ty: 55, fs: 13 },
  { x: 8, y: 89, w: 110, h: 38, rx: 12, title: 'Partner B', tx: 22, ty: 113, fs: 13 },
  { x: 8, y: 147, w: 110, h: 38, rx: 12, title: 'Partner C', tx: 22, ty: 171, fs: 13 },
  { x: 178, y: 81, w: 140, h: 54, rx: 14, title: 'Webhooks', tx: 193, ty: 105, sub: 'real-time orders', sy: 123 },
  { x: 6, y: 222, w: 128, h: 38, rx: 12, title: 'GitHub Actions', tx: 18, ty: 246, fs: 13 },
  { x: 162, y: 214, w: 140, h: 54, rx: 14, title: 'Django API', tx: 177, ty: 238, sub: 'on AWS EC2', sy: 256, dark: true },
  { x: 330, y: 222, w: 80, h: 38, rx: 12, title: 'S3', tx: 356, ty: 246, fs: 13 },
  { x: 30, y: 336, w: 150, h: 54, rx: 14, title: 'AWS RDS', tx: 45, ty: 360, sub: 'PostgreSQL', sy: 378 },
  { x: 240, y: 336, w: 150, h: 54, rx: 14, title: 'Central reporting', tx: 255, ty: 360, sub: 'across kitchens', sy: 378 },
  { x: 200, y: 420, w: 210, h: 44, rx: 14, title: 'White-label web + mobile', tx: 215, ty: 447, fs: 14 },
];

// Packets travelling along the wires: [wire index, duration, delay, radius, coral?]
const PACKETS = [[0, '1.8s', null, 4.5, true], [1, '1.8s', '.6s', 4.5, true], [2, '1.8s', '1.2s', 4.5, true], [3, '1.4s', '.3s', 4.5, true],
  [4, '1.8s', '.8s', 4.5], [5, '1.4s', '1.4s', 4], [6, '1s', '.2s', 3.5], [7, '1s', '.5s', 3.5], [8, '2.2s', '1s', 4]];

/** Pattern Technologies: how partner orders reached the dashboard. */
export default function PartnerFlowDiagram() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Pause the SVG animations while off-screen (or entirely for reduced motion).
  useEffect(() => {
    const svg = ref.current;
    if (reduce) { svg.pauseAnimations(); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations())));
    io.observe(svg);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <svg
      ref={ref} className="sys" viewBox="0 0 420 470" role="img"
      aria-label="Diagram: three partner platforms send webhooks to a Django API on AWS EC2, deployed with GitHub Actions. The API stores data in RDS and S3, feeds central reporting across kitchens, and serves white-label web and mobile apps."
    >
      {WIRES.map((d, i) => <path key={i} id={`p${i + 1}`} className="w" d={d} />)}
      {NODES.map((n) => (
        <g key={n.title} className={n.dark ? 'n t' : 'n'}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={n.rx} />
          <text className="h" x={n.tx} y={n.ty} style={n.fs ? { fontSize: `${n.fs}px` } : undefined}>{n.title}</text>
          {n.sub && <text className="s" x={n.tx} y={n.sy}>{n.sub}</text>}
        </g>
      ))}
      {PACKETS.map(([w, dur, begin, r, coral], i) => (
        <circle key={i} className={coral ? 'pk c' : 'pk'} r={r}>
          <animateMotion dur={dur} begin={begin ?? undefined} repeatCount="indefinite"><mpath href={`#p${w + 1}`} /></animateMotion>
        </circle>
      ))}
    </svg>
  );
}
