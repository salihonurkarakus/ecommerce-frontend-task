import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { isLocale, locales } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>; // ⬅️ string
}): Promise<Metadata> {
  const { id, locale } = await params;
  if (!isLocale(locale)) return { title: "Product | E-Commerce" };
  try {
    const p = await getProduct(id);
    return {
      title: `${p.title} | E-Commerce`,
      description: p.description,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `/${l}/products/${id}`])
        ),
      },
      openGraph: {
        title: p.title,
        description: p.description,
        images: [{ url: p.image }],
        locale,
      },
      twitter: {
        card: "summary_large_image",
        title: p.title,
        description: p.description,
        images: [p.image],
      },
    };
  } catch {
    return { title: "Product | E-Commerce" };
  }
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ locale: string; id: string }>; // ⬅️ string
}) {
  const { id, locale } = await params;
  if (!isLocale(locale)) notFound();
  const product = await getProduct(id).catch(() => null);
  if (!product) notFound();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="relative aspect-square border rounded-2xl p-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <div className="text-sm opacity-80">{product.category}</div>
        <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
        {product.rating && (
          <div className="text-sm">
            Rating: {product.rating.rate} ⭐ ({product.rating.count})
          </div>
        )}
        <p className="leading-relaxed">{product.description}</p>

        {/* Sepete ekleme: Adım 4'te bağlanacak */}
        <button className="mt-2 px-4 py-2 rounded-lg border hover:bg-gray-50">
          {locale === "tr" ? "Sepete ekle" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
