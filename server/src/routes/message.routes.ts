import express from "express";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
  getMessageById,
} from "../controllers/message.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", createMessage);

router.use(protect);

router.get("/", getAllMessages);
router.get("/:id", getMessageById);
router.delete("/:id", deleteMessage);

export default router;
