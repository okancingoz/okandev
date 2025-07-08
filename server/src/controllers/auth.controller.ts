import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catch-async.util";
import AppError from "../utils/app-error.util";
import { config } from "../config/config";

const generateToken = (id: string) => {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: "90d",
  });
};

/**
 * @desc Login user and return token
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = (await User.findOne({ email }).select("+password")) as any;

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  }
);
