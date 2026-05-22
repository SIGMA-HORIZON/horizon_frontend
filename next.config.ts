import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin dev requests from the server IP
  allowedDevOrigins: ["http://192.168.123.100:3010"],

  webpack: (config) => {
    // Enable top-level await in case other ESM modules need it
    config.experiments = {
      ...(config.experiments || {}),
      topLevelAwait: true,
    };

    // Exclude @novnc/novnc from webpack bundling entirely —
    // it uses ESM top-level await which is incompatible with webpack.
    // The console page loads it via CDN script tag instead.
    config.externals = [
      ...(Array.isArray(config.externals) ? config.externals : []),
      /^@novnc\/novnc/,
    ];

    return config;
  },
};

export default nextConfig;
