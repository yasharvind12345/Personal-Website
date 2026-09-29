import type { CaseStudy } from './types';

/**
 * Case studies, opened in place from the work reel on the home page.
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
      { value: '6', label: 'People on the team' },
    ],
    // The summary already states the problem; one line read thin as its own section.
    problem: [],
    whatIDid: {
      points: [
        'Shipped a live iOS co-founder matching app to the App Store, scaling to 350 users.',
        'Designed and built the MVP in Swift, including swipe-based matching.',
        'Leading a cross-functional team of 6 across design, development, and marketing.',
        'Wrote the business plan: market sizing, projections, and go-to-market.',
        'Version 2.1.0 added Google Drive résumé uploads.',
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
    slug: 'ghostkeys',
    title: 'Ghostkeys',
    subtitle: 'Your MacBook has hidden keys',
    period: 'Sep 2026 · Build Fest',
    tagline: 'Tap the palm rest, speaker grille, or case edge and a shortcut runs.',
    outcome: 'Taps on the case become keyboard shortcuts, read from sensors already in the Mac',
    summary:
      'A macOS app that turns blank parts of a MacBook into buttons. It reads the motion, lid-angle, and light sensors already inside Apple silicon Macs, learns what a tap on each zone feels like, and runs whatever shortcut you bind to it.',
    metrics: [
      { value: '~800 Hz', label: 'Motion sensor sampling' },
      { value: '242', label: 'Preset actions' },
      { value: '0', label: 'Extra hardware' },
    ],
    problem: [
      'Laptops have plenty of surface that does nothing: palm rests, speaker grilles, the strip above the keyboard. Meanwhile power users juggle more shortcuts than they have keys.',
    ],
    whatIDid: {
      intro: 'Built at Build Fest 2026 as a team.',
      points: [
        'A Swift background service reads the motion sensor about 800 times a second and detects the shock of a fingertip travelling through the aluminum.',
        'A per-user classifier learns which zone each tap came from, and throws out typing, trackpad use, and the laptop being moved.',
        'Taps group into gestures (tap, double, triple, rhythm, sequence, tilt, cover) that run keys, media, window, macro, or app-specific actions.',
        'Calibration takes about 20 taps per zone and reports per-zone accuracy, a confusion table, and which zones to merge.',
        'An Electron and React app for zones, bindings, live view, and sensors, plus a CLI, SDK, and Raycast extension.',
      ],
    },
    decisions: [
      {
        title: 'Only sensors the Mac already has',
        body: 'No accessories, no drivers. If it needs extra hardware, nobody installs it.',
      },
      {
        title: 'Learn the user, not a global model',
        body: 'Every MacBook and every pair of hands rings differently, so calibration trains a small per-user model and retrains only when the evidence is clear.',
      },
      {
        title: 'A safety gate before every action',
        body: 'Pause state, approval, and rate limits sit between a detected gesture and anything that runs, so a bump on the desk can never fire a script.',
      },
    ],
    impact: [],
    next: [],
    stack: ['Swift', 'Core Motion sensors', 'Electron', 'React', 'TypeScript', 'Remotion'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Soham109/ghostkeys' },
      { label: 'Website', href: 'https://ghostkeys-nine.vercel.app' },
    ],
    youtube: { id: 'dLmZYDh_uzE', title: 'Ghostkeys demo, Build Fest 2026' },
  },
  {
    slug: 'aurahealth',
    title: 'AuraHealth',
    subtitle: 'AI patient follow-up agent',
    period: '2026',
    award: 'Google Award, CheeseHacks 2026',
    tagline: 'An AI agent that calls patients after a visit and flags anything urgent.',
    outcome: 'Google Award at CheeseHacks: an AI agent that phones patients after a visit',
    summary:
      'Doctors upload a consultation and pick a follow-up date. AuraHealth phones the patient, runs a health check grounded in that consultation, triages urgency, and texts the doctor when something needs attention.',
    metrics: [
      { value: 'Google', label: 'Award, CheeseHacks 2026' },
      { value: '3-level', label: 'Urgency triage' },
      { value: 'Real-time', label: 'Two-way voice' },
    ],
    problem: [
      'After a consultation, doctors lose track of how patients are doing. Simple check-ins need another appointment, which means delayed care, busier clinics, and missed complications.',
    ],
    whatIDid: {
      points: [
        'Doctors upload a consultation PDF; it is parsed, embedded, and stored in Pinecone so the call is grounded in what was actually prescribed.',
        'Cloud Scheduler triggers due follow-ups and Twilio places the call, with audio streaming both ways over a WebSocket.',
        'Google speech-to-text transcribes the patient, Gemini 2.5 Flash responds with consultation context, and text-to-speech speaks the reply.',
        'After the call, a triage pass classifies urgency as low, medium, or high; high urgency sends the doctor an SMS and flags the case on the dashboard.',
      ],
    },
    decisions: [],
    impact: ['Won the Google Award at CheeseHacks 2026.'],
    next: [],
    stack: ['FastAPI', 'Twilio Voice + SMS', 'Gemini 2.5 Flash', 'Google STT/TTS', 'Pinecone', 'Cloud Run', 'Next.js'],
    links: [{ label: 'GitHub', href: 'https://github.com/L-Gupta/cheeseHacks26' }],
  },
];

/** Case studies featured on the home page, in order. */
export const featuredSlugs = ['zendesk-dib', 'tam', 'ghostkeys', 'flux', 'aurahealth'];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
