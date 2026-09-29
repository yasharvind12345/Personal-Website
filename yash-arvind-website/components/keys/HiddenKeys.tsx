'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '@/components/motion/gsap';
import { openStudy, useStudy } from '@/components/study/store';
import { caseStudies, featuredSlugs } from '@/content/caseStudies';
import { profile } from '@/content/profile';
import { KEYS_TOGGLE_EVENT } from './events';
import '@/app/styles/keys.css';

/**
 * The site's hidden keys, a nod to Ghostkeys ("Your MacBook has hidden keys").
 * One global keydown listener; `?` opens a keyboard-styled overlay listing them.
 * Ignored while typing and whenever a modifier is held, so browser shortcuts
 * keep working.
 */

type Action =
  | { type: 'study'; slug: string }
  | { type: 'scroll'; id: string }
  | { type: 'open'; href: string; toast: string }
  | { type: 'copy' }
  | { type: 'toggle' }
  | { type: 'close' };

interface KeyDef {
  key: string;
  cap: string;
  label: string;
  action: Action;
}

const shortName = (slug: string) => {
  const s = caseStudies.find((c) => c.slug === slug);
  return s ? (s.org ?? s.title) : slug;
};

const groups: { title: string; keys: KeyDef[] }[] = [
  {
    title: 'Open a case study',
    keys: featuredSlugs.slice(0, 9).map((slug, i) => ({
      key: String(i + 1),
      cap: String(i + 1),
      label: shortName(slug),
      action: { type: 'study', slug },
    })),
  },
  {
    title: 'Jump to',
    keys: [
      { key: 'w', cap: 'W', label: 'Work', action: { type: 'scroll', id: 'work' } },
      { key: 'l', cap: 'L', label: 'Log', action: { type: 'scroll', id: 'log' } },
      { key: 'a', cap: 'A', label: 'About', action: { type: 'scroll', id: 'about' } },
      { key: 't', cap: 'T', label: 'Top', action: { type: 'scroll', id: 'top' } },
    ],
  },
  {
    title: 'Elsewhere',
    keys: [
      {
        key: 'g',
        cap: 'G',
        label: 'GitHub ↗',
        action: { type: 'open', href: profile.socials.github.href, toast: 'Opening GitHub ↗' },
      },
      {
        key: 'r',
        cap: 'R',
        label: 'Résumé ↗',
        action: { type: 'open', href: profile.resumePath, toast: 'Opening résumé ↗' },
      },
      { key: 'e', cap: 'E', label: 'Copy email', action: { type: 'copy' } },
    ],
  },
  {
    title: 'This panel',
    keys: [
      { key: '?', cap: '?', label: 'Show / hide', action: { type: 'toggle' } },
      { key: 'escape', cap: 'Esc', label: 'Close', action: { type: 'close' } },
    ],
  },
];

const keymap = new Map(groups.flatMap((g) => g.keys.map((k) => [k.key, k] as const)));

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
}

