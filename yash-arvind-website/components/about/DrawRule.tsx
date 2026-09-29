'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/components/motion/gsap';

/**
 * A 1px rule that draws in from the left when scrolled into view.
 * Without motion (or before JS) it is simply there.
 */
export function DrawRule({ className = 'bg-rule' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return <div ref={ref} aria-hidden="true" className={`h-px origin-left ${className}`} />;
}
