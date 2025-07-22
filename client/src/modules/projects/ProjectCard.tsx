"use client";

import { IProject } from "@/interfaces/project.interface";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

interface ProjectCardProps {
  project: IProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    url?: string
  ) => {
    if (!url) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className="
          rounded-3xl bg-white shadow-md overflow-hidden 
          transition-transform duration-200 ease-in-out
          hover:scale-[1.03] hover:shadow-lg cursor-default
          flex flex-col
        "
        style={{ width: 360, height: 560 }}
      >
        {project.imageUrl ? (
          <div className="relative w-full h-[35%]">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, 360px"
              className="object-cover rounded-t-3xl select-none"
              priority={false}
            />
          </div>
        ) : (
          <div className="w-full h-[35%] bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        <div className="flex flex-col flex-grow px-6 py-4">
          <h3
            className="text-2xl font-bold mb-3 text-gray-900 text-justify"
            style={{ lineHeight: 1.3 }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm text-gray-700 mb-4 leading-relaxed text-justify flex-grow overflow-y-auto  max-h-[14rem] scrollable-text"
            style={{ lineHeight: 1.6 }}
          >
            {project.description}
          </p>

          <div className="flex gap-8 mt-auto text-gray-700 text-sm font-semibold">
            <a
              href={project.githubUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleLinkClick(e, project.githubUrl)}
              className="flex items-center gap-2 hover:text-gray-900 transition-colors"
              aria-label="GitHub link"
            >
              <Icon icon="akar-icons:github-fill" width={24} />
              GitHub
            </a>

            <a
              href={project.liveUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleLinkClick(e, project.liveUrl)}
              className="flex items-center gap-2 hover:text-gray-900 transition-colors"
              aria-label="Live site link"
            >
              <Icon icon="akar-icons:link" width={24} />
              Live
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
