import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile noVNC to handle top-level await and CJS
  transpilePackages: ["@novnc/novnc"],
  webpack: (config) => {
    // Enable top-level await for ESM modules
    config.experiments = {
      ...(config.experiments || {}),
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;
