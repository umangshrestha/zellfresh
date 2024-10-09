import { PaletteMode } from '@mui/material';
export interface StorageState {
  accessToken?: string;
  refreshToken?: string;
  guestID?: string;

  theme: PaletteMode;
  toggleTheme: () => void;

  logout: () => void;
  login: (accessToken: string, refreshToken: string) => void;
  isLoggedIn: () => boolean;
}
