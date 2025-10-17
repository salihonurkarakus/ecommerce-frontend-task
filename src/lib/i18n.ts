export const locales = ['tr', 'en'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'tr';


export async function getMessages(locale: Locale) {
switch (locale) {
case 'en': return (await import('@/messages/en.json')).default;
default: return (await import('@/messages/tr.json')).default;
}
}