/**
 * Design tokens live as CSS variables in app/globals.css; this maps them to
 * Tailwind utilities. See DESIGN.md before adding colors or effects.
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        'paper-deep': 'rgb(var(--paper-deep) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Fluid display sizes: clamp(min, preferred, max)
        'display-xl': ['clamp(3.25rem, 11vw, 11rem)', { lineHeight: '0.88', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(2.75rem, 7.5vw, 7rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-md': ['clamp(2rem, 4.5vw, 4rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(1.5rem, 2.6vw, 2.25rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        label: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
      },
      maxWidth: {
        page: '90rem',
        prose: '38rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
};
