"use client";

import AboutMe from "@/modules/aboutme/AboutMe";
import { ContactSection } from "@/modules/contact";
import HomePageHero from "@/modules/home/HomePageHero";
import { ProjectsSection } from "@/modules/projects";
import TechStack from "@/modules/techs/TechStack";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      <HomePageHero />
      <AboutMe />
      <ProjectsSection />
      <TechStack />
      <ContactSection />
    </div>
  );
}
