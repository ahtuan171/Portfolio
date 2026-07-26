import Header from "@/components/Header";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Skills from "@/components/Skills";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Header />
      <About />
      <Resume />
      <Skills />
      <Cta />
      <Footer />
    </main>
  );
}
