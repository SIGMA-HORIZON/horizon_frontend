import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Keep top-level await enabled for ESM features required by some libs
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

export default nextConfig;
