import { PaletteMode } from '@mui/material';
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { StorageState } from './types';

const DEFAULT_MODE: PaletteMode = window.matchMedia(
  '(prefers-color-scheme: dark)',
).matches
  ? 'dark'
  : 'light';

export const useStorageStore = create(
  persist(
    (set, get) => ({
      theme: get()?.theme || DEFAULT_MODE,
      toggleTheme: () => {
        set({ theme: get().theme === 'dark' ? 'light' : 'dark' });
      },
    }),
    {
      name: 'app-storage',
      getStorage: () => localStorage,
    } as PersistOptions<StorageState>,
  ),
);
