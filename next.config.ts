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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://www.googletagmanager.com",
              "font-src 'self'",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://vitals.vercel-insights.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        // /reference/ 配下へ移動する前の旧URLで公開済みだった5ページのみ。
        // 新規リファレンスは最初から /reference/ 配下なので追加不要
        source: '/:locale(ja|en)/:slug(architecture|perspectives|memory-vs-fetch-ai-accuracy-and-cost|article-access-control|adaas-reference)',
        destination: '/:locale/reference/:slug',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
