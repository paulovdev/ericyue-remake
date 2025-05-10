"use client";
import HeroProject from "@/components/hero-projects/hero-projects";
import { heroData } from "@/data/projectsData";

const Home = () => {
  return (
    <main className="py-4">
      <div className="flex flex-col">
        {heroData.map((project, i) => (
          <HeroProject key={i} project={project} index={i} />
        ))}
        <div className="h-screen" />
      </div>
    </main>
  );
};

export default Home;
