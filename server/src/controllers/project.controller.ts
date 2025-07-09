import { handleController } from "../utils/handle-controller.util";
import projectService from "../services/project.service";
import AppError from "../utils/app-error.util";

export const createProject = handleController(async (req, _res, _next) => {
  const projectData = req.body;

  const newProject = await projectService.createProject(projectData);

  return { newProject };
}, 201);

export const getProjectById = handleController(async (req, _res, next) => {
  const project = await projectService.getProjectById(req.params.id);
  if (!project) return next(new AppError("Project not found", 404));
  return { project };
});

export const updateProject = handleController(async (req, _res, next) => {
  const updatedProject = await projectService.updateProject(
    req.params.id,
    req.body
  );
  if (!updatedProject)
    return next(new AppError("Project not found or update failed!", 404));
  return { project: updatedProject };
});

export const deleteProject = handleController(async (req, _res, next) => {
  const deletedProject = await projectService.deleteProject(req.params.id);

  if (!deletedProject) return next(new AppError("Project not found!", 404));

  return null;
}, 204);

export const getAllProjects = handleController(async () => {
  const projects = await projectService.getAllProjects();
  return { projects };
});
