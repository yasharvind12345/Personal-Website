'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { navLinks, profile } from '@/content/profile';
import { CopyEmail } from './CopyEmail';

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Fixed header. Hides on scroll down, returns on scroll up, and inverts
 * while it sits over any section marked data-nav-theme="ink".
 */
export function Navigation() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overInk, setOverInk] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

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

  // Watch ink sections crossing the header band at the top of the viewport.
  useEffect(() => {
    const headerH = headerRef.current?.offsetHeight ?? 64;
    const inside = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inside.add(entry.target);
          else inside.delete(entry.target);
        }
        setOverInk(inside.size > 0);
      },
      { rootMargin: `0px 0px -${Math.max(window.innerHeight - headerH / 2, 0)}px 0px` }
    );
    // Wait a frame so the new page's sections are in the DOM.
    const id = requestAnimationFrame(() => {
      document.querySelectorAll('[data-nav-theme="ink"]').forEach((el) => observer.observe(el));
    });
    return () => {
      cancelAnimationFrame(id);
      observer.disconnect();
      setOverInk(false);
    };
  }, [pathname]);

  const ink = overInk && !open;

  return (
    <>
      <header
        ref={headerRef}
        style={{ viewTransitionName: 'site-header' }}
        className={[
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-500 ease-out-expo',
          ink ? 'theme-ink' : '',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
          scrolled || open ? 'border-b border-rule bg-paper' : 'border-b border-transparent bg-paper/0',
        ].join(' ')}
      >
        <nav aria-label="Main" className="page-x mx-auto flex h-16 max-w-page items-center justify-between text-ink">
          <Link href="/" className="group flex items-baseline gap-2" aria-label="Yash Arvind, home">
            <span className="display text-[0.95rem] uppercase tracking-tight">Yash Arvind</span>
            <span className="meta hidden transition-colors group-hover:text-accent sm:inline">
              Product builder
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`link-draw font-mono text-xs uppercase tracking-wider ${
                    active ? 'text-accent' : 'hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw font-mono text-xs uppercase tracking-wider hover:text-accent"
            >
              Résumé ↗
            </a>
            <CopyEmail
              label="Email"
              className="border border-ink px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-ink hover:text-paper"
            />
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
          {[{ href: '/', label: 'Home' }, ...navLinks].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              style={{ animationDelay: `${60 + i * 50}ms` }}
              className="display hairline flex items-baseline justify-between py-4 text-display-md motion-safe:animate-[menu-in_0.7s_var(--ease-out-expo)_both]"
            >
              {link.label}
              <span className="meta">0{i + 1}</span>
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3 font-mono text-sm">
          <a href={profile.resumePath} target="_blank" rel="noopener noreferrer" className="underline">
            Résumé (PDF) ↗
          </a>
          <CopyEmail className="underline" />
        </div>
      </div>

      {/* Keeps content clear of the fixed header. */}
      <div aria-hidden="true" className="h-16" />
    </>
  );
}
