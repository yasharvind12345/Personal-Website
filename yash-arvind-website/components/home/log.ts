import { experience } from '@/content/experience';
import { hackathons, recognition } from '@/content/hackathons';
import { ventures } from '@/content/ventures';
import { caseStudies } from '@/content/caseStudies';

/** 'Real-time …' → 'real-time …', but leave acronyms like 'AI' alone. */
const lowerFirst = (s: string) => (/^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s);

export interface LogEntry {
  kind: 'Role' | 'Venture' | 'Award' | 'Hackathon' | 'Program' | 'Project';
  /** Award result, set in the accent before `title`. */
  result?: string;
  title: string;
  detail: string;
  date: string;
  href?: string;
  external?: boolean;
  /** Sort keys: end year (Present = Infinity), then start year. */
  end: number;
  start: number;
}

const YEAR = /\b(?:19|20)\d{2}\b/g;

/** Years out of 'Jun 2026 – Aug 2026', '2025 – Present', 'CheeseHacks 2026'. */
export function parseYears(text: string) {
  const years = (text.match(YEAR) ?? []).map(Number);
  const present = /present/i.test(text);
  const start = years[0];
  const end = present ? Infinity : years[years.length - 1];
  let label = '—';
  if (start !== undefined) {
    if (present) label = `${start}–Now`;
    else if (start === end) label = String(start);
    else label = `${start}–${end}`;
  }
  return { start: start ?? -Infinity, end: end ?? -Infinity, label };
}

const stripYear = (text: string) => text.replace(YEAR, '').trim();

// Ties (same years) keep this order: roles, then ventures, then the rest.
const kindOrder: LogEntry['kind'][] = ['Role', 'Venture', 'Program', 'Award', 'Hackathon', 'Project'];

/** Experience, ventures, and hackathons as one log, newest first. */
export function trackRecord(): LogEntry[] {
  const entries: LogEntry[] = [];

  for (const e of experience) {
    const y = parseYears(e.period);
    const study = caseStudies.find((c) => c.org && e.org.startsWith(c.org));
    entries.push({
      kind: 'Role',
      title: e.org,
      detail: e.title,
      date: y.label,
      href: study ? `/work/${study.slug}` : undefined,
      start: y.start,
      end: y.end,
    });
  }

  // Founded companies with a case study (the org-less ones with a period).
  for (const c of caseStudies) {
    if (c.org || !c.period) continue;
    const y = parseYears(c.period);
    entries.push({
      kind: 'Venture',
      title: c.title,
      detail: c.role ?? c.tagline,
      date: y.label,
      href: `/work/${c.slug}`,
      start: y.start,
      end: y.end,
    });
  }

  for (const h of hackathons) {
    const y = parseYears(h.event);
    entries.push({
      kind: h.won ? 'Award' : 'Hackathon',
      result: h.won ? h.award : undefined,
      title: stripYear(h.event),
      detail: `${h.name}, ${lowerFirst(h.tagline)}`,
      date: y.label,
      href: h.href ?? h.githubUrl,
      external: !h.href && Boolean(h.githubUrl),
      start: y.start,
      end: y.end,
    });
  }

  // Recognition that isn't already a hackathon award (e.g. SAIL).
  for (const r of recognition) {
    const [result] = r.title.split(',');
    if (hackathons.some((h) => h.won && h.award === result)) continue;
    const y = parseYears(r.year);
    entries.push({
      kind: 'Program',
      title: r.title,
      detail: r.detail.split('. ')[0].replace(/\.$/, ''),
      date: y.label,
      start: y.start,
      end: y.end,
    });
  }

  // Undated ventures sit at the end; in-progress ones read as current.
  for (const v of ventures) {
    const ongoing = v.status === 'in-progress';
    entries.push({
      kind: 'Project',
      title: v.name,
      detail: v.metric ? `${v.tagline}. ${v.metric.value} ${lowerFirst(v.metric.label)}` : v.tagline,
      date: ongoing ? 'Now' : '—',
      start: -Infinity,
      end: ongoing ? Infinity : -Infinity,
    });
  }

  return entries.sort(
    (a, b) =>
      b.end - a.end || b.start - a.start || kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind)
  );
}
