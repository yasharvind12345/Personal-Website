/**
 * STUB. Contract: `export function WorkList({ slugs }: { slugs: string[] })` renders
 * the typographic work list for those case-study slugs (data from content/caseStudies.ts
 * and content/media.ts). The work agent replaces this file.
 */
import { Link } from 'next-view-transitions';
import { getCaseStudy } from '@/content/caseStudies';

export function WorkList({ slugs }: { slugs: string[] }) {
  return (
    <ol>
      {slugs.map((slug) => {
        const study = getCaseStudy(slug);
        if (!study) return null;
        return (
          <li key={slug}>
            <Link href={`/work/${slug}`}>{study.title}</Link>
          </li>
        );
      })}
    </ol>
  );
}
