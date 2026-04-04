import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // ignore ESLint warnings
  },
  reactStrictMode: true,
  swcMinify: true,
  // Ajoute si tu veux changer le dossier de build
  distDir: "build",  // optionnel, par défaut c'est ".next"
};

export default nextConfig;
