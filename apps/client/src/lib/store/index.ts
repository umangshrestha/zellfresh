import { PaletteMode } from '@mui/material';
import axios from 'axios';
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
      userDetails: get()?.userDetails || null,
      toggleTheme: () =>
        set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      logout: ({ onError, onSuccess }) => {
        axios
          .get('/api/auth/logout')
          .then(() => {
            set({ userDetails: null });
            if (onSuccess) onSuccess();
          })
          .catch((error) => {
            if (onError) {
              onError(error);
            }
          });
      },
      login: (provider: string, token: string, { onError, onSuccess }) => {
        axios
          .get(`/api/auth/${provider}/login`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            set({ userDetails: response.data });
            if (onSuccess) onSuccess();
          })
          .catch((error) => {
            if (onError) onError(error);
          });
      },
    }),
    {
      name: 'app-storage',
      getStorage: () => localStorage,
    } as PersistOptions<StorageState>,
  ),
);
