import { prototype } from "events";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          hostname: "*",
          protocol: "https"
        }
      
    ]
  }
  
};

export default nextConfig;
