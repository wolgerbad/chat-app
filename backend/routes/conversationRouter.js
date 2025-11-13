import { Router } from 'express';
import { Conversation } from '../models/conversationsModel.js';

const router = Router();

router.get('/:userId', async (req, res, next) => {
  const id = req.params.userId;

  const conversations = await Conversation.find({ 'participants.id': id });

  res.json(conversations);
});

router.get('/conversation/:userId', async (req, res, next) => {
  const id = req.params.userId.split('&');

  const conversations = await Conversation.find({
    $and: [{ participants: id[0] }, { participants: id[1] }],
  });

  res.json(conversations);
});

export default router;
