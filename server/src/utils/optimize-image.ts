import sharp from "sharp";

export const optimizeImageFromBuffer = async (
  buffer: Buffer,
  outputPath: string
): Promise<string> => {
  try {
    await sharp(buffer)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.error("Error optimizing image from buffer:", error);
    throw error;
  }
};
