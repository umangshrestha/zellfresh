import { PaletteMode } from '@mui/material';
import { AxiosError } from 'axios';

interface CallBackProps {
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}

export interface StorageState {
  theme: PaletteMode;
  userDetails: Record<string, string> | null;
  toggleTheme: () => void;
  logout: (callback: CallBackProps) => void;
  login: (provider: string, token: string, callback: CallBackProps) => void;
}
