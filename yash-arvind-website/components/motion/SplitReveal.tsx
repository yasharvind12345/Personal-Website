'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap, SplitText, useGSAP, MOTION_OK } from './gsap';

interface SplitRevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Reveal on mount (hero) instead of when scrolled into view. */
  immediate?: boolean;
  delay?: number;
  id?: string;
}

/**
 * Masked line-by-line reveal for headlines (H1/H2 only). SplitText keeps
 * aria-label on the element so screen readers get the unsplit text.
 */
export function SplitReveal({
  as: Tag = 'h2',
  children,
  className,
  immediate = false,
  delay = 0,
  id,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit(self) {
            el.setAttribute('data-split-ready', '');
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.09,
              delay,
              ease: 'expo.out',
              scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%', once: true },
            });
          },
        });
        return () => split.revert();
      });
      // Reduced motion: just show it.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        el.setAttribute('data-split-ready', '');
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} id={id} className={className} data-split="">
      {children}
    </Tag>
  );
}
