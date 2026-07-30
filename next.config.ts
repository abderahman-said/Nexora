import path from 'path';
import { fileURLToPath } from 'url';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname);
        
        // Improve build performance
        config.cache = {
            type: 'filesystem',
            cacheDirectory: path.resolve(__dirname, '.next/cache'),
        };
        
        return config;
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    reactStrictMode: true,
    httpAgentOptions: {
        keepAlive: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 31536000,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'gsap'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    headers: async () => [
        {
            source: '/:all*(svg|jpg|png|webp|avif|ttf|woff|woff2)',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable',
                },
            ],
        },
        {
            source: '/:all*(js|css)',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable',
                },
            ],
        },
    ],
};

export default withNextIntl(nextConfig);
