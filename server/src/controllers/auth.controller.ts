import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import * as userService from "../services/user.service";
import AppError from "../utils/app-error.util";
import catchAsync from "../utils/catch-async.util";

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

    const user = await userService.findUserByEmail(email);

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".okandev.me",
      maxAge: 90 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }
);

// Maybe add a register route in the future
// For now, we only have the login route.
// export const registerUser = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return next(new AppError("User already exists", 400));
//     }

//     const user = (await User.create({ name, email, password })) as IUser & {
//       _id: any;
//     };

//     res.status(201).json({
//       status: "success",
//       token: generateToken(user._id.toString()),
//       data: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   }
// );
