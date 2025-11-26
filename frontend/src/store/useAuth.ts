import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthType } from '../types';

export const useAuth = create<AuthType>()(
  persist<AuthType>(
    (set) => ({
      user: null,

      setUser: (val) => {
        set({ user: val });
      },
    }),
    { name: 'auth-storage' }
  )
);
