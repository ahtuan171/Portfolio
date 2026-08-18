import Image from "next/image";
import portrait from "@/public/images/victor-portrait.jpg";
import Spidey from "@/components/Spidey";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 pt-16 md:px-10 md:pt-28">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <Spidey state="coffee" className="h-9 w-auto" />
            <h1 className="section-heading">about</h1>
          </div>

          <p className="max-w-md font-body text-lg leading-relaxed text-bone-dim">
            I&apos;m <span className="text-bone">Phạm Anh Tuấn</span> —
            Victor — born in 2006, a Computer Science student at the
            University of Science, VNU-HCM. I&apos;m currently exploring
            the intersection of software development, data, automation,
            and AI.
          </p>
          <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-bone-dim">
            I&apos;m learning C++, Python, web application development, and
            data analysis, while building projects that turn ideas into
            useful, interactive products. My career direction is Data
            Analytics, with a growing interest in UI/UX design and AI
            automation.
          </p>

          <p className="mt-6 max-w-md rounded border border-ink-400/40 bg-ink-800/60 px-4 py-3 font-mono text-sm text-bone-muted">
            idea <span className="text-chrome">→</span> build{" "}
            <span className="text-chrome">→</span> automate{" "}
            <span className="text-chrome">→</span> analyze{" "}
            <span className="text-chrome">→</span> improve
          </p>

          <p className="mt-4 max-w-md font-body text-base italic leading-relaxed text-bone-muted">
            &ldquo;I like building things, understanding how they work, and
            finding ways to make them better.&rdquo;
          </p>

          <a
            href="mailto:ahtuan1701@gmail.com"
            className="chrome-ring mt-10 inline-flex items-center gap-3 rounded-full px-6 py-3 font-mono text-sm uppercase tracking-widest text-chrome transition-colors hover:bg-bone/10"
          >
            <span className="h-2 w-2 rounded-full bg-chrome" />
            ahtuan1701@gmail.com
          </a>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden border border-ink-400/40">
          <Image
            src={portrait}
            alt="Portrait of Phạm Anh Tuấn (Victor)"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 28rem, 90vw"
          />
          <div className="absolute inset-0 bg-vignette" />
          <p className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest text-bone/70">
            Phạm Anh Tuấn — b.2006
          </p>
        </div>
      </div>
    </section>
  );
}
