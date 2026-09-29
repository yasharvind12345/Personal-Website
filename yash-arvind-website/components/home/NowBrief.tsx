import { Link } from 'next-view-transitions';
import { now } from '@/content/now';
import { ArrowLink } from './ArrowLink';

/** The first three /now items, labels in the rail. */
export function NowBrief() {
  return (
    <>
      <dl className="mt-12 border-b border-rule md:mt-16">
        {now.items.slice(0, 3).map((item) => (
          <div key={item.label} className="grid-page gap-y-2 border-t border-rule py-5 md:py-6">
            <dt className="meta col-span-4 md:col-span-3">{item.label}</dt>
            <dd className="col-span-4 max-w-[48ch] text-lg leading-snug md:col-span-7 md:col-start-4 md:text-xl">
              {item.href ? (
                <Link href={item.href} className="link-draw transition-colors hover:text-accent">
                  {item.text}
                </Link>
              ) : (
                item.text
              )}
            </dd>
          </div>
        ))}
      </dl>
      <div className="grid-page mt-8">
        <div className="col-span-4 md:col-span-9 md:col-start-4">
          <ArrowLink href="/now">More on /now</ArrowLink>
        </div>
      </div>
    </>
  );
}
