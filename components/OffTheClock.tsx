import Spidey from "@/components/Spidey";

const hobbies = [
  { emoji: "🏸", label: "Playing badminton" },
  { emoji: "📚", label: "Reading books" },
  { emoji: "🏋️", label: "Going to the gym" },
  { emoji: "🎬", label: "Watching movies" },
];

export default function OffTheClock() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <div className="mb-12 flex items-center gap-3">
        <Spidey state="asleep" className="h-9 w-auto" />
        <h2 className="section-heading">off the clock</h2>
      </div>

      <ul className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8">
        {hobbies.map((hobby) => (
          <li
            key={hobby.label}
            className="flex items-center gap-3 font-mono text-sm text-bone-dim"
          >
            <span className="text-lg">{hobby.emoji}</span>
            {hobby.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
