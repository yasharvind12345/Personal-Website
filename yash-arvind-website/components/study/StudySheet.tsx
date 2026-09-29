'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { gsap, SplitText, prefersReducedMotion } from '@/components/motion/gsap';
import { caseStudies, featuredSlugs } from '@/content/caseStudies';
import type { CaseStudy } from '@/content/types';
import { closeStudy, openStudy, useStudy } from './store';
import { StudyContent, HERO_SIZES, pad2 } from './StudyContent';
import { workMedia } from '@/content/media';
import {
  clipBelow,
  clipCss,
  clipNone,
  clipTo,
  coverMorph,
  isClipNone,
  rectOf,
  untransformedRect,
  visibleFraction,
  type Clip,
} from './geometry';
import '@/app/styles/study.css';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Reel order first, then anything not featured. */
const ORDER: CaseStudy[] = [
  ...featuredSlugs.map((s) => caseStudies.find((c) => c.slug === s)).filter((c): c is CaseStudy => !!c),
  ...caseStudies.filter((c) => !featuredSlugs.includes(c.slug)),
];

type Mode = 'closed' | 'opening' | 'open' | 'closing' | 'leaving';
type Intro = { kind: 'morph'; origin: HTMLElement } | { kind: 'wipe' } | { kind: 'swap' };

const MORPH = { duration: 0.9, ease: 'power3.inOut' };
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

/** The image the origin frame is showing, so the hero never starts blank. */
function frameImage(el: HTMLElement | null) {
  const img = el?.querySelector('img');
  return img?.currentSrc || img?.src || null;
}

/** Where to morph back to: the frame the study was opened from, or the reel frame for this slug. */
function findOrigin(slug: string, saved: { slug: string; el: HTMLElement } | null) {
  if (saved && saved.slug === slug && saved.el.isConnected) return saved.el;
  return document.querySelector<HTMLElement>(`[data-study-frame="${CSS.escape(slug)}"]`);
}

function radiusOf(el: HTMLElement) {
  return parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
}

/**
 * The case study sheet: a full-viewport dialog that opens over the page when
 * the store has a slug (reel click, deep link #work/<slug>, keyboard).
 *
 * Motion: with an origin element the reel frame's picture grows into the hero
 * (scale + translate + clip on the hero, measured from both rects) while the
 * sheet's clip grows from the frame's rect to the viewport; without one the
 * sheet wipes up from the bottom. Closing reverses to the frame if it is on
 * screen, else wipes down. Switching studies fades the article out and reveals
 * the next one at the top. Every transition starts from wherever the last one
 * was left, so rapid open/close/switch never jumps. Reduced motion: instant.
 *
 * The sheet scrolls natively (overflow auto, overscroll contained); the page
 * underneath is locked, made inert, and gets focus back on close.
 */
