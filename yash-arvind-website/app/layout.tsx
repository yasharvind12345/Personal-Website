import type { Metadata, Viewport } from 'next';
import { Archivo, Newsreader, IBM_Plex_Mono } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';
import './globals.css';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { profile, seo, siteUrl } from '@/content/profile';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400', '500'],
  variable: '--font-newsreader',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: '%s | Yash Arvind' },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  // Image comes from app/opengraph-image.tsx.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: profile.name,
    url: '/',
    title: seo.title,
    description: seo.description,
  },
  twitter: { card: 'summary_large_image', title: seo.title, description: seo.description },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F4F1EA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${archivo.variable} ${newsreader.variable} ${plexMono.variable}`}
        suppressHydrationWarning
      >
        <head>
          {/* Lets CSS hide pre-animation states only when JS is running (see globals.css). */}
          <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        </head>
        <body className="flex min-h-screen flex-col">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          >
            Skip to main content
          </a>
          <MotionProvider>
            <Navigation />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
