import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/api",
        "/setup",
        "/doctor",
        "/employee",
        "/finance",
        "/upgrade",
        "/unauthorized",
        "/auth",
        "/cms",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
