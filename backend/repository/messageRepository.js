import { Message } from '../models/messagesModel.js';

export const messageRepository = () => {
  async function getMessages(conversationId) {
    try {
      const messages = await Message.find({ conversationId });
      return messages;
    } catch (error) {
      throw new Error('Something went wrong while getting messages');
    }
  }

  async function addNewMessage(msg) {
    try {
      const message = await Message.insertOne(msg);
      return message;
    } catch (error) {
      throw new Error('Something went wrong while adding new message');
    }
  }

  return { getMessages, addNewMessage };
};
