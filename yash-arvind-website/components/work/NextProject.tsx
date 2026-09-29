'use client';

import { useRef, type MouseEvent } from 'react';
import Image from 'next/image';
import { Link, useTransitionRouter } from 'next-view-transitions';
import { HOVER_OK, MOTION_OK } from '@/components/motion/gsap';
import type { CaseStudy } from '@/content/types';
import { workMedia } from '@/content/media';
import { WorkCover } from './WorkCover';
import { COVER_ASPECT, morphName, outcomeLine, pad2, preloadHero } from './shared';

/**
 * Closing link to the next case study. On a fine pointer the cover is revealed
 * on hover (CSS, work.css) and a click morphs it into that study's hero.
 */
export function NextProject({ study, index, total }: { study: CaseStudy; index: number; total: number }) {
  const router = useTransitionRouter();
  const mediaRef = useRef<HTMLDivElement>(null);
  const media = workMedia[study.slug];
  const href = `/work/${study.slug}`;

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = mediaRef.current;
    const plain = e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
    if (!el || !plain || !('startViewTransition' in document)) return;
    if (!window.matchMedia(`${HOVER_OK} and ${MOTION_OK}`).matches) return;
    e.preventDefault();
    void (media ? preloadHero(media) : Promise.resolve()).then(() => {
      el.style.setProperty('view-transition-name', morphName(study.slug));
      router.push(href, { onTransitionReady: () => el.style.removeProperty('view-transition-name') });
    });
  };

  return (
    <section aria-label="Next project" className="border-t border-rule">
      <Link
        href={href}
        onClick={onClick}
        className="next-link group page-x mx-auto grid-page max-w-page items-end gap-y-8 py-16 md:py-28"
      >
        <div className="col-span-4 md:col-span-7">
          <p className="meta flex justify-between">
            <span>Next project</span>
            <span aria-hidden="true">
              {pad2(index + 1)} / {pad2(total)}
            </span>
          </p>
          <p className="display mt-8 flex items-baseline gap-[0.2em] text-display-xl">
            {study.title}
            <span
              aria-hidden="true"
              className="font-sans text-[0.6em] font-normal transition-[transform,color] duration-700 ease-out-expo group-hover:translate-x-4 group-hover:text-accent"
            >
              →
            </span>
          </p>
          <p className="mt-6 max-w-md text-lg leading-snug text-muted">{outcomeLine(study)}</p>
        </div>
        <div
          ref={mediaRef}
          aria-hidden="true"
          className="next-media work-morph relative col-span-4 block overflow-hidden bg-paper-deep md:col-span-5"
          style={{ aspectRatio: COVER_ASPECT }}
        >
          <div className="h-full w-full">
            {media ? (
              <Image
                src={media.src}
                alt=""
                width={media.width}
                height={media.height}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="h-full w-full object-cover"
              />
            ) : (
              <WorkCover study={study} />
            )}
          </div>
        </div>
      </Link>
    </section>
  );
}
