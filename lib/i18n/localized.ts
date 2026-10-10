import type { Locale } from "@/lib/i18n/config";

/**
 * A piece of first-party content in both languages. English is required;
 * Vietnamese falls back to English when missing (so nothing renders
 * empty), and `hasLocale` lets UI say which language is shown.
 */
export type L<T = string> = { en: T; vi?: T };

export function pick<T>(value: L<T>, locale: Locale): T {
  return locale === "vi" && value.vi !== undefined ? value.vi : value.en;
}

export function hasLocale<T>(value: L<T>, locale: Locale): boolean {
  return locale === "en" || value.vi !== undefined;
}

/** Fills `{name}` placeholders in a dictionary string. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}
