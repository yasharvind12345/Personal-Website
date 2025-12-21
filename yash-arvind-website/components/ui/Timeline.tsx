/**
 * =============================================================================
 * TIMELINE COMPONENT
 * =============================================================================
 * 
 * A vertical timeline component for displaying chronological events.
 * Great for career history, project milestones, or personal trajectory.
 * 
 * USAGE EXAMPLE:
 * 
 * const events = [
 *   { year: '2024', title: 'Started at Company', description: '...' },
 *   { year: '2023', title: 'Graduated', description: '...' },
 * ];
 * 
 * <Timeline events={events} />
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * ---------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * ---------------------------------------------------------------------------
 */

// Single timeline event
interface TimelineEvent {
  year: string;                  // Year or date to display
  title: string;                 // Main title of the event
  subtitle?: string;             // Optional subtitle (e.g., company name)
  description?: string;          // Optional description text
  tags?: string[];               // Optional tags/labels
  highlight?: boolean;           // If true, emphasizes this event
  icon?: ReactNode;              // Optional custom icon
}

// Component props
interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

/**
 * ---------------------------------------------------------------------------
 * ANIMATION VARIANTS
 * ---------------------------------------------------------------------------
 */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * ---------------------------------------------------------------------------
 * TIMELINE COMPONENT
 * ---------------------------------------------------------------------------
 */
export function Timeline({ events, className = '' }: TimelineProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* 
        Vertical line running through the timeline
        Positioned to the left of the content
      */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-400/50 via-steel-800 to-transparent" />

      {/* Timeline Events */}
      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={`${event.year}-${event.title}`}
            variants={itemVariants}
            className="relative pl-8 md:pl-12"
          >
            {/* 
              Timeline dot/marker
              Positioned on the vertical line
            */}
            <div
              className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full transform -translate-x-1/2 ${
                event.highlight
                  ? 'bg-accent-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]'
                  : 'bg-steel-700 border border-steel-600'
              }`}
            >
              {/* Pulse animation for highlighted events */}
              {event.highlight && (
                <span className="absolute inset-0 rounded-full bg-accent-400 animate-ping opacity-20" />
              )}
            </div>

            {/* Event Content */}
            <div className="group">
              {/* Year Badge */}
              <span
                className={`inline-block font-mono text-xs uppercase tracking-wider mb-2 ${
                  event.highlight ? 'text-accent-400' : 'text-steel-500'
                }`}
              >
                {event.year}
              </span>

              {/* Title */}
              <h3
                className={`font-display text-xl md:text-2xl mb-1 ${
                  event.highlight ? 'text-steel-50' : 'text-steel-200'
                }`}
              >
                {event.title}
              </h3>

              {/* Subtitle (e.g., company name) */}
              {event.subtitle && (
                <p className="text-steel-400 font-medium mb-2">
                  {event.subtitle}
                </p>
              )}

              {/* Description */}
              {event.description && (
                <p className="text-steel-500 text-sm leading-relaxed max-w-2xl">
                  {event.description}
                </p>
              )}

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-mono text-steel-500 bg-steel-900/50 rounded border border-steel-800/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * ---------------------------------------------------------------------------
 * TIMELINE ITEM COMPONENT (Alternative usage)
 * ---------------------------------------------------------------------------
 * For more customized timeline items, use this component directly
 */
interface TimelineItemProps {
  children: ReactNode;
  year: string;
  highlight?: boolean;
}

export function TimelineItem({
  children,
  year,
  highlight = false,
}: TimelineItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative pl-8 md:pl-12"
    >
      {/* Timeline marker */}
      <div
        className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full transform -translate-x-1/2 ${
          highlight
            ? 'bg-accent-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]'
            : 'bg-steel-700 border border-steel-600'
        }`}
      />

      {/* Year */}
      <span
        className={`inline-block font-mono text-xs uppercase tracking-wider mb-2 ${
          highlight ? 'text-accent-400' : 'text-steel-500'
        }`}
      >
        {year}
      </span>

      {/* Custom content */}
      {children}
    </motion.div>
  );
}
