import { Link } from 'next-view-transitions';
import type { Experience } from '@/content/types';
import { DrawRule } from './DrawRule';

/** Résumé-style timeline: org and dates on the left, the work on the right. */
export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <ol className="space-y-16 md:space-y-24">
      {items.map((job) => (
        <li key={`${job.org}-${job.period}`}>
          <DrawRule />
          <article className="grid-page gap-y-6 pt-6">
            <header className="col-span-4 md:sticky md:top-24 md:self-start">
              <h3 className="display text-display-sm">{job.org}</h3>
              <p className="meta num mt-3">{job.period}</p>
            </header>

            <div className="col-span-4 md:col-span-8">
              <p className="text-xl font-medium leading-snug md:text-2xl">{job.title}</p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{job.summary}</p>

              <ul className="mt-8 max-w-3xl space-y-3">
                {job.points.map((point) => (
                  <li key={point} className="grid grid-cols-[1.5rem_1fr] leading-relaxed">
                    <span aria-hidden="true" className="text-muted">
                      –
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {job.products?.length ? (
                <div className="mt-10 max-w-3xl">
                  <p className="meta mb-3">Shipped</p>
                  <ul className="border-b border-rule">
                    {job.products.map((product) => (
                      <li
                        key={product.name}
                        className="grid gap-x-6 gap-y-1 border-t border-rule py-4 md:grid-cols-[minmax(0,17rem)_1fr]"
                      >
                        {product.href ? (
                          <Link href={product.href} className="group font-medium">
                            <span className="link-draw group-hover:text-accent">{product.name}</span>
                            <span aria-hidden="true" className="ml-1.5 text-accent">
                              →
                            </span>
                          </Link>
                        ) : (
                          <span className="font-medium">{product.name}</span>
                        )}
                        <span className="text-muted">{product.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {job.note ? <p className="mt-6 max-w-3xl text-muted">{job.note}</p> : null}

              <p className="meta mt-8 max-w-3xl leading-relaxed">{job.tags.join(' · ')}</p>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
