import { Types } from "mongoose";

export interface IAbout {
  _id: Types.ObjectId;
  content: string;
}

export interface IAboutService {
  getAbout(): Promise<IAbout | null>;
  updateAbout(contentData: Partial<IAbout>): Promise<IAbout>;
}
