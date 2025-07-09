import { Document } from "mongoose";
import { Types } from "mongoose";
export interface IUser extends Document {
  _id: Types.ObjectId; // Mongoose ObjectId
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
