import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { StorageState } from './types';
import { PaletteMode } from '@mui/material';

const generateRandomGuestId = () => Math.random().toString(36).substring(2);

const DEFAULT_MODE: PaletteMode = window.matchMedia(
  '(prefers-color-scheme: dark)',
).matches
  ? 'dark'
  : 'light';
export const useStorageStore = create(
  persist(
    (set, get) => ({
      token: get()?.token,
      theme: get()?.theme || DEFAULT_MODE,
      toggleTheme: () =>
        set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      logout: () => set({ guestID: generateRandomGuestId() }),
      login: (token: string) => set({ token }),

      isLoggedIn: () => !!get().token,
    }),
    {
      name: 'app-storage',
      getStorage: () => localStorage,
    } as PersistOptions<StorageState>,
  ),
);
