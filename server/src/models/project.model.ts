import mongoose, { Schema } from "mongoose";
import { IProject } from "../interfaces/project.interface";

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Please provide a project title"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide a project description"],
    },
    imageUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
