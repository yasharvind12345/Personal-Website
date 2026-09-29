'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from './gsap';

/**
 * Native scrolling (no smooth-scroll library: trackpads already have momentum,
 * and a second layer of easing made two-finger scrolling feel off). This only
 * re-measures ScrollTriggers once web fonts have settled the layout.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return <>{children}</>;
}
