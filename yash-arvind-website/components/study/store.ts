'use client';

import { useSyncExternalStore } from 'react';
import { caseStudies } from '@/content/caseStudies';

/**
 * Which case study is open, shared by the work reel, keyboard shortcuts, and
 * the StudySheet. The URL hash mirrors it (#work/<slug>) so studies can be
 * linked to and the back button closes them.
 */

export interface StudyState {
  slug: string | null;
  /** Element the sheet should morph from (a reel frame), if any. */
  origin: HTMLElement | null;
}

const HASH_PREFIX = '#work/';
const slugs = new Set(caseStudies.map((s) => s.slug));

let state: StudyState = { slug: null, origin: null };
let pushed = false;
const listeners = new Set<() => void>();

function set(next: StudyState) {
  state = next;
  listeners.forEach((l) => l());
}

function slugFromHash(): string | null {
  if (typeof window === 'undefined') return null;
  const { hash } = window.location;
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const slug = decodeURIComponent(hash.slice(HASH_PREFIX.length));
  return slugs.has(slug) ? slug : null;
}

export const studyHref = (slug: string) => `/${HASH_PREFIX}${slug}`;

export function openStudy(slug: string, origin: HTMLElement | null = null) {
  if (!slugs.has(slug)) return;
  if (state.slug === slug) return;
  const url = `${HASH_PREFIX}${slug}`;
  if (state.slug) {
    history.replaceState(history.state, '', url);
  } else {
    history.pushState(history.state, '', url);
    pushed = true;
  }
  set({ slug, origin });
}

export function closeStudy() {
  if (!state.slug) return;
  if (pushed) {
    pushed = false;
    history.back(); // popstate clears the state
  } else {
    history.replaceState(history.state, '', '#work');
    set({ slug: null, origin: null });
  }
}

let started = false;
function start() {
  if (started || typeof window === 'undefined') return;
  started = true;
  const sync = () => {
    const slug = slugFromHash();
    if (slug !== state.slug) {
      if (!slug) pushed = false;
      set({ slug, origin: null });
    }
  };
  window.addEventListener('popstate', sync);
  window.addEventListener('hashchange', sync);
  sync(); // deep link: /#work/tam opens on load
}

function subscribe(listener: () => void) {
  start();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const serverState: StudyState = { slug: null, origin: null };

export function useStudy(): StudyState {
  return useSyncExternalStore(subscribe, () => state, () => serverState);
}
