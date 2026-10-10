import { intlLocale, type Locale } from "@/lib/i18n/config";

// Date helpers. Content dates are ISO strings ("2026-08" or
// "2026-08-18"); format in UTC so build-server timezones can't shift them.

function parse(iso: string): Date {
  const [y, m = "1", d = "1"] = iso.split("-");
  return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
}

export function formatMonth(iso: string, locale: Locale = "en"): string {
  return parse(iso).toLocaleDateString(intlLocale[locale], { month: "short", year: "numeric", timeZone: "UTC" });
}

export function formatDate(iso: string, locale: Locale = "en"): string {
  return parse(iso).toLocaleDateString(intlLocale[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "Mar 2026 – Aug 2026", collapsing identical months. */
export function formatPeriod(start: string, end: string | undefined, locale: Locale = "en"): string {
  const a = formatMonth(start, locale);
  if (!end) return a;
  const b = formatMonth(end, locale);
  return a === b ? a : `${a} – ${b}`;
}

const ROMAN: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

/** 1 → "I", 2026 → "MMXXVI" (ordering marks and editorial dates). */
export function roman(n: number): string {
  let out = "";
  for (const [value, mark] of ROMAN) {
    while (n >= value) {
      out += mark;
      n -= value;
    }
  }
  return out;
}
