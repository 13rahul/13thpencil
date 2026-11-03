const assetCache = [
  { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
];
const fontCache = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];
const mediaCache = [
  { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/_handoff/index.html" },
        { source: "/principle", destination: "/_handoff/principle.html" },
        { source: "/work", destination: "/_handoff/work.html" },
        { source: "/insights", destination: "/_handoff/insights.html" },
        { source: "/contact", destination: "/_handoff/contact.html" },
        { source: "/capabilities/brand-and-strategy", destination: "/_handoff/capabilities/brand-and-strategy.html" },
        { source: "/capabilities/creative-studio", destination: "/_handoff/capabilities/creative-studio.html" },
        { source: "/capabilities/ai-and-innovation", destination: "/_handoff/capabilities/ai-and-innovation.html" },
        { source: "/capabilities/experiences", destination: "/_handoff/capabilities/experiences.html" },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.13thpencil.com" }],
        destination: "https://13thpencil.com/:path*",
        permanent: true,
      },
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
    ];
  },
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      { source: "/admin", headers: noindex },
      { source: "/admin/:path*", headers: noindex },
      { source: "/login", headers: noindex },
      { source: "/api/:path*", headers: noindex },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Content-Type", value: "text/xml; charset=UTF-8" },
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
      { source: "/assets/fonts/:path*", headers: fontCache },
      { source: "/assets/css/:path*", headers: assetCache },
      { source: "/assets/js/:path*", headers: assetCache },
      { source: "/assets/img/:path*", headers: mediaCache },
      { source: "/assets/video/:path*", headers: mediaCache },
      { source: "/assets/brand/:path*", headers: mediaCache },
      { source: "/assets/media/:path*", headers: mediaCache },
      { source: "/_handoff/:path*", headers: noindex },
    ];
  },
};

export default nextConfig;
