import type { Experience } from './types';

/** Work experience, reverse-chronological. */
export const experience: Experience[] = [
  {
    org: 'Zendesk',
    title: 'AI Product Intern, Business Operations',
    period: 'Jun 2026 – Aug 2026',
    summary:
      'Embedded in Revenue Operations. Took an AI-assisted reconciliation product from problem framing to production, working across Finance, RevOps, and Engineering with VP and SVP stakeholders, and shipped two more internal AI tools alongside it.',
    points: [
      'Converted a $20M cross-system discrepancy between Salesforce CPQ and Zuora into auditable matching logic, closing a five-year data-integrity gap and saving 9,000+ analyst hours and $2–\u20603M a year.',
      'Kept the matching core in deterministic Snowflake SQL and reserved AI for classification and simulation; validated on 100K+ records at 93%+ accuracy.',
      'Translated proration, tiered pricing, discounting, ramps, and ELAs into calculation logic, system requirements, and API specs; phased ramp/ELA contracts into a follow-on release.',
      'Built a MiroFish agent-simulation environment for UAT, spawning millions of AI agents with varied characteristics to model real-world behavior.',
    ],
    products: [
      {
        name: 'Data Integrity Bot (DIB): Quote-to-Cash reconciliation',
        description:
          'AI-assisted reconciliation between Salesforce CPQ and Zuora. Saves 9,000+ hours and $2–\u20603M annually.',
        href: '/work/zendesk-dib',
      },
      {
        name: 'LLM token-optimization tool',
        description: 'Cut internal AI spend by ~20%.',
      },
      {
        name: 'Documentation-freshness system',
        description:
          'Retrieval-based checks flag conflicting content across Help Center, Google Drive, and Unleash, with Claude drafting the corrections.',
      },
    ],
    tags: ['Revenue Operations', 'Quote-to-Cash', 'Snowflake', 'Salesforce CPQ', 'Zuora', 'Jira', 'Confluence'],
  },
  {
    org: 'Ernst & Young (EY)',
    title: 'M&A Consulting Intern',
    period: 'Jun 2025 – Aug 2025',
    summary:
      'Financial due diligence on a live M&A deal ($78M enterprise value) to support buy-side decisions.',
    points: [
      'Built DCF valuation models in Excel.',
      'Reviewed 5 years of target financials across 200+ pages.',
      'Surfaced 14 red flags in red-flag reports.',
      "Produced an Independent Accountants' Report and executive-ready briefs for senior stakeholders and clients.",
      'Built Power BI dashboards.',
    ],
    tags: ['Financial Due Diligence', 'DCF Valuation', 'Excel', 'Power BI'],
  },
  {
    org: 'Synechron Technologies',
    title: 'AI Engineering Intern',
    period: 'Jul 2023 – Aug 2023',
    summary:
      'Partnered with claims subject-matter experts to turn valuation logic into requirements, then trained an ML cost estimator (scikit-learn, GridSearchCV) on 10,000+ claims and served it behind a REST API.',
    points: [
      'Cut manual processing time 70%.',
      'Improved prediction accuracy 34%.',
    ],
    tags: ['Python', 'scikit-learn', 'REST API'],
  },
];
