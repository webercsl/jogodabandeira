import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adventurous-tortoise-457.convex.cloud", // Domínio das imagens
        port: "", // Deixe vazio para HTTPS
        pathname: "/api/storage/**", // Caminho das imagens
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
