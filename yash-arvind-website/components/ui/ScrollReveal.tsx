'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerIndex?: number;
}

/**
 * Fades content in when it scrolls into view.
 *
 * The content is fully visible in the server HTML. It is only hidden by the
 * `.js [data-reveal]` rule in globals.css, which applies once the inline script
 * in layout.tsx confirms JavaScript is running, so crawlers, link previews and
 * no-JS visitors always see it. Reduced-motion users skip the animation.
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  staggerIndex = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = '';
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayMs = Math.round((delay + staggerIndex * 0.08) * 1000);
  const style = delayMs ? ({ '--reveal-delay': `${delayMs}ms` } as CSSProperties) : undefined;

  return (
    <div ref={ref} data-reveal="" className={className} style={style}>
      {children}
    </div>
  );
}
