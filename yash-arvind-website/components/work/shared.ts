import { getImageProps } from 'next/image';
import type { CaseStudy } from '@/content/types';
import type { WorkImage } from '@/content/media';

/**
 * Shared by the WorkList preview and the case-study hero so the morph lines up:
 * same aspect ratio, and the hero's exact srcset can be preloaded before navigating.
 */
export const COVER_ASPECT = '16 / 10';
export const HERO_SIZES = '(min-width: 1440px) 1360px, 100vw';

/** Name shared by the list preview and the hero for the View Transition morph. */
export const morphName = (slug: string) => `work-${slug}`;

export const pad2 = (n: number) => String(n).padStart(2, '0');

/** '2025 – Present' → '2025–', 'Jun 2026 – Aug 2026' → '2026'. */
export function yearLabel(period?: string) {
  if (!period) return '';
  const years = period.match(/\b(19|20)\d{2}\b/g) ?? [];
  if (!years.length) return period;
  if (/present/i.test(period)) return `${years[0]}–Now`;
  const first = years[0];
  const last = years[years.length - 1];
  return first === last ? first : `${first}–${last.slice(2)}`;
}

/** One-line result with a number for list rows. */
export function outcomeLine(study: CaseStudy) {
  if (study.outcome) return study.outcome;
  const m = study.metrics[0];
  return m ? `${m.value} ${/^[A-Z][a-z]/.test(m.label) ? m.label[0].toLowerCase() + m.label.slice(1) : m.label}` : study.tagline;
}

/** Warm the cache with the hero's image so the morph lands on a decoded frame. */
export function preloadHero(media: WorkImage, timeout = 450): Promise<void> {
  const { props } = getImageProps({
    src: media.src,
    alt: '',
    width: media.width,
    height: media.height,
    sizes: HERO_SIZES,
  });
  const img = new Image();
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
  return Promise.race([
    img.decode().catch(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, timeout)),
  ]);
}
