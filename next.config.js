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
            protocol: 'http',
            hostname: '192.168.0.13',
            port: '5000',
          }
        : {
            protocol: 'https',
            hostname: 'listenappserver.site',
          },
    ],
  },
});
