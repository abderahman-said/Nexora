import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /**
   * Production compression.
   * Next.js already handles compression in the normal production setup.
   */
  compress: true,

  /**
   * Security / smaller response headers.
   */
  poweredByHeader: false,

  /**
   * Keep ETags enabled.
   */
  generateEtags: true,

  /**
   * Helps catch unsafe React patterns during development.
   */
  reactStrictMode: true,

  /**
   * Keep-alive for server-side HTTP requests.
   */
  httpAgentOptions: {
    keepAlive: true,
  },

  /**
   * Image optimization.
   */
  images: {
    formats: ["image/webp", "image/avif"],

    /**
     * Cache optimized image responses for a long time.
     * This is handled by Next's image optimizer and is safer
     * than forcing immutable caching on every public image.
     */
    minimumCacheTTL: 31536000,

    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],

    /**
     * Only keep this enabled if the project actually renders
     * SVG files through next/image.
     *
     * If you don't need SVG images, set this to false.
     */
    dangerouslyAllowSVG: true,

    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },

  /**
   * Reduce the amount of JavaScript imported from large packages.
   */
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  /**
   * Remove console statements from production builds.
   */
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production",
  },
};

export default withNextIntl(nextConfig);