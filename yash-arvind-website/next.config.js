/**
 * =============================================================================
 * NEXT.JS CONFIGURATION FILE
 * =============================================================================
 * 
 * This file configures how Next.js builds and runs your website.
 * Most settings here are optimizations for production performance.
 * 
 * WHAT YOU CAN CUSTOMIZE:
 * - Add environment variables
 * - Configure image optimization
 * - Set up redirects or rewrites
 * 
 * DOCUMENTATION: https://nextjs.org/docs/app/api-reference/next-config-js
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  
  // -----------------------------------------------------------------------------
  // REACT STRICT MODE
  // -----------------------------------------------------------------------------
  // Enables additional checks during development to catch potential issues.
  // Recommended to keep this ON for better code quality.
  reactStrictMode: true,

  // -----------------------------------------------------------------------------
  // IMAGE OPTIMIZATION
  // -----------------------------------------------------------------------------
  // Next.js automatically optimizes images for faster loading.
  // Add any external image domains here if you use images from other websites.
  images: {
    // Example: If you want to load images from external sources, add domains here
    // domains: ['example.com', 'cdn.example.com'],
    
    // Use modern image formats (WebP, AVIF) for better compression
    formats: ['image/avif', 'image/webp'],
  },

  // -----------------------------------------------------------------------------
  // EXPERIMENTAL FEATURES (Optional)
  // -----------------------------------------------------------------------------
  // Uncomment these if you want to use experimental Next.js features
  // experimental: {
  //   serverActions: true,
  // },

  // -----------------------------------------------------------------------------
  // ENVIRONMENT VARIABLES (Optional)
  // -----------------------------------------------------------------------------
  // You can expose environment variables to the browser here
  // env: {
  //   CUSTOM_KEY: process.env.CUSTOM_KEY,
  // },

  // -----------------------------------------------------------------------------
  // HEADERS (Security)
  // -----------------------------------------------------------------------------
  // Add security headers to protect your site
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