export function HiddenKeys() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState<string | null>(null);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const { slug: studySlug } = useStudy();

  const openRef = useRef(false);
  const studyRef = useRef<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const pressTimer = useRef<number>();
  const closeTimer = useRef<number>();
  const toastTimer = useRef<number>();

  openRef.current = open;
  studyRef.current = studySlug;

  const showToast = useCallback((text: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), text });
    toastTimer.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setMounted(true);
    setOpen(true);
  }, []);

  const hide = useCallback(() => setOpen(false), []);

  const run = useCallback(
    (action: Action) => {
      const smooth = !prefersReducedMotion();
      switch (action.type) {
        case 'study':
          openStudy(action.slug);
          break;
        case 'scroll':
          if (action.id === 'top') window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
          else document.getElementById(action.id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
          break;
        case 'open':
          window.open(action.href, '_blank', 'noopener,noreferrer');
          showToast(action.toast);
          break;
        case 'copy':
          if (navigator.clipboard) {
            navigator.clipboard.writeText(profile.email).then(
              () => showToast(`Email copied · ${profile.email}`),
              () => showToast(profile.email),
            );
          } else {
            showToast(profile.email);
          }
          break;
        case 'toggle':
          if (openRef.current) hide();
          else show();
          break;
        case 'close':
          hide();
          break;
      }
    },
    [hide, show, showToast],
  );

  /** Press a key: depress its cap if the panel is open, run it, then fold the panel away. */
  const press = useCallback(
    (def: KeyDef) => {
      const panelOpen = openRef.current;
      if (panelOpen) {
        window.clearTimeout(pressTimer.current);
        setPressed(def.key);
        pressTimer.current = window.setTimeout(() => setPressed(null), 170);
      }
      if (def.action.type === 'toggle' || def.action.type === 'close') {
        // Let the cap visibly go down before the panel leaves.
        if (panelOpen) {
          window.clearTimeout(closeTimer.current);
          closeTimer.current = window.setTimeout(hide, 140);
        } else if (def.action.type === 'toggle') {
          show();
        }
        return;
      }
      run(def.action);
      if (panelOpen) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(hide, 220);
      }
    },
    [hide, run, show],
  );

  // Global keys. Capture phase so Esc closes this panel before anything underneath sees it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.isComposing) return;
      if (isTyping(e.target)) return;
      const k = e.key === 'Escape' ? 'escape' : e.key.length === 1 ? e.key.toLowerCase() : '';
      if (!k) return;

      if (k === 'escape') {
        // Only ours when the panel is open; otherwise the case-study sheet handles Esc.
        if (!openRef.current) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        press(keymap.get('escape')!);
        return;
      }

      const def = keymap.get(k);
      if (!def || e.repeat) return;
      // With a case study open, the page behind is covered (and inert): skip the
      // scroll keys and the panel, which lives in that page.
      if ((def.action.type === 'scroll' || def.action.type === 'toggle') && studyRef.current) return;
      e.preventDefault();
      press(def);
    };
    const onToggle = () => (openRef.current ? hide() : show());
    window.addEventListener('keydown', onKey, true);
    window.addEventListener(KEYS_TOGGLE_EVENT, onToggle);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener(KEYS_TOGGLE_EVENT, onToggle);
    };
  }, [hide, press, show]);

  // Enter / exit animation, focus in and out.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!mounted || !dialog) return;
    const reduced = prefersReducedMotion();
    const panel = dialog.querySelector<HTMLElement>('[data-keys-panel]');
    const scrim = dialog.querySelector<HTMLElement>('[data-keys-scrim]');
    const caps = dialog.querySelectorAll<HTMLElement>('[data-keycap-item]');

    if (open) {
      dialog.querySelector<HTMLElement>('[data-keys-focus]')?.focus({ preventScroll: true });
      if (reduced) return;
      const tl = gsap.timeline();
      tl.fromTo(scrim, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, 0)
        .fromTo(
          panel,
          { yPercent: 12, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: 'expo.out' },
          0,
        )
        .fromTo(
          caps,
          { y: 10, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.022, ease: 'expo.out' },
          0.08,
        );
      return () => {
        tl.kill();
      };
    }

    const done = () => {
      setMounted(false);
      const back = returnFocus.current;
      if (back && document.contains(back)) back.focus({ preventScroll: true });
    };
    if (reduced) {
      done();
      return;
    }
    const tl = gsap.timeline({ onComplete: done });
    tl.to(panel, { yPercent: 8, autoAlpha: 0, duration: 0.25, ease: 'power2.in' }, 0).to(
      scrim,
      { autoAlpha: 0, duration: 0.25, ease: 'power1.in' },
      0,
    );
    return () => {
      tl.kill();
    };
  }, [open, mounted]);

  // Keep Tab inside the dialog while it is open.
  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const items = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || !items.includes(document.activeElement as HTMLElement))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  useEffect(
    () => () => {
      window.clearTimeout(pressTimer.current);
      window.clearTimeout(closeTimer.current);
      window.clearTimeout(toastTimer.current);
    },
    [],
  );

  return (
    <>
      {mounted && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="keys-title"
          onKeyDown={onDialogKeyDown}
          className="keys-root fixed inset-0 z-[150] flex items-end justify-center p-3 sm:p-6 md:items-center"
        >
          <div data-keys-scrim className="absolute inset-0 bg-paper/80" onClick={hide} aria-hidden="true" />
          <div
            data-keys-panel
            data-keys-focus
            tabIndex={-1}
            className="theme-ink relative w-full max-w-[42rem] bg-paper text-ink outline-none"
          >
            <div className="flex items-center justify-between border-b border-rule px-5 py-4 sm:px-7">
              <h2 id="keys-title" className="meta text-ink">
                Hidden keys
              </h2>
              <button
                type="button"
                onClick={hide}
                className="meta transition-colors hover:text-accent focus-visible:text-accent"
              >
                Close
              </button>
            </div>

            <div className="px-5 py-5 sm:px-7 sm:py-6">
              {groups.map((g) => (
                <div key={g.title} className="border-b border-rule py-4 first:pt-0 last:border-b-0 last:pb-0">
                  <p className="meta mb-3">{g.title}</p>
                  <ul className="flex flex-wrap gap-x-5 gap-y-3">
                    {g.keys.map((k) => (
                      <li key={k.key} data-keycap-item>
                        <button
                          type="button"
                          onClick={() => press(k)}
                          className="keycap-row group flex items-center gap-2.5 text-left"
                          aria-keyshortcuts={
                            k.key === 'escape' ? 'Escape' : k.key === '?' ? 'Shift+?' : k.key.toUpperCase()
                          }
                        >
                          <kbd
                            className="keycap"
                            data-wide={k.cap.length > 1 ? '' : undefined}
                            data-pressed={pressed === k.key ? '' : undefined}
                          >
                            {k.cap}
                          </kbd>
                          <span className="font-mono text-xs uppercase tracking-wider transition-colors group-hover:text-accent">
                            {k.label}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="border-t border-rule px-5 py-4 text-sm leading-snug text-muted sm:px-7">
              <button
                type="button"
                onClick={() => {
                  openStudy('ghostkeys');
                  hide();
                }}
                className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Ghostkeys
              </button>{' '}
              gave MacBooks hidden keys. This site has a few too.
            </p>
          </div>
        </div>
      )}

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[160] flex justify-center px-4"
      >
        {toast && (
          <p
            key={toast.id}
            className="keys-toast theme-ink bg-paper px-3.5 py-2 font-mono text-xs tracking-wide text-ink"
          >
            {toast.text}
          </p>
        )}
      </div>
    </>
  );
}
