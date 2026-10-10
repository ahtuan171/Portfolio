import type { Heading } from "@/lib/journal";

export default function TableOfContents({ headings, title, id = "toc-title" }: { headings: Heading[]; title: string; id?: string }) {
  return (
    <nav aria-labelledby={id}>
      <p id={id} className="eyebrow mb-4">
        {title}
      </p>
      <ol className="space-y-2 border-l border-line">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "pl-7" : "pl-4"}>
            <a href={`#${h.id}`} className="block font-body text-sm leading-snug text-fg-dim transition-colors hover:text-accent">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
