import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://lintraai.com/sitemap.xml",
    host: "https://lintraai.com",
  };
}
