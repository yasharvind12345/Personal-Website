'use client';

import { useEffect, useRef, useState } from 'react';
import type { CountableStat } from '@/content/types';

interface CountUpProps {
  display: string;
  countTo?: CountableStat['countTo'];
  duration?: number;
}

function format(n: number, decimals: number, prefix: string, suffix: string) {
  const number = n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${number}${suffix}`;
}

/**
 * Renders the final value on the server and on first client render, so the
 * real number is always in the HTML. If the stat starts below the fold and the
 * user hasn't asked for reduced motion, it counts up when scrolled into view.
 */
export function CountUp({ display, countTo, duration = 1500 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(display);

  useEffect(() => {
    const el = ref.current;
    if (!el || !countTo) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Already on screen: animating now would visibly flash back to zero.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    const { value, prefix = '', suffix = '', decimals = 0 } = countTo;
    let frame = 0;
    setText(format(0, decimals, prefix, suffix));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          if (progress < 1) {
            setText(format(eased * value, decimals, prefix, suffix));
            frame = requestAnimationFrame(tick);
          } else {
            setText(display);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      setText(display);
    };
  }, [display, countTo, duration]);

  return <span ref={ref}>{text}</span>;
}
