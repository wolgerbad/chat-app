import { Message } from '../models/messagesModel.js';

export async function getMessages(conversationId) {
  const messages = await Message.find({ conversationId });
  return messages;
}

export async function addNewMessage(msg) {
  const message = await Message.insertOne(msg);
  return message;
}
