import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Github, ChevronRight, Star } from 'lucide-react';
import type { CaseStudy } from '@/content/types';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { Button } from '@/components/ui/Button';
import { workIcon } from './icons';

interface CaseStudyLayoutProps {
  study: CaseStudy;
  nextStudy?: CaseStudy;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-steel-300 leading-relaxed">
          <ChevronRight size={16} className="text-accent-400 mt-1 flex-shrink-0" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StorySection({
  index,
  id,
  title,
  children,
}: {
  index: number;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal>
      <section aria-labelledby={id} className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-4 md:gap-10">
        <div>
          <p className="font-mono text-xs text-accent-400 tracking-wider" aria-hidden="true">
            {String(index).padStart(2, '0')}
          </p>
          <h2 id={id} className="font-display text-2xl md:text-3xl text-steel-50 mt-1">
            {title}
          </h2>
        </div>
        <div className="min-w-0">{children}</div>
      </section>
    </ScrollReveal>
  );
}

function linkIcon(label: string) {
  return label === 'GitHub' ? <Github size={16} aria-hidden="true" /> : <ExternalLink size={16} aria-hidden="true" />;
}

export function CaseStudyLayout({ study, nextStudy }: CaseStudyLayoutProps) {
  const Icon = workIcon(study.slug);
  const meta = [study.org, study.role, study.period].filter(Boolean);

  // Problem → What I did → Key decisions → Impact → What's next.
  // Sections without confirmed facts are skipped, and numbering follows what renders.
  const sections: { id: string; title: string; content: React.ReactNode }[] = [];

  if (study.problem.length) {
    sections.push({
      id: 'problem',
      title: 'The problem',
      content: (
        <div className="space-y-4">
          {study.problem.map((p) => (
            <p key={p} className="text-steel-300 text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      ),
    });
  }

  if (study.whatIDid.points.length) {
    sections.push({
      id: 'what-i-did',
      title: 'What I did',
      content: (
        <div className="space-y-5">
          {study.whatIDid.intro && (
            <p className="text-steel-300 text-lg leading-relaxed">{study.whatIDid.intro}</p>
          )}
          <Bullets items={study.whatIDid.points} />
        </div>
      ),
    });
  }

  if (study.decisions.length) {
    sections.push({
      id: 'decisions',
      title: 'Key decisions',
      content: (
        <ol className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {study.decisions.map((decision, i) => (
            <li
              key={decision.title}
              className="p-5 rounded-xl bg-accent-400/5 border border-accent-400/20"
            >
              <p className="font-mono text-xs text-accent-400 mb-2" aria-hidden="true">
                Decision {i + 1}
              </p>
              <h3 className="font-display text-lg text-steel-50 mb-2">{decision.title}</h3>
              <p className="text-sm text-steel-400 leading-relaxed">{decision.body}</p>
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
      content: <Bullets items={study.impact} />,
    });
  }

  if (study.next.length) {
    sections.push({
      id: 'next',
      title: "What's next",
      content: <Bullets items={study.next} />,
    });
  }

  return (
    <article>
      {/* Header */}
      <header className="pt-12 md:pt-20 pb-12">
        <div className="container-custom">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-steel-500 hover:text-accent-400 mb-10 rounded"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            All work
          </Link>

          <div className="max-w-3xl hero-in">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="p-3 bg-accent-400/10 rounded-xl text-accent-400" aria-hidden="true">
                <Icon size={28} />
              </span>
              {study.award && (
                <span className="px-2.5 py-1 text-xs rounded-full border bg-amber-400/10 text-amber-400 border-amber-400/25">
                  {study.award}
                </span>
              )}
            </div>

            {meta.length > 0 && (
              <p className="font-mono text-xs sm:text-sm text-steel-500 uppercase tracking-wider mb-3">
                {meta.join(' · ')}
              </p>
            )}

            <h1 className="font-display text-display-md md:text-display-lg text-steel-50 mb-3">
              {study.title}
            </h1>
            {study.subtitle && <p className="text-xl text-accent-400 mb-6">{study.subtitle}</p>}
            <p className="text-lg md:text-xl text-steel-400 leading-relaxed">{study.summary}</p>

            {study.links.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-8">
                {study.links.map((link, i) => (
                  <Button
                    key={link.href}
                    href={link.href}
                    external
                    variant={i === 0 ? 'primary' : 'secondary'}
                    icon={linkIcon(link.label)}
                    iconPosition="left"
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Metrics */}
          {study.metrics.length > 0 && (
            <dl
              className={`mt-12 grid gap-px rounded-xl overflow-hidden border border-steel-800/50 bg-steel-800/50 ${
                study.metrics.length >= 4
                  ? 'grid-cols-2 lg:grid-cols-4'
                  : study.metrics.length === 3
                    ? 'grid-cols-1 sm:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2'
              }`}
            >
              {study.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse bg-void-900 px-5 py-6">
                  <dt className="font-mono text-xs text-steel-500 uppercase tracking-wider mt-1">
                    {metric.label}
                  </dt>
                  <dd className="font-display text-3xl md:text-4xl text-accent-400">{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      {study.video && (
        <div className="container-custom pb-12">
          <VideoPlayer
            src={study.video.src}
            poster={study.video.poster}
            title={study.video.title}
          />
        </div>
      )}

      {/* Story */}
      <div className="container-custom pb-16 md:pb-24 space-y-16 md:space-y-20">
        {sections.map((section, i) => (
          <StorySection key={section.id} index={i + 1} id={section.id} title={section.title}>
            {section.content}
          </StorySection>
        ))}
      </div>

      {/* Diagrams */}
      {study.images && study.images.length > 0 && (
        <div className="container-custom pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {study.images.map((image) => (
              <figure
                key={image.src}
                className="rounded-xl overflow-hidden border border-steel-800/30 bg-void-800/20"
              >
                <figcaption className="p-3 border-b border-steel-800/30 font-mono text-xs text-steel-500 uppercase tracking-wider">
                  {image.caption}
                </figcaption>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-auto"
                />
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      {study.reviews && study.reviews.length > 0 && (
        <div className="container-custom pb-16 md:pb-24">
          <h2 className="font-mono text-xs text-steel-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Star size={12} className="text-accent-400" aria-hidden="true" />
            App Store reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {study.reviews.map((review) => (
              <figure
                key={review.user}
                className="p-5 rounded-xl bg-void-800/30 border border-steel-800/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-medium text-steel-200">&ldquo;{review.title}&rdquo;</p>
                  <span className="text-accent-400 text-xs" aria-label="5 out of 5 stars">
                    ★★★★★
                  </span>
                </div>
                <blockquote className="text-sm text-steel-400 leading-relaxed mb-3">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="text-xs text-steel-500">
                  {review.user} · {review.date}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Stack & team */}
      {(study.stack.length > 0 || study.team) && (
        <div className="container-custom pb-16 md:pb-24">
          <div className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30 space-y-6">
            {study.stack.length > 0 && (
              <div>
                <h2 className="font-mono text-xs text-steel-500 uppercase tracking-wider mb-3">Stack</h2>
                <ul className="flex flex-wrap gap-2">
                  {study.stack.map((tech) => (
                    <li
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono text-steel-400 bg-steel-900/50 rounded border border-steel-800/50"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {study.team && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <h2 className="font-mono text-xs text-steel-500 uppercase tracking-wider mb-2">Team</h2>
                  <p className="text-steel-300">{study.team.members.join(', ')}</p>
                </div>
                <div>
                  <h2 className="font-mono text-xs text-steel-500 uppercase tracking-wider mb-2">Advisors</h2>
                  <p className="text-steel-300">{study.team.advisors.join(', ')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Next case study */}
      {nextStudy && (
        <div className="container-custom pb-20 md:pb-28">
          <Link
            href={`/work/${nextStudy.slug}`}
            className="group flex items-center justify-between gap-6 p-6 md:p-8 rounded-xl bg-void-800/30 border border-steel-800/50 hover:border-accent-400/30 transition-colors"
          >
            <div>
              <p className="font-mono text-xs text-steel-500 uppercase tracking-wider mb-1">Next case study</p>
              <p className="font-display text-2xl text-steel-50 group-hover:text-accent-400 transition-colors">
                {nextStudy.title}
              </p>
              <p className="text-sm text-steel-400 mt-1">{nextStudy.tagline}</p>
            </div>
            <ArrowRight
              size={24}
              aria-hidden="true"
              className="text-steel-500 group-hover:text-accent-400 flex-shrink-0 motion-safe:group-hover:translate-x-1 transition-all"
            />
          </Link>
        </div>
      )}
    </article>
  );
}
