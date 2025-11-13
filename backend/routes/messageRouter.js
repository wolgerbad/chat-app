import { Router } from 'express';
import { Message } from '../models/messagesModel.js';

const router = Router();

router.get('/:conversationId', async (req, res, next) => {
  const conversationId = req.params.conversationId;
  const messages = await Message.find({ conversationId });
  res.json(messages);
});

router.get('/:conversationId/last', (req, res, next) => {
  const lastElement = Message.findOne().sort({ updatedAt: -1 });
  res.json(lastElement);
});

export default router;
