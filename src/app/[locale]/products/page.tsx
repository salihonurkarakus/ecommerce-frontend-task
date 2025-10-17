// src/app/[locale]/products/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCategories, getProducts } from "@/lib/api";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import { Product } from "@/lib/types";
import { getMessages, isLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Products | E-Commerce", description: "Browse products." };
}

// --- Helpers ---
function applyFilters(
  all: Product[],
  opts: { category?: string; min?: number; max?: number; sort?: "price-asc" | "price-desc" | undefined }
) {
  let products = [...all];

  if (opts.category) {
    products = products.filter((p) => p.category === opts.category);
  }

  const { min, max, sort } = opts;

  if (typeof min === "number") products = products.filter((p) => p.price >= min);
  if (typeof max === "number") products = products.filter((p) => p.price <= max);

  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products.sort((a, b) => b.price - a.price);

  return products;
}

// --- Page ---
export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const sp = await searchParams;

  const [all, categories, messages] = await Promise.all([
    getProducts(),
    getCategories(),
    getMessages(locale),
  ]);

  const category = typeof sp.category === "string" ? sp.category : undefined;
  const sort =
    typeof sp.sort === "string" && (sp.sort === "price-asc" || sp.sort === "price-desc")
      ? sp.sort
      : undefined;
  const min = typeof sp.min === "string" ? Number(sp.min) : undefined;
  const max = typeof sp.max === "string" ? Number(sp.max) : undefined;

  const filtered = applyFilters(all, { category, min, max, sort });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">{messages.products.title}</h1>
      </div>

      <ProductFilters categories={categories} messages={messages.filters} locale={locale} />

      <ProductGrid products={filtered} emptyText={messages.products.empty} locale={locale} />
    </div>
  );
}
