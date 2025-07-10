import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
// import { AppError } from "../utils/appError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default globalErrorHandler;
