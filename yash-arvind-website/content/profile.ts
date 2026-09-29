/**
 * Who Yash is, how to reach him, and site-wide SEO copy.
 * Source of truth for facts: public/Yash_Arvind_Resume.pdf.
 */

export const siteUrl = 'https://www.yasharvind.com';

export const profile = {
  name: 'Yash Arvind',
  firstName: 'Yash',
  lastName: 'Arvind',
  /** Home hero statement. `emphasis` is set in serif italic. */
  statement: { before: 'I build products people', emphasis: 'actually', after: 'use.' },
  headline: 'Technical product builder who turns messy financial and AI workflows into shipped products.',
  summary: [
    'Technical product builder who turns ambiguous financial, billing, and AI workflows into shipped products with measurable outcomes.',
    'At Zendesk I owned vision, discovery, requirements, and rollout for a reconciliation product that saves 9,000+ analyst hours and $2–⁠3M a year. Founder of three ventures taken from 0 to 1.',
  ],
  /** One-line proofs under the hero, each linking to its case study. */
  proofs: [
    { label: 'Zendesk', text: '$2–⁠3M/yr and 9,000+ analyst hours saved', href: '/work/zendesk-dib' },
    { label: 'TAM', text: 'AI due diligence, report in under 8s', href: '/work/tam' },
    { label: 'Flux', text: 'Live on the App Store, 350 users', href: '/work/flux' },
  ],
  roles: ['PM / APM', 'BizOps', 'AI product'],
  graduation: 'May 2027',
  availability: 'Graduating May 2027 · Open to PM / APM, BizOps, and AI product roles',
  cta: 'Hiring for a PM / APM, BizOps, or AI product role, or building something where AI could make your team faster? I’d love to hear from you.',
  location: 'Madison, WI',
  timezone: 'America/Chicago',
  relocationCities: ['Mountain View, CA', 'San Bruno, CA', 'San Jose, CA', 'New York, NY'],
  relocation: 'Open to relocation: Mountain View · San Bruno · San Jose, CA · New York, NY',
  responseTime: '24–48 hours',
  email: 'yasharvind12345@gmail.com',
  resumePath: '/Yash_Arvind_Resume.pdf',
  socials: {
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/yash-arvind-294516218/',
      handle: 'yash-arvind-294516218',
    },
    github: {
      label: 'GitHub',
      href: 'https://github.com/yasharvind12345',
      handle: 'yasharvind12345',
    },
    instagram: {
      label: 'Instagram',
      href: 'https://www.instagram.com/__yash.a/',
      handle: '@__yash.a',
    },
  },
};

export const education = {
  school: 'University of Wisconsin–Madison',
  degree: 'B.S. Data Science & Economics',
  period: 'Sep 2024 – May 2027',
  gpa: '3.4',
  coursework: [
    'Deep Learning & Generative Models',
    'AI/ML',
    'Database Systems (SQL)',
    'Algorithms',
    'Linear Algebra',
    'Statistical Computing (R)',
  ],
};

export const seo = {
  title: 'Yash Arvind | Product Builder',
  description:
    'Technical product builder. Shipped an AI-assisted reconciliation product at Zendesk saving $2–3M a year; co-founder of TAM, Flux, and Cortexa.',
  keywords: [
    'Yash Arvind',
    'product manager',
    'associate product manager',
    'APM',
    'AI products',
    '0 to 1 product development',
    'AI product builder',
    'BizOps',
    'AI agents',
    'RAG',
    'evals',
    'fintech',
    'financial due diligence',
    'UW-Madison',
  ],
};

/** Main nav. Résumé and email are rendered separately by Navigation. */
export const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/now', label: 'Now' },
];
