import { SplitReveal } from '@/components/motion/SplitReveal';
import { LogList } from './LogList';
import { entries } from './entries';
import '@/app/styles/log.css';

// Oldest and newest dated versions, for the range under the headline.
const dated = entries.map((e) => e.date).filter((d) => /^\d{4}/.test(d)).sort();
const first = dated[0];
const latest = dated[dated.length - 1];

/** (03) Log: release notes for a person. Filters and motion live in LogList. */
export function Changelog() {
  return (
    <section id="log" aria-labelledby="log-title" className="page-x mx-auto max-w-page pb-24 pt-28 md:pb-36 md:pt-40">
      <div className="grid-page items-end gap-y-6">
        <div className="col-span-4 md:col-span-8">
          <p className="meta mb-5 md:mb-7">
            <span className="num">(03)</span> Log
          </p>
          <SplitReveal as="h2" id="log-title" className="display text-display-lg">
            Changelog<span className="text-accent">.</span>
          </SplitReveal>
        </div>
        <p className="col-span-4 max-w-sm text-base leading-snug text-muted md:col-span-4 md:col-start-9 md:justify-self-end md:pb-2 md:text-right">
          Release notes, newest first.{' '}
          <span className="num whitespace-nowrap text-sm text-ink">
            v{first}&thinsp;→&thinsp;v{latest}
          </span>
        </p>
      </div>

      <LogList />
    </section>
  );
}
