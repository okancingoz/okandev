"use client";

import Header from "@/components/Header";
import AboutMe from "@/modules/aboutme/AboutMe";
import { ContactSection } from "@/modules/contact";
import { ProjectsSection } from "@/modules/projects";
import TechStack from "@/modules/techs/TechStack";
import dynamic from "next/dynamic";

const SplineViewer = dynamic(() => import("./lib/SplineViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center text-white">
      Loading 3D scene...
    </div>
  ),
});

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      <SplineViewer />
      <Header />
      <AboutMe />
      <ProjectsSection />
      <TechStack />
      <ContactSection />
    </div>
  );
}
