import mongoose, { Schema } from "mongoose";
import { IAbout } from "../interfaces/about.interface";

const aboutSchema = new Schema<IAbout>(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const About = mongoose.model<IAbout>("About", aboutSchema);
export default About;
