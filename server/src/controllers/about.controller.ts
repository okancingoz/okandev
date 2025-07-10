import aboutService from "../services/about.service";
import { handleController } from "../utils/handle-controller.util";

export const getAbout = handleController(async (_req, _res, _next) => {
  const about = await aboutService.getAbout();
  return { about };
});

export const updateAbout = handleController(async (req, _res, _next) => {
  const aboutData = req.body;
  const updatedContent = await aboutService.updateAbout(aboutData);

  return { updatedContent };
});
