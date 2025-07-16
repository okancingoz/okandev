"use client";

import React, { useRef } from "react";
import { useFetch } from "@/hooks/useFetch";
import { IProject } from "@/interfaces/project.interface";
import { ProjectCard } from "./ProjectCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import "@/styles/components/project.module.css";

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
      <h2 className="text-4xl font-bold text-gray-800 mb-16 text-center w-full max-w-[1280px]">
        Projects
      </h2>

      <div className="w-full max-w-[1280px] mx-auto">
        <Swiper
          ref={swiperRef}
          effect="coverflow"
          loop
          grabCursor
          centeredSlides
          slidesPerView={3}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[EffectCoverflow, Autoplay]}
          coverflowEffect={{
            slideShadows: false,
            depth: 100,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 0,
              grabCursor: true,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="w-full"
        >
          {projects.map((project, i) => (
            <SwiperSlide
              key={project._id}
              className="flex justify-center cursor-pointer"
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
