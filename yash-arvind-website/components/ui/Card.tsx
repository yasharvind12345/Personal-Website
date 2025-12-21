/**
 * =============================================================================
 * CARD COMPONENT
 * =============================================================================
 * 
 * A reusable card component for containing content with consistent styling.
 * Features subtle borders, hover effects, and glassmorphism.
 * 
 * USAGE EXAMPLES:
 * 
 * Basic card:
 * <Card>
 *   <h3>My Title</h3>
 *   <p>My content</p>
 * </Card>
 * 
 * Card with hover effect:
 * <Card hover>
 *   <h3>Hover me!</h3>
 * </Card>
 * 
 * Card with accent border:
 * <Card variant="accent">
 *   <h3>Featured content</h3>
 * </Card>
 */

'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * ---------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * ---------------------------------------------------------------------------
 */
interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;           // Required: content inside the card
  variant?: 'default' | 'accent' | 'ghost'; // Visual style variant
  hover?: boolean;               // Enable hover animation
  padding?: 'sm' | 'md' | 'lg';  // Padding size
  className?: string;            // Additional CSS classes
}

/**
 * ---------------------------------------------------------------------------
 * CARD COMPONENT
 * ---------------------------------------------------------------------------
 */
export function Card({
  children,
  variant = 'default',
  hover = true,
  padding = 'md',
  className = '',
  ...motionProps
}: CardProps) {
  /**
   * Get padding classes based on size prop
   */
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  /**
   * Get variant-specific styles
   */
  const variantClasses = {
    // Default: subtle dark card with border
    default: `
      bg-void-800/50 
      border border-steel-800/50 
      backdrop-blur-sm
    `,
    // Accent: highlighted card with accent color hint
    accent: `
      bg-void-800/50 
      border border-accent-400/20 
      backdrop-blur-sm
      shadow-[0_0_30px_rgba(251,191,36,0.05)]
    `,
    // Ghost: minimal card with no background
    ghost: `
      bg-transparent 
      border border-steel-800/30
    `,
  };

  /**
   * Hover effect styles
   */
  const hoverClasses = hover
    ? 'hover:border-steel-700/70 hover:bg-void-700/50 transition-all duration-300'
    : '';

  return (
    <motion.div
      className={`
        rounded-xl 
        ${paddingClasses[padding]} 
        ${variantClasses[variant]} 
        ${hoverClasses}
        ${className}
      `}
      // Subtle scale effect on hover
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
