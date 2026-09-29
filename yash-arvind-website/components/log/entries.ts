import { experience } from '@/content/experience';
import { hackathons, recognition } from '@/content/hackathons';
import { ventures } from '@/content/ventures';
import { caseStudies } from '@/content/caseStudies';
import { education } from '@/content/profile';

/**
 * The Log: release notes for a person, newest first.
 *
 * Every fact comes from /content. Dates are `YYYY.MM` when the month is known
 * and `YYYY` when only the year is. Work that has a case study stays one short
 * line and opens the study; it is described in full elsewhere.
 */

export type LogKind = 'SHIPPED' | 'WON' | 'JOINED' | 'STARTED' | 'BUILT' | 'RUNNING' | 'ACCEPTED';

export interface LogEntry {
  id: string;
  /** `2026.08`, `2026`, `Now`, or `—` when undated. */
  date: string;
  kind: LogKind;
  title: string;
  line: string;
  /** Case study to open in place. */
  slug?: string;
  /** Public source code. */
  code?: string;
}

export const filters = [
  { id: 'all', label: 'All', kinds: null },
  { id: 'shipped', label: 'Shipped', kinds: ['SHIPPED'] },
  { id: 'won', label: 'Won', kinds: ['WON'] },
  { id: 'roles', label: 'Roles', kinds: ['JOINED', 'STARTED', 'ACCEPTED'] },
  { id: 'built', label: 'Built', kinds: ['BUILT', 'RUNNING'] },
] as const satisfies readonly { id: string; label: string; kinds: readonly LogKind[] | null }[];

export type FilterId = (typeof filters)[number]['id'];

export function matches(entry: LogEntry, filter: FilterId) {
  const kinds = filters.find((f) => f.id === filter)?.kinds;
  return !kinds || (kinds as readonly LogKind[]).includes(entry.kind);
}

// ---------------------------------------------------------------------------

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 'Jun 2026 – Aug 2026' → '2026.06' (the start); '2025 – Present' → '2025'. */
function version(period: string, which: 'start' | 'end' = 'start') {
  const parts = [...period.matchAll(/(?:([A-Z][a-z]{2})\s+)?((?:19|20)\d{2})/g)];
  const m = which === 'start' ? parts[0] : parts[parts.length - 1];
  if (!m) return '—';
  const month = m[1] ? MONTHS.indexOf(m[1]) + 1 : 0;
  return month ? `${m[2]}.${String(month).padStart(2, '0')}` : m[2];
}

const must = <T>(value: T | undefined, what: string): T => {
  if (value === undefined) throw new Error(`Log: missing content for ${what}`);
  return value;
};

const job = (org: string) => must(experience.find((e) => e.org.startsWith(org)), org);
const hack = (name: string) => must(hackathons.find((h) => h.name === name), name);
const study = (slug: string) => must(caseStudies.find((c) => c.slug === slug), slug);
const venture = (name: string) => must(ventures.find((v) => v.name === name), name);
const codeOf = (slug: string) => study(slug).links.find((l) => l.label === 'GitHub')?.href;
const eventName = (event: string) => event.replace(/\s*(?:19|20)\d{2}$/, '');
const eventYear = (event: string) => event.match(/(?:19|20)\d{2}/)?.[0] ?? '—';

const zendesk = job('Zendesk');
const ey = job('Ernst');
const synechron = job('Synechron');
const dib = study('zendesk-dib');
const tam = study('tam');
const flux = study('flux');
const ghostkeys = study('ghostkeys');
const aura = hack('AuraHealth');
const tamHack = hack('TAM');
const earningLens = hack('EarningLens');
const helloNeighbour = hack('HelloNeighbour');
const sail = must(
  recognition.find((r) => r.title.startsWith('Summer AI Lab')),
  'SAIL'
);
const trading = venture('AI Hedge Fund');
const stockSystem = venture('Stock Trading System');
const boxmate = venture('BoxMate');

