import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/to-be", destination: "/", permanent: true },
      { source: "/to-be/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
