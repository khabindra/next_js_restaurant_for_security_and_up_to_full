/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // Allows any path under the unsplash domain
      },
    ],
  },
};

module.exports = nextConfig;