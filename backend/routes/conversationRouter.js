import { Router } from 'express';
import { Conversation } from '../models/conversationsModel.js';

const router = Router();

router.get('/:userId', async (req, res, next) => {
  const id = req.params.userId;

  const conversations = await Conversation.find({ participants: id }).sort({
    updatedAt: -1,
  });

  console.log('conversationsS', conversations);

  res.json(conversations);
});

router.get('/sort', (req, res, next) => {
  const conversationId = req.body.conversationId;
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

router.put('/update', async (req, res, next) => {
  const conversationId = req.body.conversationId;
  const conversation = await Conversation.findOneAndUpdate(
    { _id: conversationId },
    { $set: { lastMessage: Date.now() } },
    { upsert: true }
  );

  res.json({ conversation });
});

export default router;
