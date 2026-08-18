import Spidey from "@/components/Spidey";

const projects = [
  {
    emoji: "🕷️",
    title: "Web-Shooter",
    description:
      "A browser-based computer vision web application that detects hand gestures in real time. Strike the classic web-slinging hand pose to shoot a web line in the exact direction you are pointing, complete with an original, hand-drawn spider superhero mask.",
    stack: ["React", "Vite", "MediaPipe", "Computer Vision"],
    highlight: "Real-time hand gesture recognition.",
    status: "RELEASED",
    href: "https://github.com/ahtuan171/Web-Shooter",
  },
  {
    emoji: "🌎",
    title: "Victor-Tracker",
    description:
      "A website designed to help users track their travelling experiences and keep their destinations organized. The project focuses on making travel history more visual through an interactive global map.",
    stack: ["TypeScript", "Python", "JavaScript", "HTML", "CSS"],
    highlight: "Interactive global map with destination pins.",
    status: "PROTOTYPE",
    href: "https://github.com/ahtuan171/Victor-Tracker",
  },
  {
    emoji: "✈️",
    title: "TourXport",
    description:
      "A web application that recommends attractions in Vietnam and creates personalized tours based on user requirements. I worked as the team leader, helping coordinate the development of the project.",
    stack: ["Flutter", "Python", "AI"],
    highlight: "AI-generated tour creation through a survey-based experience.",
    status: "RELEASED",
    href: "https://github.com/quocnam612/TourXport",
  },
];

function ProjectCard({
  emoji,
  title,
  description,
  stack,
  highlight,
  status,
  href,
}: {
  emoji: string;
  title: string;
  description: string;
  stack: string[];
  highlight: string;
  status: string;
  href: string;
}) {
  return (
    <div className="border border-ink-400/30 p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="font-body text-xl text-bone">
          <span className="mr-2">{emoji}</span>
          {title}
        </p>
        <span className="whitespace-nowrap border border-ink-400/50 px-3 py-1 font-mono text-xs uppercase tracking-widest text-chrome/80">
          {status}
        </span>
      </div>
      <p className="mt-2 font-body text-base leading-relaxed text-bone-muted">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1 font-body text-sm text-bone-dim">
        <span className="text-bone">Stack:</span>
        {stack.map((tech) => (
          <span key={tech} className="font-mono text-bone-muted">
            `{tech}`
          </span>
        ))}
      </div>
      <p className="mt-2 font-body text-sm text-bone-dim">
        <span className="text-bone">Highlight:</span> {highlight}
      </p>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://img.shields.io/badge/view_project-FF1F35?style=flat-square&logo=github&logoColor=0B0D10"
          alt={`View ${title} on GitHub`}
          className="h-[26px]"
        />
      </a>
    </div>
  );
}

function MoreExperimentsCard() {
  return (
    <div className="flex flex-col justify-between border border-ink-400/30 p-6">
      <div>
        <p className="font-body text-xl text-bone">
          <span className="mr-2">🔭</span>
          More experiments
        </p>
        <p className="mt-2 font-body text-base leading-relaxed text-bone-muted">
          I enjoy building small projects to explore new technologies,
          ideas, and workflows. More experiments, university projects, and
          prototypes will gradually find their way here.
        </p>
      </div>
      <a
        href="https://github.com/ahtuan171?tab=repositories"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://img.shields.io/badge/explore_repositories-FF1F35?style=flat-square&logo=github&logoColor=0B0D10"
          alt="Explore repositories"
          className="h-[26px]"
        />
      </a>
    </div>
  );
}

export default function Resume() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <div className="mb-12 flex items-center gap-3">
        <Spidey state="web-shoot" className="h-9 w-auto" />
        <h2 className="section-heading">projects</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
        <MoreExperimentsCard />
      </div>
    </section>
  );
}
