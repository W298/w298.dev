/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: { appDir: true },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
