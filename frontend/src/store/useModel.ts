import { create } from 'zustand';
import type { ModelType } from '../types';

export const useModel = create<ModelType>((set) => ({
  isOpen: false,

  setIsOpen: (val) => set({ isOpen: val }),
}));
