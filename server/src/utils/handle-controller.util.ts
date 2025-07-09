import { ControllerLogic } from "../types/controller.types";
import catchAsync from "./catch-async.util";

export function handleController<T>(
  logic: ControllerLogic<T>,
  statusCode = 200
) {
  return catchAsync(async (req, res, next) => {
    const data = await logic(req, res, next);
    res.status(statusCode).json({
      status: "success",
      data,
    });
  });
}