import { prototype } from "events";
import type { NextConfig } from "next";
import build from "next/dist/build";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          hostname: "*",
          protocol: "https"
        }
      
      ],
     
    },

  
};

export default nextConfig;
