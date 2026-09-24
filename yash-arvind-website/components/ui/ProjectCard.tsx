/**
 * =============================================================================
 * PROJECT CARD COMPONENT
 * =============================================================================
 *
 * Card for case studies, hackathon builds, and side projects.
 * When `href` is set, the title link stretches over the whole card, so the
 * GitHub / external links stay separate, valid, focusable anchors.
 */

import Link from 'next/link';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { ReactNode } from 'react';

interface AwardBadge {
  label: string;
  variant: 'gold' | 'green' | 'purple' | 'blue';
}

interface ProjectCardProps {
  title: string;                 // Project name
  description: string;           // Brief description
  eyebrow?: string;              // Small label above the title (org, role)
  longDescription?: string;      // Extended description
  tags?: string[];               // Technologies/categories
  href?: string;                 // Link to project details page
  externalUrl?: string;          // Link to live project
  githubUrl?: string;            // Link to GitHub repo
  featured?: boolean;            // If true, uses emphasized styling
  status?: 'active' | 'completed' | 'in-progress' | 'hackathon';
  metrics?: {                    // Key metrics to display
    label: string;
    value: string;
  }[];
  icon?: ReactNode;              // Optional project icon
  className?: string;
  awardBadges?: AwardBadge[];    // Award/recognition badges
  size?: 'default' | 'compact';  // Card size variant
}

function StatusBadge({ status }: { status: NonNullable<ProjectCardProps['status']> }) {
  const statusConfig = {
    active: {
      label: 'Active',
      classes: 'bg-green-500/10 text-green-400 border-green-500/20',
      dot: 'bg-green-500',
    },
    completed: {
      label: 'Completed',
      classes: 'bg-steel-800/50 text-steel-400 border-steel-700/50',
      dot: 'bg-steel-500',
    },
    'in-progress': {
      label: 'In Progress',
      classes: 'bg-accent-400/10 text-accent-400 border-accent-400/20',
      dot: 'bg-accent-400',
    },
    hackathon: {
      label: 'Hackathon',
      classes: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      dot: 'bg-purple-500',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono rounded-full border ${config.classes}`}
    >
      <span className={`inline-flex rounded-full h-1.5 w-1.5 ${config.dot}`} />
      {config.label}
    </span>
  );
}

function AwardBadgeTag({ badge }: { badge: AwardBadge }) {
  const variantClasses = {
    gold: 'bg-amber-400/10 text-amber-400 border-amber-400/25',
    green: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/25',
    purple: 'bg-purple-400/10 text-purple-400 border-purple-400/25',
    blue: 'bg-blue-400/10 text-blue-400 border-blue-400/25',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${variantClasses[badge.variant]}`}
    >
      {badge.label}
    </span>
  );
}

export function ProjectCard({
  title,
  description,
  eyebrow,
  longDescription,
  tags = [],
  href,
  externalUrl,
  githubUrl,
  featured = false,
  status,
  metrics = [],
  icon,
  className = '',
  awardBadges = [],
  size = 'default',
}: ProjectCardProps) {
  const isCompact = size === 'compact';

  return (
    <article
      className={`group relative flex flex-col h-full overflow-hidden rounded-xl ${
        featured
          ? 'bg-void-800/50 border border-accent-400/20'
          : 'bg-void-800/30 border border-steel-800/50'
      } transition-all duration-300 hover:border-steel-700/70 hover:bg-void-700/30 motion-safe:hover:-translate-y-1 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent-400 ${className}`}
    >
      <div className={`flex flex-col flex-1 ${isCompact ? 'p-4 sm:p-5' : 'p-6'}`}>
        {/* Header: icon, status, external links */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-wrap">
            {icon && (
              <div className="p-2 bg-void-900/50 rounded-lg text-accent-400" aria-hidden="true">
                {icon}
              </div>
            )}
            {status && <StatusBadge status={status} />}
          </div>

          <div className="relative z-10 flex items-center gap-1">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-steel-500 hover:text-steel-100 transition-colors focus-visible:ring-2 focus-visible:ring-accent-400"
                aria-label={`${title} on GitHub`}
              >
                <Github size={16} aria-hidden="true" />
              </a>
            )}
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-steel-500 hover:text-steel-100 transition-colors focus-visible:ring-2 focus-visible:ring-accent-400"
                aria-label={`${title}: live project`}
              >
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {awardBadges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {awardBadges.map((badge) => (
              <AwardBadgeTag key={badge.label} badge={badge} />
            ))}
          </div>
        )}

        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-wider text-steel-500 mb-1">{eyebrow}</p>
        )}

        <h3
          className={`font-display ${
            isCompact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
          } text-steel-50 mb-2 group-hover:text-accent-400 transition-colors`}
        >
          {href ? (
            <Link
              href={href}
              className="text-inherit hover:text-inherit focus:outline-none focus-visible:ring-0 after:absolute after:inset-0 after:content-['']"
            >
              {title}
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="inline-block ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity"
              />
            </Link>
          ) : (
            title
          )}
        </h3>

        <p className="text-steel-300 text-sm leading-relaxed mb-3">{description}</p>

        {longDescription && (
          <p className="text-steel-500 text-sm leading-relaxed mb-4">{longDescription}</p>
        )}

        <div className="mt-auto">
          {metrics.length > 0 && (
            <dl className="flex flex-wrap gap-x-6 gap-y-3 mb-4 pt-4 border-t border-steel-800/50">
              {metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse">
                  <dt className="text-xs font-mono text-steel-500 uppercase tracking-wider">
                    {metric.label}
                  </dt>
                  <dd className="text-lg font-display text-steel-50">{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono text-steel-500 bg-steel-900/50 rounded border border-steel-800/50"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {featured && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/50 to-transparent" />
      )}
    </article>
  );
}
