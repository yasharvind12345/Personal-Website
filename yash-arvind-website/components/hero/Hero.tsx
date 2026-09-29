import { profile, education } from '@/content/profile';
import { KeysHint } from '@/components/keys/KeysHint';
import { HeroStatement } from './HeroStatement';
import { HeroReveal } from './HeroReveal';
import { LocalClock } from './LocalClock';
import { NowTicker } from './NowTicker';
import '@/app/styles/hero.css';

const city = profile.location.split(',')[0];
const school = education.school.replace('University of Wisconsin', 'UW');
const classOf = `’${education.period.slice(-2)}`;
const degree = education.degree.replace(/^B\.S\.\s*/, '');

const links = [
  { label: 'GitHub', href: profile.socials.github.href },
  { label: 'LinkedIn', href: profile.socials.linkedin.href },
  { label: 'Résumé', href: profile.resumePath },
];

/**
 * First screen. The statement is the whole show (variable-width letters that
 * lean toward the cursor); everything around it is small, mono, and quiet.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="hero page-x mx-auto flex min-h-[calc(100svh-4rem)] max-w-page flex-col pb-8 pt-4 md:pb-10 md:pt-6"
    >
      <HeroReveal className="flex flex-1 flex-col">
        {/* Masthead */}
        <div className="grid-page meta gap-y-1.5 pb-3">
          <p data-hero-item className="col-span-2 whitespace-nowrap md:col-span-3">
            {city} · <LocalClock timeZone={profile.timezone} />
          </p>
          <p data-hero-item className="col-span-2 text-right md:col-span-3 md:text-left">
            {school} {classOf}
          </p>
          <p data-hero-item className="col-span-4 md:col-span-3">
            {degree}
          </p>
          <p data-hero-item className="hidden text-right md:col-span-3 md:block">
            <KeysHint>
              Press <kbd className="text-ink">?</kbd> for hidden keys
            </KeysHint>
          </p>
        </div>
        <span data-hero-rule aria-hidden="true" className="block h-px bg-rule" />

        <div className="flex flex-1 flex-col justify-center py-9 md:py-10">
          <HeroStatement />
        </div>

        <span data-hero-rule aria-hidden="true" className="block h-px bg-rule" />
        <div className="grid-page gap-y-10 pt-5 md:pt-6">
          <p
            data-hero-item
            className="col-span-4 max-w-[40ch] text-lg leading-snug md:col-span-6 md:text-xl md:leading-snug"
          >
            Technical product builder. I take ambiguous financial, billing, and AI workflows and ship them as products
            with measurable outcomes.
          </p>
          <div data-hero-item className="col-span-4 md:col-span-5 md:col-start-8">
            <NowTicker />
          </div>
        </div>

        <div data-hero-item className="mt-10 flex items-end justify-between gap-6 md:mt-12">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-wider">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-draw hover:text-accent">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#work"
            className="hero-cue group flex items-center gap-3 font-mono text-xs uppercase tracking-wider hover:text-accent"
          >
            <span className="hidden sm:inline">Selected work</span>
            <span className="hero-cue-line" aria-hidden="true" />
            <span className="sr-only sm:hidden">Scroll to selected work</span>
          </a>
        </div>
      </HeroReveal>
    </section>
  );
}
