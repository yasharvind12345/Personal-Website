/**
 * =============================================================================
 * BUTTON COMPONENT
 * =============================================================================
 * 
 * A reusable button component with multiple variants and sizes.
 * Supports both button and link (anchor) functionality.
 * 
 * USAGE EXAMPLES:
 * 
 * Primary button:
 * <Button>Click me</Button>
 * 
 * Secondary button:
 * <Button variant="secondary">Cancel</Button>
 * 
 * Button as link:
 * <Button href="/projects">View Projects</Button>
 * 
 * Button with icon:
 * <Button icon={<ArrowRight />}>Next</Button>
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode, ButtonHTMLAttributes } from 'react';

/**
 * ---------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * ---------------------------------------------------------------------------
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;                 // If provided, renders as a link
  external?: boolean;            // If true, opens in new tab
  icon?: ReactNode;              // Optional icon to display
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;           // If true, takes full container width
  loading?: boolean;             // Shows loading spinner
}

/**
 * ---------------------------------------------------------------------------
 * BUTTON COMPONENT
 * ---------------------------------------------------------------------------
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  /**
   * Size classes for different button sizes
   */
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  /**
   * Variant classes for different button styles
   */
  const variantClasses = {
    // Primary: solid accent background
    primary: `
      bg-accent-400 text-void-950 
      hover:bg-accent-300 
      shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset]
      active:bg-accent-500
    `,
    // Secondary: dark background with light border
    secondary: `
      bg-void-800 text-steel-100 
      border border-steel-700
      hover:bg-void-700 hover:border-steel-600
    `,
    // Ghost: transparent with hover background
    ghost: `
      bg-transparent text-steel-400
      hover:text-steel-100 hover:bg-void-800
    `,
    // Outline: transparent with accent border
    outline: `
      bg-transparent text-accent-400
      border border-accent-400/50
      hover:border-accent-400 hover:bg-accent-400/5
    `,
  };

  /**
   * Common classes for all button variants
   */
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium tracking-wide
    rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:ring-offset-2 focus:ring-offset-void-950
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  /**
   * Loading spinner component
   */
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  /**
   * Button content (text + icon)
   */
  const content = (
    <>
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </>
  );

  /**
   * If href is provided, render as a link
   */
  if (href) {
    // External link (opens in new tab)
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.a>
      );
    }

    // Internal link (uses Next.js routing)
    return (
      <Link href={href} className={baseClasses}>
        <motion.span
          className="inline-flex items-center gap-2"
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  /**
   * Regular button
   */
  return (
    <button
      className={baseClasses}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
