/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const path = require('path');

const nextConfig = {
  ...nextTranslate(),
  images: {
    domains: ['scontent-frx5-1.xx.fbcdn.net', 'scontent-frt3-1.xx.fbcdn.net']
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

}

module.exports = nextConfig
