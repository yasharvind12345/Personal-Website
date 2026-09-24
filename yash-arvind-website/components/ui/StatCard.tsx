/**
 * =============================================================================
 * STAT CARD COMPONENT
 * =============================================================================
 *
 * Displays a key statistic with label and optional description.
 */

import { ReactNode } from 'react';

interface StatCardProps {
  value: string | number;        // The main statistic value
  label: string;                 // Description of what the stat represents
  icon?: ReactNode;              // Optional icon
  description?: string;          // Optional additional context
  highlight?: boolean;           // If true, uses accent styling
  className?: string;
}

export function StatCard({
  value,
  label,
  icon,
  description,
  highlight = false,
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`relative h-full p-6 rounded-xl ${
        highlight
          ? 'bg-accent-400/5 border border-accent-400/20'
          : 'bg-void-800/30 border border-steel-800/50'
      } ${className}`}
    >
      {icon && (
        <div className={`mb-4 ${highlight ? 'text-accent-400' : 'text-steel-500'}`}>{icon}</div>
      )}

      <p
        className={`font-display text-4xl md:text-5xl tracking-tight ${
          highlight ? 'text-accent-400' : 'text-steel-50'
        }`}
      >
        {value}
      </p>

      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-steel-500">{label}</p>

      {description && (
        <p className="mt-3 text-sm text-steel-400 leading-relaxed">{description}</p>
      )}

      {highlight && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-400/5 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
