import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import type { CaseStudy } from '@/content/types';
import { workMedia } from '@/content/media';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { CaseStudyToc } from './CaseStudyToc';
import { NextProject } from './NextProject';
import { WorkCover } from './WorkCover';
import { CoverImage } from './CoverImage';
import { COVER_ASPECT, HERO_SIZES, morphName, pad2 } from './shared';
import '@/app/styles/work.css';

interface CaseStudyLayoutProps {
  study: CaseStudy;
  /** Position in caseStudies, for the "02 / 04" markers. */
  index: number;
  total: number;
  nextStudy?: CaseStudy;
}

interface BodySection {
  id: string;
  title: string;
  content: ReactNode;
}

/** Hairline-separated list for What I did / Impact / What's next. */
function RuledList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-prose border-t border-rule">
      {items.map((item) => (
        <li key={item} className="border-b border-rule py-4 text-lg leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="max-w-prose space-y-5">
      {items.map((p, i) => (
        <p key={p} className={i === 0 ? 'text-xl leading-relaxed md:text-2xl md:leading-snug' : 'text-lg leading-relaxed'}>
          {p}
        </p>
      ))}
    </div>
  );
}

export function CaseStudyLayout({ study, index, total, nextStudy }: CaseStudyLayoutProps) {
  const media = workMedia[study.slug];
  const nextIndex = (index + 1) % total;
  const longTitle = study.title.length > 10;

  // Header strip: where this sits, then org · role · period.
  const metaLine = [study.org, study.role, study.period].filter(Boolean).join(' · ');

  const team = study.team
    ? [...study.team.members, ...study.team.advisors.map((a) => `${a}, advisor`)]
    : study.collaborators;
  const facts = [
    study.role && { term: 'Role', detail: [study.role] },
    team?.length && { term: study.team ? 'Team' : 'Worked with', detail: team },
    study.period && { term: 'Period', detail: [study.period] },
    study.stack.length && { term: 'Stack', detail: study.stack },
  ].filter(Boolean) as { term: string; detail: string[] }[];

  // Problem → What I did → Key decisions → Impact → What's next; empty sections are skipped.
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
          {study.whatIDid.intro && (
            <p className="mb-8 max-w-prose text-xl leading-relaxed md:text-2xl md:leading-snug">{study.whatIDid.intro}</p>
          )}
          <RuledList items={study.whatIDid.points} />
          {study.images && study.images.length > 0 && (
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {study.images.map((image, i) => (
                <figure key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="h-auto w-full bg-ink"
                  />
                  <figcaption className="meta mt-3 flex gap-3">
                    <span className="text-ink">Fig. {pad2(i + 1)}</span>
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
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
          {study.decisions.map((decision, i) => (
            <li key={decision.title} className="grid grid-cols-[3rem_1fr] border-t border-rule py-8 md:grid-cols-[5rem_1fr]">
              <span aria-hidden="true" className="num text-2xl leading-none text-muted md:text-3xl">
                {pad2(i + 1)}
              </span>
              <div>
                <h3 className="display text-xl leading-tight md:text-2xl">{decision.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted">{decision.body}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    });
  }
  if (study.impact.length) {
    sections.push({
      id: 'impact',
      title: 'Impact',
      content: (
        <>
          <RuledList items={study.impact} />
          {study.reviews && study.reviews.length > 0 && (
            <div className="mt-14 max-w-3xl">
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
      {/* Hero */}
      <header className="page-x mx-auto max-w-page pt-8 md:pt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-rule pb-4">
          <nav aria-label="Breadcrumb" className="meta">
            <Link href="/work" className="link-draw hover:text-accent">
              Work
            </Link>
            <span aria-hidden="true"> / </span>
            <span>Case study {pad2(index + 1)}</span>
          </nav>
          {metaLine && <p className="meta">{metaLine}</p>}
        </div>
        {study.award && (
          <p className="meta mt-4 text-ink">
            <span className="text-accent">Award</span> · {study.award}
          </p>
        )}

        <SplitReveal
          as="h1"
          immediate
          // Line masks clip at the line box, so leave room for descenders.
          className={`display mt-10 !leading-[1.04] md:mt-16 ${longTitle ? 'text-display-lg' : 'text-display-xl'}`}
        >
          {study.title}
        </SplitReveal>

        <div className="grid-page mt-8 gap-y-6 md:mt-12">
          {study.subtitle && (
            <p className="display col-span-4 text-display-sm text-muted md:col-span-6">{study.subtitle}</p>
          )}
          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <p className="text-lg leading-snug md:text-xl">{study.tagline}</p>
            {study.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {study.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn">
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className="work-morph relative mt-12 overflow-hidden bg-paper-deep md:mt-16"
          style={{ aspectRatio: COVER_ASPECT, viewTransitionName: morphName(study.slug) } as CSSProperties}
        >
          {media ? (
            <CoverImage slug={study.slug} media={media} sizes={HERO_SIZES} priority />
          ) : (
            <WorkCover study={study} />
          )}
        </div>

        {facts.length > 0 && (
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
        )}
      </header>

      {/* TL;DR + metrics */}
      <section aria-labelledby="tldr" className="page-x mx-auto max-w-page py-20 md:py-32">
        <div className="grid-page gap-y-6">
          <h2 id="tldr" className="meta col-span-4 md:col-span-3">
            TL;DR
          </h2>
          <p className="col-span-4 text-[clamp(1.5rem,2.9vw,2.75rem)] leading-[1.14] tracking-[-0.02em] md:col-span-9">
            {study.summary}
          </p>
        </div>

        {study.metrics.length > 0 && (
          <dl
            className="mt-16 grid grid-cols-2 border-y border-rule md:mt-24 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
            style={{ '--cols': study.metrics.length } as CSSProperties}
          >
            {study.metrics.map((metric, i) => (
              <div
                key={metric.label}
                className={`flex flex-col-reverse justify-end gap-4 py-6 pr-4 md:py-10 ${
                  i % 2 ? 'border-l border-rule pl-4' : ''
                } ${i > 1 ? 'border-t border-rule md:border-t-0' : ''} ${i > 0 ? 'md:border-l md:pl-6' : ''}`}
              >
                <dt className="meta">{metric.label}</dt>
                <dd className="num text-[clamp(2.25rem,5.4vw,5.25rem)] leading-[0.9]">{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      {study.video && (
        <section aria-label="Demo video" className="page-x mx-auto max-w-page pb-20 md:pb-32">
          <VideoPlayer src={study.video.src} poster={study.video.poster} title={study.video.title} />
        </section>
      )}

      {/* Body with sticky contents */}
      {sections.length > 0 && (
        <div id="case-body" className="page-x mx-auto grid-page max-w-page pb-16 md:pb-24">
          <aside className="hidden md:col-span-3 md:block">
            <CaseStudyToc sections={sections.map(({ id, title }) => ({ id, title }))} bodyId="case-body" />
          </aside>
          <div className="col-span-4 md:col-span-8 md:col-start-5">
            {sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="scroll-mt-24 border-t border-rule pb-16 pt-6 md:pb-24"
              >
                <p aria-hidden="true" className="meta">
                  {pad2(i + 1)}
                </p>
                <h2 id={`${section.id}-title`} className="display mb-8 mt-4 text-display-md md:mb-12">
                  {section.title}
                </h2>
                {section.content}
              </section>
            ))}
          </div>
        </div>
      )}

      {nextStudy && <NextProject study={nextStudy} index={nextIndex} total={total} />}
    </article>
  );
}
