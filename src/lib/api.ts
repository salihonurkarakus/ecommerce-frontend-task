// src/lib/api.ts
import { Product } from "@/lib/types";

const BASE = "https://fakestoreapi.com";

// Küçük yardımcı: status + timeout ile güvenli fetch
async function fetchJSON<T>(
  url: string,
  init?: RequestInit & { next?: { revalidate?: number } }
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10_000); // 10s timeout
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} for ${url}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(id);
  }
}

export async function getProducts(): Promise<Product[]> {
  return fetchJSON<Product[]>(`${BASE}/products`, {
    next: { revalidate: 60 }, // ISR: 1 dk
    cache: "force-cache",
  });
}

export async function getProduct(id: string | number): Promise<Product> {
  return fetchJSON<Product>(`${BASE}/products/${id}`, {
    next: { revalidate: 60 },
    cache: "force-cache",
  });
}

export async function getCategories(): Promise<string[]> {
  return fetchJSON<string[]>(`${BASE}/products/categories`, {
    next: { revalidate: 3600 }, // 1 saat
    cache: "force-cache",
  });
}
