import { createContext } from 'react';
import type { AccountContextType } from './Account.types.ts';

export const AccountContext =
  createContext<AccountContextType | null>(null);
