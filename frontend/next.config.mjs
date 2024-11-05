/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        return config;
    },
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
    },
    images: {
        domains: ['assets.aceternity.com'],
      },
};

export default nextConfig;
