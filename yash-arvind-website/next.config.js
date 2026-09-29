/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Routes from earlier versions of the site, kept so old links still land somewhere useful.
  async redirects() {
    // Everything lives on the home page now; old routes jump to their section.
    const toAbout = ['/about', '/now', '/experience', '/beyond', '/trajectory'];
    return [
      ...toAbout.map((source) => ({ source, destination: '/#about', permanent: true })),
      { source: '/work', destination: '/#work', permanent: true },
      { source: '/projects', destination: '/#work', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/work/cortexa', destination: '/#work', permanent: true },
      // MiroFish lives inside the Zendesk DIB case study.
      { source: '/work/mirofish', destination: '/#work/zendesk-dib', permanent: true },
      { source: '/work/:slug', destination: '/#work/:slug', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
