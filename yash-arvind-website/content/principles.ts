/**
 * "How I build." Each principle is backed by something that actually happened,
 * and `slug` opens that case study in place.
 * DRAFT: Yash to edit. These were drafted from the case studies and résumé;
 * rewrite them in your own words before sharing the site widely.
 */

export interface Principle {
  title: string;
  body: string;
  /** The real work that shows it. */
  evidence: string;
  /** Case study that backs it up (content/caseStudies.ts). */
  slug?: string;
}

export const principles: Principle[] = [
  {
    title: 'Deterministic where it has to be audited. AI around it.',
    body: 'Finance has to be able to trace every dollar. I keep the core logic plain and checkable, and use models only where judgment actually helps.',
    evidence: 'Zendesk DIB: matching core in Snowflake SQL; AI for classifying mismatches and simulating users.',
    slug: 'zendesk-dib',
  },
  {
    title: 'Ship the general case, then chase the edge cases.',
    body: 'Ramp and ELA contracts kept breaking the logic. Instead of stalling everything, I shipped every other deal type and phased those into a follow-on release.',
    evidence: 'Zendesk DIB: in production, saving 9,000+ analyst hours and $2–⁠3M a year.',
    slug: 'zendesk-dib',
  },
  {
    title: 'Talk to the people who would pay for it.',
    body: 'Before building more of TAM, we sat with due-diligence practitioners and Managing Directors and turned what they said into the roadmap.',
    evidence: 'TAM: discovery with practitioners and MDs at EY and PwC.',
    slug: 'tam',
  },
  {
    title: 'Let the agent make the call. Let a person make the decision.',
    body: 'AuraHealth phones patients after a visit and sorts what it hears by urgency. What happens next is the doctor’s call: anything urgent reaches them by text.',
    evidence: 'AuraHealth: high-urgency follow-ups text the doctor and flag the case. Google Award, CheeseHacks 2026.',
    slug: 'aurahealth',
  },
  {
    title: 'Real users beat a good demo.',
    body: 'A prototype teaches you what you already believed. An App Store listing with reviews teaches you what people actually do.',
    evidence: 'Flux: live on the App Store, 350 users, 4.8★ rating.',
    slug: 'flux',
  },
];
