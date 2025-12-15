import { Router } from 'express';
import { Conversation } from '../models/conversationsModel.js';
import {
  addNewConversation,
  getConversationById,
  getUsersConversations,
  updateConversation,
} from '../controllers/conversationController.js';

const router = Router();

router.get('/:userId', getUsersConversations);

router.get('/conversation/:conversationId', getConversationById);

router.post('/', addNewConversation);

router.put('/update', updateConversation);

export default router;
