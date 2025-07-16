"use client";

import dynamic from "next/dynamic";
import AboutMe from "@/components/AboutMe";
import Header from "@/components/Header";
import { ContactSection } from "@/modules/contact";
import { ProjectsSection } from "@/modules/projects";

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
      <Header />
      <SplineViewer />
      <AboutMe />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
