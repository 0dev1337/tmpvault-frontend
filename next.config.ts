import type { NextConfig } from "next";
import { BACKEND_ORIGIN } from "./lib/env";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/download/:path*",
        destination: `${BACKEND_ORIGIN}/download/:path*`,
      },
    ];
  },
};

export default nextConfig;
