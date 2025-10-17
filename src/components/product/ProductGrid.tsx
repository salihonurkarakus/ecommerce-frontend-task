import { Product } from "@/lib/types";
import ProductLinkCard from "./ProductLinkCard";

export default function ProductGrid({
  products,
  emptyText = "No products found.",
  locale = "en",
}: {
  products: Product[];
  emptyText?: string;
  locale?: string;
}) {
  if (products.length === 0) {
    return <p className="opacity-70">{emptyText}</p>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductLinkCard key={p.id} product={p} locale={locale} />
      ))}
    </div>
  );
}
