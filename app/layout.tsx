import type { Metadata, Viewport } from "next";
import {
  Anton,
  Cormorant_Garamond,
  EB_Garamond,
  Inter,
  JetBrains_Mono,
  Newsreader,
  Noto_Serif_Display,
  Nunito,
  Pinyon_Script,
  Spectral,
  VT323,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import I18nProvider from "@/components/I18nProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MotionObserver from "@/components/MotionObserver";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Logo } from "@/components/ThemeArt";
import { displayName } from "@/content/profile";
import { ogLocale } from "@/lib/i18n/config";
import { getI18n } from "@/lib/i18n/server";
import { getNavItems, hasPublishedPosts } from "@/lib/nav";
import { siteUrl } from "@/lib/site";

// Every font that can render the name keeps the `vietnamese` subset.
// Only Inter (used by two worlds) is preloaded; the rest load on demand
// when the active theme uses them.
const inter = Inter({ subsets: ["latin", "latin-ext", "vietnamese"], variable: "--font-inter" });
const anton = Anton({ subsets: ["latin", "latin-ext", "vietnamese"], variable: "--font-anton", weight: "400", preload: false });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext", "vietnamese"], variable: "--font-jetbrains", weight: ["400", "500", "700"], preload: false });
const pixel = VT323({ subsets: ["latin", "latin-ext", "vietnamese"], variable: "--font-vt323", weight: "400", preload: false });
const nunito = Nunito({ subsets: ["latin", "latin-ext", "vietnamese"], variable: "--font-nunito", preload: false });
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  preload: false,
});
const garamond = EB_Garamond({ subsets: ["latin", "latin-ext", "vietnamese"], variable: "--font-ebgaramond", style: ["normal", "italic"], preload: false });
const script = Pinyon_Script({ subsets: ["latin", "latin-ext", "vietnamese"], variable: "--font-pinyon", weight: "400", preload: false });
const notoDisplay = Noto_Serif_Display({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-notoserifdisplay",
  axes: ["wdth"],
  style: ["normal", "italic"],
  preload: false,
});
const spectral = Spectral({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-spectral",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  preload: false,
});
const newsreader = Newsreader({ subsets: ["latin", "latin-ext", "vietnamese"], variable: "--font-newsreader", style: ["normal", "italic"], preload: false });

const fontVariables = [inter, anton, mono, pixel, nunito, cormorant, garamond, script, notoDisplay, spectral, newsreader]
  .map((f) => f.variable)
  .join(" ");

export async function generateMetadata(): Promise<Metadata> {
  const { dict, locale } = await getI18n();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.siteTitle, template: `%s — ${displayName}` },
    description: dict.meta.siteDescription,
    applicationName: displayName,
    authors: [{ name: displayName, url: siteUrl }],
    creator: displayName,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: displayName,
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      url: "/",
      locale: ogLocale[locale],
    },
    // Only the card type — X falls back to each page's og:title/description/image.
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

// Adds `js` before paint so reveal animations only hide content when JS runs.
const jsFlag = "document.documentElement.classList.add('js')";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { locale, theme, dict } = await getI18n();
  const navItems = getNavItems(dict);

  return (
    <html lang={locale} data-theme={theme} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body id="top" className="film-grain">
        <I18nProvider locale={locale} theme={theme} dict={dict}>
          <a href="#content" className="skip-link">
            {dict.nav.skip}
          </a>
          <Header
            items={navItems}
            logo={<Logo />}
            controls={
              <>
                <LanguageSwitcher />
                <ThemeSwitcher />
              </>
            }
          />
          <main id="content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer items={navItems} showRss={hasPublishedPosts()} />
          <MotionObserver />
        </I18nProvider>
      </body>
    </html>
  );
}
