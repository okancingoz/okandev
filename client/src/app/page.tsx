// app/page.tsx
"use client";

import GalaxyScene from "@/app/lib/galaxy-scene";
import AboutMe from "@/components/AboutMe";
import Header from "@/components/Header";
import { ProjectsSection } from "@/modules/projects";

export default function HomePage() {
  return (
    <div className="relative h-screen w-full">
      <Header />
      <GalaxyScene />
      <AboutMe />
      <ProjectsSection />
    </div>
  );
}
