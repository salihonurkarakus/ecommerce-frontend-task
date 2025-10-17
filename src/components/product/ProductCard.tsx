import Image from "next/image";
import { Product } from "@/lib/types";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale?: string;
}) {
  return (
    <div className="rounded-2xl border p-4 flex flex-col gap-3 h-full">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-contain"
        />
      </div>
      <div className="text-sm line-clamp-2 min-h-[3rem]">{product.title}</div>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-semibold">
          ${product.price.toFixed(2)}
        </span>
        <AddToCartButton
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          label={locale === "tr" ? "Sepete ekle" : "Add to cart"}
        />
      </div>
    </div>
  );
}
