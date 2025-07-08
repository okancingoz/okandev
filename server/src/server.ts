import mongoose from "mongoose";
import { config } from "./config/config";
import app from "./app";

// This is the entry point for the server application
// It connects to the MongoDB database and starts the Express server
mongoose
  .connect(config.database)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  });
