/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  
  // Fast optimization without experimental flags
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  
  images: {
    domains: ['ipfs.io', 'gateway.pinata.cloud'],
    formats: ['image/webp'],
  },
}

module.exports = nextConfig
