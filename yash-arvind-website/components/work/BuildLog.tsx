import { Link } from 'next-view-transitions';
import type { Hackathon, Venture } from '@/content/types';

const yearOf = (event: string) => event.match(/\b20\d{2}\b/)?.[0] ?? '';
const eventName = (event: string) => event.replace(/\s*\b20\d{2}\b/, '').trim();

/** Dense ruled log of hackathons and ventures, like the notes at the back of a report. */
export function BuildLog({ hackathons, ventures }: { hackathons: Hackathon[]; ventures: Venture[] }) {
  const byYear = [...hackathons].sort((a, b) => yearOf(b.event).localeCompare(yearOf(a.event)));

  return (
    <div className="space-y-16 md:space-y-20">
      <div>
        <h3 className="meta grid-page border-b border-ink pb-3">
          <span className="col-span-3 md:col-span-9">Hackathons</span>
          <span className="col-span-1 text-right md:col-span-3">Year</span>
        </h3>
        <ul>
          {byYear.map((h) => (
            <li key={h.name} className="grid-page items-baseline gap-y-1.5 border-b border-rule py-5">
              <p className="meta col-span-4 text-ink md:order-none md:col-span-3">
                {h.award} <span className="text-muted">· {eventName(h.event)}</span>
              </p>
              <p className="col-span-3 text-lg font-medium leading-snug md:col-span-3">{h.name}</p>
              <p className="meta col-span-1 text-right md:hidden">{yearOf(h.event)}</p>
              <p className="col-span-4 leading-snug text-muted md:col-span-3">{h.tagline}</p>
              <p className="col-span-3 font-mono text-xs uppercase tracking-wider md:col-span-2">
                {h.href ? (
                  <Link href={h.href} className="link-draw hover:text-accent">
                    Case study <span aria-hidden="true">→</span>
                  </Link>
                ) : h.githubUrl ? (
                  <a href={h.githubUrl} target="_blank" rel="noopener noreferrer" className="link-draw hover:text-accent">
                    GitHub <span aria-hidden="true">↗</span>
                    <span className="sr-only"> repository for {h.name}</span>
                  </a>
                ) : null}
              </p>
              <p className="meta hidden text-right md:col-span-1 md:block">{yearOf(h.event)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="meta grid-page border-b border-ink pb-3">
          <span className="col-span-3 md:col-span-9">Ventures &amp; side projects</span>
          <span className="col-span-1 text-right md:col-span-3">Status</span>
        </h3>
        <ul>
          {ventures.map((v) => (
            <li key={v.name} className="grid-page items-baseline gap-y-1.5 border-b border-rule py-5">
              <p className={`col-span-4 md:col-span-3 ${v.metric ? '' : 'hidden md:block'}`}>
                {v.metric ? (
                  <>
                    <span className="num text-lg">{v.metric.value}</span>{' '}
                    <span className="meta">{v.metric.label}</span>
                  </>
                ) : (
                  <span className="meta">—</span>
                )}
              </p>
              <p className="col-span-3 text-lg font-medium leading-snug md:col-span-3">{v.name}</p>
              <p className="meta col-span-1 text-right md:hidden">{v.status === 'in-progress' ? 'Now' : 'Done'}</p>
              <p className="col-span-4 leading-snug text-muted md:col-span-3">{v.tagline}</p>
              <p className="meta hidden text-right md:col-span-3 md:block">
                {v.status === 'in-progress' ? 'In progress' : 'Completed'}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
