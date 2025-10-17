import Providers from "@/app/providers";
import { getMessages, Locale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import CartIcon from "@/components/cart/CartIcon";
import CartPersistGate from "@/features/cart/PersistGate";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  const messages = await getMessages(locale);

  return (
    <Providers messages={messages} locale={locale}>
      {/* PersistGate sadece client tarafında çalışır */}
      <CartPersistGate />
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <span className="font-semibold">E-Commerce</span>
          <nav className="text-sm opacity-80 flex items-center gap-4">
            <a href={`/${locale}/products`} className="hover:underline">
              {locale === "tr" ? "Ürünler" : "Products"}
            </a>
            <CartIcon locale={locale} />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </Providers>
  );
}
