const socials = [
  {
    label: "GitHub",
    href: "https://github.com/ahtuan171",
    icon: (
      <path d="M12 2C6.48 2 2 6.58 2 12.17c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.04 1.53 1.04.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.35-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.71.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.18 10.18 0 0 0 22 12.17C22 6.58 17.52 2 12 2Z" />
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ah.tuan.769406/",
    icon: (
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.3 4.3c-2.25 0-3.79 1.37-3.79 3.89v2.25H8v2.96h2.51V21h2.99Z" />
    ),
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <div className="ornament-divider mb-12">
        <span>✦</span>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h4 className="font-display text-2xl uppercase tracking-wide text-bone">
            Liên hệ
          </h4>
          <a
            href="mailto:ahtuan1701@gmail.com"
            className="mt-3 inline-block font-body text-lg text-bone-dim hover:text-chrome"
          >
            ahtuan1701@gmail.com
          </a>
        </div>
        <div>
          <h4 className="font-display text-2xl uppercase tracking-wide text-bone">
            Kết nối
          </h4>
          <div className="mt-3 flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="chrome-ring flex h-11 w-11 items-center justify-center text-bone transition-colors hover:bg-bone/10 hover:text-chrome"
                aria-label={s.label}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-16 text-center font-mono text-xs uppercase tracking-widest text-bone-muted">
        © {new Date().getFullYear()} Phạm Anh Tuấn (Victor)
      </p>
    </footer>
  );
}
