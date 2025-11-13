import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set) => ({
      user: null,

      setUser: (val) => {
        set({ user: val });
      },
    }),
    { name: 'auth-storage' }
  )
);
