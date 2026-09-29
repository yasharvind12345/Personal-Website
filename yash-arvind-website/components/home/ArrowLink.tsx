import { Link } from 'next-view-transitions';

/** Mono "Label →" link: underline draws in, arrow nudges right. */
export function ArrowLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-block font-mono text-xs uppercase tracking-wider ${className}`}>
      <span className="link-draw transition-colors group-hover:text-accent group-hover:[background-size:100%_1px] group-focus-visible:text-accent group-focus-visible:[background-size:100%_1px]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="ml-2 inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-accent"
      >
        →
      </span>
    </Link>
  );
}