export const entries: LogEntry[] = [
  {
    id: 'trading',
    date: trading.status === 'in-progress' ? 'Now' : '—',
    kind: 'RUNNING',
    title: 'An AI trading system',
    line: 'Agent-driven strategy execution, rebalancing, and risk controls on my own portfolio.',
  },
  {
    id: 'ghostkeys',
    date: version(must(ghostkeys.period, 'Ghostkeys period')),
    kind: 'BUILT',
    title: 'Ghostkeys',
    line: 'At Build Fest, with a team.',
    slug: ghostkeys.slug,
    code: codeOf(ghostkeys.slug),
  },
  {
    id: 'dib',
    // Shipped within the internship, which ended in August.
    date: version(must(dib.period, 'DIB period'), 'end'),
    kind: 'SHIPPED',
    title: 'Data Integrity Bot, to production',
    line: 'Quote-to-Cash reconciliation at Zendesk.',
    slug: dib.slug,
  },
  {
    id: 'zendesk-tools',
    date: version(zendesk.period).slice(0, 4),
    kind: 'SHIPPED',
    title: 'Two more internal AI tools',
    line: 'A token optimizer that cut AI spend by ~20%, and a documentation-freshness checker.',
  },
  {
    id: 'zendesk',
    date: version(zendesk.period),
    kind: 'JOINED',
    title: 'Zendesk',
    line: `${zendesk.title}.`,
  },
  {
    id: 'sail',
    date: sail.year,
    kind: 'ACCEPTED',
    title: 'Summer AI Lab (SAIL), UW–Madison',
    line: 'An agentic AI program co-sponsored by OpenAI.',
  },
  {
    id: 'aurahealth',
    date: eventYear(aura.event),
    kind: 'WON',
    title: `${aura.award}, ${eventName(aura.event)}`,
    line: `For ${aura.name}.`,
    slug: 'aurahealth',
    code: aura.githubUrl,
  },
  {
    id: 'maddata',
    date: eventYear(tamHack.event),
    kind: 'WON',
    title: `${tamHack.award}, ${eventName(tamHack.event)}`,
    line: `For ${tam.title}.`,
    slug: tam.slug,
    code: codeOf(tam.slug),
  },
  {
    id: 'helloneighbour',
    date: eventYear(helloNeighbour.event),
    kind: 'BUILT',
    title: helloNeighbour.name,
    line: `Anonymous voice notes between UW–Madison dorm neighbors, matched by a KNN written from scratch. ${eventName(helloNeighbour.event)}.`,
    code: helloNeighbour.githubUrl,
  },
  {
    id: 'ey',
    date: version(ey.period),
    kind: 'JOINED',
    title: 'EY',
    line: `${ey.title}. Financial due diligence on a live $78M M&A deal.`,
  },
  {
    id: 'earninglens',
    date: eventYear(earningLens.event),
    kind: 'WON',
    title: `${earningLens.award}, ${eventName(earningLens.event)}`,
    line: `For ${earningLens.name}, which fact-checks earnings-call guidance against SEC filings within 3 seconds.`,
    code: earningLens.githubUrl,
  },
  {
    id: 'tam',
    date: version(must(tam.period, 'TAM period')),
    kind: 'STARTED',
    title: tam.title,
    line: `${must(tam.role, 'TAM role').replace('Co-Founder', 'Co-founder')}.`,
    slug: tam.slug,
  },
  {
    id: 'flux',
    date: version(must(flux.period, 'Flux period')),
    kind: 'STARTED',
    title: flux.title,
    line: 'Co-founder. Live on the App Store.',
    slug: flux.slug,
  },
  {
    id: 'uw',
    date: version(education.period),
    kind: 'STARTED',
    title: 'UW–Madison',
    line: `${education.degree}.`,
  },
  {
    id: 'synechron',
    date: version(synechron.period),
    kind: 'JOINED',
    title: 'Synechron',
    line: `${synechron.title}. A claims-cost model that cut manual processing 70%.`,
  },
  {
    id: 'boxmate',
    date: boxmate.status === 'in-progress' ? 'Now' : '—',
    kind: 'SHIPPED',
    title: boxmate.name,
    line: `A ${boxmate.tagline.toLowerCase()}. ${boxmate.metric?.value ?? '$10K'} in revenue in its first two weeks.`,
  },
  {
    id: 'stock-system',
    date: stockSystem.status === 'in-progress' ? 'Now' : '—',
    kind: 'BUILT',
    title: 'A stock trading system',
    line: 'A PAMR mean-reversion engine with LLM market commentary.',
  },
];

export const counts = Object.fromEntries(
  filters.map((f) => [f.id, entries.filter((e) => matches(e, f.id)).length])
) as Record<FilterId, number>;
