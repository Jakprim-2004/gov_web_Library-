import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['gov-layout', 'gov-sso-login'],
};

export default nextConfig;
