import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import globalErrorHandler from "./middlewares/global-error.middleware";
import aboutRoutes from "./routes/about.routes";
import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";
import messageRoutes from "./routes/message.routes";
import projectRoutes from "./routes/project.routes";
import uploadRoutes from "./routes/upload.routes";
import AppError from "./utils/app-error.util";

// Importing the configuration
const app: Application = express();

// CORS middleware to allow cross-origin requests
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://okandev.me",
      "https://www.okandev.me",
    ],
    credentials: true,
  })
);

app.use(
  "/uploads",
  (req, res, next) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://okandev.me",
      "https://www.okandev.me",
      "https://api.okandev.me",
    ];
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
    }
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

    // OPTIONS preflight request için hızlı cevap
    if (req.method === "OPTIONS") {
      res.sendStatus(204);
      return;
    }

    next();
  },
  express.static(path.join(__dirname, "../uploads"))
);

app.use(cookieParser());

// Middleware setup
// This middleware parses incoming requests with JSON payloads
app.use(express.json());

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for simplicity, configure as needed
    crossOriginResourcePolicy: false, // Disable CORS for simplicity, configure as needed
  })
);

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests, please try again later.",
});
app.use("/api", limiter); // Apply rate limiting to all API routes

// Compression middleware to reduce response size
app.use(compression());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API v1 root",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", adminRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/about", aboutRoutes);
app.use("/api/v1/upload", uploadRoutes);

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
