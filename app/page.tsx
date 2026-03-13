import { fetchGitHubRepos } from "@/lib/github";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default async function Home() {
  const repos = await fetchGitHubRepos();

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects repos={repos} />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
