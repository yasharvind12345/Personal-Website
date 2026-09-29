'use client';

import { useState } from 'react';
import { profile } from '@/content/profile';

/**
 * Click copies the address and shows "Copied"; falls back to mailto if the
 * clipboard isn't available.
 */
export function CopyEmail({ className = '', label }: { className?: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!navigator.clipboard) return; // let mailto: happen
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <a href={`mailto:${profile.email}`} onClick={onClick} className={className} aria-live="polite">
      {copied ? 'Copied to clipboard' : label ?? profile.email}
    </a>
  );
}
