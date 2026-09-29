import type { CaseStudy } from '@/content/types';
import { caseStudies } from '@/content/caseStudies';
import { pad2, yearLabel } from './shared';

/**
 * Typographic stand-in when a case study has no cover image. Sized in container
 * units so the same composition reads at preview size (28vw) and hero size, which
 * keeps the list → hero morph seamless.
 */
export function WorkCover({ study }: { study: CaseStudy }) {
  const metric = study.metrics[0];
  const index = caseStudies.findIndex((s) => s.slug === study.slug);
  return (
    <div aria-hidden="true" className="h-full w-full bg-paper-deep text-ink [container-type:inline-size]">
      <div className="flex h-full flex-col justify-between p-[4.5cqw]">
        <div className="flex justify-between font-mono text-[max(0.625rem,1.5cqw)] uppercase tracking-[0.08em] text-muted">
          <span>Case study {pad2(index + 1)}</span>
          <span>{study.org ?? yearLabel(study.period)}</span>
        </div>
        {metric && (
          <div>
            <p className="num text-[17cqw] leading-[0.85]">{metric.value}</p>
            <p className="mt-[2cqw] font-mono text-[max(0.625rem,1.5cqw)] uppercase tracking-[0.08em] text-muted">
              {metric.label}
            </p>
          </div>
        )}
        <p className="display border-t border-ink pt-[2cqw] text-[5.5cqw] leading-none tracking-[-0.03em]">
          {study.title}
        </p>
      </div>
    </div>
  );
}
