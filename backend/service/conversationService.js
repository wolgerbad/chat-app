import { conversationRepository } from '../repository/conversationRepository.js';

export const conversationService = () => {
  async function getUsersConversations(userId) {
    try {
      const conversations =
        await conversationRepository().getUsersConversations(userId);
      return conversations;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getConversationById(conversationId) {
    try {
      const conversation = await conversationRepository().getConversationById(
        conversationId
      );

      return conversation;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function addNewConversation(participants) {
    try {
      const newConversation = await conversationRepository().addNewConversation(
        participants
      );

      return newConversation;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updateConversation(conversationId) {
    try {
      const updatedConversation =
        await conversationRepository().updateConversation(conversationId);

      return updatedConversation;
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    getUsersConversations,
    getConversationById,
    addNewConversation,
    updateConversation,
  };
};
