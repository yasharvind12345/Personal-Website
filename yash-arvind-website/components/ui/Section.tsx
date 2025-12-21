/**
 * =============================================================================
 * SECTION COMPONENT
 * =============================================================================
 * 
 * A reusable wrapper component for page sections.
 * Provides consistent spacing, optional headings, and container width.
 * 
 * USAGE EXAMPLE:
 * <Section heading="My Projects" subheading="Things I've built">
 *   <ProjectCards />
 * </Section>
 * 
 * PROPS:
 * - children: Content to render inside the section
 * - heading: Optional section heading text
 * - subheading: Optional smaller text below heading
 * - className: Additional CSS classes
 * - id: HTML id for anchor linking
 * - fullWidth: If true, removes max-width constraint
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * ---------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * ---------------------------------------------------------------------------
 * Define what props this component accepts
 */
interface SectionProps {
  children: ReactNode;           // Required: content inside the section
  heading?: string;              // Optional: main heading text
  subheading?: string;           // Optional: smaller text below heading
  className?: string;            // Optional: additional CSS classes
  id?: string;                   // Optional: HTML id for anchor links
  fullWidth?: boolean;           // Optional: remove container constraints
}

/**
 * ---------------------------------------------------------------------------
 * ANIMATION VARIANTS
 * ---------------------------------------------------------------------------
 * Define how elements animate when they come into view
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,      // Stagger child animations by 0.1s
      delayChildren: 0.1,        // Wait 0.1s before starting
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],   // Custom easing for smooth motion
    },
  },
};

/**
 * ---------------------------------------------------------------------------
 * SECTION COMPONENT
 * ---------------------------------------------------------------------------
 */
export function Section({
  children,
  heading,
  subheading,
  className = '',
  id,
  fullWidth = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section-padding ${className}`}
    >
      {/* 
        Container wrapper
        fullWidth: no max-width constraint
        default: centered container with max-width
      */}
      <div className={fullWidth ? 'px-4 sm:px-6 lg:px-8' : 'container-custom'}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }} // Trigger when 100px into viewport
        >
          {/* 
            Section Header
            Only renders if heading or subheading is provided
          */}
          {(heading || subheading) && (
            <motion.div
              variants={headingVariants}
              className="mb-12 md:mb-16"
            >
              {/* Main heading with decorative line */}
              {heading && (
                <div className="section-heading">
                  <h2 className="font-display text-display-sm md:text-display-md text-steel-50">
                    {heading}
                  </h2>
                </div>
              )}
              
              {/* Subheading text */}
              {subheading && (
                <p className="text-steel-400 text-lg max-w-2xl">
                  {subheading}
                </p>
              )}
            </motion.div>
          )}

          {/* Section Content */}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
