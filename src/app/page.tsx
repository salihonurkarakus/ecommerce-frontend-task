// src/app/page.tsx
import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

export default function RootPage() {
  // https://.../  →  /tr  (veya defaultLocale neyse)
  redirect(`/${defaultLocale}`);
}
