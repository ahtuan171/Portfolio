import type { L } from "@/lib/i18n/localized";
import type { ThemeId } from "@/lib/theme";

// Third-party imagery used by the themes, shown at /about#credits (the
// section and the footer link hide while this is empty). Owner-supplied
// art isn't listed. Add any third-party image here with its source and
// license.

export interface Credit {
  src: string;
  title: L;
  maker?: string;
  date: L;
  source: string;
  url: string;
  license: string;
  themes: ThemeId[];
}

export const credits: Credit[] = [];
