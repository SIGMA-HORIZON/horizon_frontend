import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin dev requests from the server IP
  allowedDevOrigins: ["http://192.168.123.100:3010"],
  
  transpilePackages: ["@novnc/novnc"],

  experimental: {
    esmExternals: 'loose',
  },

  webpack: (config) => {
    // Enable top-level await in case other ESM modules need it
    config.experiments = {
      ...(config.experiments || {}),
      topLevelAwait: true,
    };

    // Force Webpack to parse noVNC as ECMAScript Module so top-level await is allowed
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/@novnc\/novnc/,
      type: "javascript/esm"
    });

    return config;
  },
};

export default nextConfig;
