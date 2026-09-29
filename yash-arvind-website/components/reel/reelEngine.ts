/**
 * Scroll engine for the work reel (components/reel/WorkReel.tsx).
 *
 * Based on RotatingOnScrollAnimations by Codrops, MIT License,
 * https://github.com/codrops/RotatingOnScrollAnimations
 * (article: https://tympanus.net/codrops/2026/06/18/exploring-3d-image-rotations-on-scroll/)
 *
 * Copyright (c) 2009 - 2026 Codrops (https://codrops.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Port notes. This adapts the previous "Shipped" strip port (commit d2cc79a)
 * from a free-scrolling column to a pinned reel with one frame per project.
 * The track is a tall block whose 100vh child is CSS-sticky, so scrolling stays
 * native; one ScrollTrigger reads the track's progress. That progress is eased
 * so each frame dwells flat at the centre (Codrops Variation 5's
 * `holdAtMiddle`, applied to the whole reel instead of per item), then every
 * frame is placed from its distance to the centre: a sine offset sideways,
 * Variation 3's rolodex rotateX with depth, a little rotateY/rotateZ, and
 * opacity for the dimming. Variation 4's velocity blur is kept, desktop only
 * and capped. Rotations stay under 90° so a screenshot never shows its back.
 * Mobile gets a gentle per-block rotateX/scale settle with no filter.
 */

import { gsap, ScrollTrigger, MOTION_OK, HOVER_OK } from '@/components/motion/gsap';

/** Share of each step spent held flat with a frame at the centre. */
const HOLD = 0.34;
/** Most distance between neighbouring frames, as a share of the viewport height. */
const SPACING = 0.6;
/** Upper bound for the velocity blur, in px. */
const MAX_BLUR = 3;

const TILT = { rotX: 56, rotY: 14, rotZ: 4, depth: 520, dim: 0.9, sway: 0.08 };

/** Must match the reel media query in reel.css. */
export const REEL_QUERY = `(min-width: 768px) and (min-height: 560px) and ${MOTION_OK}`;
const MOBILE_QUERY = `(max-width: 767.98px) and ${MOTION_OK}`;

/** Eases the raw position so the reel dwells on each whole frame. */
function dwell(raw: number, last: number) {
  if (raw <= 0) return 0;
  if (raw >= last) return last;
  const k = Math.floor(raw);
  const f = raw - k;
  const h = HOLD / 2;
  const t = f < h ? 0 : f > 1 - h ? 1 : (f - h) / (1 - HOLD);
  return k + (0.5 - Math.cos(t * Math.PI) / 2);
}

