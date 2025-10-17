import { getCategories, getProducts } from "@/lib/api";
import { Locale } from "@/lib/i18n";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import { Product } from "@/lib/types";

function applyFilters(
  all: Product[],
  opts: { category?: string; min?: number; max?: number; sort?: string }
) {
  let products = [...all];
  if (opts.category)
    products = products.filter((p) => p.category === opts.category);
  if (typeof opts.min === "number")
    products = products.filter((p) => p.price >= opts.min!);
  if (typeof opts.max === "number")
    products = products.filter((p) => p.price <= opts.max!);
  if (opts.sort === "price-asc") products.sort((a, b) => a.price - b.price);
  if (opts.sort === "price-desc") products.sort((a, b) => b.price - a.price);
  return products;
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;

  const [all, categories] = await Promise.all([getProducts(), getCategories()]);

  const category = typeof sp.category === "string" ? sp.category : undefined;
  const sort = typeof sp.sort === "string" ? sp.sort : undefined;
  const min = typeof sp.min === "string" ? Number(sp.min) : undefined;
  const max = typeof sp.max === "string" ? Number(sp.max) : undefined;

  const filtered = applyFilters(all, { category, min, max, sort });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Products</h1>
      </div>

      {/* Filtreler (client) */}
      <ProductFilters categories={categories} />

      {/* Grid (server) */}
      <ProductGrid products={filtered} />
    </div>
  );
}
