import messageService from "../services/message.service";
import AppError from "../utils/app-error.util";
import { handleController } from "../utils/handle-controller.util";

export const createMessage = handleController(async (req, _res, _next) => {
  const messageData = req.body;

  const newMessage = await messageService.createMessage(messageData);

  return { newMessage };
}, 201);

export const getMessageById = handleController(async (req, _res, next) => {
  const message = await messageService.getMessageById(req.params.id);

  if (!message) return next(new AppError("Message not found!", 404));

  return { message };
});

export const deleteMessage = handleController(async (req, _res, next) => {
  const deletedMessage = await messageService.deleteMessage(req.params.id);

  if (!deletedMessage) return next(new AppError("Message not found", 404));

  return null;
}, 204);

export const getAllMessages = handleController(async (req, _res, next) => {
  const messages = await messageService.getAllMessages();
  return { messages };
});
