/**
 * =============================================================================
 * TAG COMPONENT
 * =============================================================================
 * 
 * A small label/badge component for displaying categories, technologies,
 * or status indicators.
 * 
 * USAGE EXAMPLES:
 * 
 * Default tag:
 * <Tag>React</Tag>
 * 
 * Accent-colored tag:
 * <Tag variant="accent">Featured</Tag>
 * 
 * Success tag:
 * <Tag variant="success">Active</Tag>
 */

'use client';

import { ReactNode } from 'react';

/**
 * ---------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * ---------------------------------------------------------------------------
 */
interface TagProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'muted';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * ---------------------------------------------------------------------------
 * TAG COMPONENT
 * ---------------------------------------------------------------------------
 */
export function Tag({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: TagProps) {
  /**
   * Size classes
   */
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  /**
   * Variant classes for different colors
   */
  const variantClasses = {
    // Default: neutral gray
    default: `
      bg-void-800 text-steel-400
      border border-steel-800
    `,
    // Accent: gold/amber highlight
    accent: `
      bg-accent-400/10 text-accent-400
      border border-accent-400/20
    `,
    // Success: green for positive status
    success: `
      bg-green-500/10 text-green-400
      border border-green-500/20
    `,
    // Warning: amber for caution
    warning: `
      bg-amber-500/10 text-amber-400
      border border-amber-500/20
    `,
    // Muted: very subtle
    muted: `
      bg-steel-900/50 text-steel-500
      border border-steel-800/50
    `,
  };

  return (
    <span
      className={`
        inline-flex items-center
        font-mono font-medium uppercase tracking-wider
        rounded-full
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
