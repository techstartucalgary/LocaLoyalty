/** @type {import('next').NextConfig} */
const nextConfig = {
  //domains: ["localoyalty-business.s3.us-west-2.amazonaws.com"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localoyalty-business.s3.us-west-2.amazonaws.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
