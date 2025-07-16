import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = withBundleAnalyzer({
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: "http://localhost:5000/api/v1/dashboard",
      },
    ];
  },
});

export default nextConfig;
