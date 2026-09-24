/**
 * =============================================================================
 * CARD COMPONENT
 * =============================================================================
 *
 * Container with dark background, subtle border, and optional hover lift.
 */

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;           // Required: content inside the card
  variant?: 'default' | 'accent' | 'ghost'; // Visual style variant
  hover?: boolean;               // Enable hover effect
  padding?: 'sm' | 'md' | 'lg';  // Padding size
  className?: string;            // Additional CSS classes
}

export function Card({
  children,
  variant = 'default',
  hover = true,
  padding = 'md',
  className = '',
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantClasses = {
    // Default: subtle dark card with border
    default: 'bg-void-800/50 border border-steel-800/50 backdrop-blur-sm',
    // Accent: highlighted card with accent color hint
    accent:
      'bg-void-800/50 border border-accent-400/20 backdrop-blur-sm shadow-[0_0_30px_rgba(251,191,36,0.05)]',
    // Ghost: minimal card with no background
    ghost: 'bg-transparent border border-steel-800/30',
  };

  const hoverClasses = hover
    ? 'hover:border-steel-700/70 hover:bg-void-700/50 motion-safe:hover:-translate-y-0.5 transition-all duration-300'
    : '';

  return (
    <div
      className={`rounded-xl ${paddingClasses[padding]} ${variantClasses[variant]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
