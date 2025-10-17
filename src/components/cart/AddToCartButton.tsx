"use client";
import { useAppDispatch } from "@/store";
import { addItem } from "@/features/cart/cartSlice";

export default function AddToCartButton(props: {
  id: number;
  title: string;
  price: number;
  image: string;
  qty?: number;
  label?: string;
}) {
  const dispatch = useAppDispatch();
  const { id, title, price, image, qty = 1, label = "Add to cart" } = props;
  return (
    <button
      type="button"
      onClick={() => dispatch(addItem({ id, title, price, image, qty }))}
      className="px-3 py-1 rounded-lg border hover:bg-gray-50 text-sm"
    >
      {label}
    </button>
  );
}
