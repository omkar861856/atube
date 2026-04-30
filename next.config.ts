import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',

  // Skip the separate TS type-check & ESLint pass during `next build`
  // These are already handled by the IDE / CI lint step, and the standalone
  // TS pass is what causes heap OOM in memory-constrained Docker containers.
  typescript: { ignoreBuildErrors: true },
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.eporner.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
