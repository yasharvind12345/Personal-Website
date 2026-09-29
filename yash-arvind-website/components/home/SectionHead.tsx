import type { ReactNode } from 'react';
import { SplitReveal } from '@/components/motion/SplitReveal';

/**
 * Section opener: an ink rule, the "(0n)" index and label in the left rail
 * (cols 1–3), and the headline set from col 4.
 */
export function SectionHead({
  index,
  label,
  title,
  id,
  aside,
  size = 'lg',
}: {
  index: number;
  label: string;
  title: ReactNode;
  id: string;
  aside?: ReactNode;
  size?: 'lg' | 'md';
}) {
  return (
    <header className="grid-page gap-y-6 border-t border-ink pt-3">
      <p className="meta col-span-2 md:col-span-3">
        <span className="num text-ink">({String(index).padStart(2, '0')})</span>
        <span className="ml-3">{label}</span>
      </p>
      <div className="meta col-span-2 text-right md:col-span-3 md:col-start-10">{aside}</div>
      <SplitReveal
        as="h2"
        id={id}
        className={`display col-span-4 md:col-span-9 md:col-start-4 ${
          size === 'lg' ? 'text-display-lg' : 'text-display-md'
        }`}
      >
        {title}
      </SplitReveal>
    </header>
  );
}
