import { handleController } from "../utils/handle-controller.util";
import ProjectService from "../services/project.service";
import AppError from "../utils/app-error.util";

export const createProject = handleController(async (req, res) => {
  // Logic to create a project
  const projectData = req.body;
  // Assume we have a service to handle project creation
  const newProject = await ProjectService.createProject(projectData);

  return { newProject };
}, 201);

export const getProjectById = handleController(async (req, _res, next) => {
  const project = await ProjectService.getProjectById(req.params.id);
  if (!project) return next(new AppError("Project not found", 404));
  return { project };
});

export const updateProject = handleController(async (req, _res, next) => {
  const updatedProject = await ProjectService.updateProject(
    req.params.id,
    req.body
  );
  if (!updatedProject)
    return next(new AppError("Project not found or update failed!", 404));
  return { project: updatedProject };
});

export const deleteProject = handleController(async (req, _res, next) => {
  const deletedProject = (await ProjectService.deleteProject(
    req.params.id
  )) as any;

  if (!deleteProject) return next(new AppError("Project not found!", 404));

  return null;
}, 204);

export const getAllProjects = handleController(async () => {
  const projects = await ProjectService.getAllProjects();
  return { projects };
});
