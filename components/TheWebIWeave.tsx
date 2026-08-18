import Spidey from "@/components/Spidey";

export default function TheWebIWeave() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <div className="mb-12 flex items-center gap-3">
        <Spidey state="hanging" className="h-9 w-auto" />
        <h2 className="section-heading">the web i weave</h2>
      </div>

      <div className="overflow-hidden rounded-lg border border-ink-400/40 bg-ink-900 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://raw.githubusercontent.com/ahtuan171/ahtuan171/output/snake.svg"
          alt="Contribution snake"
          className="w-full"
        />
      </div>
    </section>
  );
}
