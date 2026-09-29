/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Routes from earlier versions of the site, kept so old links still land somewhere useful.
  async redirects() {
    return [
      { source: '/experience', destination: '/about', permanent: true },
      { source: '/beyond', destination: '/about', permanent: true },
      { source: '/trajectory', destination: '/about', permanent: true },
      { source: '/projects', destination: '/work', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      // MiroFish now lives inside the Zendesk DIB case study.
      { source: '/work/mirofish', destination: '/work/zendesk-dib', permanent: true },
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
