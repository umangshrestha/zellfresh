import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { StorageState } from "./types";
import { PaletteMode } from '@mui/material';

const generateRandomId = () => Math.random().toString(36).substring(2);
const NOT_SET = "NOT_SET";
const DEFAULT_MODE: PaletteMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
export const useStorageStore = create(
  persist(
    (set, get) => ({
      token: get()?.token || generateRandomId(),
      provider: get()?.provider || NOT_SET,
      theme: get()?.theme || DEFAULT_MODE,
      toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),
      logout: () => set({ token: generateRandomId(), provider: NOT_SET }),
      login: (provider: string, token: string) => set({ provider, token }),

      isLoggedIn: () => get().provider !== NOT_SET,
    }),
    {
      name: "app-storage",
      getStorage: () => localStorage,
    } as PersistOptions<StorageState>,
  ),
);
