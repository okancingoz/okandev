import { IProject } from "@/interfaces/project.interface";
import http from "./http";

export const getAllProjects = () => {
  return http.get<IProject[]>("/projects");
};

export const getProjectById = (id: string) => {
  return http.get<IProject>(`/projects/${id}`);
};

export const createProject = (data: IProject) => {
  return http.post("/projects", data);
};

export const updateProject = (id: string, data: IProject) => {
  return http.put(`/projects/${id}`, data);
};

export const deleteProject = (id: string) => {
  return http.delete(`/projects/${id}`);
};
