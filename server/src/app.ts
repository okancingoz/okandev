import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import globalErrorHandler from "./middlewares/global-error.middleware";
import AppError from "./utils/app-error.util";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";

// Importing the configuration
const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API",
  });
});

// Catch-all route for undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Catch-all error handler
// This middleware will catch any errors that occur in the application
app.use(globalErrorHandler);

export default app;
