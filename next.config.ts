import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    reactStrictMode: true,
    pageExtensions: ["route.tsx", "route.ts"],
};

export default nextConfig;
