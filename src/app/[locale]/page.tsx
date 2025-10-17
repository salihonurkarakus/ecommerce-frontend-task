// src/app/[locale]/page.tsx
import { getMessages, Locale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  // Next 15: params Promise
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getMessages(locale);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{t.home.title}</h1>
      <p className="opacity-80">{t.home.subtitle}</p>
      {/* Tailwind test kutusu — istersen kaldır */}
      {/* <div className="mt-4 rounded-lg p-4 bg-gray-900 text-white">
        Tailwind OK 🎉
      </div> */}
    </div>
  );
}
