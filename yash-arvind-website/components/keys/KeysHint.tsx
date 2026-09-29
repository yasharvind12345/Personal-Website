'use client';

import { toggleHiddenKeys } from './events';

/**
 * "Press ?" hint that also opens the overlay when clicked. Hidden on touch-only
 * devices, where there is no keyboard to press.
 */
export function KeysHint({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={toggleHiddenKeys}
      aria-haspopup="dialog"
      className={`text-left uppercase transition-colors hover:text-accent [@media(hover:none)]:hidden ${className}`}
    >
      {children}
    </button>
  );
}
