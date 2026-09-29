'use client';

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/components/motion/gsap';
import type { ContributionDay } from '@/lib/github';

const DAY = 86_400_000;
const WEEKS = 53;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Cell extends ContributionDay {
  latest: boolean;
}

const toTime = (date: string) => Date.UTC(+date.slice(0, 4), +date.slice(5, 7) - 1, +date.slice(8, 10));
const toDate = (t: number) => new Date(t).toISOString().slice(0, 10);

/** 'YYYY-MM-DD' → 'Mon, Sep 28, 2026'. Done by hand so server and client agree. */
function longDate(date: string) {
  const d = new Date(toTime(date));
  return `${WEEKDAYS[d.getUTCDay()]}, ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

function describe(cell: Cell) {
  const what =
    cell.count === undefined
      ? `Activity level ${cell.level} of 4`
      : cell.count === 0
        ? 'No contributions'
        : `${cell.count} contribution${cell.count === 1 ? '' : 's'}`;
  return { what, when: longDate(cell.date) };
}

/** Days → 7 rows (Sun..Sat) × 53 week columns ending with the latest day's week. */
function layout(days: ContributionDay[]) {
  const byDate = new Map(days.map((d) => [d.date, d]));
  const first = toTime(days[0].date);
  const last = toTime(days[days.length - 1].date);
  const start = last - new Date(last).getUTCDay() * DAY - (WEEKS - 1) * 7 * DAY;

  const rows: (Cell | null)[][] = Array.from({ length: 7 }, (_, r) =>
    Array.from({ length: WEEKS }, (_, c) => {
      const t = start + (c * 7 + r) * DAY;
      if (t > last || t < first) return null;
      const date = toDate(t);
      const day = byDate.get(date) ?? { date, level: 0 as const };
      return { ...day, latest: t === last };
    })
  );

  // Month labels at the first column whose Sunday lands in a new month.
  const months: { col: number; label: string }[] = [];
  let prev = -1;
  for (let c = 0; c < WEEKS; c++) {
    const m = new Date(start + c * 7 * DAY).getUTCMonth();
    if (m !== prev) months.push({ col: c, label: MONTHS[m] });
    prev = m;
  }
  // Drop a label crowded by the next one, and any that would run off the end.
  const labels = months.filter((m, i) => (months[i + 1]?.col ?? WEEKS) - m.col >= 3 && m.col <= WEEKS - 3);

  return { rows, labels };
}

/**
 * GitHub contribution calendar, drawn in the site's ink. Cells fill in on a
 * diagonal when the graph scrolls into view; hover, tap, or arrow keys show a
 * tooltip with the date and count.
 */
export function ContributionGraph({ days }: { days: ContributionDay[] }) {
  const { rows, labels } = useMemo(() => layout(days), [days]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  const latest = useMemo(() => {
    for (let c = WEEKS - 1; c >= 0; c--)
      for (let r = 6; r >= 0; r--) if (rows[r][c]?.latest) return { r, c };
    return { r: 0, c: 0 };
  }, [rows]);

  const [focus, setFocus] = useState(latest); // roving tabindex
  const [active, setActive] = useState<{ r: number; c: number } | null>(null);
  const activeCell = active ? rows[active.r][active.c] : null;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('[data-cell]', {
          scale: 0,
          opacity: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: (_i: number, el: HTMLElement) => Number(el.dataset.d) * 0.018,
          scrollTrigger: { trigger: gridRef.current, start: 'top 88%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: gridRef }
  );

  // Place the tooltip over the active cell, kept inside the graph's width.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const tip = tipRef.current;
    if (!wrap || !tip || !active) return;
    const el = wrap.querySelector<HTMLElement>(`[data-r="${active.r}"][data-c="${active.c}"]`);
    if (!el) return;
    const w = wrap.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    const half = tip.offsetWidth / 2;
    const center = e.left - w.left + e.width / 2;
    const x = Math.min(Math.max(center, half), w.width - half);
    tip.style.transform = `translate(${x - half}px, ${e.top - w.top - tip.offsetHeight - 8}px)`;
    tip.style.setProperty('--tick', `${center - (x - half)}px`);
  }, [active]);

  const fromEvent = (target: EventTarget | null) => {
    const el = (target as HTMLElement | null)?.closest<HTMLElement>('[data-cell]');
    return el ? { r: Number(el.dataset.r), c: Number(el.dataset.c) } : null;
  };

  const move = useCallback(
    (r: number, c: number) => {
      // Skip empty slots (before the first day or after the latest).
      if (r < 0 || r > 6 || c < 0 || c >= WEEKS || !rows[r][c]) return;
      setFocus({ r, c });
      setActive({ r, c });
      gridRef.current?.querySelector<HTMLElement>(`[data-r="${r}"][data-c="${c}"]`)?.focus();
    },
    [rows]
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    const { r, c } = focus;
    const step: Record<string, [number, number]> = {
      ArrowUp: [r - 1, c],
      ArrowDown: [r + 1, c],
      ArrowLeft: [r, c - 1],
      ArrowRight: [r, c + 1],
      Home: [r, 0],
      End: [latest.r, latest.c],
    };
    const next = step[event.key];
    if (next) {
      event.preventDefault();
      move(next[0], next[1]);
    } else if (event.key === 'Escape') {
      setActive(null);
    }
  };

  const tip = activeCell ? describe(activeCell) : null;

  return (
    <div ref={wrapRef} className="gh-graph">
      <div className="gh-months" aria-hidden="true">
        {labels.map((m) => (
          <span key={`${m.col}-${m.label}`} style={{ gridColumnStart: m.col + 1 }}>
            {m.label}
          </span>
        ))}
      </div>

      <div
        ref={gridRef}
        role="grid"
        aria-label="GitHub contributions over the last year, one square per day. Use the arrow keys to move between days."
        className="gh-grid"
        onPointerOver={(e) => {
          const hit = fromEvent(e.target);
          if (hit && rows[hit.r][hit.c]) setActive(hit);
        }}
        onPointerLeave={() => setActive(null)}
        onFocus={(e) => {
          const hit = fromEvent(e.target);
          if (hit) {
            setFocus(hit);
            setActive(hit);
          }
        }}
        onBlur={(e) => {
          if (!gridRef.current?.contains(e.relatedTarget as Node | null)) setActive(null);
        }}
        onKeyDown={onKeyDown}
      >
        {rows.map((row, r) => (
          <div key={r} role="row" className="gh-row">
            {row.map((cell, c) =>
              cell ? (
                <span
                  key={c}
                  role="gridcell"
                  data-cell=""
                  data-r={r}
                  data-c={c}
                  data-d={r + c}
                  data-level={cell.level}
                  data-latest={cell.latest ? '' : undefined}
                  data-active={active?.r === r && active?.c === c ? '' : undefined}
                  tabIndex={focus.r === r && focus.c === c ? 0 : -1}
                  aria-label={`${describe(cell).what}, ${describe(cell).when}`}
                  className="gh-cell"
                />
              ) : (
                <span key={c} role="gridcell" aria-hidden="true" className="gh-cell gh-cell--empty" />
              )
            )}
          </div>
        ))}
      </div>

      <div ref={tipRef} aria-hidden="true" className="gh-tip" data-open={tip ? '' : undefined}>
        {tip ? (
          <>
            <span className="text-paper">{tip.what}</span>
            <span className="gh-tip-date">{tip.when}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
