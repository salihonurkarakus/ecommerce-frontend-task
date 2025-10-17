"use client";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectCartItems, selectSubtotal } from "@/features/cart/selectors";
import {
  increment,
  decrement,
  removeItem,
  clear,
} from "@/features/cart/cartSlice";

export default function CartPageClient({ locale }: { locale: string }) {
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectSubtotal);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">
          {locale === "tr" ? "Sepet" : "Cart"}
        </h1>
        <p className="opacity-70">
          {locale === "tr" ? "Sepetiniz boş." : "Your cart is empty."}
        </p>
        <Link href={`/${locale}/products`} className="underline">
          {locale === "tr" ? "Alışverişe başla" : "Start shopping"}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {locale === "tr" ? "Sepet" : "Cart"}
        </h1>
        <button
          onClick={() => dispatch(clear())}
          className="text-sm underline opacity-80"
        >
          {locale === "tr" ? "Sepeti boşalt" : "Clear cart"}
        </button>
      </div>

      <div className="space-y-4">
        {items.map((it) => (
          <div
            key={it.id}
            className="flex items-center gap-4 border rounded-2xl p-3"
          >
            <div className="relative w-20 h-20">
              <Image
                src={it.image}
                alt={it.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="font-medium line-clamp-1">{it.title}</div>
              <div className="text-sm opacity-70">${it.price.toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(decrement({ id: it.id }))}
                className="px-2 py-1 border rounded-lg"
              >
                -
              </button>
              <span className="w-8 text-center">{it.qty}</span>
              <button
                onClick={() => dispatch(increment({ id: it.id }))}
                className="px-2 py-1 border rounded-lg"
              >
                +
              </button>
            </div>
            <button
              onClick={() => dispatch(removeItem({ id: it.id }))}
              className="text-sm underline opacity-80"
            >
              {locale === "tr" ? "Kaldır" : "Remove"}
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-lg font-semibold">Subtotal</div>
        <div className="text-xl font-bold">${subtotal.toFixed(2)}</div>
      </div>
    </div>
  );
}
