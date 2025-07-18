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
    ],
  },
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
