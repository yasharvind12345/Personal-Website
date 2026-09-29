'use client';

import { useRef, type CSSProperties, type MouseEvent } from 'react';
import Image from 'next/image';

import { useGSAP } from '@/components/motion/gsap';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { featuredSlugs, getCaseStudy } from '@/content/caseStudies';
import { workMedia } from '@/content/media';
import { openStudy, studyHref } from '@/components/study/store';
import { setupReel } from './reelEngine';
import '@/app/styles/reel.css';

/**
 * The work reel: five projects, one cover each.
 *
 * Desktop (motion allowed): a sticky two-column composition. The index on the
 * left names every project; the covers on the right pass through 3D space as
 * you scroll (see reelEngine.ts) and the one at the centre sets the active
 * row, the rolling counter, and the progress rule.
 * Mobile: a vertical run of project blocks whose covers settle as they enter.
 * No JS or reduced motion: the same blocks as a static list (reel.css).
 */

interface Project {
  slug: string;
  title: string;
  outcome: string;
  org?: string;
  role?: string;
  period?: string;
  cover: (typeof workMedia)[string];
}

const projects: Project[] = featuredSlugs.flatMap((slug) => {
  const study = getCaseStudy(slug);
  const cover = workMedia[slug];
  if (!study || !cover) return [];
  return [
    {
      slug,
      title: study.title,
      outcome: study.outcome ?? study.tagline,
      org: study.org,
      role: study.role,
      period: study.period,
      cover,
    },
  ];
});

const pad = (n: number) => String(n).padStart(2, '0');
const credit = (p: Project) => [p.org, p.role].filter(Boolean).join(' · ');

/** Desktop frames are ~7/12 of the page; mobile and static blocks are full width. */
const SIZES = '(min-width: 768px) min(52vw, 820px), 92vw';

/** Plain left click opens the study in place; modified clicks keep the link's default. */
function interceptClick(e: MouseEvent<HTMLAnchorElement>, slug: string, origin: () => HTMLElement | null) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  openStudy(slug, origin());
}

/** A frame's image wrapper, which the case-study sheet morphs from. */
function frameMedia(root: HTMLElement | null, slug: string) {
  return root?.querySelector<HTMLElement>(`.reel-item[data-slug="${slug}"] .reel-media`) ?? null;
}

function onScreen(el: HTMLElement | null) {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
}

export function WorkReel() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      return setupReel(el);
    },
    { scope: root }
  );

  const total = pad(projects.length);

  return (
    <section
      ref={root}
      id="work"
      data-nav-theme="ink"
      aria-labelledby="work-title"
      className="reel theme-ink bg-paper text-ink"
      style={{ '--n': projects.length } as CSSProperties}
    >
      <div className="page-x mx-auto max-w-page pt-24 md:pt-36">
        <p className="meta flex items-baseline gap-3">
          <span className="text-ink">(01)</span>
          <span>Work</span>
        </p>
        <div className="grid-page mt-6 items-end gap-y-6 md:mt-8">
          <SplitReveal as="h2" id="work-title" className="display col-span-4 text-display-xl md:col-span-9">
            Selected <span className="font-serif font-normal italic">work</span>
          </SplitReveal>
          <p className="meta col-span-4 md:col-span-3 md:text-right">
            <span className="num text-ink">{total}</span> projects, one frame each
            <br />
            2025–2026
          </p>
        </div>
        <div className="hairline mt-8 md:mt-12" />
      </div>

      <div className="reel-track">
        <div className="reel-view page-x mx-auto max-w-page">
          {/* Desktop reel only (hidden in the static and mobile layouts). */}
          <div className="reel-aside">
            <div className="reel-counter" aria-hidden="true">
              <span className="reel-counter__now display">
                <span>0</span>
                <span className="reel-counter__mask">
                  <span className="reel-counter__roll">
                    {projects.map((p, i) => (
                      <span key={p.slug}>{i + 1}</span>
                    ))}
                  </span>
                </span>
              </span>
              <span className="reel-counter__of num">/ {total}</span>
            </div>

            <div className="reel-progress" aria-hidden="true">
              <span className="reel-progress__fill" />
              {projects.map((p, i) => (
                <span
                  key={p.slug}
                  className="reel-progress__tick"
                  style={{ left: `${(i / Math.max(projects.length - 1, 1)) * 100}%` }}
                />
              ))}
            </div>

            <ol className="reel-index" aria-label="Projects">
              {projects.map((p, i) => (
                <li key={p.slug}>
                  <a
                    href={studyHref(p.slug)}
                    className="reel-row"
                    data-index={i}
                    data-active={i === 0 ? '' : undefined}
                    onClick={(e) =>
                      interceptClick(e, p.slug, () => {
                        const media = frameMedia(root.current, p.slug);
                        return onScreen(media) ? media : e.currentTarget;
                      })
                    }
                  >
                    <span className="reel-row__index num">{pad(i + 1)}</span>
                    <span className="reel-row__body">
                      <span className="reel-row__head">
                        <span className="reel-row__title display">{p.title}</span>
                        {p.period && <span className="reel-row__period meta">{p.period}</span>}
                      </span>
                      <span className="reel-row__outcome">{p.outcome}</span>
                      {credit(p) && <span className="reel-row__credit meta">{credit(p)}</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <ol className="reel-list" aria-label="Project covers">
            {projects.map((p, i) => (
              <li
                key={p.slug}
                className="reel-item"
                data-slug={p.slug}
                data-index={i}
                style={{ '--i': i } as CSSProperties}
              >
                <a
                  href={studyHref(p.slug)}
                  className="reel-frame"
                  aria-label={`${p.title}: read the case study`}
                  onClick={(e) =>
                    interceptClick(e, p.slug, () => e.currentTarget.querySelector<HTMLElement>('.reel-media'))
                  }
                >
                  <span className="reel-media" data-kind={p.cover.kind}>
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      width={p.cover.width}
                      height={p.cover.height}
                      sizes={SIZES}
                    />
                  </span>
                  <span className="reel-cap">
                    <span className="reel-cap__index num">{pad(i + 1)}</span>
                    <span className="reel-cap__body">
                      <span className="reel-cap__title display">{p.title}</span>
                      <span className="reel-cap__outcome">{p.outcome}</span>
                      <span className="reel-cap__meta meta">
                        {[credit(p), p.period].filter(Boolean).join(' · ')}
                      </span>
                    </span>
                    <span className="reel-cap__open meta" aria-hidden="true">
                      Read the case study →
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="reel-foot page-x mx-auto max-w-page">
        <div className="hairline flex items-baseline justify-between gap-6 pt-5">
          <span className="meta">Each opens in place as a case study</span>
          <span className="meta hidden md:inline">Scroll to advance · Enter to open</span>
        </div>
      </div>

      <span className="reel-cursor meta" aria-hidden="true">
        Read the case study
      </span>
    </section>
  );
}
