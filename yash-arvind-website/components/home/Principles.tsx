import { Link } from 'next-view-transitions';
import { principles } from '@/content/principles';

/** "How I build": number and title on the left, body and evidence on the right. */
export function Principles() {
  return (
    <ol className="mt-14 border-b border-rule md:mt-20">
      {principles.map((p, i) => (
        <li key={p.title} className="grid-page gap-y-4 border-t border-rule py-8 md:py-12">
          <p className="num col-span-4 text-sm text-muted md:col-span-3">
            {String(i + 1).padStart(2, '0')}
            <span className="text-rule"> / {String(principles.length).padStart(2, '0')}</span>
          </p>
          <h3 className="display col-span-4 text-display-sm md:col-span-5">{p.title}</h3>
          <div className="col-span-4 md:col-span-4 md:col-start-9">
            <p className="max-w-prose text-base leading-relaxed text-ink/80">{p.body}</p>
            <p className="mt-5 font-mono text-xs leading-relaxed text-muted">
              <span className="uppercase tracking-wider">Evidence</span>
              <span aria-hidden="true"> — </span>
              {p.href ? (
                <Link href={p.href} className="group text-ink transition-colors hover:text-accent">
                  <span className="link-draw">{p.evidence}</span>
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              ) : (
                <span className="text-ink">{p.evidence}</span>
              )}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
