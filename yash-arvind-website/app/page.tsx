import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { ArrowRight, Download, GraduationCap } from 'lucide-react';

import {
  Section,
  Button,
  StatCard,
  ProofStrip,
  ScrollReveal,
  CaseStudyCard,
  HackathonCard,
} from '@/components';
import { profile, education, seo } from '@/content/profile';
import { proofStrip, homeStatCards } from '@/content/stats';
import { caseStudies, featuredSlugs, getCaseStudy } from '@/content/caseStudies';
import { hackathons } from '@/content/hackathons';

export const metadata: Metadata = {
  title: { absolute: seo.title },
  alternates: { canonical: '/' },
};

const heroDelay = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties;

const featured = featuredSlugs.flatMap((slug) => getCaseStudy(slug) ?? []);
const secondaryHackathons = hackathons.filter((h) => !h.href);
const mirofish = caseStudies.find((study) => study.slug === 'mirofish');

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="container-custom relative py-12">
          <div className="max-w-4xl">
            <p className="hero-in mb-6" style={heroDelay(0)}>
              <span className="inline-flex items-start sm:items-center gap-2 px-3 py-1.5 rounded-2xl sm:rounded-full bg-void-800/80 border border-accent-400/20 text-sm">
                <span className="relative flex h-2 w-2 mt-1.5 sm:mt-0 flex-shrink-0" aria-hidden="true">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-steel-300">{profile.availability}</span>
              </span>
            </p>

            <h1
              className="hero-in font-display text-display-lg md:text-display-xl lg:text-display-2xl text-steel-50 mb-6"
              style={heroDelay(100)}
            >
              <span className="text-accent-400">{profile.firstName}</span> {profile.lastName}
            </h1>

            <p
              className="hero-in text-xl md:text-2xl text-steel-200 mb-6 max-w-2xl leading-relaxed"
              style={heroDelay(200)}
            >
              {profile.headline}
            </p>

            <div className="hero-in space-y-2 mb-10 max-w-2xl" style={heroDelay(300)}>
              {profile.summary.map((sentence) => (
                <p key={sentence} className="text-lg text-steel-400 leading-relaxed">
                  {sentence}
                </p>
              ))}
            </div>

            <div className="hero-in flex flex-wrap gap-4" style={heroDelay(400)}>
              <Button href="/work" icon={<ArrowRight size={16} aria-hidden="true" />}>
                View work
              </Button>
              <Button
                href={profile.resumePath}
                download
                variant="secondary"
                icon={<Download size={16} aria-hidden="true" />}
                iconPosition="left"
              >
                Resume
              </Button>
              <Button href="/contact" variant="outline">
                Contact
              </Button>
            </div>

            <dl
              className="hero-in mt-14 pt-8 border-t border-steel-800/50 flex flex-wrap gap-x-12 gap-y-4"
              style={heroDelay(500)}
            >
              {[
                { term: 'Education', detail: `${education.degree} · ${education.school}` },
                { term: 'Focus', detail: profile.focus },
                { term: 'Location', detail: `${profile.location} · Open to relocation` },
              ].map(({ term, detail }) => (
                <div key={term}>
                  <dt className="font-mono text-xs text-steel-500 uppercase tracking-wider">{term}</dt>
                  <dd className="text-steel-200 mt-1">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section aria-label="Results at a glance" className="pb-16 md:pb-24">
        <div className="container-custom">
          <ProofStrip stats={proofStrip} />
        </div>
      </section>

      {/* FEATURED WORK */}
      <Section
        id="featured-work"
        heading="Featured Work"
        subheading="Internal products at Zendesk and the companies I co-founded. Each case study starts with the problem."
        className="bg-void-900/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((study, i) => (
            <ScrollReveal key={study.slug} staggerIndex={i}>
              <CaseStudyCard study={study} featured />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12">
          <h3 className="font-mono text-xs text-steel-500 uppercase tracking-wider mb-4">
            Hackathons & other builds (2026)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {secondaryHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.name} hackathon={hackathon} />
            ))}
            {mirofish && <CaseStudyCard study={mirofish} size="compact" />}
          </div>
        </ScrollReveal>

        <div className="mt-10 flex justify-center">
          <Button href="/work" variant="ghost" icon={<ArrowRight size={16} aria-hidden="true" />}>
            All work
          </Button>
        </div>
      </Section>

      {/* STAT CARDS */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {homeStatCards.map((stat, i) => (
            <ScrollReveal key={stat.label} staggerIndex={i}>
              <StatCard {...stat} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section className="bg-void-900/50">
        <ScrollReveal>
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-void-800/80 to-void-900/80 border border-steel-800/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-400/5 rounded-full blur-[80px]" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="p-4 bg-accent-400/10 rounded-xl" aria-hidden="true">
                <GraduationCap className="w-8 h-8 text-accent-400" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl text-steel-50 mb-2">{education.school}</h2>
                <p className="text-steel-300 mb-1">{education.degree}</p>
                <p className="text-steel-500 text-sm">
                  {education.period} · GPA {education.gpa}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <ScrollReveal>
          <h2 className="font-display text-display-sm md:text-display-md text-steel-50 mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-steel-400 text-lg mb-8 max-w-xl mx-auto">
            Open to PM / APM, BizOps, and AI product roles in San Francisco, New York, and Washington, DC.
          </p>
          <Button href="/contact" icon={<ArrowRight size={16} aria-hidden="true" />}>
            Get in Touch
          </Button>
        </ScrollReveal>
      </Section>
    </>
  );
}
