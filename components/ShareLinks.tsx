import CopyButton from "@/components/CopyButton";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export default function ShareLinks({ url, title, dict }: { url: string; title: string; dict: Dictionary }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const targets = [
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="meta">{dict.journal.share}</span>
      {targets.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-theme border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim transition-colors hover:border-accent hover:text-accent"
        >
          {s.label}
          <span className="sr-only"> {dict.journal.shareNewTab}</span>
        </a>
      ))}
      <CopyButton value={url} label={dict.contact.copyLink} />
    </div>
  );
}
