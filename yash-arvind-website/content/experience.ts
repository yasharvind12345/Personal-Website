import type { Experience } from './types';

/** Work experience, reverse-chronological. */
export const experience: Experience[] = [
  {
    org: 'Zendesk',
    title: 'AI Product Intern, Business Operations',
    period: 'Summer 2026',
    summary:
      'Embedded in Revenue Operations with Finance and RevOps leadership. Drove three internal products end to end in 9 weeks, coordinating across RevOps, Finance, IT, Compliance, BizOps, and Data. Work was reviewed up through VP Finance Transformation and presented at an SVP Revenue Operations leadership sync.',
    points: [],
    products: [
      {
        name: 'Data Integrity Bot (DIB): Quote-to-Cash reconciliation',
        description:
          'AI-assisted reconciliation between Salesforce CPQ and Zuora. Saves 9,000+ hours and $2–\u20603M annually.',
        href: '/work/zendesk-dib',
      },
      {
        name: 'Knowledge-source reconciliation tool',
        description:
          'Compares Unleash, Google Drive, and Help Center content to surface stale or conflicting documentation. Claude drafts the recommended edits, leaving a single human "post the edit" step.',
      },
      {
        name: 'Prompt-improvement AI Skill for Finance (self-initiated pitch)',
        description:
          "Turns vague requests into clear prompts, recommends a model and reasoning level, and flags when human review is needed, for work like financial analysis, QBRs, and exec memos. Initial local tests were promising, and Finance's AI strategy lead proposed a Finance pilot.",
      },
    ],
    note: 'Also introduced Cortexa to Zendesk Engineering and Security/Enterprise AI teams.',
    tags: ['Revenue Operations', 'Quote-to-Cash', 'Snowflake', 'Salesforce CPQ', 'Zuora'],
  },
  {
    org: 'Ernst & Young (EY)',
    title: 'M&A Consulting Intern',
    period: 'Jun 2025 – Aug 2025',
    summary:
      'Analyst on manual financial due diligence for a live M&A deal ($78M enterprise value).',
    points: [
      'Built DCF valuation models in Excel.',
      'Reviewed 5 years of target financials across 200+ pages.',
      'Surfaced 14 red flags in red-flag reports.',
      "Built an Independent Accountants' Report (IAR).",
      'Built Power BI dashboards.',
    ],
    tags: ['Financial Due Diligence', 'DCF Valuation', 'Excel', 'Power BI'],
  },
  {
    org: 'Synechron Technologies',
    title: 'AI Engineering Intern',
    period: 'Jul 2023 – Aug 2023',
    summary:
      'Built an insurance-claim cost estimator in Python (scikit-learn, pandas), trained on 10,000+ claims.',
    points: [
      'Cut manual processing time 70%.',
      'Improved prediction accuracy 34%.',
    ],
    tags: ['Python', 'scikit-learn', 'pandas'],
  },
];
