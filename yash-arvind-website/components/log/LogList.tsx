'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Flip } from 'gsap/Flip';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, prefersReducedMotion } from '@/components/motion/gsap';
import { openStudy, studyHref } from '@/components/study/store';
import { counts, entries, filters, matches, type FilterId, type LogEntry } from './entries';

if (typeof window !== 'undefined') gsap.registerPlugin(Flip);

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function Row({ entry, shown }: { entry: LogEntry; shown: boolean }) {
  return (
    <li data-log-row data-id={entry.id} className="log-row" style={shown ? undefined : { display: 'none' }}>
      <span data-log-rule aria-hidden="true" className="log-rule" />
      <div className="log-row-inner">
        <span className="log-date num">
          {entry.date === '—' ? <span title="Undated">—</span> : entry.date}
        </span>
        <span className="log-kind meta">{entry.kind}</span>
        <h3 className="log-title">{entry.title}</h3>
        <p className="log-line">{entry.line}</p>
        {entry.slug || entry.code ? (
          <span className="log-actions">
            {entry.slug ? (
              <a
                href={studyHref(entry.slug)}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                  event.preventDefault();
                  openStudy(entry.slug!);
                }}
                className="log-action"
                aria-label={`Open the ${entry.title} case study`}
              >
                Open<span aria-hidden="true"> ↗</span>
              </a>
            ) : null}
            {entry.code ? (
              <a
                href={entry.code}
                target="_blank"
                rel="noopener noreferrer"
                className="log-action"
                aria-label={`${entry.title} source code on GitHub`}
              >
                Code<span aria-hidden="true"> ↗</span>
              </a>
            ) : null}
          </span>
        ) : null}
      </div>
    </li>
  );
}

/**
 * Filterable log. Changing the filter runs a GSAP Flip: leaving rows collapse,
 * the rest slide into place, and the list height eases to its new size.
 * Hairlines draw in from the left the first time each row enters the viewport.
 */
export function LogList() {
  const [filter, setFilter] = useState<FilterId>('all');
  const listRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const flip = useRef<{ state: Flip.FlipState; height: number } | null>(null);
  const rulesDone = useRef(false);

  const choose = (id: FilterId) => {
    if (id === filter) return;
    const list = listRef.current;
    if (list && !prefersReducedMotion()) {
      flip.current = {
        state: Flip.getState(list.querySelectorAll('[data-log-row]'), { props: 'opacity' }),
        height: list.offsetHeight,
      };
    }
    setFilter(id);
  };

  // Hairlines draw in once, as rows enter.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (rulesDone.current) return;
        const rules = gsap.utils.toArray<HTMLElement>('[data-log-rule]');
        gsap.set(rules, { scaleX: 0 });
        ScrollTrigger.batch('[data-log-row]', {
          start: 'top 92%',
          once: true,
          onEnter: (rows) =>
            gsap.to(
              rows.map((r) => r.querySelector('[data-log-rule]')),
              { scaleX: 1, duration: 1.1, ease: 'power3.inOut', stagger: 0.07, overwrite: true }
            ),
        });
      });
      return () => mm.revert();
    },
    { scope: listRef }
  );

  // Filter change: animate from the captured state.
  useGSAP(
    () => {
      const pending = flip.current;
      const list = listRef.current;
      if (!pending || !list) return;
      flip.current = null;

      // Once the reader is filtering, every hairline should be drawn.
      if (!rulesDone.current) {
        rulesDone.current = true;
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger && list.contains(t.trigger)) t.kill();
        });
        gsap.set(list.querySelectorAll('[data-log-rule]'), { scaleX: 1, overwrite: true });
      }

      // Measure the new natural height (a previous height tween may still be running).
      gsap.killTweensOf(list);
      gsap.set(list, { clearProps: 'height' });
      const to = list.offsetHeight;
      gsap.fromTo(
        list,
        { height: pending.height },
        { height: to, duration: 0.7, ease: 'expo.out', clearProps: 'height' }
      );

      let left: Element[] = [];
      Flip.from(pending.state, {
        duration: 0.7,
        ease: 'expo.out',
        absolute: true,
        stagger: 0.015,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
            {
              opacity: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.6,
              delay: 0.12,
              stagger: 0.03,
              ease: 'expo.out',
              clearProps: 'clipPath,opacity',
              overwrite: true,
            }
          ),
        onLeave: (els) => {
          left = els;
          return gsap.to(els, {
            opacity: 0,
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.3,
            ease: 'power2.in',
            overwrite: true,
          });
        },
        onComplete: () => {
          // Leaving rows are display:none again; don't leave them stuck invisible.
          if (left.length) gsap.set(left, { clearProps: 'opacity,clipPath' });
          ScrollTrigger.refresh();
        },
      });
    },
    { dependencies: [filter], scope: listRef }
  );

  // The active underline slides between filters.
  const placeMark = useCallback((animate: boolean) => {
    const bar = barRef.current;
    const mark = markRef.current;
    const active = bar?.querySelector<HTMLElement>('[aria-pressed="true"] .log-filter-label');
    if (!bar || !mark || !active) return;
    const b = bar.getBoundingClientRect();
    const a = active.getBoundingClientRect();
    mark.style.transition = animate ? '' : 'none';
    mark.style.transform = `translateX(${a.left - b.left}px)`;
    mark.style.width = `${a.width}px`;
    mark.style.opacity = '1';
  }, []);

  useIsoLayoutEffect(() => placeMark(true), [filter, placeMark]);
  useEffect(() => {
    placeMark(false);
    const ro = new ResizeObserver(() => placeMark(false));
    if (barRef.current) ro.observe(barRef.current);
    document.fonts?.ready.then(() => placeMark(false));
    return () => ro.disconnect();
  }, [placeMark]);

  const shownCount = counts[filter];
  const activeLabel = filters.find((f) => f.id === filter)?.label ?? 'All';

  return (
    <div className="mt-12 md:mt-20">
      <div ref={barRef} role="group" aria-label="Filter the log" className="log-filters">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => choose(f.id)}
            className="log-filter"
          >
            <span className="log-filter-label">{f.label}</span>
            <sup className="log-filter-count num">{counts[f.id]}</sup>
          </button>
        ))}
        <span ref={markRef} aria-hidden="true" className="log-filter-mark" />
      </div>
      <p className="sr-only" aria-live="polite">
        {filter === 'all' ? `Showing all ${shownCount} entries` : `Showing ${shownCount} ${activeLabel.toLowerCase()} entries`}
      </p>

      <ol ref={listRef} className="log-list">
        {entries.map((entry) => (
          <Row key={entry.id} entry={entry} shown={matches(entry, filter)} />
        ))}
      </ol>
    </div>
  );
}
