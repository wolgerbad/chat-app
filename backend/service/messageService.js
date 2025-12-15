import { messageRepository } from '../repository/messageRepository.js';

export const messageService = (repo) => {
  async function getMessages(conversationId) {
    try {
      const messages = await messageRepository().getMessages(conversationId);
      return messages;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function addNewMessage(msg) {
    try {
      const message = await messageRepository().addNewMessage(msg);
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }

  return { getMessages, addNewMessage };
};
