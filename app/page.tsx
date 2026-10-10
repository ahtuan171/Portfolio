import Hero from "@/components/Hero";
import AboutSummary from "@/components/AboutSummary";
import SelectedWork from "@/components/SelectedWork";
import JourneySection from "@/components/JourneySection";
import Contact from "@/components/Contact";
import { SectionOrnament } from "@/components/ThemeArt";
import { getVisibleMilestones } from "@/lib/milestones";
import { getHomeProjects } from "@/lib/projects";

// Home = the portfolio showcase: hero, short intro, selected projects,
// journey & milestones, contact. Optional sections render only with real
// content. The journal is never previewed here.
export default function Home() {
  const projects = getHomeProjects();
  const milestones = getVisibleMilestones();

  return (
    <>
      <Hero />
      <AboutSummary />
      {projects.length > 0 && (
        <>
          <SectionOrnament />
          <SelectedWork projects={projects} />
        </>
      )}
      {milestones.length > 0 && (
        <>
          <SectionOrnament />
          <JourneySection milestones={milestones} />
        </>
      )}
      <Contact />
    </>
  );
}
