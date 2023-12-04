/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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
