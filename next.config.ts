import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: [
      'https://3000-idx-ecommerce-1742489768617.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev'
    ],
  },
};

export default nextConfig;
