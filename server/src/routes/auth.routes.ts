import express from "express";
import { loginUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", loginUser);

// Maybe add more auth routes in the future, like register, logout, etc.
// For now, we only have the login route.

export default router;
