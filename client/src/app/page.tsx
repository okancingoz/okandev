// app/page.tsx
"use client";

import dynamic from "next/dynamic";
import AboutMe from "@/components/AboutMe";
import Header from "@/components/Header";
import { ContactSection } from "@/modules/contact";
import { ProjectsSection } from "@/modules/projects";


const SplineViewer = dynamic(() => import("./lib/SplineViewer"), {
  ssr: false,
  loading: () => <p>Loading 3D scene...</p>,
});

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
