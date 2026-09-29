'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

/**
 * Smooth scroll (Lenis) driven by GSAP's ticker so ScrollTrigger and Lenis
 * share one clock. Under reduced motion Lenis is never created and the page
 * scrolls natively.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();
  const reduced = useRef<boolean | null>(null);
  if (reduced.current === null && typeof window !== 'undefined') {
    reduced.current = prefersReducedMotion();
  }

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    lenis.on('scroll', ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
      lenis.off('scroll', ScrollTrigger.update);
    };
  }, []);

  // Back/forward should restore position, so only forward navigations reset scroll.
  const fromHistory = useRef(false);
  useEffect(() => {
    const onPop = () => (fromHistory.current = true);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // New route: start at the top, then re-measure triggers once layout settles.
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    const restoring = fromHistory.current;
    fromHistory.current = false;
    if (!restoring && !window.location.hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Server render and reduced motion: no Lenis.
  if (reduced.current !== false) return <>{children}</>;

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
