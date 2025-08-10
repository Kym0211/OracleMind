import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // This disables ESLint errors during production builds (e.g. on Vercel)
    ignoreDuringBuilds: true,
  },
  /* other config options here */
}

export default nextConfig
