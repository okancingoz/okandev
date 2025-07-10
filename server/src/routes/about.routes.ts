import express from "express";
import { protect } from "../middlewares/auth.middleware";
import { getAbout, updateAbout } from "../controllers/about.controller";

const router = express.Router();

router.get("/", getAbout);

router.use(protect);
router.put("/", updateAbout);

export default router;
