import type { CaseStudy } from './types';

/**
 * Case studies rendered at /work/[slug].
 * Each follows Problem → What I did → Key decisions → Impact → What's next.
 * Sections with no confirmed facts are left empty and are not rendered.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'zendesk-dib',
    title: 'Data Integrity Bot',
    subtitle: 'Quote-to-Cash reconciliation',
    org: 'Zendesk',
    role: 'AI Product Intern, Business Operations',
    period: 'Summer 2026',
    tagline: 'Reconciling what Zendesk sold (Salesforce CPQ) with what it billed (Zuora).',
    summary:
      'An AI-assisted reconciliation engine on Snowflake that catches revenue leakage and overbilling between Salesforce CPQ and Zuora. It saves 9,000+ hours and $2–\u20603M a year in production.',
    metrics: [
      { value: '$2–3M', label: 'Saved annually' },
      { value: '9,000+', label: 'Hours saved per year' },
      { value: '$200K+', label: 'Undetected leakage surfaced' },
      { value: '93%+', label: 'Classification accuracy' },
    ],
    problem: [
      'Salesforce CPQ records what was sold. Zuora records what was billed. Over the life of a contract the two drifted apart, and that gap had gone unaddressed for about five years.',
      'The drift caused revenue leakage, overbilling, and contract-math errors. Finance only caught them by hand, after the fact.',
    ],
    whatIDid: {
      intro:
        'I built an AI-assisted reconciliation engine on Snowflake. Its core is deterministic SQL and intentionally does not rely on an LLM.',
      points: [
        'Compares CPQ and Zuora at the deal level.',
        'Classifies mismatches as pricing, proration, discounting, or contract-math errors.',
        'Outputs a leakage and overbilling report plus an exec-summary dashboard.',
        'Includes an audit log, error handling, and Slack incident alerting.',
        'Publishes result tables and marts to production.',
      ],
    },
    decisions: [
      {
        title: 'Earned production access one step at a time',
        body: 'Instead of asking for everything upfront, I earned access incrementally: read-only discovery, then a personal database, then a dedicated schema, then a least-privilege service account with key-pair auth, then a dedicated warehouse.',
      },
      {
        title: 'Shipped the general case first',
        body: 'Ramp and ELA deals kept breaking the general logic. I shipped a working model for every other deal type first, then came back and fixed ramp and ELA in a later pass.',
      },
      {
        title: 'Staged the rollout',
        body: 'Local testing, then shadow validation on live data, then read-only production checks, then the full pipeline.',
      },
      {
        title: 'Got the dollar math right',
        body: 'Zuora has no single "effective price" because of tiered pricing, so I worked with subject-matter guidance to get the dollar calculations right.',
      },
      {
        title: 'Took it up the review chain',
        body: 'Reviewed by my manager, then VP Finance Transformation, then presented at an SVP Revenue Operations leadership sync.',
      },
    ],
    impact: [
      '9,000+ hours and $2–\u20603M saved annually, realized in production.',
      'Validated on 100K+ records at 93%+ classification accuracy.',
      'Surfaced $200K+ in previously undetected revenue leakage.',
    ],
    next: [
      'Expand toward fuller automation of resolution.',
      'Drive AI adoption across RevOps.',
    ],
    stack: ['Snowflake', 'SQL', 'Salesforce CPQ', 'Zuora'],
    links: [],
  },
  {
    slug: 'tam',
    title: 'TAM',
    subtitle: 'Transaction Analysis Machine',
    role: 'Co-Founder & CEO',
    period: '2025 – Present',
    award: '🥈 2nd Place, MadData 2026',
    tagline: 'AI financial due diligence for PE, M&A, and corporate development.',
    summary:
      'Financial due diligence takes weeks of manual work. TAM is an AI due-diligence platform that generates a per-company report in under 8 seconds.',
    metrics: [
      { value: '94 / 100', label: 'Avg. red flags surfaced' },
      { value: '< 8 sec', label: 'Per-company report' },
      { value: '2nd', label: 'MadData 2026' },
    ],
    problem: [
      'Financial due diligence for private equity, M&A, and corporate development is weeks of manual grunt work. I did it by hand at EY.',
    ],
    whatIDid: {
      intro: 'TAM is an AI financial due-diligence platform. It covers:',
      points: [
        'Quality of Earnings: reported vs. adjusted EBITDA',
        'Net Working Capital peg',
        'Cash Conversion Cycle',
        '5-year DCF / NPV',
        'A self-correcting agentic extraction loop with statistical validation',
        'RAG Q&A over deal documents',
        'Automated PDF and Excel reports',
      ],
    },
    decisions: [],
    impact: [
      'Isolation Forest anomaly detection surfaces an average of 94 of 100 red flags across 100 deals.',
      'Generates a per-company report in under 8 seconds.',
      '2nd Place at MadData 2026.',
    ],
    next: [],
    stack: [
      'Next.js / React',
      'TypeScript',
      'FastAPI',
      'Python',
      'Claude API',
      'LangChain + LangGraph',
      'Hugging Face Transformers',
      'FinBERT',
      'scikit-learn Isolation Forest',
      'ChromaDB',
      'PostgreSQL',
      'Playwright',
    ],
    team: {
      members: ['Yash Arvind', 'Diya Kothari', 'Hriday Thakkar'],
      advisors: ['Ben Rugg', 'Varun Kumar (MD, EY)'],
    },
    links: [{ label: 'GitHub', href: 'https://github.com/diyakayy/maddata2026' }],
    video: {
      src: '/videos/tam-demo.mp4',
      poster: '/images/tam-dashboard.png',
      title: 'TAM: full product demo',
    },
    images: [
      {
        src: '/images/tam-architecture.png',
        alt: 'TAM pipeline diagram: document ingestion, AI extraction engine, financial analysis engine, anomaly detection (ML), and automated report generation',
        caption: 'System architecture',
        width: 640,
        height: 640,
      },
      {
        src: '/images/tam-workflow.png',
        alt: 'TAM agentic extraction loop: initial data scan, statistical validation, autonomous self-refinement, and verified output',
        caption: 'Agentic extraction workflow',
        width: 640,
        height: 640,
      },
    ],
  },
  {
    slug: 'flux',
    title: 'Flux',
    subtitle: 'Student Startup Network',
    role: 'Co-Founder',
    period: '2025 – Present',
    tagline: 'iOS co-founder matching for student entrepreneurs.',
    summary:
      'An iOS app that helps student entrepreneurs find co-founders. Live on the App Store with 350 users and a 4.8★ rating.',
    metrics: [
      { value: '350', label: 'Users' },
      { value: '4.8★', label: 'App Store rating' },
      { value: '6', label: 'Person team' },
    ],
    problem: ['Student entrepreneurs need a way to find co-founders.'],
    whatIDid: {
      points: [
        'Designed and built the MVP in Swift, including swipe-based matching.',
        'Lead a cross-functional team of 6 across design, development, and marketing.',
        'Wrote the business plan: market sizing, projections, and go-to-market.',
        'v2.1.0 added Google Drive resume uploads.',
      ],
    },
    decisions: [],
    impact: ['Live on the App Store.', '350 users and a 4.8★ rating.'],
    next: [],
    stack: ['Swift', 'iOS'],
    links: [
      {
        label: 'App Store',
        href: 'https://apps.apple.com/us/app/flux-student-startup-network/id6742727564',
      },
    ],
    reviews: [
      {
        user: 'Vashishth S',
        title: 'Cofounder',
        text: 'Found my co-founder on this app in my uni… we were the perfect connection and we are now in the product development stage!',
        date: 'Nov 2025',
      },
      {
        user: 'CTC-WI',
        title: 'Love the App',
        text: 'Simple, easy, and straightforward way to connect with talent entrepreneurs!',
        date: 'Oct 2025',
      },
      {
        user: 'MysteryCoder456',
        title: 'Useful',
        text: 'Helped me find a co founder for my comp sci project',
        date: 'Oct 2025',
      },
    ],
  },
  {
    slug: 'cortexa',
    title: 'Cortexa',
    role: 'Co-Founder',
    period: '2025 – Present',
    tagline: 'Making production LLM apps cheaper and more reliable.',
    summary:
      'Tooling that makes production LLM apps cheaper and more reliable, with hallucination detection and telemetry-based debugging of agent behavior. Cuts token costs by ~30%.',
    metrics: [{ value: '~30%', label: 'Lower token costs' }],
    problem: [
      'Teams running LLM apps in production need them to be cheaper and more reliable.',
    ],
    whatIDid: {
      points: [
        'Hallucination detection using token-level entropy and retrieval-consistency checks.',
        'Debugging of AI agent and model behavior through telemetry.',
        'Designed to plug into existing LangChain and LlamaIndex retrieval stacks.',
      ],
    },
    decisions: [],
    impact: [
      'Cuts token costs by ~30%.',
      'Introduced to Zendesk Engineering and Security/Enterprise AI teams.',
    ],
    next: [],
    stack: ['LangChain', 'LlamaIndex'],
    links: [],
  },
  {
    slug: 'mirofish',
    title: 'MiroFish',
    tagline: 'Agent simulation for user-acceptance testing.',
    summary:
      'An agent-simulation environment for extensive user-acceptance testing. It spawns millions of AI agents with varied characteristics to model real-world conditions and human behavior.',
    metrics: [{ value: 'Millions', label: 'Simulated AI agents' }],
    problem: [
      'User-acceptance testing needs to reflect real-world conditions and human behavior.',
    ],
    whatIDid: {
      points: [
        'Built an agent-simulation environment that spawns millions of AI agents with varied characteristics.',
        'The agents model real-world conditions and human behavior for extensive user-acceptance testing.',
      ],
    },
    decisions: [],
    impact: [],
    next: [],
    stack: [],
    links: [],
  },
];

/** Case studies featured as primary cards on the home page, in order. */
export const featuredSlugs = ['zendesk-dib', 'tam', 'flux', 'cortexa'];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
