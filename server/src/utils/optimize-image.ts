import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

export async function optimizeImage(imagePath: string): Promise<string> {
  const absolutePath = path.resolve(imagePath);
  const optimizedName = absolutePath.replace(/(\.[\w\d_-]+)$/i, ".webp");
  const optimizedPath = path.resolve(optimizedName);

  await sharp(absolutePath)
    .resize({ width: 800 })
    .webp({ quality: 80 })
    .toFile(optimizedPath);

  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    await fs.unlink(absolutePath); // Delete the original image file
    return optimizedPath;
  } catch (err) {
    console.warn(`Failed to delete original image at ${absolutePath}:`, err);
    return "";
  }
}
