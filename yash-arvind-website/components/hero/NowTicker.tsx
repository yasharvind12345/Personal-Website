'use client';

import { useEffect, useRef, useState } from 'react';
import { now, type NowItem } from '@/content/now';
import { openStudy } from '@/components/study/store';

const items = now.items;
const pad = (n: number) => String(n).padStart(2, '0');

function Line({ item, tabbable = true }: { item: NowItem; tabbable?: boolean }) {
  const body = (
    <>
      <span className="meta pt-[0.2rem] text-ink">{item.label}</span>
      <span className="text-[0.95rem] leading-snug md:text-base">
        {item.text}
        {item.slug && (
          <span
            aria-hidden="true"
            className="ml-2 inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </span>
    </>
  );
  const grid = 'grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-x-3';
  if (!item.slug) return <span className={grid}>{body}</span>;
  const slug = item.slug;
  return (
    <button
      type="button"
      tabIndex={tabbable ? undefined : -1}
      onClick={() => openStudy(slug)}
      className={`group w-full text-left transition-colors hover:text-accent focus-visible:text-accent ${grid}`}
    >
      {body}
    </button>
  );
}

/**
 * "Now": one line at a time, rolling up every few seconds. The accent hairline
 * underneath is the timer: its CSS animation ending advances the roll, so
 * pausing (hover, focus, off-screen) is just pausing the animation.
 * Reduced motion shows the whole list instead.
 */
export function NowTicker() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [still, setStill] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const advance = () => {
    setPrev(index);
    setIndex((index + 1) % items.length);
  };

  const paused = hovered || focused || !visible;

  if (still) {
    return (
      <div>
        <p className="meta mb-3">Now · {now.updated}</p>
        <ul className="space-y-2 border-t border-rule pt-3">
          {items.map((item) => (
            <li key={item.label}>
              <Line item={item} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
    >
      <p className="meta mb-3 flex justify-between gap-4">
        <span>Now</span>
        <span className="num" aria-hidden="true">
          {pad(index + 1)} / {pad(items.length)}
        </span>
      </p>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.label}>
            {item.label}: {item.text}
          </li>
        ))}
      </ul>
      <div className="border-t border-rule pt-3">
        <div className="now-roll">
          {items.map((item, i) => {
            const state = i === index ? 'in' : i === prev ? 'out' : 'wait';
            return (
              <div key={item.label} className="now-item" data-state={state} aria-hidden={state !== 'in' || undefined}>
                <Line item={item} tabbable={state === 'in'} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="now-track mt-3" aria-hidden="true">
        <span
          key={index}
          className="now-bar"
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
          onAnimationEnd={advance}
        />
      </div>
    </div>
  );
}
