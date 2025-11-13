import { create } from 'zustand';

export const useConversation = create((set) => ({
  selectedFriend: null,

  setSelectedFriend: (val) => set({ selectedFriend: val }),
}));
