/** @type {import('next').NextConfig} */

const withMDX = require("@next/mdx")();

let webpackModule;
let nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  output: "standalone",
  webpack(config, { webpack }) {
    webpackModule = webpack;
    return config;
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

module.exports = withMDX(nextConfig);
