const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // frontend'den gelen /api/ ile başlayan istekler
        destination: "https://okandev.onrender.com/api/:path*", // backend'e proxyle
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
  },
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
