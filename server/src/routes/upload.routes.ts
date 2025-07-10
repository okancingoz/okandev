import express, { Request, Response, NextFunction } from "express";
import { protect } from "../middlewares/auth.middleware"; // senin auth middleware’in
import upload from "../middlewares/upload.middleware"; // yukarıdaki multer config’in
import { optimizeImage } from "../utils/optimize-image";
import path from "path";

const router = express.Router();

router.post(
  "/image",
  protect,
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const optimizedPath = await optimizeImage(req.file.path);
      const fileName = path.basename(optimizedPath);
      const imageUrl = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${fileName}`;

      res.status(201).json({
        status: "success",
        data: { imageUrl },
      });
    } catch (error) {
      console.error("Image upload error:", error);
      next(error);
    }
  }
);

export default router;
