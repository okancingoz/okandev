import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { config } from "../config/config";
import AppError from "../utils/app-error.util";
import catchAsync from "../utils/catch-async.util";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("No token provided, please log in.", 401));
    }

    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next(new AppError("User not found", 404));
    }

    next();
  }
);
