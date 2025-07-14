import express from "express";
import { protect } from "../middlewares/auth.middleware";
import { getAdminDashboard } from "../controllers/admin.controller";

const router = express.Router();

router.get("/", protect, getAdminDashboard);

export default router;
