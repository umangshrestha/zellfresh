import { PaletteMode } from '@mui/material';
export interface StorageState {
  token: string;
  provider: string;

  theme: PaletteMode;
  toggleTheme: () => void;

  logout: () => void;
  login: (provider: string, token: string) => void;
  isLoggedIn: () => boolean;
}
