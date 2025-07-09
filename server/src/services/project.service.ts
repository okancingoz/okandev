import Project from "../models/project.model";
import { IProject, IProjectService } from "../interfaces/project.interface";
import { Types } from "mongoose";

class ProjectService implements IProjectService {
  async createProject(projectData: Partial<IProject>): Promise<IProject> {
    const project = new Project(projectData);
    return await project.save();
  }

  async getProjectById(projectId: string): Promise<IProject | null> {
    if (!Types.ObjectId.isValid(projectId)) return null;
    return await Project.findById(projectId).exec();
  }

  async updateProject(
    projectId: string,
    projectData: Partial<IProject>
  ): Promise<IProject | null> {
    if (!Types.ObjectId.isValid(projectId)) return null;

    return await Project.findByIdAndUpdate(projectId, projectData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async deleteProject(projectId: string): Promise<IProject | null> {
    if (!Types.ObjectId.isValid(projectId)) return null;
    return await Project.findByIdAndDelete(projectId).exec();
  }

  async getAllProjects(): Promise<IProject[]> {
    return await Project.find().sort({ createdAt: -1 }).exec();
  }
}

export default new ProjectService();
