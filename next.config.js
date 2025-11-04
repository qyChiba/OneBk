/** @type {import('next').NextConfig} */
const nextConfig = {
  // 性能优化配置
  reactStrictMode: true,
  
  // 优化编译
  swcMinify: true,
  
  // 编译器优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 性能优化
  poweredByHeader: false,
  
  images: {
    domains: [],
  },
}

module.exports = nextConfig

