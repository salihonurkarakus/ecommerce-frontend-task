"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectCartItems } from "./selectors";
import { setItems } from "./cartSlice";

const STORAGE_KEY = "cart_v1";

export default function CartPersistGate() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const loaded = useRef(false);

  // İlk yüklemede localStorage'dan veriyi al
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) dispatch(setItems(parsed));
      }
    } catch {}
  }, [dispatch]);

  // Store değişince kaydet
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  return null;
}
