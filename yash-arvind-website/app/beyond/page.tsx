/**
 * =============================================================================
 * BEYOND PAGE
 * =============================================================================
 *
 * Life outside of work: athletics, social impact, community, and interests.
 * Content lives in content/beyond.ts.
 */

import { Heart, Lightbulb } from 'lucide-react';

import { Section, Card, ScrollReveal } from '@/components';
import {
  athletics,
  beyondIntro,
  commonThread,
  community,
  interests,
  socialImpact,
} from '@/content/beyond';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Beyond',
  description:
    'Karate black belt, soccer, badminton, a STEM lab in rural India, hackathons, and the habits that carry into how I build products.',
  path: '/beyond',
});

export default function BeyondPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-12 pb-8 sm:pt-16 md:pt-20">
        <div className="container-custom">
          <div className="max-w-3xl hero-in">
            <p className="text-accent-400 font-mono text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Outside the Screen
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-steel-50 mb-4 sm:mb-6">
              Beyond
            </h1>
            <p className="text-steel-400 text-base sm:text-lg md:text-xl leading-relaxed">{beyondIntro}</p>
          </div>
        </div>
      </section>

      {/* ATHLETICS */}
      <Section id="athletics" heading="Athletics" subheading="Physical Discipline">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {athletics.map((sport, i) => (
            <ScrollReveal key={sport.name} staggerIndex={i}>
              <Card variant={sport.highlight ? 'accent' : 'default'} className="h-full">
                <div
                  aria-hidden="true"
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    sport.highlight ? 'bg-accent-400/20 text-accent-400' : 'bg-steel-800 text-steel-400'
                  }`}
                >
                  <sport.icon className="w-6 h-6" />
                </div>
                <p
                  className={`font-mono text-xs uppercase tracking-wider mb-2 ${
                    sport.highlight ? 'text-accent-400' : 'text-steel-500'
                  }`}
                >
                  {sport.achievement}
                </p>
                <h3 className="font-display text-lg sm:text-xl text-steel-50 mb-3">{sport.name}</h3>
                <p className="text-steel-400 text-sm sm:text-base leading-relaxed">{sport.description}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* SOCIAL IMPACT */}
      <Section id="impact" heading="Social Impact" subheading="Giving Back" className="bg-void-900/30">
        <ScrollReveal className="max-w-4xl mx-auto">
          <Card variant="accent" hover={false} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent-400/20 flex items-center justify-center flex-shrink-0"
                >
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-accent-400" />
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-steel-50 mb-2">
                    {socialImpact.title}
                  </h3>
                  <p className="text-steel-400 text-sm sm:text-base leading-relaxed">
                    {socialImpact.description}
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {socialImpact.impact.map((item) => (
                  <div key={item.label} className="flex flex-col-reverse text-center p-4 bg-void-950/50 rounded-lg">
                    <dt className="text-steel-500 text-xs sm:text-sm">{item.label}</dt>
                    <dd className="font-display text-2xl md:text-3xl text-accent-400 mb-1">{item.metric}</dd>
                  </div>
                ))}
              </dl>

              <h4 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-steel-500 mb-4">
                What We Built
              </h4>
              <ul className="space-y-3">
                {socialImpact.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" aria-hidden="true" />
                    <span className="text-steel-300 text-sm sm:text-base">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </ScrollReveal>
      </Section>

      {/* COMMUNITY */}
      <Section id="community" heading="Community & Entrepreneurship" subheading="Building Together">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {community.map((item, i) => (
            <ScrollReveal key={item.title} staggerIndex={i}>
              <Card className="h-full hover:border-accent-400/20">
                <div className="flex items-start gap-4">
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 rounded-lg bg-accent-400/10 flex items-center justify-center flex-shrink-0"
                  >
                    <item.icon className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl text-steel-50 mb-2">{item.title}</h3>
                    <p className="text-steel-400 text-sm sm:text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* INTERESTS */}
      <Section id="interests" heading="Interests" subheading="What I Enjoy" className="bg-void-900/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {interests.map((interest, i) => (
            <ScrollReveal key={interest.name} staggerIndex={i}>
              <Card variant="ghost" className="text-center group hover:border-steel-700/50 h-full">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 rounded-lg bg-steel-800/50 flex items-center justify-center mx-auto mb-4 group-hover:bg-steel-800 transition-colors"
                >
                  <interest.icon className="w-6 h-6 text-steel-400 group-hover:text-accent-400 transition-colors" />
                </div>
                <h3 className="font-display text-base sm:text-lg text-steel-50 mb-2">{interest.name}</h3>
                <p className="text-steel-500 text-xs sm:text-sm">{interest.description}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* COMMON THREAD */}
      <Section>
        <ScrollReveal className="text-center max-w-3xl mx-auto px-4">
          <div
            aria-hidden="true"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent-400/10 flex items-center justify-center mx-auto mb-4 sm:mb-6"
          >
            <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-accent-400" />
          </div>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-steel-50 mb-4 sm:mb-6">
            The Common Thread
          </h2>
          <p className="text-steel-400 text-base sm:text-lg leading-relaxed">{commonThread}</p>
        </ScrollReveal>
      </Section>
    </>
  );
}
