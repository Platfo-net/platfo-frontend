/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    FACEBOOK_ID: process.env.FACEBOOK_ID
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.fbcdn.net'
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com'
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com'
      }
    ]
  }
};

module.exports = nextConfig;
