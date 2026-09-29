/**
 * What Yash is doing right now. Shown in short on the home page and in full at /now.
 * DRAFT: Yash to edit. Update `updated` whenever this changes.
 */

export interface NowItem {
  label: string;
  text: string;
  href?: string;
}

export const now = {
  updated: 'September 2026',
  location: 'Madison, WI',
  items: [
    {
      label: 'Looking for',
      text: 'New-grad PM / APM, BizOps, and AI product roles starting mid-2027. Open to relocating to the Bay Area or New York.',
    },
    {
      label: 'Building',
      text: 'TAM, turning discovery calls with diligence practitioners into the next release.',
      href: '/work/tam',
    },
    {
      label: 'Validating',
      text: 'Cortexa, a hallucination-detection layer for RAG pipelines, with early design partners.',
      href: '/work/cortexa',
    },
    {
      label: 'Studying',
      text: 'Final year of Data Science & Economics at UW–Madison.',
    },
    {
      label: 'Running',
      text: 'An automated AI trading system on a $100K+ portfolio.',
    },
  ] as NowItem[],
};
