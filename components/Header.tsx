"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/images/logo-v.png";

const links = [
  { href: "#about", label: "Về tôi" },
  { href: "#resume", label: "Hồ sơ" },
  { href: "#skills", label: "Kỹ năng" },
  { href: "#contact", label: "Liên hệ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-400/30 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="flex items-center gap-3 font-display text-3xl tracking-wide text-bone"
        >
          <Image src={logo} alt="" priority className="h-8 w-auto" />
          VICTOR
        </a>

        <nav className="hidden gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm uppercase tracking-widest text-bone-dim transition-colors hover:text-chrome"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          aria-label="Mở menu"
          onClick={() => setOpen((v) => !v)}
          className="chrome-ring flex h-10 w-10 items-center justify-center text-chrome md:hidden"
        >
          <span className="font-display text-2xl">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink-400/30 px-6 pb-6 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 font-mono text-sm uppercase tracking-widest text-bone-dim hover:text-chrome"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
