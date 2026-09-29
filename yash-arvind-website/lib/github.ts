/**
 * Public GitHub activity for the About section. Server-side only.
 *
 * Both fetches are cached for a day (ISR), so the home page stays static and
 * GitHub is asked at most once per revalidation. Any failure (network, rate
 * limit, markup change) returns null or drops the field; the page renders
 * without the graph instead of erroring.
 */

import { profile } from '@/content/profile';

const USER = profile.socials.github.handle;
const REVALIDATE = 60 * 60 * 24;
const TIMEOUT_MS = 8000;

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  /** YYYY-MM-DD */
  date: string;
  level: ContributionLevel;
  /** From the calendar's tooltip text; missing if GitHub stops sending it. */
  count?: number;
}

export interface LastPush {
  /** Repo name without the owner when it is Yash's own repo. */
  repo: string;
  url: string;
  /** ISO timestamp. */
  at: string;
}

export interface GitHubActivity {
  user: string;
  profileUrl: string;
  days: ContributionDay[];
  /** "N contributions in the last year", as GitHub states it. */
  total: number;
  lastPush?: LastPush;
}

async function get(url: string, accept: string): Promise<Response | null> {
  try {
    const headers: Record<string, string> = { Accept: accept, 'User-Agent': 'yasharvind.com' };
    // Optional: raises the API rate limit on shared build machines. Public data only.
    if (process.env.GITHUB_TOKEN && url.startsWith('https://api.github.com')) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(url, {
      headers,
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return res.ok ? res : null;
  } catch {
    return null;
  }
}

/** Reads one attribute out of a single HTML start tag. */
const attr = (tag: string, name: string) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

/**
 * Parses the calendar fragment served at /users/<user>/contributions.
 *
 * Each day is a `<td ... id="contribution-day-component-R-C" data-date="YYYY-MM-DD"
 * data-level="0-4">`, and its count lives in a sibling
 * `<tool-tip for="contribution-day-component-R-C">3 contributions on March 1st.</tool-tip>`.
 * The heading reads "74 contributions in the last year".
 */
export function parseContributions(html: string): { days: ContributionDay[]; total: number } | null {
  const counts = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip\b([^>]*)>([^<]*)<\/tool-tip>/g)) {
    const target = attr(m[1], 'for');
    const text = m[2].trim();
    const n = text.match(/^(No|[\d,]+)\s+contributions?\b/i);
    if (target && n) counts.set(target, n[1].toLowerCase() === 'no' ? 0 : Number(n[1].replace(/,/g, '')));
  }

  const byDate = new Map<string, ContributionDay>();
  for (const m of html.matchAll(/<td\b[^>]*\sdata-date="[^"]*"[^>]*>/g)) {
    const tag = m[0];
    const date = attr(tag, 'data-date');
    const level = Number(attr(tag, 'data-level'));
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !(level >= 0 && level <= 4)) continue;
    const id = attr(tag, 'id');
    const count = id ? counts.get(id) : undefined;
    byDate.set(date, { date, level: level as ContributionLevel, ...(count !== undefined && { count }) });
  }

  const days = [...byDate.values()].sort((a, b) => (a.date < b.date ? -1 : 1));
  // A year is ~365 cells; anything much smaller means the markup changed.
  if (days.length < 300) return null;

  const stated = html.match(/([\d,]+)\s+contributions?\s+in the last year/i);
  const total = stated
    ? Number(stated[1].replace(/,/g, ''))
    : days.reduce((sum, d) => sum + (d.count ?? 0), 0);

  return { days, total };
}

interface GitHubEvent {
  type: string;
  public: boolean;
  created_at: string;
  repo: { name: string };
}

async function getLastPush(): Promise<LastPush | undefined> {
  const res = await get(`https://api.github.com/users/${USER}/events/public`, 'application/vnd.github+json');
  if (!res) return undefined;
  try {
    const events = (await res.json()) as GitHubEvent[];
    if (!Array.isArray(events)) return undefined;
    // The public feed only has public repos; check the flag anyway.
    const push = events.find((e) => e.type === 'PushEvent' && e.public === true && e.repo?.name);
    if (!push) return undefined;
    const [owner, name] = push.repo.name.split('/');
    return {
      repo: owner?.toLowerCase() === USER.toLowerCase() && name ? name : push.repo.name,
      url: `https://github.com/${push.repo.name}`,
      at: push.created_at,
    };
  } catch {
    return undefined;
  }
}

export async function getGitHubActivity(): Promise<GitHubActivity | null> {
  const [calendar, lastPush] = await Promise.all([
    get(`https://github.com/users/${USER}/contributions`, 'text/html')
      .then((res) => (res ? res.text() : null))
      .then((html) => (html ? parseContributions(html) : null))
      .catch(() => null),
    getLastPush().catch(() => undefined),
  ]);
  if (!calendar) return null;
  return {
    user: USER,
    profileUrl: profile.socials.github.href,
    ...calendar,
    ...(lastPush && { lastPush }),
  };
}
