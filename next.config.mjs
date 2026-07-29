import path from 'path';
import { fileURLToPath } from 'url';
import createNextIntlPlugin from 'next-intl/plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname);
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
    ],
};

export default withNextIntl(nextConfig);
