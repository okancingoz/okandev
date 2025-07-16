"use client";

import React from "react";
import { IProject } from "@/interfaces/project.interface";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

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
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-[35%] object-cover select-none"
            loading="lazy"
            draggable={false}
          />
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
            className="text-sm text-gray-700 mb-4 leading-relaxed text-justify flex-grow overflow-y-auto max-h-[14rem]"
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
              <FaGithub size={20} />
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
              <FaExternalLinkAlt size={18} />
              Live
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
