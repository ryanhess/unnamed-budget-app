import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typedRoutes: true,
    reactCompiler: true,
    reactStrictMode: true,
    pageExtensions: ["route.tsx", "route.ts"],
};

export default nextConfig;
