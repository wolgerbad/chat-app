import mongoose from 'mongoose';

const conversationsSchema = new mongoose.Schema(
  {
    participants: [],
  },
  {
    timestamps: true,
  }
);

export const Conversation = await mongoose.model(
  'conversations',
  conversationsSchema
);
