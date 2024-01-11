/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: '*.githubusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
