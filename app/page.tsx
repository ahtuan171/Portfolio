import Header from "@/components/Header";
import Banner from "@/components/Banner";
import About from "@/components/About";
import SectionDivider from "@/components/SectionDivider";
import Stack from "@/components/Stack";
import Resume from "@/components/Resume";
import GithubActivity from "@/components/GithubActivity";
import TheWebIWeave from "@/components/TheWebIWeave";
import StatusLog from "@/components/StatusLog";
import OffTheClock from "@/components/OffTheClock";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Header />
      <Banner />
      <About />
      <SectionDivider />
      <Stack />
      <SectionDivider />
      <Resume />
      <SectionDivider />
      <GithubActivity />
      <SectionDivider />
      <TheWebIWeave />
      <SectionDivider />
      <StatusLog />
      <SectionDivider />
      <OffTheClock />
      <SectionDivider />
      <Cta />
      <Footer />
    </main>
  );
}
