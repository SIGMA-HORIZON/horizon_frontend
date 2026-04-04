import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   
  eslint: {
    ignoreDuringBuilds: true  // ignore TOUS les warnings ESLint au build
  
}
};

export default nextConfig;
