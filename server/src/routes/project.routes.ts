import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/project.controller";

import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);

// Public routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

router.use(protect);

router.post("/", createProject);
router.patch("/:id", updateProject).delete("/:id", deleteProject);

export default router;
