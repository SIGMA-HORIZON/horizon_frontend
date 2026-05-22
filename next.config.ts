import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin dev requests from the server IP
  allowedDevOrigins: ["http://192.168.123.100:3010"],
  
  transpilePackages: ["@novnc/novnc"],

  webpack: (config) => {
    // Enable top-level await in case other ESM modules need it
    config.experiments = {
      ...(config.experiments || {}),
      topLevelAwait: true,
    };

    return config;
  },
};

export default nextConfig;
