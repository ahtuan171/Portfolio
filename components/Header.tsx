"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useI18n } from "@/components/I18nProvider";

export interface NavItem {
  label: string;
  href: string;
  /** "home" = active on / and on project case studies (they belong to Home). */
  match?: "home" | "prefix";
}

export default function Header({ items, logo, controls }: { items: NavItem[]; logo: ReactNode; controls: ReactNode }) {
  const pathname = usePathname();
  const { dict } = useI18n();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on Escape and return focus to its button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (item: NavItem) =>
    item.match === "home"
      ? pathname === "/" || pathname.startsWith("/projects/")
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  const linkClass = (active: boolean) =>
    [
      "site-nav-link relative font-mono text-xs uppercase tracking-[0.2em] transition-colors",
      active ? "text-accent" : "text-fg-dim hover:text-fg",
    ].join(" ");

  return (
    <header className="site-header sticky top-0 z-50 border-b border-line/60 bg-bg/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        {logo}

        <nav aria-label={dict.nav.primary} className="site-nav hidden md:block">
          <ul className="flex items-center gap-8">
            {items.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass(active)} aria-current={active ? "page" : undefined}>
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-1.5 left-0 h-0.5 bg-accent transition-all duration-300 ${active ? "w-full" : "w-0"}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {controls}
          <button
            ref={menuButton}
            type="button"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-theme border border-line text-fg transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label={dict.nav.primary} hidden={!open} className="border-t border-line/60 bg-bg md:hidden">
        <ul className="shell flex flex-col py-3">
          {items.map((item) => {
            const active = isActive(item);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`block py-3 ${linkClass(active)}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
