/**
 * =============================================================================
 * STAT CARD COMPONENT
 * =============================================================================
 * 
 * A component for displaying key metrics and statistics.
 * Features animated number counting and visual emphasis.
 * 
 * USAGE EXAMPLES:
 * 
 * Basic stat:
 * <StatCard value="$100K+" label="Portfolio Size" />
 * 
 * With icon:
 * <StatCard value="70%" label="Time Saved" icon={<Clock />} />
 * 
 * Highlighted:
 * <StatCard value="3.8" label="GPA" highlight />
 */

'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

/**
 * ---------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * ---------------------------------------------------------------------------
 */
interface StatCardProps {
  value: string | number;        // The main statistic value
  label: string;                 // Description of what the stat represents
  prefix?: string;               // Optional prefix (e.g., "$")
  suffix?: string;               // Optional suffix (e.g., "%", "+")
  icon?: ReactNode;              // Optional icon
  description?: string;          // Optional additional context
  highlight?: boolean;           // If true, uses accent styling
  className?: string;
}

/**
 * ---------------------------------------------------------------------------
 * STAT CARD COMPONENT
 * ---------------------------------------------------------------------------
 */
export function StatCard({
  value,
  label,
  prefix = '',
  suffix = '',
  icon,
  description,
  highlight = false,
  className = '',
}: StatCardProps) {
  // Reference to track when component is in view
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`
        relative p-6 rounded-xl
        ${highlight
          ? 'bg-accent-400/5 border border-accent-400/20'
          : 'bg-void-800/30 border border-steel-800/50'
        }
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Optional Icon */}
      {icon && (
        <div
          className={`mb-4 ${
            highlight ? 'text-accent-400' : 'text-steel-500'
          }`}
        >
          {icon}
        </div>
      )}

      {/* Stat Value */}
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span
            className={`text-2xl font-light ${
              highlight ? 'text-accent-400/70' : 'text-steel-500'
            }`}
          >
            {prefix}
          </span>
        )}
        <span
          className={`font-display text-4xl md:text-5xl tracking-tight ${
            highlight ? 'text-accent-400' : 'text-steel-50'
          }`}
        >
          {value}
        </span>
        {suffix && (
          <span
            className={`text-2xl font-light ${
              highlight ? 'text-accent-400/70' : 'text-steel-500'
            }`}
          >
            {suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-steel-500">
        {label}
      </p>

      {/* Optional Description */}
      {description && (
        <p className="mt-3 text-sm text-steel-400 leading-relaxed">
          {description}
        </p>
      )}

      {/* Decorative gradient for highlighted cards */}
      {highlight && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-400/5 to-transparent pointer-events-none" />
      )}
    </motion.div>
  );
}

/**
 * ---------------------------------------------------------------------------
 * STAT GRID COMPONENT
 * ---------------------------------------------------------------------------
 * A wrapper component for laying out multiple stats in a grid
 */
interface StatGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatGrid({
  children,
  columns = 3,
  className = '',
}: StatGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid gap-4 md:gap-6 ${columnClasses[columns]} ${className}`}>
      {children}
    </div>
  );
}
