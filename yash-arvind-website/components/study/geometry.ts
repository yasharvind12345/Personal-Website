/**
 * Geometry for the sheet's open/close morph, in viewport pixels.
 *
 * Clip-paths are tweened as plain numbers ({t, r, b, l, rad}) and written out
 * as `inset(...)` on every frame, rather than tweening clip-path strings: the
 * browser normalises strings it hands back (inset(0px) for four zeros), which
 * breaks a tween that has to pick up mid-flight when the user interrupts.
 */

export interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Clip {
  t: number;
  r: number;
  b: number;
  l: number;
  rad: number;
}

export const clipNone = (): Clip => ({ t: 0, r: 0, b: 0, l: 0, rad: 0 });

export const isClipNone = (c: Clip) => c.t === 0 && c.r === 0 && c.b === 0 && c.l === 0;

export const clipCss = (c: Clip) => `inset(${c.t}px ${c.r}px ${c.b}px ${c.l}px round ${c.rad}px)`;

/** Clip for `surface` that leaves only `box` visible. */
export function clipTo(box: Box, surface: Box, rad = 0): Clip {
  return {
    t: box.top - surface.top,
    r: surface.left + surface.width - (box.left + box.width),
    b: surface.top + surface.height - (box.top + box.height),
    l: box.left - surface.left,
    rad,
  };
}

/** Clip that hides all of `surface` below its bottom edge (a wipe's start or end). */
export const clipBelow = (surface: Box): Clip => ({ t: surface.height, r: 0, b: 0, l: 0, rad: 0 });

/**
 * Transform + clip that make an element laid out at `from` appear exactly
 * where `to` is. The element keeps its aspect ratio: it is scaled to cover
 * `to` (like object-fit: cover), centred on it, and cropped with a clip, so an
 * image cropped the same way in both places lines up. Clip values are in the
 * element's own (unscaled) pixels. Assumes transform-origin 0 0.
 */
export function coverMorph(from: Box, to: Box, radius = 0) {
  const scale = Math.max(to.width / from.width, to.height / from.height);
  const insetX = (from.width - to.width / scale) / 2;
  const insetY = (from.height - to.height / scale) / 2;
  return {
    x: to.left - from.left - scale * insetX,
    y: to.top - from.top - scale * insetY,
    scale,
    clip: { t: insetY, r: insetX, b: insetY, l: insetX, rad: radius / scale } as Clip,
  };
}

/** Fraction of `box` inside the viewport, 0–1. */
export function visibleFraction(box: Box) {
  const w = Math.max(0, Math.min(box.left + box.width, window.innerWidth) - Math.max(box.left, 0));
  const h = Math.max(0, Math.min(box.top + box.height, window.innerHeight) - Math.max(box.top, 0));
  const area = box.width * box.height;
  return area > 0 ? (w * h) / area : 0;
}

export function rectOf(el: Element): Box {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

/** Layout box of `el` ignoring any transform currently applied to it. */
export function untransformedRect(el: HTMLElement): Box {
  const prev = el.style.transform;
  el.style.transform = 'none';
  const box = rectOf(el);
  el.style.transform = prev;
  return box;
}
