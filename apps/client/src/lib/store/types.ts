import { PaletteMode } from '@mui/material';

export interface StorageState {
  theme: PaletteMode;
  toggleTheme: () => void;
}
