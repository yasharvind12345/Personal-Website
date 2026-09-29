'use client';

import { useEffect, useState, type CSSProperties, type ReactNode, type Ref } from 'react';
import Image from 'next/image';
import type { CaseStudy } from '@/content/types';
import { gallery, workMedia, type WorkImage } from '@/content/media';
import { prefersReducedMotion } from '@/components/motion/gsap';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { YouTubeLite } from './YouTubeLite';

export const pad2 = (n: number) => String(n).padStart(2, '0');

interface StudyContentProps {
  study: CaseStudy;
  index: number;
  total: number;
  next: CaseStudy;
  nextIndex: number;
  onNext: () => void;
  /** The sheet (scroll container), for the contents list. */
  scroller: HTMLElement | null;
  heroRef: Ref<HTMLDivElement>;
  titleRef: Ref<HTMLHeadingElement>;
  /** Image already on screen in the reel frame, shown under the hero until the hero loads. */
  underlay: string | null;
}

interface BodySection {
  id: string;
  title: string;
  content: ReactNode;
}

export const HERO_SIZES = '(min-width: 1440px) 1360px, 94vw';

/**
 * The case study itself, in the editorial layout of the old /work/<slug> page:
 * header, cover, facts, summary and metrics, media, then Problem → What I did →
 * Key decisions → Impact → What's next, and the next study.
 * `data-in` marks the blocks the sheet staggers in and fades out.
 */
