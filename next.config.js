/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // pwa: {
  //   dest: 'public',
  //   register: true,
  //   skipWaiting: true,
  // },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.0.13',
        port: '5000',
      },
    ],
  },
});

// const nextConfig = withPWA({
//   reactStrictMode: false,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: '192.168.0.13',
//         port: '5000',
//       },
//     ],
//   },
//   pwa: {
//     dest: 'public',
//   },
// });
//
// module.exports = nextConfig;
