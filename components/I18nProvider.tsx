"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { ThemeId } from "@/lib/theme";

interface I18nValue {
  locale: Locale;
  theme: ThemeId;
  dict: Dictionary;
}

const I18nContext = createContext<I18nValue | null>(null);

/** Makes the server-resolved language, theme and dictionary available to client components. */
export default function I18nProvider({ children, ...value }: I18nValue & { children: ReactNode }) {
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}
