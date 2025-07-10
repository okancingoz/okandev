import express, { Request, Response } from "express";
import { protect } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";

const router = express.Router();

router.post(
  "/image",
  protect,
  upload.single("image"),
  (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(201).json({
      status: "success",
      data: {
        imageUrl,
      },
    });
  }
);

export default router;
