import Image from "next/image";
import Spidey from "@/components/Spidey";

export default function GithubActivity() {
  return (
    <section
      id="numbers"
      className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mb-12 flex items-center gap-3">
        <Spidey state="thinking" className="h-9 w-auto" />
        <h2 className="section-heading">numbers</h2>
      </div>

      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-24">
        <p className="font-body text-lg leading-relaxed text-bone-dim">
          A pixel-art spider mascot lives in this repo — it wakes up
          whenever there&apos;s a commit today, and falls back asleep when
          the streak breaks. Data comes straight from real GitHub activity,
          refreshed hourly.
        </p>

        <div className="overflow-hidden rounded-lg border border-ink-400/40 bg-ink-900 p-4">
          <Image
            src="/api/pet"
            alt="GitHub commit streak"
            width={480}
            height={160}
            unoptimized
            className="w-full max-w-[480px]"
          />
        </div>
      </div>

      <div className="mt-16 overflow-hidden rounded-lg border border-ink-400/40 bg-ink-900 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://github-readme-activity-graph.vercel.app/graph?username=ahtuan171&bg_color=0B0D10&color=F5F2E8&line=FF1F35&point=FF1F35&area=true&hide_border=true"
          alt="GitHub activity graph"
          className="w-full"
        />
      </div>
    </section>
  );
}
