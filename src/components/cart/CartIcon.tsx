"use client";
import Link from "next/link";
import { useAppSelector } from "@/store";
import { selectCount } from "@/features/cart/selectors";

export default function CartIcon({ locale }: { locale: string }) {
  const count = useAppSelector(selectCount);
  return (
    <Link
      href={`/${locale}/cart`}
      className="relative inline-flex items-center gap-2 text-sm"
      aria-label={locale === "tr" ? "Sepet" : "Cart"}
    >
      <span aria-hidden>🛒</span>
      <span className="min-w-5 text-center inline-block" aria-live="polite">
        {count}
      </span>
    </Link>
  );
}
