import { create } from 'zustand';

type SearchType = {
  searchValue: string;
  setSearchValue: (val: string) => void;
};

export const useSearch = create<SearchType>((set) => ({
  searchValue: '',
  setSearchValue: (val) => set({ searchValue: val }),
}));
