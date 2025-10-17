import { getMessages, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{t.home.title}</h1>
      <p className="opacity-80">{t.home.subtitle}</p>
    </div>
  );
}
