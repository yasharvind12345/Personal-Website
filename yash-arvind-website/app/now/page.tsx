import { Link } from 'next-view-transitions';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { now } from '@/content/now';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Now',
  description: `What Yash Arvind is focused on right now. Updated ${now.updated}.`,
  path: '/now',
});

export default function NowPage() {
  return (
    <div className="page-x mx-auto max-w-page pb-20 pt-12 md:pb-28 md:pt-20">
      <section aria-labelledby="now-title">
        <SplitReveal as="h1" id="now-title" immediate className="display text-display-xl">
          Now<span className="text-accent">.</span>
        </SplitReveal>

        <div className="grid-page mt-10 md:mt-16">
          <p className="meta num col-span-4 md:col-span-8 md:col-start-5">
            Updated {now.updated} <span aria-hidden="true">·</span> {now.location}
          </p>
        </div>

        <ul className="mt-6 border-b border-rule md:mt-8">
          {now.items.map((item, i) => (
            <li key={item.label} className="grid-page gap-y-2 border-t border-rule py-6 md:py-8">
              <p className="meta col-span-4 flex gap-6 pt-1.5 md:pt-2.5">
                <span className="num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-ink">{item.label}</span>
              </p>
              <p className="col-span-4 max-w-3xl text-xl leading-snug md:col-span-8 md:text-[1.75rem] md:leading-[1.25] md:tracking-[-0.01em]">
                {item.href ? (
                  <Link href={item.href} className="group">
                    <span className="link-draw group-hover:text-accent">{item.text}</span>
                    <span aria-hidden="true" className="ml-2 text-accent">
                      →
                    </span>
                  </Link>
                ) : (
                  item.text
                )}
              </p>
            </li>
          ))}
        </ul>

        <p className="meta mt-10 grid-page">
          <span className="col-span-4 md:col-span-8 md:col-start-5">
            This is a now page.{' '}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw text-ink hover:text-accent"
            >
              What is a now page? ↗
            </a>
          </span>
        </p>
      </section>
    </div>
  );
}
