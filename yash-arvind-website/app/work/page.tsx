import { ArrowRight } from 'lucide-react';

import {
  Section,
  Tag,
  Button,
  ScrollReveal,
  CaseStudyCard,
  HackathonCard,
  VentureCard,
} from '@/components';
import { caseStudies, featuredSlugs } from '@/content/caseStudies';
import { hackathons } from '@/content/hackathons';
import { ventures } from '@/content/ventures';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Work',
  description:
    'Case studies from Zendesk, TAM, Flux, Cortexa, and MiroFish, plus 2026 hackathon builds and side projects. Each one starts with the problem.',
  path: '/work',
});

export default function WorkPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="pt-12 md:pt-20 pb-8">
        <div className="container-custom">
          <div className="max-w-3xl hero-in">
            <Tag variant="accent" className="mb-6">
              Work
            </Tag>
            <h1 className="font-display text-display-md md:text-display-lg text-steel-50 mb-6">
              Problems I&apos;ve taken from <span className="text-accent-400">idea</span> to{' '}
              <span className="text-accent-400">shipped</span>
            </h1>
            <p className="text-xl text-steel-400 leading-relaxed">
              Internal products at Zendesk and the companies I co-founded, plus hackathon builds
              and side projects. Each case study covers the problem, what I did, the decisions
              that mattered, and the impact.
            </p>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <Section id="case-studies" heading="Case Studies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <ScrollReveal key={study.slug} staggerIndex={i % 2}>
              <CaseStudyCard study={study} featured={featuredSlugs.includes(study.slug)} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* HACKATHONS */}
      <Section
        id="hackathons"
        heading="Hackathons"
        subheading="Shipped under pressure, all in 2026. Three wins: CheeseHacks, MadData, and CursorHacks."
        className="bg-void-900/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hackathons.map((hackathon, i) => (
            <ScrollReveal key={hackathon.name} staggerIndex={i % 2}>
              <HackathonCard hackathon={hackathon} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* OTHER PROJECTS */}
      <Section id="other-projects" heading="Other Ventures & Projects">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ventures.map((venture, i) => (
            <ScrollReveal key={venture.name} staggerIndex={i}>
              <VentureCard venture={venture} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center bg-void-900/30">
        <ScrollReveal className="max-w-2xl mx-auto">
          <h2 className="font-display text-display-sm text-steel-50 mb-4">Want the full picture?</h2>
          <p className="text-steel-400 mb-8">
            See where I&apos;ve worked, what I&apos;ve been recognized for, and the skills behind it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/experience" icon={<ArrowRight size={16} aria-hidden="true" />}>
              Experience
            </Button>
            <Button href="/contact" variant="secondary">
              Get in Touch
            </Button>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
