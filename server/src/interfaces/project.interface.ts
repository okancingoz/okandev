import { Types } from "mongoose";

// This file defines the interfaces for the Project model and the Project service
export interface IProject {
  _id: Types.ObjectId; // Mongoose ObjectId
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProjectService {
  createProject(projectData: Partial<IProject>): Promise<IProject>;

  getProjectById(projectId: string): Promise<IProject | null>;

  updateProject(
    projectId: string,
    projectData: Partial<IProject>
  ): Promise<IProject | null>;

  deleteProject(projectId: string): Promise<void>;

  getAllProjects(): Promise<IProject[]>;
}
