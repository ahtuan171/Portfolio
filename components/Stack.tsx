import Spidey from "@/components/Spidey";

function badge(label: string, logo: string, logoColor = "FF1F35") {
  const encoded = label.replace(/\+/g, "%2B").replace(/ /g, "_");
  return `https://img.shields.io/badge/${encoded}-0B0D10?style=flat-square&logo=${logo}&logoColor=${logoColor}`;
}

const groups = [
  {
    label: "Languages",
    badges: [
      badge("C", "c"),
      badge("C++", "cplusplus"),
      badge("Python", "python"),
      badge("SQL", "postgresql"),
      badge("HTML5", "html5"),
      badge("CSS3", "css3"),
    ],
  },
  {
    label: "Frontend",
    badges: [badge("Flutter", "flutter"), badge("React", "react")],
  },
  { label: "Backend", badges: [badge("Python", "python")] },
  {
    label: "Database",
    badges: [
      badge("MySQL", "mysql"),
      badge("MongoDB", "mongodb"),
      badge("Supabase", "supabase"),
    ],
  },
  {
    label: "Tools",
    badges: [
      badge("Git", "git"),
      badge("Docker", "docker"),
      badge("Postman", "postman"),
      badge("Figma", "figma"),
      badge("Claude Code", "anthropic"),
      badge("Vercel", "vercel", "F5F2E8"),
      badge("Render", "render"),
    ],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <div className="mb-12 flex items-center gap-3">
        <Spidey state="awake" className="h-9 w-auto" />
        <h2 className="section-heading">stack</h2>
      </div>

      <p className="mb-12 max-w-2xl font-body text-lg leading-relaxed text-bone-dim">
        A technical foundation built on programming and data structures,
        extended into web development, data, and automation — what it
        takes to go from idea to a real, running product.
      </p>

      <div className="flex flex-col gap-8">
        {groups.map(({ label, badges }) => (
          <div key={label}>
            <p className="font-mono text-xs uppercase tracking-widest text-bone-muted">
              {label}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {badges.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" height={26} className="h-[26px]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
