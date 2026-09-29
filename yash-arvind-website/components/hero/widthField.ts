/**
 * Variable-width type field for the hero statement.
 *
 * Every Archivo letter is its own span. A "field" value g (0..1) is computed per
 * letter from the cursor (or a tap ripple); letters with a high g get wider on
 * the `wdth` axis. Each visual line is then solved so its total width stays the
 * same as at rest: the letters around the cursor swell and the rest of the line
 * condenses to pay for it. Lines never reflow, never grow, never jump.
 *
 * Widths are measured per letter at three stretches (min, rest, max) and treated
 * as piecewise linear, which is close enough for Archivo that the error is a
 * pixel or two per line. Letter centers are cached at rest (page coordinates)
 * and re-measured on resize and after fonts load, so the per-frame work is just
 * arithmetic plus one style write per letter that actually changed.
 */

export const WDTH_MIN = 72;
export const WDTH_REST = 108;
export const WDTH_MAX = 125;

/** How far above rest a letter under the cursor wants to go (before the line solve). */
const AMP = 70;
/** Cursor has to move within this long to count as active; then everything settles. */
const IDLE_MS = 650;
/** Easing time constants (ms): quick when following, about a second to settle. */
const TAU_FOLLOW = 70;
const TAU_SETTLE = 260;
const TAU_RIPPLE = 45;
/** Tap ripple. */
const RIPPLE_MS = 1150;

interface Letter {
  el: HTMLElement;
  x: number;
  y: number;
  /** Width at WDTH_MIN, WDTH_REST, WDTH_MAX. */
  w0: number;
  w1: number;
  w2: number;
  cur: number;
  tgt: number;
  g: number;
}

type Mode = 'pointer' | 'tap';

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

function widthAt(l: Letter, s: number) {
  return s <= WDTH_REST
    ? l.w0 + ((l.w1 - l.w0) * (s - WDTH_MIN)) / (WDTH_REST - WDTH_MIN)
    : l.w1 + ((l.w2 - l.w1) * (s - WDTH_REST)) / (WDTH_MAX - WDTH_REST);
}

/** Shift the whole line's stretch by c so its total width returns to the rest width. */
function solveLine(line: Letter[]) {
  let any = false;
  for (const l of line) if (l.g > 0.002) any = true;
  if (!any) {
    for (const l of line) l.tgt = WDTH_REST;
    return;
  }
  let rest = 0;
  for (const l of line) rest += l.w1;
  const total = (c: number) => {
    let sum = 0;
    for (const l of line) sum += widthAt(l, clamp(WDTH_REST + AMP * l.g + c, WDTH_MIN, WDTH_MAX));
    return sum;
  };
  let lo = WDTH_MIN - WDTH_REST - AMP;
  let hi = WDTH_MAX - WDTH_REST;
  for (let i = 0; i < 22; i++) {
    const mid = (lo + hi) / 2;
    if (total(mid) > rest) hi = mid;
    else lo = mid;
  }
  // Take the lower bound: the line can end up a hair narrower, never wider.
  for (const l of line) l.tgt = clamp(WDTH_REST + AMP * l.g + lo, WDTH_MIN, WDTH_MAX);
}

