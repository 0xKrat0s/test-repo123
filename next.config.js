/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  // 👇 ADD THESE TWO LINES
  basePath: '/test-repo123',
  assetPrefix: '/test-repo123/',
};

module.exports = nextConfig;
