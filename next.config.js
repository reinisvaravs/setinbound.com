/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lintraai.com"],
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
