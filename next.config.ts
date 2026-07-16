import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kabraeyejaipur.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fpimages.withfloats.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/shop",
        destination: "/services/",
        permanent: true,
      },
      {
        source: "/shop-2",
        destination: "/services/",
        permanent: true,
      },
      {
        source: "/wishlist",
        destination: "/contacts/",
        permanent: true,
      },
      {
        source: "/my-account",
        destination: "/contacts/",
        permanent: true,
      },
      {
        source: "/refund_returns",
        destination: "/privacy-policy/",
        permanent: true,
      },
      {
        source: "/product/:path*",
        destination: "/services/",
        permanent: true,
      },
      {
        source: "/product-category/:path*",
        destination: "/services/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
