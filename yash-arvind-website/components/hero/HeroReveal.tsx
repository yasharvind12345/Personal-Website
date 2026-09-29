'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/components/motion/gsap';

/**
 * Brings the quiet parts of the hero ([data-hero-item]) in once, just behind the
 * statement's line reveal. Whole intro stays under 1.2s. CSS in hero.css hides
 * them until this runs; reduced motion or no JS renders them in place.
 */
export function HeroReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        el.setAttribute('data-hero-ready', '');
        const items = el.querySelectorAll('[data-hero-item]');
        gsap.from(items, { autoAlpha: 0, y: 10, duration: 0.7, stagger: 0.045, delay: 0.3, ease: 'expo.out' });
        gsap.from(el.querySelectorAll('[data-hero-rule]'), {
          scaleX: 0,
          transformOrigin: '0% 50%',
          duration: 1,
          delay: 0.1,
          ease: 'expo.out',
        });
      });
      mm.add('(prefers-reduced-motion: reduce)', () => {
        el.setAttribute('data-hero-ready', '');
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} data-hero-reveal="">
      {children}
    </div>
  );
}
