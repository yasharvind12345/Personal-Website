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

/**
 * ---------------------------------------------------------------------------
 * METADATA CONFIGURATION
 * ---------------------------------------------------------------------------
 * This object defines SEO metadata for the website.
 * It appears in search results and when sharing links on social media.
 * 
 * CUSTOMIZE THIS for your personal information!
 */
export const metadata: Metadata = {
  // The main title shown in browser tabs and search results
  title: {
    default: 'Yash Arvind | Fintech & AI Builder',
    template: '%s | Yash Arvind', // For page-specific titles
  },
  
  // Description shown in search results (keep under 160 characters)
  description: 'Building AI-driven financial systems. UW-Madison Data Science & Economics student specializing in quantitative finance, agentic AI, and revenue optimization.',
  
  // Keywords for search engines (less important now but still useful)
  keywords: [
    'Yash Arvind',
    'fintech',
    'AI',
    'quantitative finance',
    'hedge fund',
    'data science',
    'UW-Madison',
    'financial systems',
    'agentic AI',
  ],
  
  // Author information
  authors: [{ name: 'Yash Arvind' }],
  creator: 'Yash Arvind',
  
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
  
  // Open Graph metadata (for social media sharing)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Yash Arvind',
    title: 'Yash Arvind | Fintech & AI Builder',
    description: 'Building AI-driven financial systems. UW-Madison Data Science & Economics student.',
    // Add your own OG image URL here
    // images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  
  // Twitter card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Yash Arvind | Fintech & AI Builder',
    description: 'Building AI-driven financial systems. UW-Madison Data Science & Economics student.',
    // Add your Twitter handle
    // creator: '@yasharvind',
  },
  
  // Favicon and icons
  icons: {
    icon: '/favicon.ico',
    // Add more icon sizes for different devices
    // apple: '/apple-touch-icon.png',
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
    <html lang="en" className="dark">
      {/* 
        Body setup:
        - min-h-screen: Ensures the body takes at least the full viewport height
        - flex flex-col: Uses flexbox for layout (header, main, footer)
        - antialiased: Smooths font rendering
      */}
      <body className="min-h-screen flex flex-col antialiased">
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
        */}
        <main id="main-content" className="flex-1">
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
