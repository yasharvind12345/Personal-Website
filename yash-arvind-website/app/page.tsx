import type { Metadata } from 'next';

import { Hero } from '@/components/hero/Hero';
import { WorkReel } from '@/components/reel/WorkReel';
import { Principles } from '@/components/principles/Principles';
import { Changelog } from '@/components/log/Changelog';
import { About } from '@/components/about/About';
import { StudySheet } from '@/components/study/StudySheet';
import { HiddenKeys } from '@/components/keys/HiddenKeys';
import { seo } from '@/content/profile';

// Root layout carries the site-wide description and Open Graph card.
export const metadata: Metadata = {
  title: { absolute: seo.title },
  alternates: { canonical: '/' },
};

/** The whole site is this one page. Each section component renders its own <section id>. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkReel />
      <Principles />
      <Changelog />
      <About />
      <StudySheet />
      <HiddenKeys />
    </>
  );
}
