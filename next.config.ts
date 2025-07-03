import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*',
        destination: 'http://94.74.86.174:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
