import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

export default function ProductLinkCard({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  return (
    <Link href={`/${locale}/products/${product.id}`} className="block">
      <ProductCard product={product} locale={locale} />
    </Link>
  );
}
