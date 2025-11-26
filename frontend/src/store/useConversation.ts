import { create } from 'zustand';
import type { ConversationStateType } from '../types';

export const useConversation = create<ConversationStateType>((set) => ({
  selectedFriend: null,

  setSelectedFriend: (val) => set({ selectedFriend: val }),
}));
