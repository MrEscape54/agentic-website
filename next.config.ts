import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/en" },
        { source: "/platform", destination: "/en/platform" },
        { source: "/enterprise", destination: "/en/enterprise" },
      ],
    };
  },
  async redirects() {
    return [
      { source: "/to-be", destination: "/", permanent: true },
      { source: "/to-be/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default createNextIntlPlugin()(nextConfig);
