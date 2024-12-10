import { AxiosRequestConfig } from 'axios';
import { Token } from './Token.types.ts';

export interface AccountDetails {
  sub: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface AccountContextType {
  accountDetails: AccountDetails | null;
  token: Token;
  login: (
    login: 'guest' | 'google',
    config: AxiosRequestConfig,
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => Promise<void>;
  logout: (
    config: AxiosRequestConfig,
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => Promise<void>;
}