export function StudySheet() {
  const { slug, origin } = useStudy();
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [display, setDisplay] = useState<string | null>(null);
  const [underlay, setUnderlay] = useState<string | null>(null);
  const [sheetEl, setSheetEl] = useState<HTMLDivElement | null>(null);

  const sheetRef = useRef<HTMLDivElement | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  const displayRef = useRef<string | null>(null);
  const targetRef = useRef<string | null>(null);
  const modeRef = useRef<Mode>('closed');
  const introRef = useRef<Intro | null>(null);
  const originRef = useRef<{ slug: string; el: HTMLElement } | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const splitRef = useRef<SplitText | null>(null);
  // Tweened as numbers, written as clip-path each frame (see geometry.ts).
  const sheetClip = useRef<Clip>(clipNone());
  const heroClip = useRef<Clip>(clipNone());
  const pageRef = useRef<{ held: boolean; inerted: Element[]; returnTo: HTMLElement | null } | null>(null);

  useEffect(() => setHost(document.body), []);

  const setSheet = useCallback((el: HTMLDivElement | null) => {
    sheetRef.current = el;
    setSheetEl(el);
  }, []);

  const show = useCallback((next: string | null) => {
    displayRef.current = next;
    setDisplay(next);
  }, []);

  const paintSheet = useCallback(() => {
    const el = sheetRef.current;
    if (el) el.style.clipPath = isClipNone(sheetClip.current) ? '' : clipCss(sheetClip.current);
  }, []);

  const paintHero = useCallback(() => {
    const el = heroRef.current;
    if (el) el.style.clipPath = isClipNone(heroClip.current) ? '' : clipCss(heroClip.current);
  }, []);

  const stop = useCallback(() => {
    tlRef.current?.kill();
    tlRef.current = null;
    splitRef.current?.revert();
    splitRef.current = null;
  }, []);

  /** Everything that fades: the bar and every data-in block, plus the title. */
  const fadeables = useCallback(() => {
    const sheet = sheetRef.current;
    if (!sheet) return [];
    return gsap.utils.toArray<HTMLElement>(sheet.querySelectorAll('[data-in], #study-title'));
  }, []);

  /** Settle into the resting open state and drop the animation-only styles. */
  const settle = useCallback(() => {
    tlRef.current = null;
    modeRef.current = 'open';
    splitRef.current?.revert();
    splitRef.current = null;
    Object.assign(sheetClip.current, clipNone());
    Object.assign(heroClip.current, clipNone());
    paintSheet();
    paintHero();
    if (heroRef.current) gsap.set(heroRef.current, { clearProps: 'transform' });
    if (articleRef.current) gsap.set(articleRef.current, { clearProps: 'transform,opacity,visibility' });
    const inner = heroRef.current?.querySelector('[data-hero-inner]');
    if (inner) gsap.set(inner, { clearProps: 'transform' });
    gsap.set(fadeables(), { clearProps: 'transform,opacity,visibility' });
  }, [fadeables, paintHero, paintSheet]);

  const focusSheet = useCallback(() => {
    const sheet = sheetRef.current;
    if (sheet && !sheet.contains(document.activeElement)) sheet.focus({ preventScroll: true });
  }, []);

  /**
   * Take the page: make everything else inert and move focus into the sheet.
   * Released as soon as a close starts (not when it ends), so the page is
   * clickable again under the closing sheet and a quick second click reopens.
   */
  const holdPage = useCallback(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    sheet.style.pointerEvents = '';
    if (!pageRef.current?.held) {
      const active = document.activeElement;
      const returnTo =
        pageRef.current?.returnTo ??
        (active instanceof HTMLElement && active !== document.body && !sheet.contains(active) ? active : null);
      const inerted = Array.from(document.body.children).filter(
        (el) => el !== sheet && !el.hasAttribute('inert') && !(el instanceof HTMLScriptElement)
      );
      inerted.forEach((el) => el.setAttribute('inert', ''));
      pageRef.current = { held: true, inerted, returnTo };
    }
    focusSheet();
  }, [focusSheet]);

  const releasePage = useCallback(() => {
    const page = pageRef.current;
    if (!page?.held) return;
    page.held = false;
    page.inerted.forEach((el) => el.removeAttribute('inert'));
    if (sheetRef.current) sheetRef.current.style.pointerEvents = 'none';
    const back = [page.returnTo, originRef.current?.el].find((el) => el?.isConnected);
    if (back) back.focus({ preventScroll: true });
    else (document.activeElement as HTMLElement | null)?.blur?.();
  }, []);

  /** Title lines rise out of their masks; the other blocks follow in order. */
  const textIn = useCallback(
    (tl: gsap.core.Timeline, at: number, withBar = true) => {
      const title = titleRef.current;
      const blocks = gsap.utils.toArray<HTMLElement>(
        sheetRef.current?.querySelectorAll(withBar ? '[data-in]' : '[data-in]:not([data-bar])') ?? []
      );
      tl.fromTo(
        blocks,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.07 },
        at
      );
      if (title) {
        gsap.set(title, { autoAlpha: 1, y: 0 });
        const split = SplitText.create(title, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
        splitRef.current = split;
        tl.fromTo(
          split.lines,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 },
          at - 0.08
        );
      }
    },
    []
  );

  const runIntro = useCallback(
    (intro: Intro) => {
      const sheet = sheetRef.current;
      const hero = heroRef.current;
      const article = articleRef.current;
      if (!sheet || !article) return;
      stop();
      sheet.scrollTop = 0;
      holdPage();

      if (prefersReducedMotion()) {
        settle();
        return;
      }

      modeRef.current = 'opening';
      const S = rectOf(sheet);
      const tl = gsap.timeline({ onComplete: settle });
      tlRef.current = tl;
      gsap.set(article, { autoAlpha: 1, y: 0 });

      if (intro.kind === 'morph' && hero && intro.origin.isConnected) {
        const O = rectOf(intro.origin);
        const radius = radiusOf(intro.origin);
        gsap.set(hero, { transformOrigin: '0 0' });
        const H = untransformedRect(hero);
        const m = coverMorph(H, O, radius);
        Object.assign(sheetClip.current, clipTo(O, S, radius));
        Object.assign(heroClip.current, m.clip);
        paintSheet();
        paintHero();
        gsap.set(hero, { x: m.x, y: m.y, scale: m.scale });
        tl.to(sheetClip.current, { ...clipNone(), ...MORPH, onUpdate: paintSheet }, 0);
        tl.to(heroClip.current, { ...clipNone(), ...MORPH, onUpdate: paintHero }, 0);
        tl.to(hero, { x: 0, y: 0, scale: 1, ...MORPH }, 0);
        textIn(tl, 0.42);
      } else if (intro.kind === 'swap') {
        // Whatever state the sheet was left in, bring it to rest; the new cover rises into its frame.
        tl.to(sheetClip.current, { ...clipNone(), duration: 0.6, ease: 'power3.out', onUpdate: paintSheet }, 0);
        if (hero) {
          const H = untransformedRect(hero);
          gsap.set(hero, { x: 0, y: 0, scale: 1 });
          Object.assign(heroClip.current, { t: H.height, r: 0, b: 0, l: 0, rad: 0 });
          paintHero();
          tl.to(heroClip.current, { ...clipNone(), duration: 0.95, ease: 'power4.out', onUpdate: paintHero }, 0.06);
          const inner = hero.querySelector('[data-hero-inner]');
          if (inner) tl.fromTo(inner, { scale: 1.12 }, { scale: 1, duration: 1.3, ease: 'expo.out' }, 0.06);
        }
        textIn(tl, 0.05, false); // the bar stays put while the study changes under it
      } else {
        // Wipe up from the bottom edge, content trailing slightly behind the edge.
        Object.assign(sheetClip.current, clipBelow(S));
        paintSheet();
        tl.to(sheetClip.current, { ...clipNone(), duration: 0.85, ease: 'power4.inOut', onUpdate: paintSheet }, 0);
        tl.fromTo(article, { y: S.height * 0.14 }, { y: 0, duration: 1.1, ease: 'expo.inOut' }, 0);
        const inner = hero?.querySelector('[data-hero-inner]');
        if (inner) tl.fromTo(inner, { scale: 1.14 }, { scale: 1, duration: 1.4, ease: 'expo.out' }, 0.2);
        textIn(tl, 0.36);
      }
    },
    [holdPage, paintHero, paintSheet, settle, stop, textIn]
  );

  const finishClose = useCallback(() => {
    stop();
    modeRef.current = 'closed';
    originRef.current = null;
    Object.assign(sheetClip.current, clipNone());
    Object.assign(heroClip.current, clipNone());
    setUnderlay(null);
    show(null);
  }, [show, stop]);

  const runClose = useCallback(() => {
    const sheet = sheetRef.current;
    const hero = heroRef.current;
    const article = articleRef.current;
    const current = displayRef.current;
    stop();
    releasePage();
    if (!sheet || !article || !current || prefersReducedMotion()) {
      finishClose();
      return;
    }
    modeRef.current = 'closing';
    const S = rectOf(sheet);
    const tl = gsap.timeline({ onComplete: finishClose });
    tlRef.current = tl;

    const target = findOrigin(current, originRef.current);
    if (target && hero) {
      const O = rectOf(target);
      gsap.set(hero, { transformOrigin: '0 0' });
      const H = untransformedRect(hero);
      if (O.width > 0 && visibleFraction(O) > 0.5 && visibleFraction(H) > 0.2) {
        const radius = radiusOf(target);
        const m = coverMorph(H, O, radius);
        const dur = { duration: 0.85, ease: 'power4.inOut' };
        tl.to(fadeables(), { autoAlpha: 0, duration: 0.3, ease: 'power2.out' }, 0);
        tl.to(article, { autoAlpha: 1, y: 0, duration: 0.3 }, 0);
        tl.to(sheetClip.current, { ...clipTo(O, S, radius), ...dur, onUpdate: paintSheet }, 0.04);
        tl.to(heroClip.current, { ...m.clip, ...dur, onUpdate: paintHero }, 0.04);
        tl.to(hero, { x: m.x, y: m.y, scale: m.scale, ...dur }, 0.04);
        return;
      }
    }
    // Wipe down: the top edge falls away, the content sinks a little slower.
    tl.to(sheetClip.current, { ...clipBelow(S), duration: 0.75, ease: 'power3.inOut', onUpdate: paintSheet }, 0);
    tl.to(article, { y: S.height * 0.1, duration: 0.75, ease: 'power3.inOut' }, 0);
  }, [fadeables, finishClose, paintHero, paintSheet, releasePage, stop]);

  /** Closing was interrupted by reopening the same study: run back to rest from here. */
  const runReopen = useCallback(() => {
    const hero = heroRef.current;
    const article = articleRef.current;
    stop();
    holdPage();
    if (!article || prefersReducedMotion()) {
      settle();
      return;
    }
    modeRef.current = 'opening';
    const back = { duration: 0.7, ease: 'power3.out' };
    const tl = gsap.timeline({ onComplete: settle });
    tlRef.current = tl;
    tl.to(sheetClip.current, { ...clipNone(), ...back, onUpdate: paintSheet }, 0);
    tl.to(heroClip.current, { ...clipNone(), ...back, onUpdate: paintHero }, 0);
    if (hero) tl.to(hero, { x: 0, y: 0, scale: 1, ...back }, 0);
    tl.to(article, { autoAlpha: 1, y: 0, ...back }, 0);
    tl.to(fadeables(), { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.1);
  }, [fadeables, holdPage, paintHero, paintSheet, settle, stop]);

  /** Switching studies: fade the article out, then swap in whichever study is current by then. */
  const runLeave = useCallback(() => {
    const article = articleRef.current;
    stop();
    setUnderlay(null);
    const swap = () => {
      const t = targetRef.current;
      if (!t) return;
      if (t === displayRef.current) {
        runIntro({ kind: 'swap' });
      } else {
        introRef.current = { kind: 'swap' };
        show(t);
      }
    };
    if (!article || prefersReducedMotion()) {
      swap();
      return;
    }
    modeRef.current = 'leaving';
    const tl = gsap.timeline();
    tlRef.current = tl;
    tl.to(article, { autoAlpha: 0, y: -20, duration: 0.32, ease: 'power2.in' }, 0);
    // Switched mid-open or mid-close: keep the sheet opening while the old study fades.
    if (!isClipNone(sheetClip.current)) {
      tl.to(sheetClip.current, { ...clipNone(), duration: 0.7, ease: 'power3.out', onUpdate: paintSheet }, 0);
    }
    tl.call(swap, undefined, 0.32);
  }, [paintSheet, runIntro, show, stop]);

  // React to the store: open, close, reopen, or switch.
  useEffect(() => {
    targetRef.current = slug;
    if (!host) return;
    const shown = displayRef.current;
    const mode = modeRef.current;
    if (slug) {
      if (!shown) {
        originRef.current = origin ? { slug, el: origin } : null;
        introRef.current = origin && !prefersReducedMotion() ? { kind: 'morph', origin } : { kind: 'wipe' };
        setUnderlay(frameImage(origin));
        show(slug);
      } else if (shown === slug) {
        if (mode === 'closing') runReopen();
      } else {
        if (origin) originRef.current = { slug, el: origin };
        if (mode === 'closing') {
          // Another study picked while this one was closing: enter it from wherever the sheet is.
          stop();
          introRef.current = origin && !prefersReducedMotion() ? { kind: 'morph', origin } : { kind: 'swap' };
          setUnderlay(frameImage(origin));
          show(slug);
        } else if (mode !== 'leaving') {
          runLeave();
        }
      }
    } else if (shown && mode !== 'closing') {
      runClose();
    }
  }, [slug, origin, host, runClose, runLeave, runReopen, show, stop]);

  // While open: lock page scroll (keeping its scrollbar gutter so nothing
  // shifts) and hold the page (inert, focus in the sheet). On unmount, undo it.
  const isOpen = display !== null;
  useIsoLayoutEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const prev = { overflow: html.style.overflow, gutter: html.style.scrollbarGutter, title: document.title };
    const gutter = window.innerWidth - html.clientWidth;
    html.style.overflow = 'hidden';
    if (gutter > 0) html.style.scrollbarGutter = 'stable';
    html.setAttribute('data-study-open', '');
    holdPage();

    return () => {
      releasePage();
      pageRef.current = null;
      html.style.overflow = prev.overflow;
      html.style.scrollbarGutter = prev.gutter;
      html.removeAttribute('data-study-open');
      document.title = prev.title;
    };
  }, [isOpen, holdPage, releasePage]);

  // A newly rendered study runs whichever entrance was queued for it.
  useIsoLayoutEffect(() => {
    if (!display) return;
    const intro = introRef.current;
    introRef.current = null;
    if (intro) runIntro(intro);
  }, [display, runIntro]);

  const step = useCallback((dir: 1 | -1) => {
    const current = targetRef.current;
    if (!current) return;
    const i = ORDER.findIndex((s) => s.slug === current);
    openStudy(ORDER[(i + dir + ORDER.length) % ORDER.length].slug);
  }, []);

  // Keys: Esc closes, ← → switch studies, Tab stays inside the sheet.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      const sheet = sheetRef.current;
      if (!sheet || e.defaultPrevented) return;
      if (e.key === 'Tab') {
        if (!pageRef.current?.held) return; // closing: the page has focus back
        const items = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.getClientRects().length > 0
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        const at = document.activeElement;
        const outside = !at || !sheet.contains(at) || at === sheet;
        if (e.shiftKey && (at === first || outside)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (at === last || (outside && at !== sheet))) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey || !targetRef.current) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        closeStudy();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const t = e.target as Element | null;
        if (t?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        if (!e.repeat) step(e.key === 'ArrowRight' ? 1 : -1);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [isOpen, step]);

  // Reading progress and the bar title, from the sheet's own (native) scroll.
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!display || !sheet) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = sheet.scrollHeight - sheet.clientHeight;
      const p = max > 0 ? Math.min(1, sheet.scrollTop / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      const title = titleRef.current;
      const bar = sheet.querySelector<HTMLElement>('[data-bar]');
      const past = !!title && !!bar && title.getBoundingClientRect().bottom < bar.getBoundingClientRect().bottom;
      sheet.toggleAttribute('data-past-title', past);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    sheet.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      sheet.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [display]);

  const study = display ? ORDER.find((s) => s.slug === display) : undefined;

  useEffect(() => {
    if (study) document.title = `${study.title}, case study | Yash Arvind`;
  }, [study]);

  // Unmounting mid-animation (route change, HMR): kill the timeline.
  useEffect(() => stop, [stop]);

  if (!host || !study) return null;

  const index = ORDER.indexOf(study);
  const total = ORDER.length;
  const prev = ORDER[(index - 1 + total) % total];
  const next = ORDER[(index + 1) % total];

  return createPortal(
    <div
      ref={setSheet}
      role="dialog"
      aria-modal="true"
      aria-labelledby="study-title"
      tabIndex={-1}
      className="study-sheet fixed inset-0 z-[70] bg-paper text-ink"
    >
      <div data-in data-bar className="sticky top-0 z-10 bg-paper">
        <div className="page-x mx-auto flex h-[var(--bar-h)] max-w-page items-center justify-between gap-4">
          <div className="flex min-w-0 items-baseline gap-5">
            <p className="meta shrink-0 text-ink">
              <span className="hidden sm:inline">Case study </span>
              <span className="num">
                {pad2(index + 1)} / {pad2(total)}
              </span>
            </p>
            <p aria-hidden="true" className="study-bar-title hidden truncate text-sm md:block">
              {study.title}
              {study.subtitle && <span className="text-muted"> · {study.subtitle}</span>}
            </p>
          </div>
          <div className="-mr-2 flex shrink-0 items-center md:-mr-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={`Previous case study: ${prev.title}`}
              title="Previous (←)"
              className="grid h-11 w-11 place-items-center font-mono text-base transition-colors hover:text-accent"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={`Next case study: ${next.title}`}
              title="Next (→)"
              className="grid h-11 w-11 place-items-center font-mono text-base transition-colors hover:text-accent"
            >
              <span aria-hidden="true">→</span>
            </button>
            <span aria-hidden="true" className="mx-1.5 h-4 w-px bg-rule md:mx-3" />
            <button
              type="button"
              onClick={closeStudy}
              aria-label="Close case study"
              title="Close (Esc)"
              className="flex h-11 items-center gap-2.5 px-2 font-mono text-xs uppercase tracking-wider transition-colors hover:text-accent md:px-3"
            >
              <svg aria-hidden="true" viewBox="0 0 10 10" className="h-2.5 w-2.5 stroke-current" strokeWidth="1.4">
                <path d="M1 1l8 8M9 1l-8 8" />
              </svg>
              Close
            </button>
          </div>
        </div>
        <div aria-hidden="true" className="relative h-px bg-rule">
          <span
            ref={progressRef}
            className="absolute inset-0 origin-left bg-ink"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      <div ref={articleRef}>
        <StudyContent
          key={study.slug}
          study={study}
          index={index}
          total={total}
          next={next}
          nextIndex={(index + 1) % total}
          onNext={() => step(1)}
          scroller={sheetEl}
          heroRef={heroRef}
          titleRef={titleRef}
          underlay={underlay}
        />
      </div>

      {/* Warm the neighbours' covers at hero size so ← → reveal a loaded image. */}
      <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0">
        {[prev, next].map((s) => {
          const media = workMedia[s.slug];
          return media ? (
            <div key={s.slug} className="relative h-px w-px">
              <Image src={media.src} alt="" fill loading="eager" sizes={HERO_SIZES} />
            </div>
          ) : null;
        })}
      </div>
    </div>,
    host
  );
}
