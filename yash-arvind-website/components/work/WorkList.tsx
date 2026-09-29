'use client';

import { useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Link, useTransitionRouter } from 'next-view-transitions';
import { gsap, useGSAP, HOVER_OK, MOTION_OK } from '@/components/motion/gsap';
import { getCaseStudy } from '@/content/caseStudies';
import { workMedia } from '@/content/media';
import { WorkCover } from './WorkCover';
import { COVER_ASPECT, morphName, outcomeLine, pad2, preloadHero, yearLabel } from './shared';
import '@/app/styles/work.css';

/** Cursor preview needs a fine pointer and motion allowed. Everything else gets plain links. */
const PREVIEW_OK = `${HOVER_OK} and ${MOTION_OK}`;
const SHOWN = 'inset(0% 0% 0% 0%)';
const BELOW = 'inset(100% 0% 0% 0%)';
const ABOVE = 'inset(0% 0% 100% 0%)';

const isPlainClick = (e: MouseEvent) =>
  e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

/**
 * The site's signature list. Rows are typographic links; on a fine pointer a
 * single fixed preview follows the cursor, wipes between covers as you move
 * down the list, and on click morphs into the case-study hero (View Transitions).
 */
export function WorkList({ slugs }: { slugs: string[] }) {
  const studies = slugs.flatMap((slug) => getCaseStudy(slug) ?? []);
  const listRef = useRef<HTMLOListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const live = useRef({ active: null as string | null, visible: false, hidden: true, locked: false });
  const router = useTransitionRouter();
  const [canPreview, setCanPreview] = useState(false);

  // Render the preview only where it can be used (keeps touch devices from loading covers).
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(PREVIEW_OK, () => {
      setCanPreview(true);
      return () => setCanPreview(false);
    });
    return () => mm.revert();
  });

  useGSAP(
    () => {
      const list = listRef.current;
      const preview = previewRef.current;
      if (!canPreview || !list || !preview) return;

      const mm = gsap.matchMedia();
      mm.add(PREVIEW_OK, () => {
        const s = live.current;
        const rows = gsap.utils.toArray<HTMLElement>('[data-row]', list);
        const layers = gsap.utils.toArray<HTMLElement>('[data-layer]', preview);
        const layer = (slug: string) => layers.find((l) => l.dataset.layer === slug);
        const order = (slug: string | null) => rows.findIndex((r) => r.dataset.row === slug);
        const warmed = new Set<string>();

        gsap.set(preview, { clipPath: BELOW, x: 0, y: 0, rotation: 0 });
        gsap.set(layers, { autoAlpha: 0 });

        const xTo = gsap.quickTo(preview, 'x', { duration: 0.65, ease: 'power3' });
        const yTo = gsap.quickTo(preview, 'y', { duration: 0.65, ease: 'power3' });
        const rTo = gsap.quickTo(preview, 'rotation', { duration: 0.6, ease: 'power3' });

        let px = 0;
        let py = 0;
        let lastX = 0;
        let z = 1;

        // Sit beside the cursor (flip left near the right edge), vertically centred, kept on screen.
        const target = () => {
          const w = preview.offsetWidth;
          const h = preview.offsetHeight;
          const gap = 32;
          const edge = 16;
          const x = px + gap + w > window.innerWidth - edge ? px - gap - w : px + gap;
          const y = gsap.utils.clamp(edge, Math.max(edge, window.innerHeight - h - edge), py - h / 2);
          return { x, y };
        };

        const follow = (e: PointerEvent) => {
          if (e.pointerType !== 'mouse' || s.locked) return;
          px = e.clientX;
          py = e.clientY;
          const { x, y } = target();
          xTo(x);
          yTo(y);
        };

        // Lean into horizontal movement; settles back to 0 when the cursor stops.
        const lean = () => {
          if (s.locked) return;
          const vx = px - lastX;
          lastX = px;
          rTo(s.visible ? gsap.utils.clamp(-7, 7, vx * 0.35) : 0);
        };

        const show = (slug: string) => {
          if (s.locked || (s.visible && s.active === slug)) return;
          const next = layer(slug);
          if (!next) return;
          const img = next.firstElementChild;
          const down = order(s.active) < order(slug);
          const entering = !s.visible;
          s.active = slug;
          s.visible = true;

          gsap.killTweensOf(next);
          gsap.set(next, { zIndex: ++z, autoAlpha: 1 });

          if (entering) {
            gsap.set(layers.filter((l) => l !== next), { autoAlpha: 0 });
            gsap.set(next, { clipPath: SHOWN });
            // Fully closed: jump to the cursor and open from the bottom edge.
            // Still closing: just reopen from wherever it is.
            if (s.hidden) {
              const { x, y } = target();
              gsap.set(preview, { x, y, rotation: 0, clipPath: BELOW });
              lastX = px;
              s.hidden = false;
            }
            gsap.to(preview, { clipPath: SHOWN, duration: 0.8, ease: 'expo.out', overwrite: 'auto' });
            gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.2, ease: 'expo.out', overwrite: true });
          } else {
            // Moving down the list wipes the next cover up from below; moving up wipes it down.
            gsap.fromTo(next, { clipPath: down ? BELOW : ABOVE }, { clipPath: SHOWN, duration: 0.7, ease: 'expo.out' });
            gsap.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1, ease: 'expo.out', overwrite: true });
          }

          // Warm the hero image so a click can morph onto a decoded frame.
          const media = workMedia[slug];
          if (media && !warmed.has(slug)) {
            warmed.add(slug);
            void preloadHero(media, 0);
          }
        };

        const hide = () => {
          if (s.locked || !s.visible) return;
          s.visible = false;
          s.active = null;
          gsap.to(preview, {
            clipPath: ABOVE,
            duration: 0.5,
            ease: 'power3.inOut',
            overwrite: 'auto',
            onComplete: () => {
              s.hidden = true;
            },
          });
        };

        const enters = rows.map((row) => {
          const onEnter = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            px = e.clientX;
            py = e.clientY;
            show(row.dataset.row!);
          };
          row.addEventListener('pointerenter', onEnter);
          return () => row.removeEventListener('pointerenter', onEnter);
        });
        list.addEventListener('pointermove', follow);
        list.addEventListener('pointerleave', hide);
        gsap.ticker.add(lean);

        return () => {
          enters.forEach((off) => off());
          list.removeEventListener('pointermove', follow);
          list.removeEventListener('pointerleave', hide);
          gsap.ticker.remove(lean);
          preview.style.removeProperty('view-transition-name');
          Object.assign(s, { active: null, visible: false, hidden: true, locked: false });
        };
      });
      return () => mm.revert();
    },
    { dependencies: [canPreview], revertOnUpdate: true }
  );

  // Plain left click on the row under the preview: name the preview and let the
  // browser morph it into the hero. Anything else falls through to the Link.
  const onRowClick = (e: MouseEvent<HTMLAnchorElement>, slug: string) => {
    const s = live.current;
    const preview = previewRef.current;
    if (!preview || !s.visible || s.active !== slug || s.locked) return;
    if (!isPlainClick(e) || !('startViewTransition' in document)) return;
    e.preventDefault();
    s.locked = true;

    // Finish any reveal in flight so the snapshot is a clean, full frame.
    gsap.getTweensOf(preview.querySelectorAll('[data-layer], [data-layer] > *')).forEach((t) => t.progress(1));
    gsap.getTweensOf(preview).forEach((t) => {
      if ('clipPath' in t.vars) t.progress(1);
    });

    const media = workMedia[slug];
    void (media ? preloadHero(media) : Promise.resolve()).then(() => {
      preview.style.setProperty('view-transition-name', morphName(slug));
      router.push(`/work/${slug}`, {
        // Both snapshots are taken by now; drop the name so it's never duplicated.
        onTransitionReady: () => preview.style.removeProperty('view-transition-name'),
      });
    });
  };

  return (
    <>
      <ol ref={listRef} className="work-list border-b border-rule">
        {studies.map((study, i) => {
          const year = yearLabel(study.period);
          const outcome = outcomeLine(study);
          return (
            <li key={study.slug} data-row={study.slug} className="work-row border-t border-rule">
              <Link
                href={`/work/${study.slug}`}
                onClick={(e) => onRowClick(e, study.slug)}
                className="group grid-page items-baseline gap-y-3 py-7 md:py-10"
              >
                <span aria-hidden="true" className="meta hidden transition-colors duration-300 group-hover:text-accent md:col-span-1 md:block">
                  {pad2(i + 1)}
                </span>
                <span className="display col-span-3 text-display-md transition-transform duration-700 ease-out-expo md:col-span-6 md:group-hover:translate-x-3">
                  {study.title}
                </span>
                <span aria-hidden="true" className="col-span-1 text-right text-xl md:hidden">
                  →
                </span>
                <span className="col-span-4 md:col-span-3">
                  <span className="block text-base leading-snug md:text-[1.0625rem]">{outcome}</span>
                  {study.role && <span className="meta mt-2 hidden md:block">{study.role}</span>}
                </span>
                <span className="meta col-span-4 md:hidden">
                  <span aria-hidden="true">{pad2(i + 1)} · </span>
                  {[study.org ?? study.role, year].filter(Boolean).join(' · ')}
                </span>
                <span className="meta hidden text-right md:col-span-1 md:block">{year}</span>
                <span
                  aria-hidden="true"
                  className="hidden text-right text-2xl leading-none transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-accent md:col-span-1 md:block"
                >
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {canPreview &&
        createPortal(
          <div
            ref={previewRef}
            aria-hidden="true"
            className="work-morph pointer-events-none fixed left-0 top-0 z-[60] w-[28vw] min-w-[18rem] overflow-hidden bg-paper-deep will-change-transform"
            style={{ aspectRatio: COVER_ASPECT, clipPath: BELOW }}
          >
            {studies.map((study) => {
              const media = workMedia[study.slug];
              return (
                <div
                  key={study.slug}
                  data-layer={study.slug}
                  className="invisible absolute inset-0 overflow-hidden"
                >
                  <div className="h-full w-full">
                    {media ? (
                      <Image
                        src={media.src}
                        alt=""
                        width={media.width}
                        height={media.height}
                        sizes="28vw"
                        loading="eager"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <WorkCover study={study} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}
