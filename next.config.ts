import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@novnc/novnc'],
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };

    config.module.rules.push({
      test: /@novnc\/novnc\/.*\.js$/,
      parser: {
        topLevelAwait: true,
      },
    });

    return config;
  },
};

export default nextConfig;
