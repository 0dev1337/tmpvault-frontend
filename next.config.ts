import type { NextConfig } from "next";

const backend =
  process.env.TMPVAULT_BACKEND_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8080";

const nextConfig: NextConfig = {
  async rewrites() {
    if (process.env.NEXT_PUBLIC_TMPVAULT_API_URL) {
      return [];
    }
    return [
      { source: "/api/v1/:path*", destination: `${backend}/api/v1/:path*` },
      { source: "/download/:path*", destination: `${backend}/download/:path*` },
    ];
  },
};

export default nextConfig;
