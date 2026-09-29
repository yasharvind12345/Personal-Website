'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/components/motion/gsap';

/**
 * Staggers the hero's [data-hero-item] rows in once on load. CSS in
 * app/styles/home.css hides them until this runs; without JS or under
 * reduced motion they render in place.
 */
export function HeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(el.querySelectorAll('[data-hero-item]'), {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          stagger: 0.035,
          delay: 0.15,
          ease: 'expo.out',
        });
        el.setAttribute('data-hero-ready', '');
      });
      mm.add('(prefers-reduced-motion: reduce)', () => {
        el.setAttribute('data-hero-ready', '');
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} data-hero="" className={className}>
      {children}
    </div>
  );
}
