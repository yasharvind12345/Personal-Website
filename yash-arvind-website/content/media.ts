/**
 * Images for work previews, case-study heroes, and the home "Shipped" strip.
 * Every entry has its real pixel size so next/image can reserve space.
 *
 * Sources:
 * - flux/*: iPhone screenshots from Flux's App Store listing (1242×2688 masters, resized).
 * - tam/dashboard.jpg, tam/intake.jpg, tam/cover.jpg: frames from /videos/tam-demo.mp4
 *   (browser chrome cropped).
 * - flux/cover.jpg: three of the listing screenshots set on paper-deep, 16:10.
 * - workMedia covers are all 16:10 (the WorkList preview and case-study hero crop to 16:10).
 * - tam/architecture.jpg, tam/workflow.jpg: the diagrams from the TAM repo.
 * - plates/*.svg: typographic plates for work with no shareable screenshots (illustrative data).
 */

export interface WorkImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** What the image is. Phone screenshots are tall; plates are drawn on paper. */
  kind?: 'screenshot' | 'phone' | 'plate' | 'diagram';
}

const img = {
  dibPlate: {
    src: '/images/plates/zendesk-dib.svg',
    alt: 'Diagram of Data Integrity Bot: Salesforce CPQ contract lines matched against Zuora billing lines, with four mismatches classified as pricing, proration, discount, and contract math, above the figure $2–3M saved per year',
    width: 1600,
    height: 1000,
    kind: 'plate',
  },
  cortexaPlate: {
    src: '/images/plates/cortexa.svg',
    alt: 'Chart of token-level entropy over a generated sentence about a refund policy; the tokens “90” and “enterprise” rise above the flag threshold and are marked as likely hallucinations',
    width: 1600,
    height: 1000,
    kind: 'plate',
  },
  tamDashboard: {
    src: '/images/tam/dashboard.jpg',
    alt: 'TAM analyst workspace showing an executive overview: LTM revenue of $77.6M, reported and adjusted EBITDA, net working capital peg, deal-risk score, and an EBITDA bridge chart',
    width: 1920,
    height: 1030,
    kind: 'screenshot',
  },
  tamCover: {
    src: '/images/tam/cover.jpg',
    alt: 'TAM analyst workspace, executive overview: LTM revenue $77.6M, reported EBITDA $16.5M, adjusted EBITDA $17.1M, NWC peg, deal-risk score 4.8 of 10, and revenue and EBITDA bridge charts',
    width: 1600,
    height: 1000,
    kind: 'screenshot',
  },
  tamIntake: {
    src: '/images/tam/intake.jpg',
    alt: 'TAM intake workspace: company details form, deal documents uploading, and a walkthrough of document intelligence, the financial build engine, and analyst-grade insights',
    width: 1920,
    height: 1030,
    kind: 'screenshot',
  },
  tamWorkflow: {
    src: '/images/tam/workflow.jpg',
    alt: 'TAM agentic extraction loop: initial data scan, statistical validation, autonomous self-refinement, and verified output',
    width: 640,
    height: 640,
    kind: 'diagram',
  },
  tamArchitecture: {
    src: '/images/tam/architecture.jpg',
    alt: 'TAM pipeline: document ingestion, AI extraction engine, financial analysis engine, anomaly detection (ML), and automated report generation',
    width: 640,
    height: 640,
    kind: 'diagram',
  },
  fluxCover: {
    src: '/images/flux/cover.jpg',
    alt: 'Three Flux iOS screens side by side: a co-founder profile card on Discover, a chat between matched students, and a profile generated from an uploaded résumé',
    width: 1600,
    height: 1000,
    kind: 'screenshot',
  },
  fluxDiscover: {
    src: '/images/flux/discover.jpg',
    alt: 'Flux iOS app, Discover tab: a swipeable profile card for a student founder listing their idea and roles. Caption: Find co-founders in a familiar way',
    width: 924,
    height: 2000,
    kind: 'phone',
  },
  fluxSkills: {
    src: '/images/flux/skills.jpg',
    alt: 'Flux iOS onboarding screen asking “What are you good at?” with selectable role chips. Caption: Showcase your skills in seconds',
    width: 924,
    height: 2000,
    kind: 'phone',
  },
  fluxProfile: {
    src: '/images/flux/profile.jpg',
    alt: 'Flux iOS screen that builds a profile from an uploaded résumé, listing extracted experience. Caption: Create your profile almost instantly',
    width: 924,
    height: 2000,
    kind: 'phone',
  },
  fluxMatch: {
    src: '/images/flux/match.jpg',
    alt: 'iPhone lock screen with a Flux “New Connection” notification. Caption: Match with builders near you',
    width: 924,
    height: 2000,
    kind: 'phone',
  },
  fluxChat: {
    src: '/images/flux/chat.jpg',
    alt: 'Flux iOS chat between two matched students discussing collaborating on a project. Caption: Conversations that lead to real projects',
    width: 924,
    height: 2000,
    kind: 'phone',
  },
} satisfies Record<string, WorkImage>;

/** Every image, for pages that want to pick their own (e.g. a case-study gallery). */
export const images = img;

/** Cover image per case-study slug (all 16:10): the WorkList hover preview and the case-study hero (shared morph). */
export const workMedia: Record<string, WorkImage> = {
  'zendesk-dib': img.dibPlate,
  tam: img.tamCover,
  flux: img.fluxCover,
  cortexa: img.cortexaPlate,
};

/** Images for the 3D "Shipped" strip on the home page, in scroll order. */
export const stripImages: (WorkImage & { caption: string; href?: string })[] = [
  { ...img.tamDashboard, caption: 'TAM · Analyst dashboard · 2026', href: '/work/tam' },
  { ...img.fluxDiscover, caption: 'Flux · iOS · 2025', href: '/work/flux' },
  { ...img.dibPlate, caption: 'Data Integrity Bot · Zendesk · 2026', href: '/work/zendesk-dib' },
  { ...img.fluxChat, caption: 'Flux · Messages · 2025', href: '/work/flux' },
  { ...img.cortexaPlate, caption: 'Cortexa · Entropy check · 2025', href: '/work/cortexa' },
  { ...img.fluxMatch, caption: 'Flux · Match alerts · 2025', href: '/work/flux' },
  { ...img.tamIntake, caption: 'TAM · Deal intake · 2026', href: '/work/tam' },
  { ...img.fluxProfile, caption: 'Flux · Résumé import · 2025', href: '/work/flux' },
];

/** Phone covers render as a spread of screens instead of one cropped screenshot. */
export const phoneSets: Record<string, WorkImage[]> = {
  flux: [img.fluxChat, img.fluxDiscover, img.fluxMatch],
};
