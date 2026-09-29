import type { Metadata } from 'next';
import '@/app/styles/home.css';

import { WorkList } from '@/components/work/WorkList';
import { ShippedStrip } from '@/components/home/ShippedStrip';
import { Hero } from '@/components/home/Hero';
import { SectionHead } from '@/components/home/SectionHead';
import { Principles } from '@/components/home/Principles';
import { TrackRecord } from '@/components/home/TrackRecord';
import { NowBrief } from '@/components/home/NowBrief';
import { ArrowLink } from '@/components/home/ArrowLink';
import { featuredSlugs } from '@/content/caseStudies';
import { now } from '@/content/now';
import { seo } from '@/content/profile';

// Root layout carries the site-wide description and Open Graph card.
export const metadata: Metadata = {
  title: { absolute: seo.title },
  alternates: { canonical: '/' },
};

const section = 'page-x mx-auto max-w-page py-24 md:py-40';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section aria-labelledby="work-title" className={`${section} pt-0 md:pt-0`}>
        <SectionHead
          index={1}
          label="Selected work"
          id="work-title"
          title="Things I shipped"
          aside={<ArrowLink href="/work">All work</ArrowLink>}
        />
        <div className="mt-12 md:mt-16">
          <WorkList slugs={featuredSlugs} />
        </div>
        <div className="grid-page mt-10">
          <div className="col-span-4 md:col-span-9 md:col-start-4">
            <ArrowLink href="/work">All work</ArrowLink>
          </div>
        </div>
      </section>

      <ShippedStrip />

      <section aria-labelledby="principles-title" className={section}>
        <SectionHead index={2} label="Principles" id="principles-title" title="How I build" />
        <Principles />
      </section>

      <section aria-labelledby="record-title" className={`${section} pt-0 md:pt-0`}>
        <SectionHead index={3} label="Log" id="record-title" title="Track record" aside="Newest first" />
        <TrackRecord />
      </section>

      <section aria-labelledby="now-title" className={`${section} pt-0 md:pt-0`}>
        <SectionHead
          index={4}
          label="Now"
          id="now-title"
          title="Right now"
          size="md"
          aside={<>Updated {now.updated}</>}
        />
        <NowBrief />
      </section>
    </>
  );
}
