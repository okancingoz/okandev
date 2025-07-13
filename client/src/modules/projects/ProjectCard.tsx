/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { IProject } from "@/types/project.types";

interface ProjectCardProps {
  project: IProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="keen-slider__slide bg-zinc-900 text-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="text-sm text-gray-300">{project.description}</p>
        <div className="mt-2 flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-sm"
            >
              Github
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="nopener noreferrer"
              className="text-green-400 hover:underline text-sm"
            >
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
