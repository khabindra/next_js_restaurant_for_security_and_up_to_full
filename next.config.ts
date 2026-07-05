// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   allowedDevOrigins: ['192.168.1.67'],
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//         pathname: '/**', // Allows any path under the unsplash domain
//       },
//     ],
//   },
// };

// module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb', // Adjust this to '5mb' or '10mb' depending on your needs
    },
  },
  allowedDevOrigins: ['192.168.1.67'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rsoipkykwsczwqjsubnn.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rsoipkykwsczwqjsubnn.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
