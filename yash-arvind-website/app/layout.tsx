/**
 * =============================================================================
 * ROOT LAYOUT COMPONENT
 * =============================================================================
 * 
 * This is the main layout file that wraps ALL pages on the website.
 * It includes:
 * - HTML document structure
 * - Metadata for SEO
 * - Global styles import
 * - Navigation and footer components
 * 
 * IMPORTANT: This file is required for Next.js App Router to work.
 * 
 * HOW TO CUSTOMIZE:
 * - Update metadata (title, description) for SEO
 * - Modify the font imports for different typography
 * - Add/remove providers (like theme providers, analytics, etc.)
 */

// Import React and Next.js types
import type { Metadata, Viewport } from 'next';

// Import global styles - this applies CSS to all pages
import './globals.css';

// Import layout components
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { InteractiveBackground } from '@/components/ui/InteractiveBackground';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { profile, seo, siteUrl } from '@/content/profile';

/**
 * ---------------------------------------------------------------------------
 * METADATA CONFIGURATION
 * ---------------------------------------------------------------------------
 * This object defines SEO metadata for the website.
 * It appears in search results and when sharing links on social media.
 * 
 * Copy comes from content/profile.ts. Pages override title/description
 * with their own `metadata` export (see lib/metadata.ts).
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // The main title shown in browser tabs and search results
  title: {
    default: seo.title,
    template: '%s | Yash Arvind', // For page-specific titles
  },

  // Description shown in search results (keep under 160 characters)
  description: seo.description,
  keywords: seo.keywords,

  // Author information
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: '/' },

  // Robots configuration (allow search engines to index)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph metadata (for social media sharing).
  // The image comes from app/opengraph-image.tsx.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: profile.name,
    url: '/',
    title: seo.title,
    description: seo.description,
  },

  // Twitter card metadata
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
  },

  icons: {
    icon: '/favicon.svg',
  },
};

/**
 * ---------------------------------------------------------------------------
 * VIEWPORT CONFIGURATION
 * ---------------------------------------------------------------------------
 * Controls how the page appears on different devices
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0b', // Dark theme color for browser chrome
};

/**
 * ---------------------------------------------------------------------------
 * ROOT LAYOUT COMPONENT
 * ---------------------------------------------------------------------------
 * The main layout wrapper that contains the HTML structure
 * 
 * @param children - The page content that gets rendered inside the layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The html tag with lang attribute for accessibility
    // 'dark' class enables dark mode (configured in tailwind.config.js)
    // suppressHydrationWarning: the inline script below adds a `js` class before hydration
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Lets CSS hide scroll-reveal content only when JS is running (see globals.css) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      {/* 
        Body setup:
        - min-h-screen: Ensures the body takes at least the full viewport height
        - flex flex-col: Uses flexbox for layout (header, main, footer)
        - antialiased: Smooths font rendering
      */}
      <body className="min-h-screen flex flex-col antialiased relative">
        {/* Interactive animated background */}
        <InteractiveBackground />
        <CursorGlow />

        {/*
          Skip to content link for accessibility
          Hidden by default, appears when focused with keyboard
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-400 focus:text-void-950 focus:rounded-md"
        >
          Skip to main content
        </a>

        {/*
          Navigation component
          This appears at the top of every page
        */}
        <Navigation />
        
        {/*
          Main content area
          - flex-1: Takes up remaining space between nav and footer
          - id: Allows skip link to jump here
          - relative z-10: Ensures content appears above background
        */}
        <main id="main-content" className="flex-1 relative z-10">
          {children}
        </main>
        
        {/* 
          Footer component
          This appears at the bottom of every page
        */}
        <Footer />
      </body>
    </html>
  );
}
