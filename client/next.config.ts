import type { NextConfig } from "next";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = withBundleAnalyzer({
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: "https://okandev.onrender.com/api/v1/dashboard",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "okandev.onrender.com",
        pathname: "/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  reactStrictMode: true,

  experimental: {
    scrollRestoration: true,
  },
});

export default nextConfig;
