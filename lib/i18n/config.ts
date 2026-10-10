export const LOCALES = ["en", "vi"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Cookie holding the visitor's language (read on the server). */
export const LOCALE_COOKIE = "locale";

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** BCP 47 tags for Intl date/number formatting. */
export const intlLocale: Record<Locale, string> = { en: "en-GB", vi: "vi-VN" };

/** Open Graph locale codes. */
export const ogLocale: Record<Locale, string> = { en: "en_US", vi: "vi_VN" };
