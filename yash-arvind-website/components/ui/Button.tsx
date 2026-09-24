/**
 * =============================================================================
 * BUTTON COMPONENT
 * =============================================================================
 *
 * Renders a Next.js Link for internal hrefs, an <a> for external links or
 * downloads, and a <button> otherwise.
 */

import Link from 'next/link';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;                 // If provided, renders as a link
  external?: boolean;            // If true, opens in new tab
  download?: boolean;            // If true, renders a plain download link
  icon?: ReactNode;              // Optional icon to display
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;           // If true, takes full container width
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  download = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantClasses = {
    // Primary: solid accent background
    primary:
      'bg-accent-400 text-void-950 hover:bg-accent-300 hover:text-void-950 shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset] active:bg-accent-500',
    // Secondary: dark background with light border
    secondary:
      'bg-void-800 text-steel-100 border border-steel-700 hover:bg-void-700 hover:border-steel-600',
    // Ghost: transparent with hover background
    ghost: 'bg-transparent text-steel-400 hover:text-steel-100 hover:bg-void-800',
    // Outline: transparent with accent border
    outline:
      'bg-transparent text-accent-400 border border-accent-400/50 hover:border-accent-400 hover:bg-accent-400/5',
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 font-medium tracking-wide rounded-lg transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950 disabled:opacity-50 disabled:cursor-not-allowed ${
    fullWidth ? 'w-full' : ''
  } ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  );

  if (href) {
    if (external || download) {
      return (
        <a
          href={href}
          className={baseClasses}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...(download ? { download: true } : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {content}
    </button>
  );
}
