import SectionHeading from "@/components/SectionHeading";
import JourneyTimeline from "@/components/JourneyTimeline";
import type { Milestone } from "@/content/milestones";
import { getI18n } from "@/lib/i18n/server";

/** Homepage Journey & Milestones (verified entries; dev adds placeholders). */
export default async function JourneySection({ milestones }: { milestones: Milestone[] }) {
  const { theme, dict } = await getI18n();

  // Classic: the chronicle is a full-width band of aged paper — the one
  // long light surface between the study's dark rooms.
  if (theme === "classic") {
    return (
      <section id="journey" aria-labelledby="journey-title" className="classic-paper relative py-20 md:py-28">
        <span aria-hidden className="absolute inset-x-0 top-2 h-px bg-deco/50" />
        <span aria-hidden className="absolute inset-x-0 bottom-2 h-px bg-deco/50" />
        <div className="shell">
          <SectionHeading id="journey-title" eyebrow={dict.home.eyebrows.classic.journey} title={dict.home.journeyTitle} ornate numeral="III" />
          <JourneyTimeline milestones={milestones} />
        </div>
      </section>
    );
  }

  return (
    <section id="journey" aria-labelledby="journey-title" className="sec shell py-20 md:py-28">
      <SectionHeading
        id="journey-title"
        eyebrow={dict.home.eyebrows[theme].journey}
        title={dict.home.journeyTitle}
        pixelIcon={theme === "pixel" ? "flag" : undefined}
      />
      <JourneyTimeline milestones={milestones} />
    </section>
  );
}
