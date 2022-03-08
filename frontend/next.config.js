/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'placeimg.com'],
  },
  eslint: {
    dirs: ['src'],
  },
}

module.exports = nextConfig
