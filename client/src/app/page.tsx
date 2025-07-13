// app/page.tsx
"use client";

import AboutMe from "@/components/AboutMe";
import Header from "@/components/Header";
import { ContactSection } from "@/modules/contact";
import { ProjectsSection } from "@/modules/projects";

import SplineViewer from "./lib/SplineViewer";

export default function HomePage() {
  return (
    <div className="relative h-screen w-full">
      <Header />
      <SplineViewer />
      <AboutMe />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
