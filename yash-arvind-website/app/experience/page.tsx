import Link from 'next/link';
import { ArrowUpRight, ChevronRight, Download, GraduationCap, Trophy } from 'lucide-react';

import { Section, Tag, Button, ScrollReveal } from '@/components';
import { experience } from '@/content/experience';
import { recognition } from '@/content/hackathons';
import { skills } from '@/content/skills';
import { education, profile } from '@/content/profile';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Experience',
  description:
    'AI Product Intern at Zendesk, M&A Consulting Intern at EY, and AI Engineering Intern at Synechron. Plus education, recognition, and skills.',
  path: '/experience',
});

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <li
          key={tag}
          className="px-2 py-0.5 text-xs font-mono text-steel-500 bg-steel-900/50 rounded border border-steel-800/50"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function ExperiencePage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-12 md:pt-20 pb-8">
        <div className="container-custom">
          <div className="max-w-3xl hero-in">
            <Tag variant="accent" className="mb-6">
              Experience
            </Tag>
            <h1 className="font-display text-display-md md:text-display-lg text-steel-50 mb-6">
              Where I&apos;ve <span className="text-accent-400">worked</span>
            </h1>
            <p className="text-xl text-steel-400 leading-relaxed mb-8">
              Internal AI-assisted products at Zendesk, manual M&A due diligence at EY, and an
              insurance-claim estimator at Synechron.
            </p>
            <Button
              href={profile.resumePath}
              download
              variant="secondary"
              icon={<Download size={16} aria-hidden="true" />}
              iconPosition="left"
            >
              Resume (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* WORK EXPERIENCE */}
      <Section id="experience" heading="Work Experience">
        <ol className="relative max-w-3xl border-l border-steel-800 space-y-14">
          {experience.map((job, i) => (
            <li key={job.org} className="relative pl-8 md:pl-12">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full -translate-x-1/2 ${
                  i === 0 ? 'bg-accent-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'bg-steel-600'
                }`}
              />
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-wider text-accent-400 mb-2">{job.period}</p>
                <h3 className="font-display text-xl md:text-2xl text-steel-50">{job.title}</h3>
                <p className="text-steel-300 font-medium mb-3">{job.org}</p>
                <p className="text-steel-400 leading-relaxed">{job.summary}</p>

                {job.products && (
                  <ol className="mt-6 space-y-4">
                    {job.products.map((product, n) => (
                      <li
                        key={product.name}
                        className="p-4 rounded-lg bg-void-800/40 border border-steel-800/50"
                      >
                        <h4 className="font-sans text-steel-100 font-medium mb-1 flex items-baseline gap-2">
                          <span className="font-mono text-xs text-accent-400" aria-hidden="true">
                            {n + 1}.
                          </span>
                          {product.name}
                        </h4>
                        <p className="text-sm text-steel-400 leading-relaxed">{product.description}</p>
                        {product.href && (
                          <Link
                            href={product.href}
                            className="inline-flex items-center gap-1 mt-2 text-sm text-accent-400 hover:text-accent-300 rounded"
                          >
                            Read the case study <ArrowUpRight size={14} aria-hidden="true" />
                          </Link>
                        )}
                      </li>
                    ))}
                  </ol>
                )}

                {job.points.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {job.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-steel-400 text-sm leading-relaxed">
                        <ChevronRight size={14} className="text-accent-400 mt-1 flex-shrink-0" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {job.note && <p className="mt-4 text-sm text-steel-500">{job.note}</p>}

                <TagList tags={job.tags} />
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* EDUCATION */}
      <Section id="education" heading="Education" className="bg-void-900/30">
        <ScrollReveal className="max-w-3xl">
          <div className="flex items-start gap-5 p-6 rounded-xl bg-void-800/40 border border-steel-800/50">
            <div className="p-3 bg-accent-400/10 rounded-xl" aria-hidden="true">
              <GraduationCap className="w-7 h-7 text-accent-400" />
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl text-steel-50">{education.school}</h3>
              <p className="text-steel-300 mt-1">{education.degree}</p>
              <p className="text-steel-500 text-sm mt-1">
                {education.period} · GPA {education.gpa}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* RECOGNITION */}
      <Section id="recognition" heading="Recognition">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recognition.map((item, i) => (
            <li key={item.title}>
              <ScrollReveal staggerIndex={i % 2} className="h-full">
                <div className="h-full p-5 rounded-xl bg-void-800/30 border border-accent-400/15">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy size={16} className="text-accent-400" aria-hidden="true" />
                    <span className="font-mono text-xs text-steel-500">{item.year}</span>
                  </div>
                  <h3 className="font-display text-lg text-steel-50 mb-1">{item.title}</h3>
                  <p className="text-sm text-steel-400 leading-relaxed">{item.detail}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* SKILLS */}
      <Section id="skills" heading="Skills" className="bg-void-900/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skills.map((group, i) => (
            <ScrollReveal key={group.category} staggerIndex={i % 3}>
              <div className="h-full p-6 rounded-xl bg-void-800/30 border border-steel-800/30">
                <h3 className="font-display text-lg text-steel-50 mb-4">{group.category}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="px-2.5 py-1 text-xs font-mono text-steel-400 bg-void-900/50 rounded border border-steel-800/50"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
