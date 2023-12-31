/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333',

        pathname: '/files/**'
      }
    ]
  }
};

module.exports = nextConfig;
