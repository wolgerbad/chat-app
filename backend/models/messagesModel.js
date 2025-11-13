import mongoose from 'mongoose';

const messagesSchema = new mongoose.Schema(
  {
    conversationId: { type: String, required: true },
    message: { type: String, required: true },
    senderId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Message = await mongoose.model('messages', messagesSchema);
