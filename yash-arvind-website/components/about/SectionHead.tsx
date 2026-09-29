import { SplitReveal } from '@/components/motion/SplitReveal';
import { DrawRule } from './DrawRule';

/** Ink rule, mono index in the left column, H2 set in the content column. */
export function SectionHead({ index, id, title }: { index: string; id: string; title: string }) {
  return (
    <div className="mb-10 md:mb-16">
      <DrawRule className="bg-ink" />
      <div className="grid-page items-baseline gap-y-3 pt-4">
        <p className="meta num col-span-4 md:col-span-4">{index}</p>
        <SplitReveal as="h2" id={id} className="display col-span-4 text-display-md md:col-span-8">
          {title}
        </SplitReveal>
      </div>
    </div>
  );
}
