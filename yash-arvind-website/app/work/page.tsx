import { SplitReveal } from '@/components/motion/SplitReveal';
import { WorkList } from '@/components/work/WorkList';
import { BuildLog } from '@/components/work/BuildLog';
import { pad2 } from '@/components/work/shared';
import { caseStudies } from '@/content/caseStudies';
import { hackathons } from '@/content/hackathons';
import { ventures } from '@/content/ventures';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Work',
  description:
    'Case studies from Zendesk, TAM, Flux, and Cortexa, plus hackathon builds and side projects. Each one starts with the problem.',
  path: '/work',
});

export default function WorkPage() {
  return (
    <>
      <header className="page-x mx-auto max-w-page pb-16 pt-8 md:pb-24 md:pt-14">
        <p className="meta flex justify-between border-b border-rule pb-4">
          <span>Index</span>
          <span>
            {pad2(caseStudies.length)} case studies · {pad2(hackathons.length + ventures.length)} other builds
          </span>
        </p>
        <div className="grid-page mt-10 items-end gap-y-8 md:mt-16">
          <SplitReveal as="h1" immediate className="display col-span-4 text-display-xl md:col-span-7">
            Work
          </SplitReveal>
          <p className="col-span-4 max-w-md text-xl leading-snug md:col-span-5 md:col-start-8 md:pb-3 md:text-2xl">
            Products I’ve taken from a messy problem to{' '}
            <em className="font-serif font-normal italic">production</em>: internal tools at Zendesk and the
            companies I co-founded.
          </p>
        </div>
      </header>

      <section aria-labelledby="case-studies" className="page-x mx-auto max-w-page">
        <h2 id="case-studies" className="meta mb-4">
          Case studies
        </h2>
        <WorkList slugs={caseStudies.map((study) => study.slug)} />
      </section>

      <section aria-labelledby="builds" className="page-x mx-auto max-w-page py-24 md:py-36">
        <div className="grid-page mb-12 items-end gap-y-6 md:mb-16">
          <h2 id="builds" className="display col-span-4 text-display-md md:col-span-7">
            Hackathons &amp; other builds
          </h2>
          <p className="col-span-4 max-w-md leading-snug text-muted md:col-span-5 md:col-start-8">
            Built against the clock, plus the side ventures. Three hackathon awards: a 1st place, a 2nd place, and
            a Google Award.
          </p>
        </div>
        <BuildLog hackathons={hackathons} ventures={ventures} />
      </section>
    </>
  );
}
