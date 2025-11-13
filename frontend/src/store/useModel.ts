import { create } from 'zustand';

export const useModel = create((set) => ({
  isOpen: null,

  setIsOpen: (val) => set({ isOpen: val }),
}));
