import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://www.googletagmanager.com",
              "font-src 'self'",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
  async redirects() {
    return []
  },
};

export default nextConfig;
