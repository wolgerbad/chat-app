import { Router } from 'express';
import { Message } from '../models/messagesModel.js';
import { getMessages } from '../controllers/messageController.js';

const router = Router();

router.get('/:conversationId', getMessages);

router.get('/:conversationId/last', (req, res, next) => {
  const lastElement = Message.findOne().sort({ updatedAt: -1 });
  res.json(lastElement);
});

export default router;
