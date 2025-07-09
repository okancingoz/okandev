import { Types } from "mongoose";
import { IMessage, IMessageService } from "../interfaces/message.interface";
import Message from "../models/message.model";

class MessageService implements IMessageService {
  async createMessage(
    messageData: Pick<IMessage, "name" | "email" | "message">
  ): Promise<IMessage> {
    const message = new Message(messageData);
    return await message.save();
  }

  async getMessageById(messageId: string): Promise<IMessage | null> {
    if (!Types.ObjectId.isValid(messageId)) return null;
    return await Message.findById(messageId).exec();
  }

  async deleteMessage(messageId: string): Promise<IMessage | null> {
    if (!Types.ObjectId.isValid(messageId)) return null;
    return await Message.findByIdAndDelete(messageId).exec();
  }

  async getAllMessages(): Promise<IMessage[]> {
    return await Message.find().sort({ createdAt: -1 }).exec();
  }
}

export default new MessageService();
