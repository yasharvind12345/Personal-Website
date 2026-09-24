import { renderOgImage, ogSize } from '@/lib/og';
import { caseStudies, getCaseStudy } from '@/content/caseStudies';

export const alt = 'Yash Arvind case study';
export const size = ogSize;
export const contentType = 'image/png';

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default function OpengraphImage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  const eyebrow = ['Case study', study?.org].filter(Boolean).join(' · ');

  return renderOgImage({
    eyebrow,
    title: study?.title ?? 'Yash Arvind',
    subtitle: study?.tagline ?? '',
  });
}
