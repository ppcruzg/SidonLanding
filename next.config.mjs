/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/Landing',
  trailingSlash: true,
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/Landing',
  },
}

export default nextConfig
