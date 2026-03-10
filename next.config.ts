import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    const hoistPath = path.join(
      __dirname,
      "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.min.js"
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      "hoist-non-react-statics": hoistPath,
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "hoist-non-react-statics": hoistPath,
    };
    return config;
  },
};

export default nextConfig;
