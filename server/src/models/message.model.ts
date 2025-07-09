import mongoose, { Schema } from "mongoose";
import { IMessage } from "../interfaces/message.interface";

const messageSchema: Schema<IMessage> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
