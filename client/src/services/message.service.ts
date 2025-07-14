import http from "./http";
import { IMessage } from "@/interfaces/message.interface";

export const getAllMessages = () => {
  return http.get<{ data: { messages: IMessage[] } }>("/messages");
};

export const deleteMessage = (id: string) => {
  return http.delete(`/messages/${id}`);
};
