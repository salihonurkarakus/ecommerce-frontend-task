// src/components/cart/AddToCartButton.tsx
"use client";
import { useState } from "react";
import { useAppDispatch } from "@/store";
import { addItem } from "@/features/cart/cartSlice";

export default function AddToCartButton(props: {
  id: number;
  title: string;
  price: number;
  image: string;
  qty?: number;
  label?: string;
  locale?: string; // 👈 dil kontrolü için eklendi
}) {
  const dispatch = useAppDispatch();
  const {
    id,
    title,
    price,
    image,
    qty = 1,
    label = "Add to cart",
    locale = "en", // 👈 varsayılan İngilizce
  } = props;

  const [disabled, setDisabled] = useState(false);

  const handleAdd = () => {
    dispatch(addItem({ id, title, price, image, qty }));
    setDisabled(true); // 👈 buton tıklanınca devre dışı
    // 1.5 saniye sonra yeniden aktif et (isteğe bağlı)
    setTimeout(() => setDisabled(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={disabled}
      className="px-3 py-1 rounded-lg border text-sm
                 bg-white text-gray-900 hover:bg-gray-50
                 disabled:bg-gray-200 disabled:text-gray-700
                 disabled:border-gray-300 disabled:cursor-not-allowed
                 focus:outline-none focus:ring-2 focus:ring-offset-2"
      aria-label={`${label}: ${title}`}
    >
      {disabled ? (locale === "tr" ? "Eklendi" : "Added") : label}
    </button>
  );
}
