import { Document } from "mongoose";

export interface IUser extends Document {
  _id: any; // Mongoose ObjectId
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