export function createWidthField(root: HTMLElement, mode: Mode, tapTarget: HTMLElement | null) {
  const els = Array.from(root.querySelectorAll<HTMLElement>('[data-l]'));
  let letters: Letter[] = els.map((el) => ({
    el,
    x: 0,
    y: 0,
    w0: 0,
    w1: 0,
    w2: 0,
    cur: WDTH_REST,
    tgt: WDTH_REST,
    g: 0,
  }));
  let lines: Letter[][] = [];
  let fontSize = 16;
  let bounds = { left: 0, right: 0, top: 0, bottom: 0 };

  let px = 0;
  let py = 0;
  let lastMove = -Infinity;
  let ripple: { x: number; y: number; t0: number; reach: number } | null = null;

  let raf = 0;
  let last = 0;
  let destroyed = false;

  const setAll = (s: number) => {
    for (const l of letters) l.el.style.fontStretch = `${s}%`;
  };

  function measure() {
    if (destroyed || !letters.length) return;
    setAll(WDTH_MIN);
    letters.forEach((l) => (l.w0 = l.el.getBoundingClientRect().width));
    setAll(WDTH_MAX);
    letters.forEach((l) => (l.w2 = l.el.getBoundingClientRect().width));
    setAll(WDTH_REST);
    const sx = window.scrollX;
    const sy = window.scrollY;
    const byTop = new Map<number, Letter[]>();
    letters.forEach((l) => {
      const r = l.el.getBoundingClientRect();
      l.w1 = r.width;
      l.x = r.left + sx + r.width / 2;
      l.y = r.top + sy + r.height / 2;
      const key = Math.round(r.top / 4);
      const row = byTop.get(key) ?? [];
      row.push(l);
      byTop.set(key, row);
    });
    lines = Array.from(byTop.values());
    const rb = root.getBoundingClientRect();
    bounds = { left: rb.left + sx, right: rb.right + sx, top: rb.top + sy, bottom: rb.bottom + sy };
    fontSize = parseFloat(getComputedStyle(root).fontSize) || 16;
    for (const l of letters) l.el.style.fontStretch = `${l.cur}%`;
  }

  function field(now: number): 'follow' | 'ripple' | 'settle' {
    if (ripple) {
      const t = (now - ripple.t0) / RIPPLE_MS;
      if (t >= 1) {
        ripple = null;
      } else {
        const r = ripple.reach * (1 - Math.pow(1 - t, 2.2));
        const band = fontSize * 0.9;
        const fade = 1 - t * t;
        for (const l of letters) {
          const d = Math.hypot(l.x - ripple.x, (l.y - ripple.y) * 1.2);
          const k = (d - r) / band;
          l.g = Math.exp(-k * k) * fade;
        }
        return 'ripple';
      }
    }
    if (mode === 'pointer' && now - lastMove < IDLE_MS) {
      const sx = fontSize * 1.5;
      const sy = fontSize * 0.7;
      for (const l of letters) {
        const dx = (l.x - px) / sx;
        const dy = (l.y - py) / sy;
        l.g = Math.exp(-(dx * dx + dy * dy));
      }
      return 'follow';
    }
    for (const l of letters) l.g = 0;
    return 'settle';
  }

  function frame(now: number) {
    raf = 0;
    if (destroyed) return;
    const dt = Math.min(now - (last || now), 64);
    last = now;
    const state = field(now);
    for (const line of lines) solveLine(line);
    const tau = state === 'ripple' ? TAU_RIPPLE : state === 'follow' ? TAU_FOLLOW : TAU_SETTLE;
    const k = 1 - Math.exp(-dt / tau);
    let moving = false;
    for (const l of letters) {
      const d = l.tgt - l.cur;
      if (Math.abs(d) < 0.04) {
        if (l.cur !== l.tgt) {
          l.cur = l.tgt;
          l.el.style.fontStretch = `${l.cur}%`;
        }
        continue;
      }
      moving = true;
      l.cur += d * k;
      l.el.style.fontStretch = `${l.cur.toFixed(2)}%`;
    }
    if (moving || state !== 'settle') raf = requestAnimationFrame(frame);
    else last = 0;
  }

  const kick = () => {
    if (!raf && !destroyed) raf = requestAnimationFrame(frame);
  };

  const near = (x: number, y: number) => {
    const m = fontSize * 2.2;
    return x > bounds.left - m && x < bounds.right + m && y > bounds.top - m && y < bounds.bottom + m;
  };

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    if (!near(e.pageX, e.pageY)) {
      // Leaving the statement: let it settle from here.
      if (lastMove > 0 && performance.now() - lastMove < IDLE_MS) lastMove = 0;
      return;
    }
    px = e.pageX;
    py = e.pageY;
    lastMove = performance.now();
    kick();
  };
  const onLeave = () => {
    lastMove = 0;
    kick();
  };

  /** Send one width wave outward from a page point. */
  function rippleFrom(x: number, y: number) {
    const far = Math.max(
      Math.hypot(bounds.left - x, bounds.top - y),
      Math.hypot(bounds.right - x, bounds.top - y),
      Math.hypot(bounds.left - x, bounds.bottom - y),
      Math.hypot(bounds.right - x, bounds.bottom - y),
    );
    ripple = { x, y, t0: performance.now(), reach: far + fontSize };
    kick();
  }
  const onTap = (e: MouseEvent) => rippleFrom(e.pageX, e.pageY);

  let resizeTimer = 0;
  const ro = new ResizeObserver(() => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(measure, 120);
  });

  measure();
  ro.observe(root);
  document.fonts?.ready.then(() => measure());
  if (mode === 'pointer') {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
  } else {
    tapTarget?.addEventListener('click', onTap);
  }

  return {
    rippleFrom,
    destroy() {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      tapTarget?.removeEventListener('click', onTap);
      for (const l of letters) l.el.style.fontStretch = '';
      letters = [];
      lines = [];
    },
  };
}
