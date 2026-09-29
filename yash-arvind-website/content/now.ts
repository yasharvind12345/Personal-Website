/**
 * What Yash is up to right now. Shown as a quiet status line on the home page.
 * DRAFT: Yash to edit. Update `updated` whenever this changes.
 */

export interface NowItem {
  label: string;
  text: string;
  /** Case-study slug to open, if any. */
  slug?: string;
}

export const now = {
  updated: 'September 2026',
  items: [
    { label: 'Building', text: 'TAM, from discovery calls with diligence practitioners', slug: 'tam' },
    { label: 'Just shipped', text: 'Ghostkeys at Build Fest', slug: 'ghostkeys' },
    { label: 'Studying', text: 'Final year of Data Science & Economics at UW–Madison' },
    { label: 'Running', text: 'An automated trading system on my own portfolio' },
  ] as NowItem[],
};
