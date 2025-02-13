/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        // This will match all API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.ALLOWED_ORIGIN || "*" // Be more restrictive in production
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS"
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, x-api-key"
          }
        ]
      },
      {
        // For all other routes
        source: "/(.*)",
        headers: [
          {
            key: "Permissions-Policy",
            value: "interest-cohort=()"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          }
        ]
      }
    ];
  },
  // Enable image domains if you're using next/image
  images: {
    domains: ['your-domain.com'],
    // Add a remotePatterns entry if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-domain.com',
        pathname: '/icons/**',
      },
    ],
  },
  // Add webpack config if needed
  webpack: (config, { isServer }) => {
    // Add any custom webpack config here
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  experimental: {
    webpackBuildWorker: true
  },
  typescript: {
    // !! WARN !!
    // This will disable type checking during build - use only temporarily
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig;
