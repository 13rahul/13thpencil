/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.13thpencil.com" }],
        destination: "https://13thpencil.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
