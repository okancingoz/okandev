import express from "express";
import path from "path";
import { protect } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
import { optimizeImageFromBuffer } from "../utils/optimize-image";

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

      const backendHost =
        process.env.BACKEND_HOST || `${req.protocol}://${req.get("host")}`;

      const imageUrl = `${backendHost}/uploads/${fileName}`;

      res.status(201).json({ status: "success", data: { imageUrl } });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
