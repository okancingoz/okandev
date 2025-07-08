import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Validate required environment variables
if (
  !process.env.PORT ||
  !process.env.DATABASE ||
  !process.env.DATABASE_PASSWORD
) {
  throw new Error(
    "Missing required environment variables: PORT, DATABASE, or DATABASE_PASSWORD"
  );
}

if (!process.env.JWT_SECRET) {
  throw new Error("Missing required environment variable: JWT_SECRET");
}


// Export configuration object
export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  database: process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  ),
  jwt: {
    secret: process.env.JWT_SECRET || "defaultSecretKey",
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  },
  env: process.env.NODE_ENV || "development",
};
