/**
 * "How I build." Each principle is backed by something that actually happened.
 * DRAFT: Yash to edit. These were drafted from the case studies and résumé;
 * rewrite them in your own words before sharing the site widely.
 */

export interface Principle {
  title: string;
  body: string;
  /** The real work that shows it. */
  evidence: string;
  href?: string;
}

export const principles: Principle[] = [
  {
    title: 'Deterministic where it has to be audited. AI around it.',
    body: 'Finance has to be able to trace every dollar. I keep the core logic plain and checkable and use models where judgment actually helps.',
    evidence: 'Zendesk DIB: matching core in Snowflake SQL; AI for classification and simulation.',
    href: '/work/zendesk-dib',
  },
  {
    title: 'Ship the general case, then chase the edge cases.',
    body: 'Ramp and ELA contracts kept breaking the logic. Instead of stalling everything, I shipped every other deal type and phased those into a follow-on release.',
    evidence: 'Zendesk DIB, 9 weeks from problem framing to production.',
    href: '/work/zendesk-dib',
  },
  {
    title: 'Earn trust in small, visible steps.',
    body: 'I asked for production access one rung at a time: read-only discovery, a personal database, a schema, a least-privilege service account, then a warehouse.',
    evidence: 'Zendesk DIB rollout: local, shadow validation, read-only checks, full pipeline.',
    href: '/work/zendesk-dib',
  },
  {
    title: 'Talk to the people who would pay for it.',
    body: 'Before building more of TAM, we sat with due-diligence practitioners and Managing Directors and turned what they said into the roadmap.',
    evidence: 'TAM: discovery with MDs at EY and PwC.',
    href: '/work/tam',
  },
  {
    title: 'Real users beat a good demo.',
    body: 'A prototype teaches you what you already believed. An App Store listing with reviews teaches you what people actually do.',
    evidence: 'Flux: live on the App Store, 350 users, 4.8 rating.',
    href: '/work/flux',
  },
  {
    title: 'Pitch the thing nobody asked for.',
    body: 'Some of the most useful work starts as a side project. If I can show it working, I bring it to the person who can say yes.',
    evidence: 'Zendesk: a self-initiated prompt-improvement tool for Finance led to a proposed Finance pilot.',
  },
];
