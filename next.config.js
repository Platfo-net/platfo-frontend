/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const path = require('path');

const nextConfig = {
  ...nextTranslate(),
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
