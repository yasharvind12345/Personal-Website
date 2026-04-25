/**
 * =============================================================================
 * PROJECT CARD COMPONENT
 * =============================================================================
 * 
 * A card component specifically designed for showcasing projects and ventures.
 * Features image support, tech stack display, action links, award badges,
 * and animated pulse dot for active projects.
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { ReactNode } from 'react';

/**
 * ---------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * ---------------------------------------------------------------------------
 */
interface AwardBadge {
  label: string;
  variant: 'gold' | 'green' | 'purple' | 'blue';
}

interface ProjectCardProps {
  title: string;                 // Project name
  description: string;           // Brief description
  longDescription?: string;      // Extended description (shown on hover/expand)
  tags?: string[];               // Technologies/categories
  href?: string;                 // Link to project details page
  externalUrl?: string;          // Link to live project
  githubUrl?: string;            // Link to GitHub repo
  imageUrl?: string;             // Project screenshot/image
  featured?: boolean;            // If true, uses larger/emphasized styling
  status?: 'active' | 'completed' | 'in-progress' | 'hackathon';
  metrics?: {                    // Key metrics to display
    label: string;
    value: string;
  }[];
  icon?: ReactNode;              // Optional project icon
  className?: string;
  awardBadges?: AwardBadge[];    // Award/recognition badges
  ctaButton?: {                  // Optional CTA button
    label: string;
    url: string;
  };
  size?: 'default' | 'large' | 'compact'; // Card size variant
}

/**
 * ---------------------------------------------------------------------------
 * STATUS BADGE COMPONENT (with live pulse for active)
 * ---------------------------------------------------------------------------
 */
function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    active: {
      label: 'Active',
      classes: 'bg-green-500/10 text-green-400 border-green-500/20',
      dot: 'bg-green-500',
      pulse: true,
    },
    completed: {
      label: 'Completed',
      classes: 'bg-steel-800/50 text-steel-400 border-steel-700/50',
      dot: 'bg-steel-500',
      pulse: false,
    },
    'in-progress': {
      label: 'In Progress',
      classes: 'bg-accent-400/10 text-accent-400 border-accent-400/20',
      dot: 'bg-accent-400',
      pulse: false,
    },
    hackathon: {
      label: 'Hackathon',
      classes: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      dot: 'bg-purple-500',
      pulse: false,
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono rounded-full border ${config.classes}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {config.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dot} opacity-75`} />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${config.dot}`} />
      </span>
      {config.label}
    </span>
  );
}

/**
 * ---------------------------------------------------------------------------
 * AWARD BADGE COMPONENT
 * ---------------------------------------------------------------------------
 */
function AwardBadgeTag({ badge }: { badge: AwardBadge }) {
  const variantClasses = {
    gold: 'bg-amber-400/10 text-amber-400 border-amber-400/25',
    green: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/25',
    purple: 'bg-purple-400/10 text-purple-400 border-purple-400/25',
    blue: 'bg-blue-400/10 text-blue-400 border-blue-400/25',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${variantClasses[badge.variant]}`}>
      {badge.label}
    </span>
  );
}

/**
 * ---------------------------------------------------------------------------
 * PROJECT CARD COMPONENT
 * ---------------------------------------------------------------------------
 */
export function ProjectCard({
  title,
  description,
  longDescription,
  tags = [],
  href,
  externalUrl,
  githubUrl,
  imageUrl,
  featured = false,
  status,
  metrics = [],
  icon,
  className = '',
  awardBadges = [],
  ctaButton,
  size = 'default',
}: ProjectCardProps) {
  /**
   * Card wrapper - either a link or a div
   */
  const CardWrapper = ({ children }: { children: ReactNode }) => {
    if (href) {
      return (
        <Link href={href} className="block">
          {children}
        </Link>
      );
    }
    return <div>{children}</div>;
  };

  const isCompact = size === 'compact';

  return (
    <motion.article
      className={`
        group relative overflow-hidden rounded-xl
        ${featured
          ? 'bg-void-800/50 border border-accent-400/20'
          : 'bg-void-800/30 border border-steel-800/50'
        }
        transition-all duration-300
        hover:border-steel-700/70 hover:bg-void-700/30
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <CardWrapper>
        {/* 
          Project Image (if provided)
          Shows at the top of the card
        */}
        {imageUrl && (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={`${title} preview`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-transparent to-transparent" />
          </div>
        )}

        {/* Card Content */}
        <div className={isCompact ? 'p-4 sm:p-5' : 'p-6'}>
          {/* Header: Status & Icon */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Project Icon */}
              {icon && (
                <div className="p-2 bg-void-900/50 rounded-lg text-steel-400">
                  {icon}
                </div>
              )}
              
              {/* Status Badge */}
              {status && <StatusBadge status={status} />}
            </div>

            {/* External Links */}
            <div className="flex items-center gap-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-steel-500 hover:text-steel-100 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View on GitHub"
                >
                  <Github size={16} />
                </a>
              )}
              {externalUrl && (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-steel-500 hover:text-steel-100 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View live project"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Award Badges */}
          {awardBadges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {awardBadges.map((badge) => (
                <AwardBadgeTag key={badge.label} badge={badge} />
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className={`font-display ${isCompact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} text-steel-50 mb-2 group-hover:text-accent-400 transition-colors`}>
            {title}
            {href && (
              <ArrowUpRight
                size={20}
                className="inline-block ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
              />
            )}
          </h3>

          {/* Description */}
          <p className="text-steel-400 text-sm leading-relaxed mb-3">
            {description}
          </p>

          {/* Extended Description (if provided) */}
          {longDescription && (
            <p className={`text-steel-500 text-sm leading-relaxed mb-4 ${isCompact ? 'line-clamp-3' : ''}`}>
              {longDescription}
            </p>
          )}

          {/* CTA Button */}
          {ctaButton && (
            <a
              href={ctaButton.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-lg bg-accent-400 text-void-950 hover:bg-accent-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {ctaButton.label}
              <ExternalLink size={14} />
            </a>
          )}

          {/* Metrics (if provided) */}
          {metrics.length > 0 && (
            <div className="flex gap-6 mb-4 pt-4 border-t border-steel-800/50">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-lg font-display text-steel-50">
                    {metric.value}
                  </p>
                  <p className="text-xs font-mono text-steel-500 uppercase tracking-wider">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tech Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
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
      </CardWrapper>

      {/* Featured gradient accent */}
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/50 to-transparent" />
      )}
    </motion.article>
  );
}

/**
 * ---------------------------------------------------------------------------
 * PROJECT GRID COMPONENT
 * ---------------------------------------------------------------------------
 * A wrapper for laying out multiple project cards
 */
interface ProjectGridProps {
  children: ReactNode;
  className?: string;
}

export function ProjectGrid({ children, className = '' }: ProjectGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}
    >
      {children}
    </div>
  );
}
