import { Request, Response } from "express";
import catchAsync from "../utils/catch-async.util";

export const getAdminDashboard = catchAsync(
  async (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Admin Dashboard!" });
  }
);
