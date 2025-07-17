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
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "okandev.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "okandev.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },

  reactStrictMode: true,

  experimental: {
    scrollRestoration: true,
  },
});

export default nextConfig;