export function setupReel(section: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(REEL_QUERY, () => {
    const track = section.querySelector<HTMLElement>('.reel-track');
    const view = section.querySelector<HTMLElement>('.reel-view');
    const items = gsap.utils.toArray<HTMLElement>('.reel-item', section);
    const frames = items.map((item) => item.querySelector<HTMLAnchorElement>('.reel-frame'));
    const rows = gsap.utils.toArray<HTMLAnchorElement>('.reel-row', section);
    const roll = section.querySelector<HTMLElement>('.reel-counter__roll');
    const fill = section.querySelector<HTMLElement>('.reel-progress__fill');
    if (!track || !view || !items.length) return;

    const last = items.length - 1;
    const lift = items.map(() => ({ v: 0 }));
    const setters = items.map((item) => gsap.quickSetter(item, 'css') as (vars: gsap.TweenVars) => void);
    let pos = 0;
    let active = -1;
    let spacing = 0;
    let sway = 0;
    // Neighbours sit just over a frame apart, so one or two peek in at the edges.
    const measure = () => {
      spacing = Math.min(window.innerHeight * SPACING, items[0].offsetHeight * 1.15);
      sway = view.clientWidth * TILT.sway;
    };
    measure();

    // Frames are reached through the index rows; keep one tab stop per project.
    frames.forEach((a) => a?.setAttribute('tabindex', '-1'));

    const renderItem = (i: number) => {
      const d = i - pos; // > 0: still to come (below), < 0: already passed (above)
      const c = gsap.utils.clamp(-1, 1, d / 1.35);
      const a = Math.abs(c);
      const l = lift[i].v;
      const far = Math.abs(d) > 2.2;
      setters[i]({
        x: Math.sin(d * 0.95) * sway,
        y: d * spacing - l * 8,
        z: -Math.pow(a, 1.3) * TILT.depth + l * 36,
        rotationX: Math.sign(c) * Math.pow(a, 0.85) * TILT.rotX,
        rotationY: -c * TILT.rotY,
        rotationZ: c * TILT.rotZ,
        opacity: far ? 0 : 1 - Math.pow(a, 1.15) * TILT.dim,
        visibility: far ? 'hidden' : 'visible',
        zIndex: 10 - Math.round(Math.abs(d) * 2),
      });
    };

    const setActive = (next: number) => {
      if (next === active) return;
      const first = active < 0;
      active = next;
      rows.forEach((row, i) => row.toggleAttribute('data-active', i === next));
      items.forEach((item, i) => item.toggleAttribute('data-active', i === next));
      if (roll) {
        gsap.to(roll, {
          yPercent: (-100 * next) / items.length,
          duration: first ? 0 : 0.7,
          ease: 'expo.out',
          overwrite: true,
        });
      }
    };

    const render = () => {
      for (let i = 0; i < items.length; i++) renderItem(i);
      setActive(Math.round(pos));
      if (fill) fill.style.transform = `scaleX(${last ? pos / last : 1})`;
    };

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        pos = dwell(self.progress * last, last);
        render();
      },
      onRefresh: (self) => {
        measure();
        pos = dwell(self.progress * last, last);
        render();
      },
    });

    /** Scroll position where frame i sits at the centre. */
    const scrollFor = (i: number) => st.start + (last ? i / last : 0) * (st.end - st.start);

    // Keyboard: focusing a row brings its frame to the centre.
    const onFocus = (e: FocusEvent) => {
      const row = e.currentTarget as HTMLElement;
      if (!row.matches(':focus-visible')) return;
      const i = Number(row.dataset.index);
      if (Math.round(pos) !== i) window.scrollTo({ top: scrollFor(i) });
    };
    rows.forEach((row) => row.addEventListener('focus', onFocus));

    // will-change and the velocity blur only while the reel is on screen.
    let target = 0;
    let blur = 0;
    let lastFilter = '';
    const tick = () => {
      target *= 0.86;
      blur += (target - blur) * 0.3;
      const filter = blur < 0.08 ? '' : `blur(${blur.toFixed(2)}px)`;
      if (filter === lastFilter) return;
      lastFilter = filter;
      items.forEach((item) => (item.style.filter = filter));
    };
    const presence = ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        target = Math.max(target, Math.min(Math.abs(self.getVelocity()) / 5000, 1) * MAX_BLUR);
      },
      onToggle: (self) => {
        items.forEach((item) => (item.style.willChange = self.isActive ? 'transform, opacity, filter' : ''));
        if (self.isActive) gsap.ticker.add(tick);
        else {
          gsap.ticker.remove(tick);
          target = blur = 0;
          lastFilter = '';
          items.forEach((item) => (item.style.filter = ''));
        }
      },
    });

    // Hover: the frame lifts a touch and a small label follows the cursor.
    const cleanupHover = setupHover(section, items, (i, on) => {
      gsap.to(lift[i], { v: on ? 1 : 0, duration: 0.6, ease: 'expo.out', overwrite: true, onUpdate: () => renderItem(i) });
    });

    return () => {
      st.kill();
      presence.kill();
      gsap.ticker.remove(tick);
      cleanupHover();
      rows.forEach((row) => {
        row.removeEventListener('focus', onFocus);
        row.removeAttribute('data-active');
      });
      rows[0]?.setAttribute('data-active', '');
      frames.forEach((a) => a?.removeAttribute('tabindex'));
      items.forEach((item) => item.removeAttribute('data-active'));
      // Named props only: React owns each item's inline --i.
      gsap.set(items, { clearProps: 'transform,opacity,visibility,zIndex,filter,willChange' });
      if (roll) gsap.set(roll, { clearProps: 'transform' });
      if (fill) fill.style.transform = '';
    };
  });

  // Mobile: each cover settles from a gentle tilt as it enters. No filter, no pin.
  mm.add(MOBILE_QUERY, () => {
    const medias = gsap.utils.toArray<HTMLElement>('.reel-media', section);
    const tweens = medias.map((media) =>
      gsap.fromTo(
        media,
        { rotationX: 28, scale: 0.9, y: 24, transformOrigin: '50% 100%' },
        {
          rotationX: 0,
          scale: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: media,
            start: 'top bottom',
            end: 'top 45%',
            scrub: true,
            onToggle: (self) => (media.style.willChange = self.isActive ? 'transform' : ''),
          },
        }
      )
    );
    return () => {
      tweens.forEach((t) => t.scrollTrigger?.kill());
      tweens.forEach((t) => t.kill());
      gsap.set(medias, { clearProps: 'transform,willChange' });
    };
  });

  return () => mm.revert();
}

/** Fine pointer only: lift callback plus a mono label that trails the cursor. */
function setupHover(section: HTMLElement, items: HTMLElement[], onLift: (i: number, on: boolean) => void) {
  if (!window.matchMedia(HOVER_OK).matches) return () => {};
  const label = section.querySelector<HTMLElement>('.reel-cursor');
  if (!label) return () => {};

  gsap.set(label, { xPercent: 0, yPercent: 0, autoAlpha: 0, scale: 0.9 });
  const toX = gsap.quickTo(label, 'x', { duration: 0.45, ease: 'power3.out' });
  const toY = gsap.quickTo(label, 'y', { duration: 0.45, ease: 'power3.out' });
  let placed = false;

  const offs = items.map((item, i) => {
    const frame = item.querySelector<HTMLElement>('.reel-frame');
    if (!frame) return () => {};
    const move = (e: PointerEvent) => {
      const x = e.clientX + 18;
      const y = e.clientY + 18;
      if (!placed) {
        gsap.set(label, { x, y });
        placed = true;
      }
      toX(x);
      toY(y);
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      move(e);
      onLift(i, true);
      gsap.to(label, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'expo.out', overwrite: 'auto' });
    };
    const leave = () => {
      onLift(i, false);
      placed = false;
      gsap.to(label, { autoAlpha: 0, scale: 0.9, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
    };
    frame.addEventListener('pointerenter', enter);
    frame.addEventListener('pointermove', move);
    frame.addEventListener('pointerleave', leave);
    return () => {
      frame.removeEventListener('pointerenter', enter);
      frame.removeEventListener('pointermove', move);
      frame.removeEventListener('pointerleave', leave);
    };
  });

  return () => {
    offs.forEach((off) => off());
    gsap.set(label, { clearProps: 'all' });
  };
}
