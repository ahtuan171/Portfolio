import { cache } from "react";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/lib/i18n/config";
import en from "@/lib/i18n/dictionaries/en";
import vi from "@/lib/i18n/dictionaries/vi";
import { pick, type L } from "@/lib/i18n/localized";
import { formatDate, formatMonth, formatPeriod } from "@/lib/format";
import { DEFAULT_THEME, THEME_COOKIE, isThemeId, type ThemeId } from "@/lib/theme";

export const dictionaries = { en, vi };

/**
 * Per-request language + theme (from cookies), the interface dictionary
 * and locale-bound helpers. Cached for the request, so any server
 * component can call it without prop drilling.
 */
export const getI18n = cache(async () => {
  const store = await cookies();
  const rawLocale = store.get(LOCALE_COOKIE)?.value;
  const rawTheme = store.get(THEME_COOKIE)?.value;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const theme: ThemeId = isThemeId(rawTheme) ? rawTheme : DEFAULT_THEME;

  return {
    locale,
    theme,
    dict: dictionaries[locale],
    t: <T,>(value: L<T>) => pick(value, locale),
    date: (iso: string) => formatDate(iso, locale),
    month: (iso: string) => formatMonth(iso, locale),
    period: (start: string, end?: string) => formatPeriod(start, end, locale),
  };
});
