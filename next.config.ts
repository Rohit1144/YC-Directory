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
    experimental: {
      ppr: 'incremental'
    },
    devIndicators: {
      appIsrStatus: true,
      buildActivity: true,
      buildActivityPosition: 'bottom-right'
    }

  
};

export default nextConfig;
