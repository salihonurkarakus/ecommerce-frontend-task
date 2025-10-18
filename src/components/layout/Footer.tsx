// src/components/layout/Footer.tsx
export default function Footer({ locale }: { locale: string }) {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm opacity-80 flex items-center justify-between">
        <span>© {new Date().getFullYear()} E-Commerce</span>
        <span>{locale === "tr" ? "Fake Store API ile beslenir" : "Powered by Fake Store API"}</span>
      </div>
    </footer>
  );
}
