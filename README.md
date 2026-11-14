# Rabi Hussain – portfolio

My personal site, built with **React 18** and **Vite**.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the build locally
```

Images go in `public/assets/` (for example `public/assets/rabi.jpg`, `public/assets/kollegio/…`, `public/assets/qanoon/…`) and the favicon in `public/favicon.svg`.

## How it's organised

```
src/
  App.jsx                 page layout: one component per section
  components/             Nav, Hero, Work, Journey, AiSection, About, Stack, Contact, CommandPalette
                          + KollegioPrototype, QanoonPrototype, PartnerFlowDiagram, ProjectIndex
  data/                   all copy and content (roles, projects, journey, stack, links)
  hooks/                  useInView, usePlaybackLoop, useScaleToFit, useReducedMotion
  animations/             frame-by-frame timelines for the two phone prototypes + easing helpers
  styles/                 plain CSS, split by section and imported in cascade order
```

A few decisions worth noting:

- **Content lives in `src/data/`.** Adding a project or a job is a data change, not a markup change.
- **Prototype animations are pure functions of time.** `createKollegioRenderer(el)` returns `render(t)`, and `usePlaybackLoop` drives it with `requestAnimationFrame`, pausing when the phone is off screen and resuming where it left off. Those layers are updated through refs rather than React state, so a 60fps animation never triggers a re-render.
- **Scroll reveals are state, not DOM mutations.** `<Reveal>` and `useInView` add the `in` class through React, so it can't be wiped by a re-render.
- **Respects `prefers-reduced-motion`.** Animations freeze on a representative frame instead of looping.
- **No UI dependencies.** Just React and CSS custom properties, with light and dark themes.
