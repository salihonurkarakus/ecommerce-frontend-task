import { Locale } from "@/lib/i18n";
import CartPageClient from "./pageClient";

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <CartPageClient locale={locale} />;
}
