/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "okandev.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.okandev.me",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
