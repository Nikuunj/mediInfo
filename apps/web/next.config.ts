import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      domains: ['ik.imagekit.io'], // Allow ImageKit URLs
    },
};

export default nextConfig;
