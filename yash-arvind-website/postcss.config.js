/**
 * =============================================================================
 * POSTCSS CONFIGURATION
 * =============================================================================
 * 
 * PostCSS processes your CSS files. This config tells it to:
 * 1. Use Tailwind CSS for utility classes
 * 2. Use Autoprefixer to add browser-specific prefixes (like -webkit-)
 * 
 * YOU DON'T NEED TO MODIFY THIS FILE
 * unless you want to add additional CSS processing plugins.
 */

module.exports = {
  plugins: {
    // Tailwind CSS - processes your utility classes
    tailwindcss: {},
    
    // Autoprefixer - adds vendor prefixes for browser compatibility
    autoprefixer: {},
  },
};
