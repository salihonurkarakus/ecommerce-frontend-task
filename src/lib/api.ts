import { Product } from '@/lib/types'


const BASE = 'https://fakestoreapi.com'


export async function getProducts(): Promise<Product[]> {
const res = await fetch(`${BASE}/products`, {
next: { revalidate: 60 }, // ISR
cache: 'force-cache',
})
if (!res.ok) throw new Error('Failed to fetch products')
return res.json()
}


export async function getProduct(id: string | number): Promise<Product> {
const res = await fetch(`${BASE}/products/${id}`, {
next: { revalidate: 60 },
cache: 'force-cache',
})
if (!res.ok) throw new Error('Failed to fetch product')
return res.json()
}


export async function getCategories(): Promise<string[]> {
const res = await fetch(`${BASE}/products/categories`, {
next: { revalidate: 3600 },
cache: 'force-cache',
})
if (!res.ok) throw new Error('Failed to fetch categories')
return res.json()
}