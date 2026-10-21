import { About } from "@/components/about";
import { ArchitecturePlayground } from "@/components/architecture-playground";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Marquee } from "@/components/marquee";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <ArchitecturePlayground />
        <Experience />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
