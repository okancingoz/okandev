import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { useFetch } from "@/hooks/useFetch";
import { IProject } from "@/types/project.types";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1.25,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2.5, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.5, spacing: 32 },
      },
    },
  });

  const { data, loading, error } = useFetch<{
    status: string;
    data: {
      projects: IProject[];
    };
  }>("/projects");

  if (loading) return <div className="text-white">Loading projects...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const projects = data?.data.projects || [];

  if (projects.length === 0)
    return <div className="text-white">No projects found.</div>;

  return (
    <section id="projects" className="px-4 py-16 bg-black">
      <h2 className="text-3xl text-white font-bold mb-8 text-center">
        Projects
      </h2>

      <div ref={sliderRef} className="keen-slider">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
}
