// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getProducts } from "@/lib/api";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://ecommerce-frontend-task-5i6n.vercel.app";

// Bu dosya ISR ile cache'lensin (günde 1 kez yenilensin)
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ana sayfa + ürün listesi + ürün detayları
  const products = await getProducts(); // Fake Store API ~20 ürün

  const staticPages = ["", "/products"]; // "" => locale root

  const entries: MetadataRoute.Sitemap = [];

  for (const l of locales) {
    // Ana sayfa ve liste
    for (const p of staticPages) {
      entries.push({
        url: `${SITE}/${l}${p}`,
        changeFrequency: "weekly",
        priority: p === "" ? 1 : 0.8,
      });
    }
    // Ürün detayları
    for (const p of products) {
      entries.push({
        url: `${SITE}/${l}/products/${p.id}`,
        changeFrequency: "weekly",
        priority: 0.7,
        lastModified: new Date().toISOString(),
      });
    }
  }

  return entries;
}
