import type { NextConfig } from "next";

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });


const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['ik.imagekit.io'], // Allow ImageKit URLs
    },
    env: {
      NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
      NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
      NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    },
};

export default nextConfig;
