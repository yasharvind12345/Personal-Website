'use client';

import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/components/motion/gsap';
import { pad2 } from './shared';

interface TocProps {
  sections: { id: string; title: string }[];
  /** Element whose scroll span drives the progress rule. */
  bodyId: string;
}

/**
 * Sticky contents for a case study: highlights the section in view and fills a
 * hairline as you read. Position indicators, not animation, so they run under
 * reduced motion too; without JS it's a plain list of anchors.
 */
export function CaseStudyToc({ sections, bodyId }: TocProps) {
  const [active, setActive] = useState(sections[0]?.id);
  const barRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const body = document.getElementById(bodyId);
      const bar = barRef.current;
      if (!body || !bar) return;

      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 40%',
          end: 'bottom 40%',
          onToggle: (self) => self.isActive && setActive(id),
        });
      });

      const progress = ScrollTrigger.create({
        trigger: body,
        start: 'top 40%',
        end: 'bottom bottom',
        onUpdate: (self) => gsap.set(bar, { scaleY: self.progress }),
      });
      gsap.set(bar, { scaleY: progress.progress });
    },
    { scope: navRef }
  );

  return (
    <nav ref={navRef} aria-label="On this page" className="sticky top-28">
      <p className="meta mb-5">Contents</p>
      <div className="relative pl-5">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-rule" />
        <span
          ref={barRef}
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-ink"
        />
        <ol className="space-y-1">
          {sections.map(({ id, title }, i) => {
            const current = id === active;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={current ? 'location' : undefined}
                  className={`flex items-baseline gap-3 py-1 text-sm transition-colors duration-300 hover:text-ink ${
                    current ? 'text-ink' : 'text-muted'
                  }`}
                >
                  <span className={`num text-xs ${current ? 'text-accent' : ''}`}>{pad2(i + 1)}</span>
                  {title}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
