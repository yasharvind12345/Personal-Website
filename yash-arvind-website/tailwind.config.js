/**
 * =============================================================================
 * TAILWIND CSS CONFIGURATION
 * =============================================================================
 * 
 * This file customizes Tailwind CSS for Yash's website.
 * Tailwind is a utility-first CSS framework that makes styling fast and consistent.
 * 
 * HOW TO USE THIS FILE:
 * - Modify colors in the "colors" section to change the site's color scheme
 * - Adjust fonts in "fontFamily" to use different typography
 * - Change animations in "animation" for different motion effects
 * 
 * DOCUMENTATION: https://tailwindcss.com/docs/configuration
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ---------------------------------------------------------------------------
  // CONTENT PATHS
  // ---------------------------------------------------------------------------
  // Tell Tailwind where to look for class names in your files
  // This enables "tree-shaking" - removing unused CSS for smaller file sizes
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // ---------------------------------------------------------------------------
  // DARK MODE CONFIGURATION
  // ---------------------------------------------------------------------------
  // "class" means dark mode is activated by adding "dark" class to <html>
  // The site defaults to dark mode, which is set in the layout
  darkMode: 'class',

  theme: {
    extend: {
      // -------------------------------------------------------------------------
      // CUSTOM COLOR PALETTE
      // -------------------------------------------------------------------------
      // These are the main colors used throughout the site
      // Change these to rebrand the entire website
      colors: {
        // Primary dark backgrounds (almost black with slight warmth)
        'void': {
          950: '#0a0a0b',      // Darkest - main background
          900: '#0f0f10',      // Slightly lighter
          800: '#151517',      // Card backgrounds
          700: '#1a1a1d',      // Hover states
        },
        
        // Accent color (sophisticated gold/amber for fintech feel)
        'accent': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',       // Primary accent
          500: '#f59e0b',       // Hover state
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },

        // Neutral grays for text and borders
        'steel': {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',       // Secondary text
          500: '#71717a',       // Muted text
          600: '#52525b',
          700: '#3f3f46',       // Borders
          800: '#27272a',
          900: '#18181b',
        },

        // Status colors
        'success': '#10b981',   // Green for positive indicators
        'warning': '#f59e0b',   // Amber for warnings
        'error': '#ef4444',     // Red for errors
      },

      // -------------------------------------------------------------------------
      // TYPOGRAPHY (FONTS)
      // -------------------------------------------------------------------------
      // Custom font families - loaded via Google Fonts in layout.tsx
      fontFamily: {
        // Display font - used for headings and hero text
        // "Instrument Serif" gives an editorial, sophisticated feel
        'display': ['Instrument Serif', 'Georgia', 'serif'],
        
        // Sans-serif font for body text and UI elements
        // "General Sans" is clean and modern
        'sans': ['General Sans', 'system-ui', 'sans-serif'],
        
        // Monospace font for code and technical content
        // "JetBrains Mono" is optimized for readability
        'mono': ['JetBrains Mono', 'monospace'],
      },

      // -------------------------------------------------------------------------
      // FONT SIZES
      // -------------------------------------------------------------------------
      // Custom sizes for the typographic scale
      fontSize: {
        // Display sizes (for hero sections)
        'display-2xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },

      // -------------------------------------------------------------------------
      // ANIMATIONS
      // -------------------------------------------------------------------------
      // Custom animations for micro-interactions
      animation: {
        // Fade in from bottom (for page load)
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        
        // Fade in (for general reveals)
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        
        // Slide in from left (for navigation)
        'slide-in': 'slideIn 0.3s ease-out forwards',
        
        // Subtle pulse (for attention)
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        
        // Gradient shift (for backgrounds)
        'gradient': 'gradient 8s ease infinite',

        // Typing cursor blink
        'blink': 'blink 1s step-end infinite',
      },

      // Keyframe definitions for the animations above
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },

      // -------------------------------------------------------------------------
      // SPACING
      // -------------------------------------------------------------------------
      // Custom spacing values for layout consistency
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // -------------------------------------------------------------------------
      // BORDER RADIUS
      // -------------------------------------------------------------------------
      borderRadius: {
        '4xl': '2rem',
      },

      // -------------------------------------------------------------------------
      // BACKGROUND IMAGES
      // -------------------------------------------------------------------------
      // Custom gradients and patterns
      backgroundImage: {
        // Subtle grid pattern for backgrounds
        'grid-pattern': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        
        // Radial gradient for hero sections
        'radial-glow': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },

      // -------------------------------------------------------------------------
      // BOX SHADOWS
      // -------------------------------------------------------------------------
      boxShadow: {
        // Glow effect for accent elements
        'glow': '0 0 20px rgba(251, 191, 36, 0.15)',
        'glow-lg': '0 0 40px rgba(251, 191, 36, 0.2)',
        
        // Subtle shadow for cards
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
    },
  },

  // ---------------------------------------------------------------------------
  // PLUGINS
  // ---------------------------------------------------------------------------
  // Add Tailwind plugins for additional utilities
  plugins: [],
};
