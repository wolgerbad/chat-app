import { messageService } from '../service/messageService.js';

export async function getMessages(req, res, next) {
  const conversationId = req.params.conversationId;

  const messages = await messageService().getMessages(conversationId);

  res.json(messages);
}
