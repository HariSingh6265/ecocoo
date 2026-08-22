/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongodb', 'bcryptjs'],
  },
  images: {
    domains: ['maps.googleapis.com'],
  },
};

export default nextConfig;
