export interface IMessage {
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
}

export interface IMessageService {
  createMessage(
    messageData: Pick<IMessage, "name" | "email" | "message">
  ): Promise<IMessage>;

  getMessageById(messageId: string): Promise<IMessage | null>;

  deleteMessage(messageId: string): Promise<IMessage | null>;

  getAllMessages(): Promise<IMessage[]>;
}
