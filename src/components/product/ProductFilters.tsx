"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

function displayCategory(locale: string, cat: string) {
  if (locale !== "tr") return cat;
  const map: Record<string, string> = {
    "men's clothing": "Erkek giyim",
    "women's clothing": "Kadın giyim",
    jewelery: "Mücevher",
    electronics: "Elektronik",
  };
  return map[cat] ?? cat;
}

export default function ProductFilters({
  categories,
  messages,
  locale,
}: {
  categories: string[];
  messages: {
    category: string;
    min: string;
    max: string;
    sort: string;
    all: string;
    none: string;
    priceAsc: string;
    priceDesc: string;
  };
  locale: string;
}) {
  const router = useRouter();
  const search = useSearchParams();
  const pathname = usePathname();

  const currentCategory = search.get("category") || "";
  const sort = search.get("sort") || "";
  const min = search.get("min") || "";
  const max = search.get("max") || "";

  // ⚠️ URL'yi güncelle
  function update(params: Record<string, string | undefined>) {
    const sp = new URLSearchParams(search.toString());
    Object.entries(params).forEach(([k, v]) => {
      if (!v) sp.delete(k);
      else sp.set(k, v);
    });
    router.push(`${pathname}?${sp.toString()}`);
  }

  // A11y için id'ler
  const id = {
    category: "filter-category",
    min: "filter-min",
    max: "filter-max",
    sort: "filter-sort",
  };

  // TR/EN için açıklayıcı etiket ve placeholder'lar
  const labels = {
    min: locale === "tr" ? "En düşük fiyat" : "Minimum price",
    max: locale === "tr" ? "En yüksek fiyat" : "Maximum price",
    minPh: locale === "tr" ? "0 ₺" : "0 $",
    maxPh: locale === "tr" ? "1000 ₺" : "1000 $",
  };

  return (
    <div className="flex flex-wrap gap-3 items-end">
      {/* Category */}
      <label className="text-sm" htmlFor={id.category}>
        <div className="mb-1">{messages.category}</div>
        <select
          id={id.category}
          className="h-9 rounded-md border px-2
                     bg-white text-gray-900
                     dark:bg-neutral-900 dark:text-gray-100
                     [color-scheme:light]"
          value={currentCategory}
          onChange={(e) => update({ category: e.target.value || undefined })}
        >
          <option value="">{messages.all}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {displayCategory(locale, c)}
            </option>
          ))}
        </select>
      </label>

      {/* Min */}
      <label className="text-sm" htmlFor={id.min}>
        <div className="mb-1">{labels.min}</div>
        <input
          id={id.min}
          type="number"
          inputMode="numeric"
          min={0}
          step={1}
          placeholder={labels.minPh}
          className="h-9 w-24 rounded-md border px-2
                     bg-white text-gray-900
                     [color-scheme:light]"
          defaultValue={min}
          onBlur={(e) => {
            const v = e.target.value.trim();
            const n = v === "" ? undefined : Math.max(0, Number(v));
            update({ min: n?.toString() });
          }}
        />
      </label>

      {/* Max */}
      <label className="text-sm" htmlFor={id.max}>
        <div className="mb-1">{labels.max}</div>
        <input
          id={id.max}
          type="number"
          inputMode="numeric"
          min={0}
          step={1}
          placeholder={labels.maxPh}
          className="h-9 w-24 rounded-md border px-2
                     bg-white text-gray-900
                     [color-scheme:light]"
          defaultValue={max}
          onBlur={(e) => {
            const v = e.target.value.trim();
            const n = v === "" ? undefined : Math.max(0, Number(v));
            update({ max: n?.toString() });
          }}
        />
      </label>

      {/* Sort */}
      <label className="text-sm" htmlFor={id.sort}>
        <div className="mb-1">{messages.sort}</div>
        <select
          id={id.sort}
          className="h-9 rounded-md border px-2
                     bg-white text-gray-900
                     dark:bg-neutral-900 dark:text-gray-100
                     [color-scheme:light]"
          value={sort}
          onChange={(e) => update({ sort: e.target.value || undefined })}
        >
          <option value="">{messages.none}</option>
          <option value="price-asc">{messages.priceAsc}</option>
          <option value="price-desc">{messages.priceDesc}</option>
        </select>
      </label>
    </div>
  );
}
