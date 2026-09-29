# Design rules

Read this before changing anything visual. The site should look like a
well-set annual report or magazine, not a template.

## Tokens (app/globals.css, mapped in tailwind.config.js)
- `paper` #F4F1EA, `paper-deep` #EAE6DC, `ink` #111110, `muted` #5E5B54, `rule` #D9D4C7
- `accent` #FF4F00. Use it sparingly: hover states, the current nav item, one mark per section.
- `.theme-ink` on a section flips paper/ink (used by the 3D strip and footer). Add
  `data-nav-theme="ink"` so the header inverts over it.

## Type (next/font in app/layout.tsx)
- Archivo (`font-sans`). Add `.display` for the expanded, semibold headline cut.
- Newsreader italic (`font-serif italic`) for one emphasis word at a time.
- IBM Plex Mono (`font-mono`, `.meta`, `.num`) for indexes, dates, numbers, labels.
- Sizes: `text-display-xl/lg/md/sm`, `text-label`.

## Layout
- `.page-x` gutters, `max-w-page`, `.grid-page` (4 cols mobile, 12 desktop).
- Hairline rules (`.hairline`, `border-rule`) separate things. Lists beat cards.
- Dates right-aligned in mono. Numbers are tabular.

## Motion (components/motion)
- Native scrolling. No smooth-scroll libraries or scroll hijacking: trackpads
  already have momentum. GSAP ScrollTrigger reads native scroll.
- One page. Sections are `<section id>`s; case studies open in place
  (`components/study`, URL hash `#work/<slug>`).
- `SplitReveal` for H1/H2 line reveals only. Never fade-up every section.
- Every effect goes through `gsap.matchMedia()` with `MOTION_OK` (and `HOVER_OK`
  for cursor effects) and must have a static fallback.

## Tone
Confident and specific, never job-hunting. No "open to roles", "hire me",
relocation lists, or availability badges. The résumé is a quiet link.

## Banned
Gradient blobs or glows, `backdrop-blur`, glassmorphism, particles, cursor glow,
emoji, icon-in-tinted-square tiles, rows of stat cards, pill eyebrows above
headlines, rainbow badges, drop shadows, rounded-2xl cards, Inter.
(`.link-draw` uses a linear-gradient only to draw a 1px underline; that's fine.)
