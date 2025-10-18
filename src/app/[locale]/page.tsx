// src/app/[locale]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/product/ProductGrid";
import { getMessages, isLocale, locales } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const langs = Object.fromEntries(locales.map((l) => [l, `/${l}`]));
  const title =
    locale === "tr" ? "Ana sayfa | E-Commerce" : "Home | E-Commerce";
  const description =
    locale === "tr"
      ? "Öne çıkan ürünleri keşfet."
      : "Discover featured products.";
  return {
    title,
    description,
    alternates: { languages: langs, canonical: "/en" },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [t, all] = await Promise.all([getMessages(locale), getProducts()]);
  const featured = all.slice(0, 4); // 👈 öne çıkan 4 ürün

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            {t.home?.title ?? (locale === "tr" ? "Ana sayfa" : "Home")}
          </h1>
          <p className="opacity-80">
            {t.home?.subtitle ??
              (locale === "tr"
                ? "Öne çıkan ürünleri keşfet."
                : "Featured products below.")}
          </p>
        </div>
        <Link
          href={`/${locale}/products`}
          className="px-3 py-2 border rounded-lg hover:bg-gray-50"
        >
          {locale === "tr" ? "Tüm ürünler" : "All products"}
        </Link>
      </div>

      <ProductGrid products={featured} emptyText="" locale={locale} />
    </div>
  );
}
