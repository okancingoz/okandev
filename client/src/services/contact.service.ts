import { IMessage } from "@/interfaces/message.interface";
import http from "@/services/http";

export const sendMessage = async (
  data: Omit<IMessage, "_id" | "createdAt" | "updatedAt">
) => {
  const response = await http.post<{
    status: string;
    data: { message: IMessage };
  }>("/messages", data);

  return response.data;
};
