"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ProductFilters({
  categories,
}: {
  categories: string[];
}) {
  const router = useRouter();
  const search = useSearchParams();
  const pathname = usePathname();

  const currentCategory = search.get("category") || "";
  const sort = search.get("sort") || ""; // 'price-asc' | 'price-desc'
  const min = search.get("min") || "";
  const max = search.get("max") || "";

  function update(params: Record<string, string | undefined>) {
    const sp = new URLSearchParams(search.toString());
    Object.entries(params).forEach(([k, v]) => {
      if (!v) sp.delete(k);
      else sp.set(k, v);
    });
    router.push(`${pathname}?${sp.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <label className="text-sm">
        <div className="mb-1">Category</div>
        <select
          className="border rounded-lg px-2 py-1"
          value={currentCategory}
          onChange={(e) => update({ category: e.target.value || undefined })}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        <div className="mb-1">Min</div>
        <input
          type="number"
          placeholder="0"
          className="border rounded-lg px-2 py-1 w-24"
          defaultValue={min}
          onBlur={(e) => update({ min: e.target.value || undefined })}
        />
      </label>

      <label className="text-sm">
        <div className="mb-1">Max</div>
        <input
          type="number"
          placeholder="1000"
          className="border rounded-lg px-2 py-1 w-24"
          defaultValue={max}
          onBlur={(e) => update({ max: e.target.value || undefined })}
        />
      </label>

      <label className="text-sm">
        <div className="mb-1">Sort</div>
        <select
          className="border rounded-lg px-2 py-1"
          value={sort}
          onChange={(e) => update({ sort: e.target.value || undefined })}
        >
          <option value="">None</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </label>
    </div>
  );
}
