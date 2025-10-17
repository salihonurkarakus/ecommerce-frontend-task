import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
export default function ProductGrid({
  products,
  emptyText = "No products found.",
}: {
  products: Product[];
  emptyText?: string;
}) {
  if (products.length === 0) {
    return <p className="opacity-70">{emptyText}</p>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
