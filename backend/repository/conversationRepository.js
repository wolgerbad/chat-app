import { Conversation } from '../models/conversationsModel.js';

export const conversationRepository = () => {
  async function getUsersConversations(userId) {
    try {
      const conversations = await Conversation.find({
        participants: userId,
      }).sort({ updatedAt: -1 });

      return conversations;
    } catch (error) {
      throw new Error('Something went wrong while getting conversations.');
    }
  }

  async function getConversationById(conversationId) {
    try {
      const conversation = await Conversation.findOne({ _id: conversationId });
      return conversation;
    } catch (error) {
      throw new Error('Something went wrong while getting conversation');
    }
  }

  async function addNewConversation(participants) {
    try {
      const newConversation = await Conversation.insertOne({ participants });
      return newConversation;
    } catch (error) {
      throw new Error('Something went wrong while adding new conversation');
    }
  }

  async function updateConversation(conversationId) {
    try {
      const updatedConversation = await Conversation.findOneAndUpdate(
        { _id: conversationId },
        { $set: { lastMessage: Date.now() } },
        { upsert: true }
      );

      return updatedConversation;
    } catch (error) {
      throw new Error('Something went wrong while updating conversation');
    }
  }

  return {
    getUsersConversations,
    getConversationById,
    addNewConversation,
    updateConversation,
  };
};
