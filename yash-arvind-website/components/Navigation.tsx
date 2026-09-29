'use client';

import { useEffect, useRef, useState } from 'react';
import { sections, profile } from '@/content/profile';
import { CopyEmail } from './CopyEmail';

/**
 * One-page header. Links jump to sections and the current one is highlighted
 * as you scroll. Hides on scroll down, returns on scroll up, and inverts over
 * any section marked data-nav-theme="ink".
 */
export function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overInk, setOverInk] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ink sections crossing the header band, and which section holds the middle of the viewport.
  useEffect(() => {
    const headerH = headerRef.current?.offsetHeight ?? 64;
    const inside = new Set<Element>();
    const ink = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? inside.add(e.target) : inside.delete(e.target);
        setOverInk(inside.size > 0);
      },
      { rootMargin: `0px 0px -${Math.max(window.innerHeight - headerH / 2, 0)}px 0px` }
    );
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    const id = requestAnimationFrame(() => {
      document.querySelectorAll('[data-nav-theme="ink"]').forEach((el) => ink.observe(el));
      document.querySelectorAll('main section[id]').forEach((el) => spy.observe(el));
    });
    return () => {
      cancelAnimationFrame(id);
      ink.disconnect();
      spy.disconnect();
    };
  }, []);

  const inkMode = overInk && !open;

  return (
    <>
      <header
        ref={headerRef}
        className={[
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-500 ease-out-expo',
          inkMode ? 'theme-ink' : '',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
          scrolled || open ? 'border-b border-rule bg-paper' : 'border-b border-transparent bg-paper/0',
        ].join(' ')}
      >
        <nav aria-label="Main" className="page-x mx-auto flex h-16 max-w-page items-center justify-between text-ink">
          <a href="#top" className="group flex items-baseline gap-2" aria-label="Yash Arvind, back to top">
            <span className="display text-[0.95rem] uppercase tracking-tight">Yash Arvind</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={current === s.id ? 'location' : undefined}
                className={`link-draw font-mono text-xs uppercase tracking-wider transition-colors ${
                  current === s.id ? 'text-accent' : 'hover:text-accent'
                }`}
              >
                {s.label}
              </a>
            ))}
            <span aria-hidden="true" className="h-3 w-px bg-rule" />
            <a
              href={profile.socials.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw font-mono text-xs uppercase tracking-wider hover:text-accent"
            >
              GitHub ↗
            </a>
            <CopyEmail label="Email" className="link-draw font-mono text-xs uppercase tracking-wider hover:text-accent" />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="font-mono text-xs uppercase tracking-wider md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="page-x fixed inset-0 z-40 flex flex-col justify-between bg-paper pb-10 pt-24 md:hidden [&[hidden]]:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {[{ id: 'top', label: 'Top' }, ...sections].map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${60 + i * 50}ms` }}
              className="display hairline flex items-baseline justify-between py-4 text-display-md motion-safe:animate-[menu-in_0.7s_var(--ease-out-expo)_both]"
            >
              {s.label}
              <span className="meta">0{i + 1}</span>
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 font-mono text-sm">
          <a href={profile.socials.github.href} target="_blank" rel="noopener noreferrer" className="underline">
            GitHub ↗
          </a>
          <CopyEmail className="underline" />
        </div>
      </div>

      {/* Keeps content clear of the fixed header. */}
      <div aria-hidden="true" className="h-16" />
    </>
  );
}
