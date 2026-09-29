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
    'At Zendesk I owned vision, discovery, requirements, and rollout for a reconciliation product that saves 9,000+ analyst hours and $2–⁠3M a year. Co-founder of TAM and Flux.',
  ],
  location: 'Madison, WI',
  timezone: 'America/Chicago',
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
    'Technical product builder. Shipped an AI-assisted reconciliation product at Zendesk saving $2–3M a year; co-founder of TAM and Flux.',
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

/** One-page sections, in order. Navigation scroll-spies these ids. */
export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'log', label: 'Log' },
  { id: 'about', label: 'About' },
];
