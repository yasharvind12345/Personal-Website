'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/components/motion/gsap';

/**
 * Draws each [data-rule] hairline inside it from the left as its row scrolls
 * into view. The rules are plain static lines until this runs.
 */
export function RuleDraw({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rules = gsap.utils.toArray<HTMLElement>('[data-rule]', el);
        gsap.set(rules, { scaleX: 0, transformOrigin: '0% 50%' });
        ScrollTrigger.batch(rules, {
          start: 'top 94%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { scaleX: 1, duration: 1.2, stagger: 0.07, ease: 'expo.out' }),
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
