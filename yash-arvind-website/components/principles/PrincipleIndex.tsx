'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { principles } from '@/content/principles';
import { caseStudies } from '@/content/caseStudies';
import { openStudy } from '@/components/study/store';
import './principles.css';

const pad = (n: number) => String(n).padStart(2, '0');
const studyName = (slug?: string) => caseStudies.find((c) => c.slug === slug)?.title;

/**
 * Numbered index of principles. Desktop: titles on the left, the open one's body
 * and evidence on the right, beside its title; hover or keyboard focus opens.
 * Phones: an accordion, tap to open. One open at a time, the first by default.
 */
export function PrincipleIndex() {
  const [active, setActive] = useState<number | null>(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const wide = () => window.matchMedia('(min-width: 768px)').matches;

  // md+: slide the detail column down so it sits beside the open title
  // (clamped so it never runs past the end of the list).
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const place = () => {
      if (!wide() || active === null) return grid.style.setProperty('--pr-y', '0px');
      const head = grid.querySelectorAll<HTMLElement>('.pr-head')[active];
      const panel = grid.querySelectorAll<HTMLElement>('.pr-panel')[active];
      if (!head || !panel) return;
      const inner = panel.querySelector<HTMLElement>('.pr-in');
      const room = grid.offsetHeight - (inner?.offsetHeight ?? 0) - 32;
      grid.style.setProperty('--pr-y', `${Math.max(0, Math.min(head.offsetTop, room))}px`);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(grid);
    return () => ro.disconnect();
  }, [active]);

  return (
    <div ref={gridRef} className="pr-grid" style={{ '--n': principles.length } as CSSProperties}>
      {principles.map((p, i) => {
        const open = active === i;
        const name = studyName(p.slug);
        return (
          <Fragment key={p.title}>
            <h3 className="pr-head" style={{ '--row': i + 1 } as CSSProperties}>
              <button
                type="button"
                id={`pr-btn-${i}`}
                aria-expanded={open}
                aria-controls={`pr-panel-${i}`}
                data-open={open ? '' : undefined}
                data-dim={active !== null && !open ? '' : undefined}
                className="pr-btn"
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse' && wide()) setActive(i);
                }}
                onFocus={(e) => {
                  if (e.currentTarget.matches(':focus-visible')) setActive(i);
                }}
                onClick={() => setActive((cur) => (wide() ? i : cur === i ? null : i))}
              >
                <span className="pr-num num">{pad(i + 1)}</span>
                <span className="pr-title display">{p.title}</span>
                <span className="pr-sign" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={`pr-panel-${i}`}
              role="region"
              aria-labelledby={`pr-btn-${i}`}
              className="pr-panel"
              data-open={open ? '' : undefined}
            >
              <div className="pr-clip">
                <div className="pr-in">
                  <p className="meta pr-count mb-5">
                    <span className="text-accent">{pad(i + 1)}</span> / {pad(principles.length)}
                  </p>
                  <p className="text-lg leading-snug md:text-xl md:leading-snug">{p.body}</p>
                  <div className="mt-6 border-t border-rule pt-4">
                    <p className="meta mb-2">Evidence</p>
                    <p className="text-sm leading-relaxed text-ink/80">{p.evidence}</p>
                    {p.slug && (
                      <button
                        type="button"
                        tabIndex={open ? undefined : -1}
                        onClick={() => openStudy(p.slug!)}
                        className="group mt-4 inline-flex items-baseline gap-2 font-mono text-xs uppercase tracking-wider hover:text-accent focus-visible:text-accent"
                      >
                        <span className="link-draw">Open {name ?? 'the case study'}</span>
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
