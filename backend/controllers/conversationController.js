import { conversationService } from '../service/conversationService.js';

export async function getUsersConversations(req, res, next) {
  const id = req.params.userId;

  const conversations = await conversationService().getUsersConversations(id);

  console.log('conversationsS', conversations);

  res.json(conversations);
}

export async function getConversationById(req, res, next) {
  const conversationId = req.params.conversationId;
  const conversation = await conversationService().getConversationById(
    conversationId
  );

  console.log('getConversationById', conversation);

  res.json(conversation);
}

export async function addNewConversation(req, res, next) {
  const participants = req.body.participants;

  const newConversation = await conversationService().addNewConversation(
    participants
  );

  res.json(newConversation);
}

export async function updateConversation(req, res, next) {
  const conversationId = req.body.conversationId;
  const conversation = await conversationService().updateConversation(
    conversationId
  );

  console.log('updatedConversation:', conversation);

  res.json({ conversation });
}
