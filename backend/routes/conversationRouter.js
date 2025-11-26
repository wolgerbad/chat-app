import { Router } from 'express';
import { Conversation } from '../models/conversationsModel.js';

const router = Router();

router.get('/:userId', async (req, res, next) => {
  const id = req.params.userId;

  const conversations = await Conversation.find({ 'participants.id': id });

  res.json(conversations);
});

router.get('/conversation/:conversationId', async (req, res, next) => {
  const conversationId = req.params.conversationId;
  const conversation = await Conversation.findOne({ _id: conversationId });

  res.json(conversation);
});

// res.json(conversations);

router.post('/', async (req, res, next) => {
  const participants = req.body.participants;

  const newConversation = await Conversation.insertOne({ participants });

  res.json(newConversation);
});

export default router;
