import { PaletteMode } from '@mui/material';
import { AccountDetails, Token } from '../../components/Account/';

export interface StorageState {
  theme: PaletteMode;
  toggleTheme: () => void;

  accountDetails: AccountDetails | null;
  setAccountDetails: (accountDetails: AccountDetails | null) => void;

  token: Token;
  setToken: (tokens: Token) => void;
}
