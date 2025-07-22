"use client";

import { useFetch } from "@/hooks/useFetch";
import { IProject } from "@/interfaces/project.interface";
import { useRef } from "react";
import { ProjectCard } from "./ProjectCard";

import SectionTitle from "@/components/SectionTitle";
import "@/styles/components/project.module.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function ProjectsSection() {
  const { data, loading, error } = useFetch<{ data: { projects: IProject[] } }>(
    "/projects"
  );
  const projects = data?.data.projects || [];

  const swiperRef = useRef<any>(null);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#f6f6f6] text-gray-600">
        Loading projects…
      </div>
    );

  if (error || projects.length === 0)
    return (
      <div className="h-screen flex items-center justify-center bg-[#f6f6f6] text-gray-600">
        No projects found.
      </div>
    );

  const handleSlideClick = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
  };

  return (
    <section
      id="projects"
      className="h-screen bg-[#f6f6f6] flex flex-col items-center justify-center px-4"
    >
      <SectionTitle className="text-4xl">Projects</SectionTitle>
      <div className="w-full max-w-[1280px] mx-auto ">
        <Swiper
          ref={swiperRef}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          pagination={{ clickable: true, dynamicBullets: true }}
          effect="coverflow"
          loop
          grabCursor
          centeredSlides
          slidesPerView={3}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="custom-swiper"
          coverflowEffect={{ slideShadows: false, depth: 100 }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10, grabCursor: true },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
        >
          {projects.map((project, i) => (
            <SwiperSlide
              key={project._id}
              className="flex justify-center cursor-pointer mb-8"
              onClick={() => handleSlideClick(i)}
            >
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
