'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

// Register once. Every motion component imports gsap from here.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: 'expo.out', duration: 1 });
}

/** Media condition for effects that should only run when the user allows motion. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
/** Fine pointer + hover: cursor-following effects. */
export const HOVER_OK = '(hover: hover) and (pointer: fine)';

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
