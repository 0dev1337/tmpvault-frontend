import type { NextConfig } from "next";

const backend =
  process.env.TMPVAULT_BACKEND_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8080";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/download/:path*",
        destination: `${backend}/download/:path*`,
      },
    ];
  },
};

export default nextConfig;
