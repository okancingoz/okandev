import { Request, Response, NextFunction } from "express";

export type ControllerLogic<T = any> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;
