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
      {
        protocol: 'https',
        hostname: 'listenappserver.site',
        // port: '5000',
      },
    ],
  },
});
