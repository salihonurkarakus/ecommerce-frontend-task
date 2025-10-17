import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://ecommerce-frontend-task-5i6n.vercel.app/sitemap.xml",
  };
}
