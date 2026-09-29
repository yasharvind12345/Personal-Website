import { SplitReveal } from '@/components/motion/SplitReveal';
import { principles } from '@/content/principles';
import { PrincipleIndex } from './PrincipleIndex';

/** "How I build": a short numbered index of principles, each opening onto the work that proves it. */
export function Principles() {
  const words = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const count = words[principles.length] ?? String(principles.length);
  return (
    <section id="principles" aria-labelledby="principles-title" className="page-x mx-auto max-w-page py-24 md:py-36">
      <div className="grid-page items-end gap-y-6 border-b border-rule pb-6 md:pb-8">
        <div className="col-span-4 md:col-span-8">
          <p className="meta mb-5">(02) Principles</p>
          <SplitReveal id="principles-title" className="display text-display-lg">
            How I <span className="font-serif font-normal italic tracking-normal">build</span>
          </SplitReveal>
        </div>
        <p className="col-span-4 max-w-[34ch] text-base leading-snug text-muted md:col-span-4 md:col-start-9 md:justify-self-end md:text-right">
          {count} rules I keep coming back to, each learned on a real project. Open one to see the work behind it.
        </p>
      </div>
      <PrincipleIndex />
    </section>
  );
}
