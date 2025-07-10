import express, { Request, Response, NextFunction } from "express";
import { protect } from "../middlewares/auth.middleware"; // senin auth middleware’in
import upload from "../middlewares/upload.middleware"; // yukarıdaki multer config’in
import { optimizeImageFromBuffer } from "../utils/optimize-image";
import path from "path";

const router = express.Router();

router.post(
  "/image",
  protect,
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const fileName = `optimized-${Date.now()}.webp`;
      const outputPath = path.join("uploads", fileName);

      await optimizeImageFromBuffer(req.file.buffer, outputPath);

      const imageUrl = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${fileName}`;
      res.status(201).json({ status: "success", data: { imageUrl } });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
