import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://ecommerce-frontend-task-5i6n.vercel.app";
  const pages = ["/", "/products"];
  const entries: MetadataRoute.Sitemap = [];

  for (const l of locales) {
    for (const p of pages) {
      entries.push({
        url: `${base}/${l}${p === "/" ? "" : p}`,
        changeFrequency: "weekly",
        priority: p === "/" ? 1 : 0.8,
      });
    }
  }
  return entries;
}
