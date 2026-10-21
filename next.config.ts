import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the app root so Turbopack does not walk up to the home directory.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
