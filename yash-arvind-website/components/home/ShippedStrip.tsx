'use client';

/**
 * "Shipped": product screenshots and plates rotating in 3D as they scroll by.
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
 * Port notes. The gallery is the Codrops one: a single centred column whose
 * items are offset along a sine wave, each with its own perspective, plus a
 * marquee that scrubs across the viewport. The motion is Variation 5's
 * `holdAtMiddle` (items settle flat and readable through the middle of the
 * viewport) driving Variation 3's deterministic rolodex tilt (rotateX with
 * depth), with Variation 4's velocity-driven blur. Changes for screenshots:
 * rotations stay under 90° so an image never shows its back, depth pushes
 * items away at the edges (not the centre) so text stays legible, the dimming
 * is opacity rather than a brightness filter, the blur is desktop-only and
 * capped, there is no random start angle so server and client agree, and the
 * marquee runs behind the images (not blended over them) so it never covers a
 * screenshot while it is being read. Without JS or with reduced motion the
 * same list renders as a static, sideways-scrolling filmstrip (strip.css).
 * Lenis already drives ScrollTrigger (MotionProvider); this adds none.
 */

import { useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';

import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/components/motion/gsap';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { stripImages } from '@/content/media';
import '@/app/styles/strip.css';

type Shape = 'wide' | 'tall' | 'square';

/** Wave step between neighbours, from Codrops Variation 5 (`angle = i * 0.9`). */
const WAVE_STEP = 0.9;
/** Share of each item's scroll range it spends held flat at the centre. */
const HOLD = 0.34;
/** Upper bound for the velocity blur, in px. */
const MAX_BLUR = 4;

const MOTION = {
  desktop: { rotX: 58, rotY: 16, rotZ: 7, depth: 460, dim: 0.9, willChange: 'transform, opacity, filter' },
  mobile: { rotX: 42, rotY: 0, rotZ: 4, depth: 220, dim: 0.85, willChange: 'transform, opacity' },
};

const SIZES: Record<Shape, string> = {
  wide: '(min-width: 768px) min(50vw, 768px), 80vw',
  tall: '(min-width: 768px) min(21vw, 304px), 60vw',
  square: '(min-width: 768px) min(30vw, 448px), 74vw',
};

const shapeOf = (w: number, h: number): Shape => (w / h > 1.2 ? 'wide' : w / h < 0.8 ? 'tall' : 'square');

/** Maps progress so the middle `hold` fraction of the range sits at 0.5 (Codrops Variation 5). */
function holdAtMiddle(progress: number, hold = HOLD) {
  const half = hold / 2;
  if (progress < 0.5 - half) return gsap.utils.mapRange(0, 0.5 - half, 0, 0.5, progress);
  if (progress > 0.5 + half) return gsap.utils.mapRange(0.5 + half, 1, 0.5, 1, progress);
  return 0.5;
}

/** Product names for the marquee, in order of first appearance. */
const marqueeNames = Array.from(
  new Set(stripImages.map((item) => item.caption.split('·')[0].trim()))
);

const productCount = marqueeNames.length;
const pad = (n: number) => String(n).padStart(2, '0');

export function ShippedStrip() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const stage = el.querySelector<HTMLElement>('.strip-stage');
      const marquee = el.querySelector<HTMLElement>('.strip-mark__inner');
      if (!stage) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: `(min-width: 768px) and ${MOTION_OK}`,
          mobile: `(max-width: 767.98px) and ${MOTION_OK}`,
        },
        (ctx) => {
          const { desktop, mobile } = ctx.conditions as { desktop: boolean; mobile: boolean };
          if (!desktop && !mobile) return;
          const cfg = desktop ? MOTION.desktop : MOTION.mobile;

          const wraps = gsap.utils.toArray<HTMLElement>('.strip-wrap', el);
          const items: HTMLElement[] = [];
          const active = new Set<HTMLElement>();

          wraps.forEach((wrap) => {
            const item = wrap.querySelector<HTMLElement>('.strip-item');
            const cap = wrap.querySelector<HTMLElement>('.strip-cap');
            if (!item) return;
            items.push(item);
            // Tilt toward the centre line: items on the right turn left, and vice versa.
            const side = wrap.dataset.side === 'left' ? 1 : -1;
            const setItem = gsap.quickSetter(item, 'css') as (vars: gsap.TweenVars) => void;
            const setCap = cap ? (gsap.quickSetter(cap, 'opacity') as (v: number) => void) : null;

            const render = (progress: number) => {
              const t = holdAtMiddle(progress);
              const c = Math.cos(t * Math.PI); // 1 entering, 0 held, -1 leaving
              const a = Math.abs(c);
              setItem({
                rotationX: Math.sign(c) * Math.pow(a, 0.8) * cfg.rotX,
                rotationY: side * c * cfg.rotY,
                rotationZ: side * c * cfg.rotZ,
                z: -Math.pow(a, 1.35) * cfg.depth,
                opacity: 1 - Math.pow(a, 2) * cfg.dim,
              });
              setCap?.(gsap.utils.clamp(0, 1, 1 - a * 2.4));
            };

            ScrollTrigger.create({
              trigger: wrap,
              start: 'top bottom',
              end: 'bottom top',
              onUpdate: (self) => render(self.progress),
              onRefresh: (self) => render(self.progress),
              onToggle: (self) => {
                item.style.willChange = self.isActive ? cfg.willChange : '';
                if (self.isActive) active.add(item);
                else {
                  active.delete(item);
                  item.style.filter = '';
                }
              },
            });
          });

          // Marquee: scrubs from off-screen right to off-screen left across the stage.
          if (marquee) {
            gsap.fromTo(
              marquee,
              { x: () => window.innerWidth },
              {
                x: () => -marquee.scrollWidth,
                ease: 'none',
                scrollTrigger: {
                  trigger: stage,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          // Velocity blur (Codrops Variation 4), desktop only and capped. The ticker
          // only runs while the stage is on screen and only touches visible items.
          let tick: (() => void) | null = null;
          if (desktop) {
            let target = 0;
            let blur = 0;
            let last = '';
            tick = () => {
              target *= 0.86;
              blur += (target - blur) * 0.3;
              const filter = blur < 0.08 ? '' : `blur(${blur.toFixed(2)}px)`;
              if (filter === last) return;
              last = filter;
              active.forEach((item) => (item.style.filter = filter));
            };
            const run = tick;
            ScrollTrigger.create({
              trigger: stage,
              start: 'top bottom',
              end: 'bottom top',
              onUpdate: (self) => {
                target = Math.max(target, Math.min(Math.abs(self.getVelocity()) / 5000, 1) * MAX_BLUR);
              },
              onToggle: (self) => {
                if (self.isActive) gsap.ticker.add(run);
                else {
                  gsap.ticker.remove(run);
                  target = blur = 0;
                  last = '';
                  active.forEach((item) => (item.style.filter = ''));
                }
              },
            });
          }

          return () => {
            if (tick) gsap.ticker.remove(tick);
            gsap.set(items, { clearProps: 'transform,opacity,filter,willChange' });
            gsap.set(gsap.utils.toArray<HTMLElement>('.strip-cap', el), { clearProps: 'opacity' });
          };
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-nav-theme="ink"
      aria-labelledby="shipped-title"
      className="strip theme-ink bg-paper text-ink"
    >
      <div className="page-x mx-auto max-w-page pt-24 md:pt-40">
        <div className="grid-page items-end gap-y-6">
          <SplitReveal as="h2" id="shipped-title" className="display col-span-4 text-display-xl md:col-span-8">
            Shipped
          </SplitReveal>
          <p className="meta col-span-4 md:text-right">
            <span className="num text-ink">{pad(stripImages.length)}</span> frames from{' '}
            <span className="num text-ink">{pad(productCount)}</span> products
            <br />
            2025–2026
          </p>
        </div>
        <div className="hairline mt-8 md:mt-12" />
      </div>

      <div className="strip-stage">
        <div className="strip-mark" aria-hidden="true">
          <div className="strip-mark__inner display">
            {marqueeNames.map((name, i) => (
              <span key={name} className="flex gap-[0.35em]">
                {i > 0 && <span className="strip-mark__sep">/</span>}
                <span>{name}</span>
              </span>
            ))}
          </div>
        </div>

        <ol className="strip-list">
          {stripImages.map((item, i) => {
            const shape = shapeOf(item.width, item.height);
            const wave = Math.sin(i * WAVE_STEP);
            const side = wave > 0.2 ? 'left' : 'right';
            const body = (
              <>
                <div className="strip-item">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes={SIZES[shape]}
                  />
                </div>
                <p className="strip-cap">
                  <span className="strip-cap__index">{pad(i + 1)}</span>
                  <span className="strip-cap__text">{item.caption}</span>
                  {item.href && (
                    <span className="strip-cap__arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </p>
              </>
            );
            return (
              <li
                key={item.src}
                className="strip-wrap"
                data-shape={shape}
                data-side={side}
                style={
                  {
                    '--wave': wave.toFixed(4),
                    '--ar': (item.width / item.height).toFixed(4),
                  } as CSSProperties
                }
              >
                {item.href ? (
                  <Link href={item.href} className="strip-frame">
                    {body}
                  </Link>
                ) : (
                  <div className="strip-frame">{body}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="page-x mx-auto max-w-page pb-20 md:pb-28">
        <div className="hairline flex items-baseline justify-between pt-5">
          <span className="meta">Screens from live products, demos, and plates</span>
          <Link href="/work" className="meta link-draw text-ink">
            All work →
          </Link>
        </div>
      </div>
    </section>
  );
}
