import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@novnc/novnc'],
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    // Top-level await is needed for some ESM features
    config.experiments = { ...config.experiments, topLevelAwait: true };
    
    // Force `@novnc/novnc` to be treated as ESM
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/@novnc\/novnc/,
      type: 'javascript/esm',
    });
    
    return config;
  },
};

export default nextConfig;
