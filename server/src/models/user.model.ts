import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/,
      "Please provide a valid email",
    ],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false, // Do not return password by default
  },
});

// Middleware to compare passwords
userSchema.pre("save", async function (next) {
  // If the password is not modified, skip hashing
  if (!this.isModified("password")) return next();

  // Hash the password before saving
  const salt = await bcrypt.genSalt(12);
  // Hash the password with the generated salt
  // `this` refers to the document being saved
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
