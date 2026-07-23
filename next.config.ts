import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/book/:slug.md",
        destination: "/api/markdown/:slug",
      },
    ];
  },
};

export default nextConfig;
