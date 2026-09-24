/**
 * =============================================================================
 * SECTION COMPONENT
 * =============================================================================
 *
 * Consistent page section with optional heading and subheading.
 * Server-rendered so its content is always in the HTML; the heading fades in
 * via ScrollReveal.
 */

import { ReactNode } from 'react';
import { ScrollReveal } from './ScrollReveal';

interface SectionProps {
  children: ReactNode;           // Required: content inside the section
  heading?: string;              // Optional: main heading text
  subheading?: string;           // Optional: smaller text below heading
  className?: string;            // Optional: additional CSS classes
  id?: string;                   // Optional: HTML id for anchor links
  fullWidth?: boolean;           // Optional: remove container constraints
}

export function Section({
  children,
  heading,
  subheading,
  className = '',
  id,
  fullWidth = false,
}: SectionProps) {
  const headingId = id && heading ? `${id}-heading` : undefined;

  return (
    <section id={id} aria-labelledby={headingId} className={`section-padding ${className}`}>
      <div className={fullWidth ? 'px-4 sm:px-6 lg:px-8' : 'container-custom'}>
        {(heading || subheading) && (
          <ScrollReveal className="mb-10 md:mb-14">
            {heading && (
              <div className="section-heading !mb-4">
                <h2
                  id={headingId}
                  className="font-display text-display-sm md:text-display-md text-steel-50"
                >
                  {heading}
                </h2>
              </div>
            )}
            {subheading && (
              <p className="text-steel-400 text-lg max-w-2xl">{subheading}</p>
            )}
          </ScrollReveal>
        )}

        {children}
      </div>
    </section>
  );
}
