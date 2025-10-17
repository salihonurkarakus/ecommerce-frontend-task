import CartPageClient from "./pageClient";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CartPageClient locale={locale} />;
}
