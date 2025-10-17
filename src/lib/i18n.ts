export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr"; // ✅ yeniden eklendi

export function isLocale(l: string): l is Locale {
  return (locales as readonly string[]).includes(l);
}

export async function getMessages(locale: Locale) {
  switch (locale) {
    case "en":
      return (await import("@/messages/en.json")).default;
    default:
      return (await import("@/messages/tr.json")).default;
  }
}
