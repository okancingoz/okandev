import { User } from "../models/user.model";

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }).select("+password");
};
