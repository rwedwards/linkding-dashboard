/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/linkding',
        destination: 'https://linkding.sleepy-puppy.com/api/bookmarks/',
      },
    ];
  },
};

export default nextConfig;

