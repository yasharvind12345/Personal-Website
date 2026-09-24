import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CaseStudyLayout } from '@/components';
import { caseStudies, getCaseStudy } from '@/content/caseStudies';
import { pageMetadata } from '@/lib/metadata';

interface Props {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};

  const title = study.org ? `${study.title} at ${study.org}` : study.title;
  return pageMetadata({
    title: `${title}: Case Study`,
    description: study.summary,
    path: `/work/${study.slug}`,
  });
}

export default function CaseStudyPage({ params }: Props) {
  const index = caseStudies.findIndex((study) => study.slug === params.slug);
  if (index === -1) notFound();

  const study = caseStudies[index];
  const nextStudy = caseStudies[(index + 1) % caseStudies.length];

  return <CaseStudyLayout study={study} nextStudy={nextStudy} />;
}
