import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: true },
      { source: "/work/:path*", destination: "/en/work/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
