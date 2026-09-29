import type { CaseStudy } from './types';

/**
 * Case studies rendered at /work/[slug].
 * Each follows Problem → What I did → Key decisions → Impact → What's next.
 * Sections with no confirmed facts are left empty and are not rendered.
 * Source of truth: public/Yash_Arvind_Resume.pdf. Targets are phrased as targets.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'zendesk-dib',
    title: 'Data Integrity Bot',
    subtitle: 'Quote-to-Cash reconciliation',
    org: 'Zendesk',
    role: 'AI Product Intern, Business Operations',
    period: 'Jun 2026 – Aug 2026',
    tagline: 'Reconciling what Zendesk sold (Salesforce CPQ) with what it billed (Zuora).',
    outcome: '$2–⁠3M and 9,000+ analyst hours saved a year',
    summary:
      'An AI-assisted reconciliation product that turned a $20M discrepancy between Salesforce CPQ and Zuora into auditable matching logic, closing a five-year data-integrity gap. In production, it saves 9,000+ analyst hours and $2–⁠3M a year.',
    metrics: [
      { value: '$20M', label: 'Discrepancy made auditable' },
      { value: '$2–⁠3M', label: 'Saved annually' },
      { value: '9,000+', label: 'Analyst hours saved a year' },
      { value: '93%+', label: 'Accuracy on 100K+ records' },
    ],
    problem: [
      'Salesforce CPQ records what was sold. Zuora records what was billed. Over the life of a contract the two drifted apart, and the gap had gone unaddressed for about five years.',
      'The drift added up to a $20M cross-system discrepancy: revenue leakage, overbilling, and contract-math errors that Finance only caught by hand, after the fact.',
    ],
    whatIDid: {
      intro:
        'I drove the product from problem framing to production, working across Finance, RevOps, and Engineering, with VP and SVP stakeholders setting scope.',
      points: [
        'Translated contract structures (proration, tiered pricing, discounting, ramps, and ELAs) into calculation logic, system requirements, and API specifications.',
        'Built the matching layer in deterministic Snowflake SQL, comparing CPQ and Zuora at the deal level.',
        'Classified mismatches as pricing, proration, discounting, or contract-math errors.',
        'Shipped a leakage and overbilling report plus an exec-summary dashboard, with an audit log, error handling, and Slack incident alerting.',
        'Built a MiroFish agent-simulation environment for UAT, spawning millions of AI agents with varied characteristics to model real-world conditions and human behavior.',
        'Published result tables and marts to production, and tracked requirements and releases in Jira and Confluence.',
      ],
    },
    decisions: [
      {
        title: 'Deterministic core, AI around it',
        body: 'The matching layer is deterministic Snowflake SQL, so every flagged dollar can be traced and audited. AI is reserved for the layers around it: classifying mismatches and simulating users. Validated on 100K+ records at 93%+ accuracy.',
      },
      {
        title: 'Tested against a simulated world',
        body: 'User-acceptance testing ran in a MiroFish agent-simulation environment I built. It spawns millions of AI agents with varied characteristics to model real-world conditions and human behavior, which kept AI in the test harness and out of the matching core.',
      },
      {
        title: 'Shipped the general case first',
        body: 'Ramp and ELA deals kept breaking the general logic. Working with VP and SVP stakeholders on scope, I shipped a working model for every other deal type first and phased ramp and ELA contracts into a follow-on release.',
      },
      {
        title: 'Got the dollar math right',
        body: 'Zuora has no single "effective price" because of tiered pricing, so I worked with subject-matter guidance to turn proration, tiers, discounts, ramps, and ELAs into correct dollar calculations.',
      },
      {
        title: 'Earned production access one step at a time',
        body: 'Instead of asking for everything upfront, I earned access incrementally: read-only discovery, then a personal database, then a dedicated schema, then a least-privilege service account with key-pair auth, then a dedicated warehouse.',
      },
      {
        title: 'Staged the rollout',
        body: 'Local testing, then shadow validation on live data, then read-only production checks, then the full pipeline. Reviewed by my manager, then VP Finance Transformation, then presented at an SVP Revenue Operations leadership sync.',
      },
    ],
    impact: [
      'Turned a $20M cross-system discrepancy into auditable matching logic, closing a five-year data-integrity gap.',
      '9,000+ analyst hours and $2–⁠3M saved annually, realized in production.',
      'Validated on 100K+ records at 93%+ accuracy.',
      'Surfaced $200K+ in previously undetected revenue leakage.',
    ],
    next: [
      'Ramp and ELA contracts, phased into a follow-on release.',
      'Expand toward fuller automation of resolution.',
      'Drive AI adoption across RevOps.',
    ],
    stack: ['Snowflake', 'SQL', 'Salesforce CPQ', 'Zuora', 'MiroFish', 'Jira', 'Confluence'],
    collaborators: ['Finance', 'RevOps', 'Engineering', 'VP & SVP stakeholders'],
    links: [],
  },
  {
    slug: 'tam',
    title: 'TAM',
    subtitle: 'Transaction Analysis Machine',
    role: 'Co-Founder & CEO',
    period: '2025 – Present',
    award: '2nd Place, MadData 2026',
    tagline: 'Agentic financial due diligence for PE, M&A, and corporate development.',
    outcome: 'Due-diligence reports in under 8 seconds per company',
    summary:
      'Financial due diligence takes weeks of manual work. TAM is an agentic due-diligence platform that parses filings, flags anomalies, and generates a per-company report in under 8 seconds.',
    metrics: [
      { value: '< 8 sec', label: 'Per-company report' },
      { value: '94 / 100', label: 'Avg. red flags surfaced' },
      { value: '2nd', label: 'MadData 2026' },
    ],
    problem: [
      'Financial due diligence for private equity, M&A, and corporate development is weeks of manual grunt work. I did it by hand at EY.',
    ],
    whatIDid: {
      intro: 'I set the product vision and roadmap for an agentic due-diligence platform.',
      points: [
        'LangGraph orchestration over a ChromaDB RAG layer and the Claude API.',
        'A LangChain + FinBERT pipeline that parses SEC filings and contracts for covenants, risk clauses, and filing sentiment.',
        'Isolation Forest anomaly detection layered over financial statements to flag irregularities.',
        'Financial analysis: Quality of Earnings (reported vs. adjusted EBITDA), Net Working Capital peg, Cash Conversion Cycle, and a 5-year DCF / NPV.',
        'A self-correcting agentic extraction loop with statistical validation, plus RAG Q&A over deal documents.',
        'Automated PDF and Excel reports in under 8 seconds per company, on a FastAPI/Celery, PostgreSQL, and React stack.',
      ],
    },
    decisions: [
      {
        title: 'Discovery with the people who do the work',
        body: 'I run discovery with due-diligence practitioners and Managing Directors at EY and PwC, and turn their feedback into prioritized requirements and a go-to-market plan.',
      },
      {
        title: 'Validate the agent, don’t trust it',
        body: 'Extraction runs as a self-correcting loop: an initial data scan, statistical validation, autonomous self-refinement, then verified output. Isolation Forest anomaly detection runs over the financial statements alongside it.',
      },
    ],
    impact: [
      'Isolation Forest anomaly detection surfaces an average of 94 of 100 red flags across 100 deals.',
      'Generates a per-company PDF/Excel report in under 8 seconds.',
      '2nd Place at MadData 2026.',
    ],
    next: [],
    stack: [
      'Next.js / React',
      'TypeScript',
      'FastAPI',
      'Celery',
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
    outcome: 'Live on the App Store, scaled to 350 users',
    summary:
      'An iOS app that helps student entrepreneurs find co-founders. Shipped to the App Store and scaled to 350 users, with a 4.8★ rating.',
    metrics: [
      { value: '350', label: 'Users' },
      { value: '4.8★', label: 'App Store rating' },
      { value: '6', label: 'Person team' },
    ],
    problem: ['Student entrepreneurs need a way to find co-founders.'],
    whatIDid: {
      points: [
        'Shipped a live iOS co-founder matching app to the App Store, scaling to 350 users.',
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
    subtitle: 'Hallucination detection for enterprise LLMs',
    role: 'Co-Founder',
    period: '2025 – Present',
    tagline: 'A hallucination-detection layer that makes production LLM apps cheaper and more reliable.',
    outcome: 'Targeting 60%+ fewer RAG errors at under 12ms overhead',
    summary:
      'Product strategy for an enterprise LLM hallucination-detection layer built on token-level entropy and retrieval-consistency checks. It targets 60%+ error reduction in RAG pipelines and ~30% lower token costs, validated with Nvidia and AmFam.',
    metrics: [
      { value: '60%+', label: 'Target RAG error reduction' },
      { value: '~30%', label: 'Target token-cost reduction' },
      { value: '< 12ms', label: 'Overhead, by design' },
    ],
    problem: [
      'Teams running LLM apps in production need them to be cheaper and more reliable.',
      'Enterprise teams need to catch hallucinations in their RAG pipelines without rebuilding the retrieval stacks they already run.',
    ],
    whatIDid: {
      intro: 'I own product strategy for Cortexa.',
      points: [
        'Hallucination detection using token-level entropy and retrieval-consistency checks.',
        'Designed to drop into existing LangChain and LlamaIndex retrieval stacks at under 12ms overhead.',
        'Debugging of AI agent and model behavior through telemetry.',
        'Validated the approach with Nvidia and AmFam.',
      ],
    },
    decisions: [
      {
        title: 'A drop-in layer, not a new stack',
        body: 'Cortexa plugs into the LangChain and LlamaIndex retrieval stacks teams already run, with an overhead budget under 12ms, so adopting it does not mean re-architecting.',
      },
    ],
    impact: [
      'Validated with Nvidia and AmFam.',
      'Introduced to Zendesk Engineering and Security/Enterprise AI teams.',
    ],
    next: [
      'Targeting 60%+ error reduction in RAG pipelines.',
      'Targeting ~30% lower token costs.',
    ],
    stack: ['LangChain', 'LlamaIndex'],
    links: [],
  },
];

/** Case studies featured on the home page, in order. */
export const featuredSlugs = ['zendesk-dib', 'tam', 'flux', 'cortexa'];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
