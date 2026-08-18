import Spidey, { type SpideyState } from "@/components/Spidey";

const entries: { state: SpideyState; label: string; text: string }[] = [
  {
    state: "coding",
    label: "working on",
    text: "Building and improving projects around web development, automation, and data.",
  },
  {
    state: "success",
    label: "shipped",
    text: "Web-Shooter — a real-time hand gesture computer vision experience.",
  },
  {
    state: "confused",
    label: "stuck on",
    text: "Figuring out how to turn more ideas into polished, useful products.",
  },
];

export default function StatusLog() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <div className="mb-12 flex items-center gap-3">
        <Spidey state="coding" className="h-9 w-auto" />
        <h2 className="section-heading">currently</h2>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {entries.map((entry) => (
          <div key={entry.state} className="paper-card p-6">
            <Spidey state={entry.state} className="h-10 w-auto" />
            <p className="eyebrow mt-4 mb-2">{entry.label}</p>
            <p className="font-body text-base leading-relaxed text-bone-dim">
              {entry.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
