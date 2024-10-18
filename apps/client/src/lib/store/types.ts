import { PaletteMode } from '@mui/material';

export interface StorageState {
  theme: PaletteMode;
  toggleTheme: () => void;

  userDetails: {
    name: string;
    role: string;
    imageUrl: string;
  } | null;

  setUserDetails: (userDetails: StorageState['userDetails']) => void;
}
