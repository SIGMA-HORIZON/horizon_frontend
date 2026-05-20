import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    // Keep top-level await enabled for ESM features required by some libs
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // Add rule to parse novnc properly as ESM
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/@novnc\/novnc/,
      type: "javascript/esm"
    });
    return config;
  },
};

export default nextConfig;
