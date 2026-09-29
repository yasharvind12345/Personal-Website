import { Link } from 'next-view-transitions';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { CopyEmail } from '@/components/CopyEmail';
import { profile, education } from '@/content/profile';
import { caseStudies } from '@/content/caseStudies';
import { HeroMotion } from './HeroMotion';
import { LocalTime } from './LocalTime';

const { before, emphasis, after } = profile.statement;
// A closing period on the statement is set in the accent, like the footer line.
const afterText = after.endsWith('.') ? after.slice(0, -1) : after;
const afterStop = after.endsWith('.');

// "Mountain View, CA" -> "Mountain View": the state is noise in a one-line status.
const cities = profile.relocationCities.map((c) => c.split(',')[0]);

const school = education.school.replace('University of Wisconsin', 'UW');

// Companies Yash co-founded: the case studies without a host org.
const founded = caseStudies.filter((c) => !c.org && c.period).map((c) => c.title);
const listJoin = (items: string[]) =>
  items.length < 3 ? items.join(' and ') : `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;

export function Hero() {
  return (
    <section aria-label="Introduction" className="page-x mx-auto max-w-page pb-24 pt-6 md:pb-36 md:pt-10">
      <HeroMotion>
        {/* Masthead row */}
        <div className="grid-page meta gap-y-2 border-b border-rule pb-3">
          <p data-hero-item className="col-span-2 md:col-span-3">
            <LocalTime place={profile.location.split(',')[0]} timeZone={profile.timezone} />
          </p>
          <p data-hero-item className="col-span-2 text-right md:col-span-3 md:text-left">
            {school}
          </p>
          <p data-hero-item className="col-span-2 md:col-span-3">
            Graduating {profile.graduation}
          </p>
          <p data-hero-item className="col-span-2 hidden text-right md:col-span-3 md:block">
            {education.degree}
          </p>
        </div>

        <SplitReveal
          as="h1"
          immediate
          className="display mt-10 max-w-[14ch] text-display-xl md:mt-12 lg:max-w-[16ch]"
        >
          {before} <span className="hero-emphasis font-serif font-normal italic">{emphasis}</span> {afterText}
          {afterStop && <span className="text-accent">.</span>}
        </SplitReveal>

        <div className="grid-page mt-14 gap-y-12 md:mt-16">
          {/* Byline */}
          <div data-hero-item className="col-span-4 md:col-span-4 md:row-start-1">
            <p className="meta mb-3">By</p>
            <p className="display text-display-sm uppercase">{profile.name}</p>
            <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted">
              Product builder. Co-founder of {listJoin(founded)}.
            </p>
          </div>

          {/* Lede and proofs */}
          <div className="col-span-4 md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1">
            <p data-hero-item className="max-w-[36ch] text-xl leading-snug md:text-[1.625rem] md:leading-[1.3]">
              {profile.summary[0]}
            </p>

            <ol className="mt-10 border-b border-rule md:mt-12" aria-label="Selected results">
              {profile.proofs.map((proof, i) => (
                <li key={proof.href} data-hero-item className="border-t border-rule">
                  <Link
                    href={proof.href}
                    className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 py-4 transition-colors duration-200 hover:text-accent focus-visible:text-accent md:grid-cols-[2.5rem_7rem_1fr_auto] md:gap-x-4"
                  >
                    <span className="num col-start-1 row-start-1 text-xs text-muted transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="meta col-start-2 row-start-1 transition-colors group-hover:text-accent">
                      {proof.label}
                    </span>
                    <span className="col-start-2 row-start-2 mt-1 text-base leading-snug md:col-start-3 md:row-start-1 md:mt-0 md:text-lg">
                      {proof.text}
                    </span>
                    <span
                      aria-hidden="true"
                      className="col-start-3 row-start-1 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 md:col-start-4"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions and status */}
          <div data-hero-item className="col-span-4 md:col-span-4 md:row-start-2 md:self-end">
            <div className="flex flex-wrap gap-3">
              <a href={profile.resumePath} target="_blank" rel="noopener noreferrer" className="btn">
                Résumé ↗
              </a>
              <CopyEmail label="Copy email" className="btn btn-solid" />
            </div>
            <dl className="mt-8 space-y-2 font-mono text-xs leading-relaxed">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 uppercase tracking-wider text-muted">
                  <span aria-hidden="true" className="mr-1.5 inline-block h-1.5 w-1.5 translate-y-[-1px] bg-accent" />
                  Open to
                </dt>
                <dd>{profile.roles.join(' · ')}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 pl-3 uppercase tracking-wider text-muted">Cities</dt>
                <dd>{cities.join(' · ')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </HeroMotion>
    </section>
  );
}
