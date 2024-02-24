/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disableDevLogs: true,
});

module.exports = withPWA({
  reactStrictMode: false,
  images: {
    remotePatterns: [
      process.env.NODE_ENV === 'development'
        ? {
            protocol: 'https',
            hostname: 'localhost',
            port: '5000',
          }
        : {
            protocol: 'https',
            hostname: 'listenappserver.site',
          },
    ],
  },
});
