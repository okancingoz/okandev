import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: "http://localhost:5000/api/v1/dashboard",
      },
    ];
  },
};

export default nextConfig;