export function StudyContent({
  study,
  index,
  total,
  next,
  nextIndex,
  onNext,
  scroller,
  heroRef,
  titleRef,
  underlay,
}: StudyContentProps) {
  const media = workMedia[study.slug];
  const figures = (gallery[study.slug] ?? []).filter((f) => f.src !== media?.src);
  const metaLine = [study.org, study.role, study.period].filter(Boolean).join(' · ');
  const longTitle = study.title.length > 10;

  const team = study.team
    ? [...study.team.members, ...study.team.advisors.map((a) => `${a}, advisor`)]
    : study.collaborators;
  const facts = [
    study.role && { term: 'Role', detail: [study.role] },
    team?.length && { term: study.team ? 'Team' : 'Worked with', detail: team },
    study.period && { term: 'Period', detail: [study.period] },
    study.stack.length && { term: 'Stack', detail: study.stack },
  ].filter(Boolean) as { term: string; detail: string[] }[];

  const sections: BodySection[] = [];
  if (study.problem.length) {
    sections.push({ id: 'problem', title: 'The problem', content: <Paragraphs items={study.problem} /> });
  }
  if (study.whatIDid.points.length) {
    sections.push({
      id: 'what-i-did',
      title: 'What I did',
      content: (
        <>
          {study.whatIDid.intro && <p className="mb-8 max-w-prose text-xl leading-snug md:text-2xl">{study.whatIDid.intro}</p>}
          <RuledList items={study.whatIDid.points} />
          {figures.length > 0 && <Gallery figures={figures} />}
        </>
      ),
    });
  }
  if (study.decisions.length) {
    sections.push({
      id: 'decisions',
      title: 'Key decisions',
      content: (
        <ol className="max-w-2xl border-b border-rule">
          {study.decisions.map((d, i) => (
            <li key={d.title} className="grid grid-cols-[2.75rem_1fr] border-t border-rule py-7 md:grid-cols-[5rem_1fr] md:py-9">
              <span aria-hidden="true" className="num text-xl leading-none text-muted md:text-3xl">
                {pad2(i + 1)}
              </span>
              <div>
                <h3 className="display text-xl leading-tight md:text-2xl">{d.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    });
  }
  if (study.impact.length || study.reviews?.length) {
    sections.push({
      id: 'impact',
      title: 'Impact',
      content: (
        <>
          {study.impact.length > 0 && <RuledList items={study.impact} />}
          {study.reviews && study.reviews.length > 0 && (
            <div className="mt-12 max-w-3xl md:mt-16">
              <p className="meta mb-2">From the App Store</p>
              {study.reviews.map((review) => (
                <figure key={review.user} className="border-b border-rule py-8 last:border-b-0">
                  <blockquote className="font-serif text-[clamp(1.5rem,2.4vw,2.125rem)] italic leading-[1.2] tracking-[-0.01em]">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <figcaption className="meta mt-4">
                    {review.user} · &ldquo;{review.title}&rdquo; · {review.date}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </>
      ),
    });
  }
  if (study.next.length) {
    sections.push({ id: 'next', title: 'What’s next', content: <RuledList items={study.next} /> });
  }

  return (
    <article>
      <header className="page-x mx-auto max-w-page pt-6 md:pt-10">
        <div
          data-in
          className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-rule pb-3"
        >
          {metaLine && <p className="meta">{metaLine}</p>}
          {study.award && (
            <p className="meta text-ink">
              <span className="text-accent">Award</span> · {study.award}
            </p>
          )}
        </div>

        <h1
          id="study-title"
          ref={titleRef}
          className={`study-title display mt-8 !leading-[1.02] md:mt-12 ${longTitle ? 'text-display-lg' : 'text-display-xl'}`}
        >
          {study.title}
        </h1>

        <div data-in className="grid-page mt-5 gap-y-5 md:mt-8">
          {study.subtitle && (
            <p className="display col-span-4 text-display-sm text-muted md:col-span-6">{study.subtitle}</p>
          )}
          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <p className="text-lg leading-snug md:text-xl">{study.tagline}</p>
            {study.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {study.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn">
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <Hero study={study} media={media} heroRef={heroRef} underlay={underlay} />
      </header>

      <div data-in>
        {facts.length > 0 && (
          <div className="page-x mx-auto max-w-page">
            <dl
              className="grid grid-cols-2 border-b border-rule md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
              style={{ '--cols': facts.length } as CSSProperties}
            >
              {facts.map(({ term, detail }, i) => (
                <div
                  key={term}
                  className={`py-5 pr-4 md:py-6 ${i % 2 ? 'border-l border-rule pl-4' : ''} ${
                    i > 1 ? 'border-t border-rule md:border-t-0' : ''
                  } ${i > 0 ? 'md:border-l md:pl-5' : ''}`}
                >
                  <dt className="meta">{term}</dt>
                  <dd className="mt-3 text-sm leading-relaxed">
                    {detail.length > 1 ? (
                      <ul>
                        {detail.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    ) : (
                      detail[0]
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <section aria-labelledby="study-summary" className="page-x mx-auto max-w-page py-16 md:py-28">
          <div className="grid-page gap-y-5">
            <h2 id="study-summary" className="meta col-span-4 md:col-span-3">
              In short
            </h2>
            <p className="col-span-4 text-[clamp(1.4rem,2.9vw,2.75rem)] leading-[1.16] tracking-[-0.02em] md:col-span-9">
              {study.summary}
            </p>
          </div>

          {study.metrics.length > 0 && (
            <dl
              className="mt-14 grid grid-cols-2 border-y border-rule md:mt-24 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
              style={{ '--cols': study.metrics.length } as CSSProperties}
            >
              {study.metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className={`flex flex-col-reverse justify-end gap-4 py-6 pr-4 md:py-10 ${
                    i % 2 ? 'border-l border-rule pl-4' : ''
                  } ${i > 1 ? 'border-t border-rule md:border-t-0' : ''} ${i > 0 ? 'md:border-l md:pl-6' : ''} ${
                    // An odd last metric spans the row on mobile rather than leaving a hole.
                    i === study.metrics.length - 1 && i % 2 === 0 && i > 0 ? 'col-span-2 md:col-span-1' : ''
                  }`}
                >
                  <dt className="meta">{metric.label}</dt>
                  <dd className="num whitespace-nowrap text-[clamp(1.75rem,5.4vw,5.25rem)] leading-[0.9]">{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        {(study.video || study.youtube) && (
          <section aria-label="Demo" className="page-x mx-auto max-w-page pb-16 md:pb-28">
            {study.video && <VideoPlayer src={study.video.src} poster={study.video.poster} title={study.video.title} />}
            {study.youtube && <YouTubeLite id={study.youtube.id} title={study.youtube.title} />}
          </section>
        )}

        {sections.length > 0 && (
          <div className="page-x mx-auto grid-page max-w-page pb-12 md:pb-20">
            <aside className="hidden md:col-span-3 md:block">
              <Contents sections={sections} scroller={scroller} />
            </aside>
            <div className="col-span-4 md:col-span-8 md:col-start-5">
              {sections.map((section, i) => (
                <section
                  key={section.id}
                  id={`study-${section.id}`}
                  aria-labelledby={`study-${section.id}-title`}
                  className="study-section border-t border-rule pb-14 pt-5 md:pb-24 md:pt-6"
                >
                  <p aria-hidden="true" className="meta">
                    {pad2(i + 1)}
                  </p>
                  <h2 id={`study-${section.id}-title`} className="display mb-7 mt-3 text-display-md md:mb-12 md:mt-4">
                    {section.title}
                  </h2>
                  {section.content}
                </section>
              ))}
            </div>
          </div>
        )}

        <NextStudy study={next} index={nextIndex} total={total} onNext={onNext} current={index} />
      </div>
    </article>
  );
}

function Hero({
  study,
  media,
  heroRef,
  underlay,
}: {
  study: CaseStudy;
  media?: WorkImage;
  heroRef: Ref<HTMLDivElement>;
  underlay: string | null;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      ref={heroRef}
      data-hero
      className="relative mt-8 aspect-[16/10] overflow-hidden bg-paper-deep md:mt-12"
      style={{ transformOrigin: '0 0' }}
    >
      <div data-hero-inner className="absolute inset-0">
        {underlay && (
          // The frame's own, already-decoded image: fills the hero until the full-size one arrives.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={underlay} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        )}
        {media && !failed ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority
            sizes={HERO_SIZES}
            className="object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <TypeCover study={study} />
        )}
      </div>
    </div>
  );
}

/** Typographic stand-in when a study's cover is missing. */
function TypeCover({ study }: { study: CaseStudy }) {
  const metric = study.metrics[0];
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-paper-deep text-ink [container-type:inline-size]">
      <div className="flex h-full flex-col justify-between p-[4.5cqw]">
        <p className="font-mono text-[max(0.625rem,1.5cqw)] uppercase tracking-[0.08em] text-muted">
          {study.org ?? study.subtitle}
        </p>
        {metric && (
          <div>
            <p className="num text-[17cqw] leading-[0.85]">{metric.value}</p>
            <p className="mt-[2cqw] font-mono text-[max(0.625rem,1.5cqw)] uppercase tracking-[0.08em] text-muted">
              {metric.label}
            </p>
          </div>
        )}
        <p className="display border-t border-ink pt-[2cqw] text-[5.5cqw] leading-none tracking-[-0.03em]">
          {study.title}
        </p>
      </div>
    </div>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="max-w-prose space-y-5">
      {items.map((p, i) => (
        <p key={p} className={i === 0 ? 'text-xl leading-snug md:text-2xl' : 'text-lg leading-relaxed'}>
          {p}
        </p>
      ))}
    </div>
  );
}

function RuledList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-prose border-t border-rule">
      {items.map((item) => (
        <li key={item} className="border-b border-rule py-4 text-base leading-relaxed md:text-lg">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Screenshots: the first at full column width, the rest in pairs. Never the cover. */
function Gallery({ figures }: { figures: WorkImage[] }) {
  return (
    <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-16">
      {figures.map((f, i) => (
        <figure key={f.src} className={i === 0 ? 'sm:col-span-2' : ''}>
          <Image
            src={f.src}
            alt={f.alt}
            width={f.width}
            height={f.height}
            sizes={i === 0 ? '(min-width: 768px) 60vw, 100vw' : '(min-width: 768px) 30vw, (min-width: 640px) 50vw, 100vw'}
            className="h-auto w-full bg-paper-deep"
          />
          {f.caption && (
            <figcaption className="meta mt-3 flex gap-3">
              <span className="shrink-0 text-ink">Fig. {pad2(i + 1)}</span>
              <span>{f.caption}</span>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

/**
 * Sticky contents for the body. Tracks the section under the upper third of
 * the sheet; buttons (not #anchors, which would change the URL hash and close
 * the study) scroll the sheet natively.
 */
function Contents({ sections, scroller }: { sections: BodySection[]; scroller: HTMLElement | null }) {
  const [active, setActive] = useState(sections[0]?.id);
  const ids = sections.map((s) => s.id).join(',');

  useEffect(() => {
    if (!scroller) return;
    const list = ids.split(',');
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = scroller.getBoundingClientRect().top + scroller.clientHeight * 0.35;
      let current = list[0];
      for (const id of list) {
        const el = document.getElementById(`study-${id}`);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [scroller, ids]);

  const jump = (id: string) => {
    const el = document.getElementById(`study-${id}`);
    if (!scroller || !el) return;
    const bar = scroller.querySelector<HTMLElement>('[data-bar]')?.offsetHeight ?? 64;
    const top = scroller.scrollTop + el.getBoundingClientRect().top - scroller.getBoundingClientRect().top - bar - 16;
    scroller.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <nav aria-label="Sections" className="sticky top-[calc(var(--bar-h)+2rem)]">
      <p className="meta mb-5">Contents</p>
      <ol className="space-y-1 border-l border-rule pl-5">
        {sections.map(({ id, title }, i) => {
          const current = id === active;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => jump(id)}
                aria-current={current ? 'location' : undefined}
                className={`flex items-baseline gap-3 py-1 text-left text-sm transition-colors duration-300 hover:text-ink ${
                  current ? 'text-ink' : 'text-muted'
                }`}
              >
                <span className={`num text-xs ${current ? 'text-accent' : ''}`}>{pad2(i + 1)}</span>
                {title}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function NextStudy({
  study,
  index,
  total,
  current,
  onNext,
}: {
  study: CaseStudy;
  index: number;
  total: number;
  current: number;
  onNext: () => void;
}) {
  const media = workMedia[study.slug];
  const wraps = index < current;
  const words = study.title.split(' ');
  const titleTail = words.pop();
  const titleHead = words.join(' ');
  return (
    <section aria-label="Next case study" className="page-x mx-auto max-w-page pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <button
        type="button"
        onClick={onNext}
        aria-label={`Next: ${study.title}, case study ${index + 1} of ${total}`}
        className="study-next group block w-full border-t border-ink pb-10 pt-5 text-left md:pb-16 md:pt-6"
      >
        <span className="meta flex justify-between">
          <span>{wraps ? 'Back to the first case study' : 'Next case study'}</span>
          <span className="num">
            {pad2(index + 1)} / {pad2(total)}
          </span>
        </span>
        <span className="mt-8 grid grid-cols-1 items-end gap-8 md:mt-12 md:grid-cols-12 md:gap-6">
          <span className="block md:col-span-8">
            <span className="display block text-display-lg transition-colors duration-300 group-hover:text-accent">
              <span className="font-serif font-normal italic tracking-normal">Next:</span>{' '}
              {/* Only the last word and the arrow are kept together, so long titles still wrap. */}
              {titleHead && `${titleHead} `}
              <span className="whitespace-nowrap">
                {titleTail}
                <span aria-hidden="true" className="study-next-arrow ml-[0.2em] font-sans font-normal">
                  →
                </span>
              </span>
            </span>
            <span className="mt-5 block max-w-prose text-lg leading-snug text-muted">{study.tagline}</span>
          </span>
          {media && (
            <span className="study-next-media relative block aspect-[16/10] overflow-hidden bg-paper-deep md:col-span-4">
              <span className="absolute inset-0 block">
                <Image src={media.src} alt="" fill sizes="30vw" className="object-cover" />
              </span>
            </span>
          )}
        </span>
      </button>
    </section>
  );
}
